const postRepository = require("../../repositories/post.repository");
const userRepository = require("../../repositories/user.repository");

const cloudinaryService = require("../cloudinary/cloudinary.service");

const AppError = require("../../utils/AppError");

const extractHashtags = (caption = "") => {
  const matches = caption.match(/#(\w+)/g);

  if (!matches) {
    return [];
  }

  return [
    ...new Set(
      matches.map((tag) =>
        tag.replace("#", "").toLowerCase()
      )
    ),
  ];
};

const createPost = async ({
  authorId,
  caption,
  visibility,
  files = [],
}) => {
  const media = [];

  for (const file of files) {
    const mediaType =
      file.mimetype.startsWith("video/")
        ? "video"
        : "image";

    const uploaded =
      await cloudinaryService.uploadMedia(
        file.buffer,
        "yumedia/posts",
        mediaType
      );

    media.push({
      type: mediaType,
      url: uploaded.url,
      publicId: uploaded.publicId,
    });
  }

  const hashtags =
    extractHashtags(caption);

  const post =
    await postRepository.create({
      author: authorId,
      caption,
      media,
      hashtags,
      visibility,
    });

  if (
    userRepository.incrementPostsCount
  ) {
    await userRepository.incrementPostsCount(
      authorId
    );
  }

  return post;
};

const getPostById = async (
  postId
) => {
  const post =
    await postRepository.findById(
      postId
    );

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  return post;
};

const getUserPosts = async (
  username,
  page = 1,
  limit = 10
) => {
  const user =
    await userRepository.findByUsername(
      username
    );

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  return postRepository.findByAuthor(
    user._id,
    {
      page,
      limit,
    }
  );
};

const updatePost = async (
  postId,
  userId,
  payload
) => {
  const post =
    await postRepository.findById(
      postId
    );

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  if (
    post.author._id.toString() !==
    userId
  ) {
    throw new AppError(
      "You are not allowed to update this post",
      403
    );
  }

  const updateData = {};

  if (
    payload.caption !== undefined
  ) {
    updateData.caption =
      payload.caption;

    updateData.hashtags =
      extractHashtags(
        payload.caption
      );
  }

  if (
    payload.visibility !==
    undefined
  ) {
    updateData.visibility =
      payload.visibility;
  }

  return postRepository.updateById(
    postId,
    updateData
  );
};

const deletePost = async (
  postId,
  userId
) => {
  const post =
    await postRepository.findById(
      postId
    );

  if (!post) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  if (
    post.author._id.toString() !==
    userId
  ) {
    throw new AppError(
      "You are not allowed to delete this post",
      403
    );
  }

  for (const media of post.media) {
    await cloudinaryService.deleteMedia(
      media.publicId,
      media.type
    );
  }

  await postRepository.deleteById(
    postId
  );

  if (
    userRepository.decrementPostsCount
  ) {
    await userRepository.decrementPostsCount(
      userId
    );
  }

  return null;
};

module.exports = {
  createPost,
  getPostById,
  getUserPosts,
  updatePost,
  deletePost,
};
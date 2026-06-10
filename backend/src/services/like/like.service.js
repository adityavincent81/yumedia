const postRepository = require(
  "../../repositories/post.repository"
);

const postLikeRepository = require(
  "../../repositories/postLike.repository"
);

const AppError = require(
  "../../utils/AppError"
);

const toggleLike = async (
  userId,
  postId
) => {
  const postExists =
    await postRepository.existsById(
      postId
    );

  if (!postExists) {
    throw new AppError(
      "Post not found",
      404
    );
  }

  const existingLike =
    await postLikeRepository.findLike(
      userId,
      postId
    );

  let liked = false;

  if (existingLike) {
    await postLikeRepository.deleteLike(
      userId,
      postId
    );

    await postRepository.decrementLikesCount(
      postId
    );

    liked = false;
  } else {
    await postLikeRepository.createLike(
      userId,
      postId
    );

    await postRepository.incrementLikesCount(
      postId
    );

    liked = true;
  }

  const updatedPost =
    await postRepository.findById(
      postId
    );

  return {
    liked,
    likesCount:
      updatedPost.likesCount,
  };
};

const getLikeStatus =
  async (
    userId,
    postId
  ) => {
    const postExists =
      await postRepository.existsById(
        postId
      );

    if (!postExists) {
      throw new AppError(
        "Post not found",
        404
      );
    }

    const liked =
      await postLikeRepository.exists(
        userId,
        postId
      );

    return {
      liked: !!liked,
    };
  };

const getPostLikes =
  async (
    postId,
    page = 1,
    limit = 20
  ) => {
    const postExists =
      await postRepository.existsById(
        postId
      );

    if (!postExists) {
      throw new AppError(
        "Post not found",
        404
      );
    }

    const likes =
      await postLikeRepository.getPostLikes(
        postId,
        {
          page,
          limit,
        }
      );

    const total =
      await postLikeRepository.countLikes(
        postId
      );

    return {
      likes,

      pagination: {
        page,

        limit,

        total,

        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    };
  };

module.exports = {
  toggleLike,

  getLikeStatus,

  getPostLikes,
};
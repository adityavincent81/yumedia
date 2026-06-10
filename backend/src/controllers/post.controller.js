const postService = require("../services/post/post.service");

const asyncHandler = require("../utils/asyncHandler");

const {
  successResponse,
} = require("../utils/Response");

const createPost = asyncHandler(
  async (req, res) => {
    const post =
      await postService.createPost({
        authorId: req.user.userId,
        caption: req.body.caption,
        visibility:
          req.body.visibility,
        files: req.files || [],
      });

    return successResponse(res, {
      statusCode: 201,
      message:
        "Post created successfully",
      data: post,
    });
  }
);

const getPost = asyncHandler(
  async (req, res) => {
    const post =
      await postService.getPostById(
        req.params.postId
      );

    return successResponse(res, {
      statusCode: 200,
      message:
        "Post retrieved successfully",
      data: post,
    });
  }
);

const getUserPosts = asyncHandler(
  async (req, res) => {
    const page = Number(
      req.query.page || 1
    );

    const limit = Number(
      req.query.limit || 10
    );

    const posts =
      await postService.getUserPosts(
        req.params.username,
        page,
        limit
      );

    return successResponse(res, {
      statusCode: 200,
      message:
        "Posts retrieved successfully",
      data: posts,
    });
  }
);

const updatePost = asyncHandler(
  async (req, res) => {
    const post =
      await postService.updatePost(
        req.params.postId,
        req.user.userId,
        req.body
      );

    return successResponse(res, {
      statusCode: 200,
      message:
        "Post updated successfully",
      data: post,
    });
  }
);

const deletePost = asyncHandler(
  async (req, res) => {
    await postService.deletePost(
      req.params.postId,
      req.user.userId
    );

    return successResponse(res, {
      statusCode: 200,
      message:
        "Post deleted successfully",
    });
  }
);

module.exports = {
  createPost,
  getPost,
  getUserPosts,
  updatePost,
  deletePost,
};
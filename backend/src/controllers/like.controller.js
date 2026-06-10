const likeService = require(
  "../services/like/like.service"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  successResponse,
} = require("../utils/Response");

const toggleLike = asyncHandler(
  async (req, res) => {
    const result =
      await likeService.toggleLike(
        req.user.userId,
        req.params.postId
      );

    return successResponse(
      res,
      {
        statusCode: 200,
        message:
          result.liked
            ? "Post liked successfully"
            : "Post unliked successfully",
        data: result,
      }
    );
  }
);

const getLikeStatus =
  asyncHandler(
    async (req, res) => {
      const result =
        await likeService.getLikeStatus(
          req.user.userId,
          req.params.postId
        );

      return successResponse(
        res,
        {
          statusCode: 200,
          message:
            "Like status retrieved successfully",
          data: result,
        }
      );
    }
  );

const getPostLikes =
  asyncHandler(
    async (req, res) => {
      const page = Number(
        req.query.page || 1
      );

      const limit = Number(
        req.query.limit || 20
      );

      const result =
        await likeService.getPostLikes(
          req.params.postId,
          page,
          limit
        );

      return successResponse(
        res,
        {
          statusCode: 200,
          message:
            "Post likes retrieved successfully",
          data: result,
        }
      );
    }
  );

module.exports = {
  toggleLike,

  getLikeStatus,

  getPostLikes,
};
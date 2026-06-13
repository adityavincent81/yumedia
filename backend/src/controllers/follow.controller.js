const followService = require("../services/follow/follow.service");

const {
  userIdParamSchema,
  followListQuerySchema,
} = require("../validators/follow.validator");

const asyncHandler = require("../utils/asyncHandler");

const {
  successResponse,
} = require("../utils/Response");

class FollowController {
  followUser = asyncHandler(
    async (req, res) => {
      const { userId } =
        userIdParamSchema.parse(
          req.params
        );

      const result =
        await followService.followUser(
          req.user.userId,
          userId
        );

      return successResponse(res, {
        statusCode: 201,
        message:
          "User followed successfully",
        data: result,
      });
    }
  );

  unfollowUser = asyncHandler(
    async (req, res) => {
      const { userId } =
        userIdParamSchema.parse(
          req.params
        );

      const result =
        await followService.unfollowUser(
          req.user.userId,
          userId
        );

      return successResponse(res, {
        statusCode: 200,
        message:
          "User unfollowed successfully",
        data: result,
      });
    }
  );

  getFollowers = asyncHandler(
    async (req, res) => {
      const { userId } =
        userIdParamSchema.parse(
          req.params
        );

      const {
        page,
        limit,
      } =
        followListQuerySchema.parse(
          req.query
        );

      const followers =
        await followService.getFollowers(
          userId,
          page,
          limit
        );

      return successResponse(res, {
        statusCode: 200,
        message:
          "Followers fetched successfully",
        data: followers,
      });
    }
  );

  getFollowing = asyncHandler(
    async (req, res) => {
      const { userId } =
        userIdParamSchema.parse(
          req.params
        );

      const {
        page,
        limit,
      } =
        followListQuerySchema.parse(
          req.query
        );

      const following =
        await followService.getFollowing(
          userId,
          page,
          limit
        );

      return successResponse(res, {
        statusCode: 200,
        message:
          "Following fetched successfully",
        data: following,
      });
    }
  );

  getFollowStatus = asyncHandler(
    async (req, res) => {
      const { userId } =
        userIdParamSchema.parse(
          req.params
        );

      const status =
        await followService.getFollowStatus(
          req.user.userId,
          userId
        );

      return successResponse(res, {
        statusCode: 200,
        message:
          "Follow status fetched successfully",
        data: status,
      });
    }
  );
}

module.exports =
  new FollowController();
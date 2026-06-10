const feedService = require(
  "../services/feed/feed.service"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  successResponse,
} = require("../utils/Response");

const getFeed = asyncHandler(
  async (req, res) => {
    const page = Number(
      req.query.page || 1
    );

    const limit = Number(
      req.query.limit || 10
    );

    const result =
      await feedService.getFeed(
        req.user.userId,
        page,
        limit
      );

    return successResponse(
      res,
      {
        statusCode: 200,
        message:
          "Feed retrieved successfully",
        data: result,
      }
    );
  }
);

module.exports = {
  getFeed,
};
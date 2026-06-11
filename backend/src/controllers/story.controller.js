const storyService = require(
  "../services/story/story.service"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  successResponse,
} = require(
  "../utils/Response"
);

/**
 * Story CRUD
 */

const createStory =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const story =
        await storyService.createStory(
          req.user.userId,
          req.body,
          req.file
        );

      return successResponse(
        res,
        {
          statusCode: 201,

          message:
            "Story created successfully",

          data: story,
        }
      );
    }
  );

const updateStory =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const story =
        await storyService.updateStory(
          req.user.userId,
          req.params.storyId,
          req.body
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Story updated successfully",

          data: story,
        }
      );
    }
  );

const deleteStory =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const result =
        await storyService.deleteStory(
          req.user.userId,
          req.params.storyId
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Story deleted successfully",

          data: result,
        }
      );
    }
  );

/**
 * Feed
 */

const getStoryFeed =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const stories =
        await storyService.getStoryFeed(
          req.user.userId
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Stories retrieved successfully",

          data: stories,
        }
      );
    }
  );

const getStoryById =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const story =
        await storyService.getStoryById(
          req.params.storyId,
          req.user.userId
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Story retrieved successfully",

          data: story,
        }
      );
    }
  );

/**
 * Views
 */

const markStoryViewed =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const result =
        await storyService.markStoryViewed(
          req.params.storyId,
          req.user.userId
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Story viewed successfully",

          data: result,
        }
      );
    }
  );

const getStoryViewers =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const page =
        Number(
          req.query.page || 1
        );

      const limit =
        Number(
          req.query.limit ||
            50
        );

      const viewers =
        await storyService.getStoryViewers(
          req.params.storyId,
          req.user.userId,
          page,
          limit
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Story viewers retrieved successfully",

          data: viewers,
        }
      );
    }
  );

/**
 * Comments
 */

const createComment =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const comment =
        await storyService.createComment(
          {
            userId:
              req.user.userId,

            storyId:
              req.params.storyId,

            content:
              req.body.content,
          }
        );

      return successResponse(
        res,
        {
          statusCode: 201,

          message:
            "Comment created successfully",

          data: comment,
        }
      );
    }
  );

const createReply =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const reply =
        await storyService.createReply(
          {
            userId:
              req.user.userId,

            commentId:
              req.params.commentId,

            content:
              req.body.content,
          }
        );

      return successResponse(
        res,
        {
          statusCode: 201,

          message:
            "Reply created successfully",

          data: reply,
        }
      );
    }
  );

const getComments =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const page =
        Number(
          req.query.page || 1
        );

      const limit =
        Number(
          req.query.limit ||
            20
        );

      const comments =
  await storyService.getComments(
    req.params.storyId,
    req.user.userId,
    page,
    limit
  );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Comments retrieved successfully",

          data: comments,
        }
      );
    }
  );

const getReplies =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const page =
        Number(
          req.query.page || 1
        );

      const limit =
        Number(
          req.query.limit ||
            20
        );

      const replies =
  await storyService.getReplies(
    req.params.commentId,
    req.user.userId,
    page,
    limit
  );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Replies retrieved successfully",

          data: replies,
        }
      );
    }
  );

const deleteComment =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const result =
        await storyService.deleteComment(
          req.params.commentId,
          req.user.userId
        );

      return successResponse(
        res,
        {
          statusCode: 200,

          message:
            "Comment deleted successfully",

          data: result,
        }
      );
    }
  );

module.exports = {
  createStory,

  updateStory,

  deleteStory,

  getStoryFeed,

  getStoryById,

  markStoryViewed,

  getStoryViewers,

  createComment,

  createReply,

  getComments,

  getReplies,

  deleteComment,
};
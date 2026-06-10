const commentService = require(
  "../services/comment/comment.service"
);

const asyncHandler = require(
  "../utils/asyncHandler"
);

const {
  successResponse,
} = require(
  "../utils/Response"
);

const createComment =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const comment =
        await commentService.createComment(
          {
            userId:
              req.user.userId,

            postId:
              req.body.postId,

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
        await commentService.createReply(
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

const getPostComments =
  asyncHandler(
    async (
      req,
      res
    ) => {
      const page =
        Number(
          req.query.page ||
            1
        );

      const limit =
        Number(
          req.query.limit ||
            20
        );

      const comments =
        await commentService.getPostComments(
          req.params.postId,
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
          req.query.page ||
            1
        );

      const limit =
        Number(
          req.query.limit ||
            20
        );

      const replies =
        await commentService.getReplies(
          req.params.commentId,
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
        await commentService.deleteComment(
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
  createComment,

  createReply,

  getPostComments,

  getReplies,

  deleteComment,
};
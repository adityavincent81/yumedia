const { z } = require("zod");

const {
  COMMENT_LIMITS,
} = require(
  "../constants/comment.constants"
);

const objectIdRegex =
  /^[0-9a-fA-F]{24}$/;

const createCommentSchema =
  z.object({
    postId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid post id"
      ),

    content: z
      .string()
      .trim()
      .min(
        1,
        "Comment content is required"
      )
      .max(
        COMMENT_LIMITS.MAX_LENGTH,
        `Comment must not exceed ${COMMENT_LIMITS.MAX_LENGTH} characters`
      ),
  });

const createReplySchema =
  z.object({
    content: z
      .string()
      .trim()
      .min(
        1,
        "Reply content is required"
      )
      .max(
        COMMENT_LIMITS.MAX_LENGTH,
        `Reply must not exceed ${COMMENT_LIMITS.MAX_LENGTH} characters`
      ),
  });

const commentParamsSchema =
  z.object({
    commentId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid comment id"
      ),
  });

const postCommentsParamsSchema =
  z.object({
    postId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid post id"
      ),
  });

const commentQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .positive()
      .default(
        COMMENT_LIMITS.DEFAULT_PAGE
      ),

    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(
        COMMENT_LIMITS.MAX_LIMIT
      )
      .default(
        COMMENT_LIMITS.DEFAULT_LIMIT
      ),
  });

module.exports = {
  createCommentSchema,

  createReplySchema,

  commentParamsSchema,

  postCommentsParamsSchema,

  commentQuerySchema,
};
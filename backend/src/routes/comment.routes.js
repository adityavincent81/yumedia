const express = require("express");

const commentController = require(
  "../controllers/comment.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  createCommentSchema,
  createReplySchema,
  commentParamsSchema,
  postCommentsParamsSchema,
  commentQuerySchema,
} = require(
  "../validators/comment.validator"
);

const router = express.Router();

/**
 * Create Comment
 */
router.post(
  "/",
  authMiddleware,
  validate(createCommentSchema),
  commentController.createComment
);

/**
 * Create Reply
 */
router.post(
  "/:commentId/reply",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  validate(createReplySchema),
  commentController.createReply
);

/**
 * Get Post Comments
 */
router.get(
  "/post/:postId",
  authMiddleware,
  validate(
    postCommentsParamsSchema,
    "params"
  ),
  validate(
    commentQuerySchema,
    "query"
  ),
  commentController.getPostComments
);

/**
 * Get Replies
 */
router.get(
  "/:commentId/replies",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  validate(
    commentQuerySchema,
    "query"
  ),
  commentController.getReplies
);

/**
 * Delete Comment
 */
router.delete(
  "/:commentId",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  commentController.deleteComment
);

module.exports = router;
const express = require(
  "express"
);

const storyController = require(
  "../controllers/story.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  storyUpload,
} = require(
  "../middleware/upload.middleware"
);

const {
  createStorySchema,
  updateStorySchema,
  createStoryCommentSchema,
  createStoryReplySchema,
  storyParamsSchema,
  commentParamsSchema,
  storyQuerySchema,
} = require(
  "../validators/story.validator"
);

const router =
  express.Router();

/**
 * Feed
 */

router.get(
  "/feed",
  authMiddleware,
  storyController.getStoryFeed
);

/**
 * Create Story
 */

router.post(
  "/",
  authMiddleware,
  storyUpload.single(
    "media"
  ),
  validate(
    createStorySchema
  ),
  storyController.createStory
);

/**
 * Story Detail
 */

router.get(
  "/:storyId",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  storyController.getStoryById
);

/**
 * Update Story
 */

router.patch(
  "/:storyId",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  validate(
    updateStorySchema
  ),
  storyController.updateStory
);

/**
 * Delete Story
 */

router.delete(
  "/:storyId",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  storyController.deleteStory
);

/**
 * Views
 */

router.post(
  "/:storyId/view",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  storyController.markStoryViewed
);

router.get(
  "/:storyId/viewers",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  validate(
    storyQuerySchema,
    "query"
  ),
  storyController.getStoryViewers
);

/**
 * Comments
 */

router.get(
  "/:storyId/comments",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  validate(
    storyQuerySchema,
    "query"
  ),
  storyController.getComments
);

router.post(
  "/:storyId/comments",
  authMiddleware,
  validate(
    storyParamsSchema,
    "params"
  ),
  validate(
    createStoryCommentSchema
  ),
  storyController.createComment
);

/**
 * Replies
 */

router.get(
  "/comments/:commentId/replies",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  validate(
    storyQuerySchema,
    "query"
  ),
  storyController.getReplies
);

router.post(
  "/comments/:commentId/replies",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  validate(
    createStoryReplySchema
  ),
  storyController.createReply
);

/**
 * Delete Comment
 */

router.delete(
  "/comments/:commentId",
  authMiddleware,
  validate(
    commentParamsSchema,
    "params"
  ),
  storyController.deleteComment
);

module.exports =
  router;
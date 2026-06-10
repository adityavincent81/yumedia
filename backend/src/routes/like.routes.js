const express = require(
  "express"
);

const likeController = require(
  "../controllers/like.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  postIdParamsSchema,
  likeQuerySchema,
} = require(
  "../validators/like.validator"
);

const router =
  express.Router();

/**
 * Toggle Like / Unlike
 *
 * POST /api/likes/:postId
 */
router.post(
  "/:postId",
  authMiddleware,
  validate(
    postIdParamsSchema,
    "params"
  ),
  likeController.toggleLike
);

/**
 * Get Like Status
 *
 * GET /api/likes/:postId/status
 */
router.get(
  "/:postId/status",
  authMiddleware,
  validate(
    postIdParamsSchema,
    "params"
  ),
  likeController.getLikeStatus
);

/**
 * Get Post Likes
 *
 * GET /api/likes/post/:postId
 */
router.get(
  "/post/:postId",
  authMiddleware,
  validate(
    postIdParamsSchema,
    "params"
  ),
  validate(
    likeQuerySchema,
    "query"
  ),
  likeController.getPostLikes
);

module.exports = router;
const express = require("express");

const collectionController = require(
  "../controllers/collection.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  createCollectionSchema,
  updateCollectionSchema,
  collectionParamsSchema,
  addPostToCollectionSchema,
  collectionPostParamsSchema,
  collectionQuerySchema,
} = require(
  "../validators/collection.validator"
);

const router = express.Router();

/**
 * Create Collection
 */
router.post(
  "/",
  authMiddleware,
  validate(createCollectionSchema),
  collectionController.createCollection
);

/**
 * My Collections
 */
router.get(
  "/",
  authMiddleware,
  validate(
    collectionQuerySchema,
    "query"
  ),
  collectionController.getMyCollections
);

/**
 * Collection Detail
 */
router.get(
  "/:collectionId",
  authMiddleware,
  validate(
    collectionParamsSchema,
    "params"
  ),
  collectionController.getCollectionById
);

/**
 * Update Collection
 */
router.patch(
  "/:collectionId",
  authMiddleware,
  validate(
    collectionParamsSchema,
    "params"
  ),
  validate(
    updateCollectionSchema
  ),
  collectionController.updateCollection
);

/**
 * Delete Collection
 */
router.delete(
  "/:collectionId",
  authMiddleware,
  validate(
    collectionParamsSchema,
    "params"
  ),
  collectionController.deleteCollection
);

/**
 * Collection Posts
 */
router.get(
  "/:collectionId/posts",
  authMiddleware,
  validate(
    collectionParamsSchema,
    "params"
  ),
  validate(
    collectionQuerySchema,
    "query"
  ),
  collectionController.getCollectionPosts
);

/**
 * Add Post To Collection
 */
router.post(
  "/:collectionId/posts",
  authMiddleware,
  validate(
    collectionParamsSchema,
    "params"
  ),
  validate(
    addPostToCollectionSchema
  ),
  collectionController.addPostToCollection
);

/**
 * Remove Post From Collection
 */
router.delete(
  "/:collectionId/posts/:postId",
  authMiddleware,
  validate(
    collectionPostParamsSchema,
    "params"
  ),
  collectionController.removePostFromCollection
);

module.exports = router;
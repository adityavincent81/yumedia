const express = require(
  "express"
);

const feedController = require(
  "../controllers/feed.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  feedQuerySchema,
} = require(
  "../validators/feed.validator"
);

const router =
  express.Router();

router.get(
  "/",
  authMiddleware,
  validate(
    feedQuerySchema,
    "query"
  ),
  feedController.getFeed
);

module.exports = router;
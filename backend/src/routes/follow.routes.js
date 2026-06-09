const express = require("express");

const followController = require("../controllers/follow.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
  "/:userId",
  authMiddleware,
  followController.followUser
);

router.delete(
  "/:userId",
  authMiddleware,
  followController.unfollowUser
);

router.get(
  "/:userId/followers",
  authMiddleware,
  followController.getFollowers
);

router.get(
  "/:userId/following",
  authMiddleware,
  followController.getFollowing
);

router.get(
  "/:userId/status",
  authMiddleware,
  followController.getFollowStatus
);

module.exports = router;
const express = require("express");

const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const {
  avatarUpload,
  coverUpload,
} = require("../middleware/upload.middleware");

const router = express.Router();

router.get(
  "/me",
  authMiddleware,
  userController.getMyProfile
);

router.get(
  "/:username",
  userController.getProfileByUsername
);

router.patch(
  "/me",
  authMiddleware,
  userController.updateMyProfile
);

router.patch(
  "/me/avatar",
  authMiddleware,
  avatarUpload.single("avatar"),
  userController.updateMyAvatar
);

router.patch(
  "/me/cover",
  authMiddleware,
  coverUpload.single("cover"),
  userController.updateMyCover
);

module.exports = router;
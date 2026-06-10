const express = require("express");

const postController = require("../controllers/post.controller");

const authMiddleware = require("../middleware/auth.middleware");

const validate = require("../middleware/validate.middleware");

const {
  postUpload,
} = require("../middleware/upload.middleware");

const {
  createPostSchema,
  updatePostSchema,
  postParamsSchema,
} = require("../validators/post.validator");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  postUpload.array("media", 10),
  validate(createPostSchema),
  postController.createPost
);

router.get(
  "/user/:username",
  authMiddleware,
  postController.getUserPosts
);

router.get(
  "/:postId",
  authMiddleware,
  validate(postParamsSchema, "params"),
  postController.getPost
);

router.patch(
  "/:postId",
  authMiddleware,
  validate(postParamsSchema, "params"),
  validate(updatePostSchema),
  postController.updatePost
);

router.delete(
  "/:postId",
  authMiddleware,
  validate(postParamsSchema, "params"),
  postController.deletePost
);

module.exports = router;
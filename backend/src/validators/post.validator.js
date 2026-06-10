const { z } = require("zod");

const createPostSchema = z.object({
  caption: z
    .string()
    .trim()
    .max(
      2200,
      "Caption must not exceed 2200 characters"
    )
    .optional(),

  visibility: z
    .enum([
      "public",
      "followers",
      "private",
    ])
    .optional(),
});

const updatePostSchema = z.object({
  caption: z
    .string()
    .trim()
    .max(
      2200,
      "Caption must not exceed 2200 characters"
    )
    .optional(),

  visibility: z
    .enum([
      "public",
      "followers",
      "private",
    ])
    .optional(),
});

const postParamsSchema = z.object({
  postId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid post id"
    ),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
  postParamsSchema,
};
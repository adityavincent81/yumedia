const { z } = require("zod");

const postIdParamsSchema =
  z.object({
    postId: z
      .string()
      .min(1, "Post ID is required"),
  });

const likeQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(50)
      .default(20),
  });

module.exports = {
  postIdParamsSchema,

  likeQuerySchema,
};
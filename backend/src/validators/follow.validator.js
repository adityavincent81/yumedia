const { z } = require("zod");

const userIdParamSchema =
  z.object({
    userId: z
      .string()
      .regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid user id"
      ),
  });

const followListQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .positive()
      .optional()
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(100)
      .optional()
      .default(20),
  });

module.exports = {
  userIdParamSchema,
  followListQuerySchema,
};
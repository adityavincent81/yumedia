const { z } = require("zod");

const updateProfileSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(
      3,
      "Full name must be at least 3 characters"
    )
    .max(
      100,
      "Full name must not exceed 100 characters"
    )
    .optional(),

  bio: z
    .string()
    .trim()
    .max(
      300,
      "Bio must not exceed 300 characters"
    )
    .optional(),

  faculty: z
    .string()
    .trim()
    .max(
      100,
      "Faculty must not exceed 100 characters"
    )
    .optional()
    .nullable(),

  major: z
    .string()
    .trim()
    .max(
      100,
      "Major must not exceed 100 characters"
    )
    .optional()
    .nullable(),

  batchYear: z
    .number()
    .int()
    .min(1900)
    .max(2100)
    .optional()
    .nullable(),

  website: z
    .string()
    .trim()
    .url("Invalid website URL")
    .optional()
    .or(z.literal(""))
    .nullable(),

  location: z
    .string()
    .trim()
    .max(
      100,
      "Location must not exceed 100 characters"
    )
    .optional()
    .nullable(),
});

module.exports = {
  updateProfileSchema,
};
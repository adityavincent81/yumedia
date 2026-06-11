const { z } = require("zod");

const objectIdRegex =
  /^[0-9a-fA-F]{24}$/;

const createCollectionSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        "Collection name is required"
      )
      .max(
        100,
        "Collection name must not exceed 100 characters"
      ),

    description: z
      .string()
      .trim()
      .max(
        500,
        "Description must not exceed 500 characters"
      )
      .optional()
      .default(""),

    coverImage: z
      .string()
      .trim()
      .optional()
      .default(""),

    isPrivate: z
      .boolean()
      .optional()
      .default(true),
  });

const updateCollectionSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(
        1,
        "Collection name is required"
      )
      .max(
        100,
        "Collection name must not exceed 100 characters"
      )
      .optional(),

    description: z
      .string()
      .trim()
      .max(
        500,
        "Description must not exceed 500 characters"
      )
      .optional(),

    coverImage: z
      .string()
      .trim()
      .optional(),

    isPrivate: z
      .boolean()
      .optional(),
  });

const collectionParamsSchema =
  z.object({
    collectionId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid collection id"
      ),
  });

const addPostToCollectionSchema =
  z.object({
    postId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid post id"
      ),
  });

const collectionPostParamsSchema =
  z.object({
    collectionId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid collection id"
      ),

    postId: z
      .string()
      .regex(
        objectIdRegex,
        "Invalid post id"
      ),
  });

const collectionQuerySchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .positive()
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(100)
      .default(20),
  });

module.exports = {
  createCollectionSchema,

  updateCollectionSchema,

  collectionParamsSchema,

  addPostToCollectionSchema,

  collectionPostParamsSchema,

  collectionQuerySchema,
};
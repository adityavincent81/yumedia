const { z } = require(
  "zod"
);

const {
  STORY_TYPES,
  STORY_VISIBILITY,
  STORY_LIMITS,
} = require(
  "../constants/story.constants"
);

/**
 * Helpers
 */

const objectIdSchema =
  z
    .string()
    .regex(
      /^[a-f\d]{24}$/i,
      "Invalid ObjectId"
    );

/**
 * Story
 */

const createStorySchema =
  z.object({
    type: z.enum([
      STORY_TYPES.IMAGE,
      STORY_TYPES.VIDEO,
      STORY_TYPES.TEXT,
    ]),

    text: z
      .string()
      .trim()
      .max(
        STORY_LIMITS.TEXT_MAX_LENGTH
      )
      .optional(),

    backgroundColor:
      z
        .string()
        .trim()
        .max(50)
        .optional(),

    visibility:
      z
        .enum([
          STORY_VISIBILITY.FOLLOWERS,
          STORY_VISIBILITY.FOLLOWERS_EXCEPT,
          STORY_VISIBILITY.ONLY_SHARE_WITH,
          STORY_VISIBILITY.ONLY_ME,
        ])
        .optional(),

    allowedUsers:
      z
        .array(
          objectIdSchema
        )
        .optional(),

    excludedUsers:
      z
        .array(
          objectIdSchema
        )
        .optional(),
  });

const updateStorySchema =
  z
    .object({
      text: z
        .string()
        .trim()
        .max(
          STORY_LIMITS.TEXT_MAX_LENGTH
        )
        .optional(),

      backgroundColor:
        z
          .string()
          .trim()
          .max(50)
          .optional(),

      visibility:
        z
          .enum([
            STORY_VISIBILITY.FOLLOWERS,
            STORY_VISIBILITY.FOLLOWERS_EXCEPT,
            STORY_VISIBILITY.ONLY_SHARE_WITH,
            STORY_VISIBILITY.ONLY_ME,
          ])
          .optional(),

      allowedUsers:
        z
          .array(
            objectIdSchema
          )
          .optional(),

      excludedUsers:
        z
          .array(
            objectIdSchema
          )
          .optional(),
    })
    .refine(
      (data) =>
        Object.keys(data)
          .length > 0,
      {
        message:
          "At least one field is required",
      }
    );

/**
 * Comments
 */

const createStoryCommentSchema =
  z.object({
    content: z
      .string()
      .trim()
      .min(1)
      .max(
        STORY_LIMITS.COMMENT_MAX_LENGTH
      ),
  });

const createStoryReplySchema =
  z.object({
    content: z
      .string()
      .trim()
      .min(1)
      .max(
        STORY_LIMITS.COMMENT_MAX_LENGTH
      ),
  });

/**
 * Params
 */

const storyParamsSchema =
  z.object({
    storyId:
      objectIdSchema,
  });

const commentParamsSchema =
  z.object({
    commentId:
      objectIdSchema,
  });

/**
 * Query
 */

const storyQuerySchema =
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
      .max(
        STORY_LIMITS.VIEWERS_PAGE_LIMIT
      )
      .default(
        STORY_LIMITS.COMMENTS_PAGE_LIMIT
      ),
  });

module.exports = {
  createStorySchema,

  updateStorySchema,

  createStoryCommentSchema,

  createStoryReplySchema,

  storyParamsSchema,

  commentParamsSchema,

  storyQuerySchema,
};
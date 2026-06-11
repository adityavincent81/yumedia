const { z } = require(
  "zod"
);

const {
  MESSAGE_TYPES,
} = require(
  "../constants/message.constants"
);

/**
 * Conversation
 */

const createConversationSchema =
  z.object({
    participantId:
      z
        .string()
        .min(1),
  });

/**
 * Params
 */

const conversationParamsSchema =
  z.object({
    conversationId:
      z
        .string()
        .min(1),
  });

const messageParamsSchema =
  z.object({
    messageId:
      z
        .string()
        .min(1),
  });

/**
 * Query
 */

const paginationQuerySchema =
  z.object({
    page:
      z
        .coerce
        .number()
        .int()
        .positive()
        .optional(),

    limit:
      z
        .coerce
        .number()
        .int()
        .positive()
        .max(100)
        .optional(),
  });

/**
 * Send Message
 */

const sendMessageSchema =
  z
    .object({
      type:
        z
          .enum([
            MESSAGE_TYPES.TEXT,

            MESSAGE_TYPES.IMAGE,

            MESSAGE_TYPES.VIDEO,

            MESSAGE_TYPES.FILE,

            MESSAGE_TYPES.AUDIO,

            MESSAGE_TYPES.STORY,

            MESSAGE_TYPES.POST,
          ])
          .default(
            MESSAGE_TYPES.TEXT
          ),

      text:
        z
          .string()
          .trim()
          .max(5000)
          .optional(),

      storyId:
        z
          .string()
          .optional(),

      postId:
        z
          .string()
          .optional(),
    })
    .superRefine(
      (
        data,
        ctx
      ) => {
        /**
         * Text Message
         */

        if (
          data.type ===
          MESSAGE_TYPES.TEXT
        ) {
          if (
            !data.text ||
            !data.text.trim()
          ) {
            ctx.addIssue({
              code:
                "custom",

              path: [
                "text",
              ],

              message:
                "Text is required",
            });
          }
        }

        /**
         * Story Share
         */

        if (
          data.type ===
          MESSAGE_TYPES.STORY
        ) {
          if (
            !data.storyId
          ) {
            ctx.addIssue({
              code:
                "custom",

              path: [
                "storyId",
              ],

              message:
                "Story ID is required",
            });
          }
        }

        /**
         * Post Share
         */

        if (
          data.type ===
          MESSAGE_TYPES.POST
        ) {
          if (
            !data.postId
          ) {
            ctx.addIssue({
              code:
                "custom",

              path: [
                "postId",
              ],

              message:
                "Post ID is required",
            });
          }
        }
      }
    );

module.exports = {
  createConversationSchema,

  conversationParamsSchema,

  messageParamsSchema,

  paginationQuerySchema,

  sendMessageSchema,
};
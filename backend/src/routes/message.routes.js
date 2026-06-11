const express = require(
  "express"
);

const messageController = require(
  "../controllers/message.controller"
);

const authMiddleware = require(
  "../middleware/auth.middleware"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  createConversationSchema,

  conversationParamsSchema,

  messageParamsSchema,

  paginationQuerySchema,

  sendMessageSchema,
} = require(
  "../validators/message.validator"
);

const router =
  express.Router();

/**
 * Conversation
 */

router.post(
  "/conversations",
  authMiddleware,
  validate(
    createConversationSchema
  ),
  messageController.createConversation
);

router.get(
  "/conversations",
  authMiddleware,
  validate(
    paginationQuerySchema,
    "query"
  ),
  messageController.getMyConversations
);

router.get(
  "/conversations/:conversationId",
  authMiddleware,
  validate(
    conversationParamsSchema,
    "params"
  ),
  messageController.getConversationById
);

/**
 * Messages
 */

router.get(
  "/conversations/:conversationId/messages",
  authMiddleware,
  validate(
    conversationParamsSchema,
    "params"
  ),
  validate(
    paginationQuerySchema,
    "query"
  ),
  messageController.getMessages
);

router.post(
  "/conversations/:conversationId/messages",
  authMiddleware,
  validate(
    conversationParamsSchema,
    "params"
  ),
  validate(
    sendMessageSchema
  ),
  messageController.sendMessage
);

/**
 * Read Status
 */

router.patch(
  "/conversations/:conversationId/read",
  authMiddleware,
  validate(
    conversationParamsSchema,
    "params"
  ),
  messageController.markConversationRead
);

/**
 * Delete For Me
 */

router.delete(
  "/:messageId",
  authMiddleware,
  validate(
    messageParamsSchema,
    "params"
  ),
  messageController.deleteMessageForMe
);

module.exports =
  router;
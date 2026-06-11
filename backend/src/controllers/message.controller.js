const messageService = require(
  "../services/message/message.service"
);

/**
 * Conversation
 */

const createConversation =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        participantId,
      } = req.body;

      const conversation =
        await messageService.createConversation(
          userId,
          participantId
        );

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Conversation created successfully",

          data:
            conversation,
        });
    } catch (error) {
      next(error);
    }
  };

const getMyConversations =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const page =
        Number(
          req.query.page
        ) || 1;

      const limit =
        Number(
          req.query.limit
        ) || 20;

      const result =
        await messageService.getMyConversations(
          userId,
          page,
          limit
        );

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

const getConversationById =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        conversationId,
      } = req.params;

      const conversation =
        await messageService.getConversationById(
          userId,
          conversationId
        );

      return res.json({
        success: true,

        data:
          conversation,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Messages
 */

const sendMessage =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        conversationId,
      } = req.params;

      const message =
        await messageService.sendMessage(
          userId,
          conversationId,
          req.body,
          req.file
        );

      return res
        .status(201)
        .json({
          success: true,

          message:
            "Message sent successfully",

          data:
            message,
        });
    } catch (error) {
      next(error);
    }
  };

const getMessages =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        conversationId,
      } = req.params;

      const page =
        Number(
          req.query.page
        ) || 1;

      const limit =
        Number(
          req.query.limit
        ) || 30;

      const result =
        await messageService.getMessages(
          userId,
          conversationId,
          page,
          limit
        );

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

const markConversationRead =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        conversationId,
      } = req.params;

      const result =
        await messageService.markConversationRead(
          userId,
          conversationId
        );

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

const deleteMessageForMe =
  async (
    req,
    res,
    next
  ) => {
    try {
      const userId =
        req.user.id;

      const {
        messageId,
      } = req.params;

      const result =
        await messageService.deleteMessageForMe(
          userId,
          messageId
        );

      return res.json({
        success: true,

        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = {
  createConversation,

  getMyConversations,

  getConversationById,

  sendMessage,

  getMessages,

  markConversationRead,

  deleteMessageForMe,
};
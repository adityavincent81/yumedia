const conversationRepository = require(
  "../../repositories/conversation.repository"
);

const messageRepository = require(
  "../../repositories/message.repository"
);

const postRepository = require(
  "../../repositories/post.repository"
);

const storyRepository = require(
  "../../repositories/story.repository"
);

const cloudinaryService = require(
  "../cloudinary/cloudinary.service"
);

const AppError = require(
  "../../utils/AppError"
);

const {
  MESSAGE_TYPES,

  MESSAGE_ERRORS,
} = require(
  "../../constants/message.constants"
);

/**
 * Helpers
 */

const ensureParticipant =
  (
    conversation,
    userId
  ) => {
    const isParticipant =
      conversation.participants.some(
        (participant) =>
          participant._id
            ? participant._id.toString() ===
              userId
            : participant.toString() ===
              userId
      );

    if (!isParticipant) {
      throw new AppError(
        MESSAGE_ERRORS.USER_NOT_IN_CONVERSATION,
        403
      );
    }
  };

const ensureConversation =
  async (
    conversationId
  ) => {
    const conversation =
      await conversationRepository.findById(
        conversationId
      );

    if (!conversation) {
      throw new AppError(
        MESSAGE_ERRORS.CONVERSATION_NOT_FOUND,
        404
      );
    }

    return conversation;
  };

/**
 * Conversation
 */

const createConversation =
  async (
    currentUserId,
    participantId
  ) => {
    if (
      currentUserId ===
      participantId
    ) {
      throw new AppError(
        "You cannot create conversation with yourself",
        400
      );
    }

    const existingConversation =
      await conversationRepository.findDirectConversation(
        currentUserId,
        participantId
      );

    if (
      existingConversation
    ) {
      return conversationRepository.findById(
        existingConversation._id
      );
    }

    const conversation =
      await conversationRepository.create(
        {
          participants: [
            currentUserId,
            participantId,
          ],
        }
      );

    return conversationRepository.findById(
      conversation._id
    );
  };

const getMyConversations =
  async (
    userId,
    page = 1,
    limit = 20
  ) => {
    const conversations =
      await conversationRepository.findByParticipant(
        userId,
        {
          page,
          limit,
        }
      );

    const total =
      await conversationRepository.countByParticipant(
        userId
      );

    return {
      conversations,

      pagination: {
        page,

        limit,

        total,

        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    };
  };

const getConversationById =
  async (
    userId,
    conversationId
  ) => {
    const conversation =
      await ensureConversation(
        conversationId
      );

    ensureParticipant(
      conversation,
      userId
    );

    const unreadCount =
      await messageRepository.countUnread(
        conversationId,
        userId
      );

    return {
      ...conversation.toObject(),

      unreadCount,
    };
  };

  /**
 * Messages
 */

const sendMessage =
  async (
    userId,
    conversationId,
    payload,
    file = null
  ) => {
    const conversation =
      await ensureConversation(
        conversationId
      );

    ensureParticipant(
      conversation,
      userId
    );

    const {
      type =
        MESSAGE_TYPES.TEXT,

      text,

      postId,

      storyId,
    } = payload;

    const messageData = {
      conversation:
        conversationId,

      sender: userId,

      type,
    };

    /**
     * Text
     */

    if (
      type ===
      MESSAGE_TYPES.TEXT
    ) {
      if (
        !text ||
        !text.trim()
      ) {
        throw new AppError(
          MESSAGE_ERRORS.EMPTY_MESSAGE,
          400
        );
      }

      messageData.text =
        text.trim();
    }

    /**
     * Media
     */

    if (
      [
        MESSAGE_TYPES.IMAGE,
        MESSAGE_TYPES.VIDEO,
        MESSAGE_TYPES.FILE,
        MESSAGE_TYPES.AUDIO,
      ].includes(type)
    ) {
      if (!file) {
        throw new AppError(
          "Media file is required",
          400
        );
      }

      const uploaded =
        await cloudinaryService.uploadMedia(
          file.buffer,
          "yumedia/messages"
        );

      messageData.media = {
        url:
          uploaded.url,

        publicId:
          uploaded.publicId,

        filename:
          file.originalname,

        mimeType:
          file.mimetype,

        size:
          file.size,
      };
    }

    /**
     * Story Share
     */

    if (
      type ===
      MESSAGE_TYPES.STORY
    ) {
      if (!storyId) {
        throw new AppError(
          "Story ID is required",
          400
        );
      }

      const exists =
        await storyRepository.existsById(
          storyId
        );

      if (!exists) {
        throw new AppError(
          "Story not found",
          404
        );
      }

      messageData.story =
        storyId;
    }

    /**
     * Post Share
     */

    if (
      type ===
      MESSAGE_TYPES.POST
    ) {
      if (!postId) {
        throw new AppError(
          "Post ID is required",
          400
        );
      }

      const exists =
        await postRepository.existsById(
          postId
        );

      if (!exists) {
        throw new AppError(
          "Post not found",
          404
        );
      }

      messageData.post =
        postId;
    }

    const message =
      await messageRepository.create(
        messageData
      );

    await conversationRepository.updateLastMessage(
      conversationId,
      {
        messageId:
          message._id,

        senderId:
          userId,
      }
    );

    return messageRepository.findById(
      message._id
    );
  };

const getMessages =
  async (
    userId,
    conversationId,
    page = 1,
    limit = 30
  ) => {
    const conversation =
      await ensureConversation(
        conversationId
      );

    ensureParticipant(
      conversation,
      userId
    );

    const messages =
      await messageRepository.findByConversation(
        conversationId,
        {
          page,
          limit,
        }
      );

    const filteredMessages =
      messages.filter(
        (message) =>
          !message.deletedFor?.some(
            (deletedUserId) =>
              deletedUserId.toString() ===
              userId
          )
      );

    const total =
      await messageRepository.countByConversation(
        conversationId
      );

    return {
      messages:
        filteredMessages,

      pagination: {
        page,

        limit,

        total,

        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    };
  };

const markConversationRead =
  async (
    userId,
    conversationId
  ) => {
    const conversation =
      await ensureConversation(
        conversationId
      );

    ensureParticipant(
      conversation,
      userId
    );

    await messageRepository.markConversationRead(
      conversationId,
      userId
    );

    return {
      success: true,
    };
  };

const deleteMessageForMe =
  async (
    userId,
    messageId
  ) => {
    const message =
      await messageRepository.findById(
        messageId
      );

    if (!message) {
      throw new AppError(
        MESSAGE_ERRORS.MESSAGE_NOT_FOUND,
        404
      );
    }

    await messageRepository.deleteForUser(
      messageId,
      userId
    );

    return {
      success: true,
    };
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
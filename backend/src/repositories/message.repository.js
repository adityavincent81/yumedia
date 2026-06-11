const Message = require(
  "../models/Message"
);

/**
 * Create
 */

const create = (data) => {
  return Message.create(
    data
  );
};

/**
 * Find By Id
 */

const findById = (
  messageId
) => {
  return Message.findById(
    messageId
  )
    .populate(
      "sender",
      `
        username
        fullName
        avatar
        isVerified
      `
    )
    .populate(
      "replyTo"
    )
    .populate(
      "post"
    )
    .populate(
      "story"
    );
};

/**
 * Conversation Messages
 */

const findByConversation =
  (
    conversationId,
    {
      page = 1,
      limit = 30,
    } = {}
  ) => {
    const skip =
      (page - 1) * limit;

    return Message.find({
      conversation:
        conversationId,

      isDeleted:
        false,
    })
      .populate(
        "sender",
        `
          username
          fullName
          avatar
          isVerified
        `
      )
      .populate(
        "replyTo"
      )
      .populate(
        "post"
      )
      .populate(
        "story"
      )
      .sort({
        createdAt: 1,
      })
      .skip(skip)
      .limit(limit);
  };

const countByConversation =
  (
    conversationId
  ) => {
    return Message.countDocuments(
      {
        conversation:
          conversationId,

        isDeleted:
          false,
      }
    );
  };

/**
 * Read Status
 */

const markConversationRead =
  (
    conversationId,
    userId
  ) => {
    return Message.updateMany(
      {
        conversation:
          conversationId,

        sender: {
          $ne: userId,
        },

        isRead:
          false,
      },
      {
        isRead: true,

        readAt:
          new Date(),
      }
    );
  };

const countUnread =
  (
    conversationId,
    userId
  ) => {
    return Message.countDocuments(
      {
        conversation:
          conversationId,

        sender: {
          $ne: userId,
        },

        isRead:
          false,
      }
    );
  };

/**
 * Delete For Me
 */

const deleteForUser =
  (
    messageId,
    userId
  ) => {
    return Message.findByIdAndUpdate(
      messageId,
      {
        $addToSet: {
          deletedFor:
            userId,
        },
      },
      {
        new: true,
      }
    );
  };

/**
 * Soft Delete
 */

const softDelete =
  (
    messageId
  ) => {
    return Message.findByIdAndUpdate(
      messageId,
      {
        isDeleted:
          true,
      },
      {
        new: true,
      }
    );
  };

/**
 * Latest Message
 */

const findLatestMessage =
  (
    conversationId
  ) => {
    return Message.findOne(
      {
        conversation:
          conversationId,

        isDeleted:
          false,
      }
    )
      .sort({
        createdAt: -1,
      })
      .populate(
        "sender",
        `
          username
          fullName
          avatar
          isVerified
        `
      );
  };

/**
 * Helpers
 */

const existsById = (
  messageId
) => {
  return Message.exists({
    _id: messageId,
  });
};

module.exports = {
  create,

  findById,

  findByConversation,

  countByConversation,

  markConversationRead,

  countUnread,

  deleteForUser,

  softDelete,

  findLatestMessage,

  existsById,
};
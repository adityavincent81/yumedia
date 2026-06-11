const Conversation = require(
  "../models/Conversation"
);

/**
 * Create
 */

const create = (data) => {
  return Conversation.create(
    data
  );
};

/**
 * Find By Id
 */

const findById = (
  conversationId
) => {
  return Conversation.findById(
    conversationId
  )
    .populate(
      "participants",
      `
        username
        fullName
        avatar
        isVerified
      `
    )
    .populate(
      "lastMessage"
    )
    .populate(
      "lastMessageSender",
      `
        username
        fullName
        avatar
        isVerified
      `
    );
};

/**
 * Personal Chat
 */

const findDirectConversation =
  (
    userA,
    userB
  ) => {
    return Conversation.findOne(
      {
        participants: {
          $all: [
            userA,
            userB,
          ],
        },

        $expr: {
          $eq: [
            {
              $size:
                "$participants",
            },
            2,
          ],
        },
      }
    );
  };

/**
 * My Conversations
 */

const findByParticipant =
  (
    userId,
    {
      page = 1,
      limit = 20,
    } = {}
  ) => {
    const skip =
      (page - 1) * limit;

    return Conversation.find(
      {
        participants:
          userId,
      }
    )
      .populate(
        "participants",
        `
          username
          fullName
          avatar
          isVerified
        `
      )
      .populate(
        "lastMessage"
      )
      .populate(
        "lastMessageSender",
        `
          username
          fullName
          avatar
          isVerified
        `
      )
      .sort({
        lastMessageAt:
          -1,
      })
      .skip(skip)
      .limit(limit);
  };

const countByParticipant =
  (
    userId
  ) => {
    return Conversation.countDocuments(
      {
        participants:
          userId,
      }
    );
  };

/**
 * Updates
 */

const updateLastMessage =
  (
    conversationId,
    {
      messageId,
      senderId,
    }
  ) => {
    return Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage:
          messageId,

        lastMessageSender:
          senderId,

        lastMessageAt:
          new Date(),
      },
      {
        new: true,
      }
    );
  };

/**
 * Helpers
 */

const existsById = (
  conversationId
) => {
  return Conversation.exists(
    {
      _id:
        conversationId,
    }
  );
};

module.exports = {
  create,

  findById,

  findDirectConversation,

  findByParticipant,

  countByParticipant,

  updateLastMessage,

  existsById,
};
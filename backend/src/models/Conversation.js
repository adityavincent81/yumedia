const mongoose = require(
  "mongoose"
);

const {
  Schema,
} = mongoose;

const conversationSchema =
  new Schema(
    {
      participants: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "User",

          required: true,
        },
      ],

      lastMessage: {
        type:
          Schema.Types.ObjectId,

        ref: "Message",

        default: null,
      },

      lastMessageSender: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        default: null,
      },

      lastMessageAt: {
        type: Date,

        default: null,

        index: true,
      },
    },
    {
      timestamps: true,

      versionKey: false,
    }
  );

/**
 * Indexes
 */

conversationSchema.index({
  participants: 1,
});

conversationSchema.index({
  lastMessageAt: -1,
});

module.exports =
  mongoose.model(
    "Conversation",
    conversationSchema
  );
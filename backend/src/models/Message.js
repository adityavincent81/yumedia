const mongoose = require(
  "mongoose"
);

const {
  Schema,
} = mongoose;

const messageSchema =
  new Schema(
    {
      conversation: {
        type:
          Schema.Types.ObjectId,

        ref:
          "Conversation",

        required: true,

        index: true,
      },

      sender: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      type: {
        type: String,

        enum: [
          "text",
          "image",
          "video",
          "file",
          "audio",
          "story",
          "post",
        ],

        default: "text",

        index: true,
      },

      /**
       * Text Message
       */
      text: {
        type: String,

        trim: true,

        maxlength: 5000,
      },

      /**
       * Media Message
       */
      media: {
        url: {
          type: String,

          trim: true,
        },

        publicId: {
          type: String,

          trim: true,
        },

        filename: {
          type: String,

          trim: true,
        },

        mimeType: {
          type: String,

          trim: true,
        },

        size: {
          type: Number,

          min: 0,
        },
      },

      /**
       * Shared Post
       */
      post: {
        type:
          Schema.Types.ObjectId,

        ref: "Post",

        default: null,
      },

      /**
       * Shared Story
       */
      story: {
        type:
          Schema.Types.ObjectId,

        ref: "Story",

        default: null,
      },

      /**
       * V2 Ready
       */
      replyTo: {
        type:
          Schema.Types.ObjectId,

        ref: "Message",

        default: null,
      },

      /**
       * Read Status
       */
      isRead: {
        type: Boolean,

        default: false,

        index: true,
      },

      readAt: {
        type: Date,

        default: null,
      },

      /**
       * Delete For Me
       */
      deletedFor: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "User",
        },
      ],

      /**
       * Soft Delete
       */
      isDeleted: {
        type: Boolean,

        default: false,
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

messageSchema.index({
  conversation: 1,
  createdAt: -1,
});

messageSchema.index({
  sender: 1,
});

messageSchema.index({
  conversation: 1,
  isRead: 1,
});

module.exports =
  mongoose.model(
    "Message",
    messageSchema
  );
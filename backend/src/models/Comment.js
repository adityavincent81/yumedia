const mongoose = require(
  "mongoose"
);

const commentSchema =
  new mongoose.Schema(
    {
      post: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Post",

        required: true,

        index: true,
      },

      author: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      content: {
        type: String,

        required: true,

        trim: true,

        maxlength: 1000,
      },

      /**
       * Reply Support
       *
       * null
       * = root comment
       *
       * ObjectId
       * = reply
       */
      parentComment: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Comment",

        default: null,

        index: true,
      },

      repliesCount: {
        type: Number,

        default: 0,

        min: 0,
      },

      isEdited: {
        type: Boolean,

        default: false,
      },

      isDeleted: {
        type: Boolean,

        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

/**
 * Post Comments
 */
commentSchema.index({
  post: 1,
  createdAt: -1,
});

/**
 * Comment Replies
 */
commentSchema.index({
  parentComment: 1,
  createdAt: 1,
});

/**
 * Author Comments
 */
commentSchema.index({
  author: 1,
  createdAt: -1,
});

module.exports =
  mongoose.model(
    "Comment",
    commentSchema
  );
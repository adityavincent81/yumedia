const mongoose = require(
  "mongoose"
);

const {
  Schema,
} = mongoose;

const storyCommentSchema =
  new Schema(
    {
      story: {
        type:
          Schema.Types.ObjectId,

        ref: "Story",

        required: true,

        index: true,
      },

      author: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      parentComment: {
        type:
          Schema.Types.ObjectId,

        ref:
          "StoryComment",

        default: null,

        index: true,
      },

      content: {
        type: String,

        required: true,

        trim: true,

        maxlength: 1000,
      },

      repliesCount: {
        type: Number,

        default: 0,

        min: 0,
      },

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
 * Story Comments
 */

storyCommentSchema.index({
  story: 1,

  createdAt: -1,
});

/**
 * Replies
 */

storyCommentSchema.index({
  parentComment: 1,

  createdAt: 1,
});

/**
 * Author Comments
 */

storyCommentSchema.index({
  author: 1,

  createdAt: -1,
});

module.exports =
  mongoose.model(
    "StoryComment",
    storyCommentSchema
  );
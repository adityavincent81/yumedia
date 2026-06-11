const mongoose = require(
  "mongoose"
);

const {
  Schema,
} = mongoose;

const storyViewSchema =
  new Schema(
    {
      story: {
        type:
          Schema.Types.ObjectId,

        ref: "Story",

        required: true,

        index: true,
      },

      viewer: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      viewedAt: {
        type: Date,

        default: Date.now,
      },
    },
    {
      timestamps: false,

      versionKey: false,
    }
  );

/**
 * One Viewer Per Story
 */

storyViewSchema.index(
  {
    story: 1,

    viewer: 1,
  },
  {
    unique: true,
  }
);

/**
 * Story Viewers
 */

storyViewSchema.index({
  story: 1,

  viewedAt: -1,
});

/**
 * User Viewed Stories
 */

storyViewSchema.index({
  viewer: 1,

  viewedAt: -1,
});

module.exports =
  mongoose.model(
    "StoryView",
    storyViewSchema
  );
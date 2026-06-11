const mongoose = require(
  "mongoose"
);

const {
  Schema,
} = mongoose;

const storySchema =
  new Schema(
    {
      author: {
        type:
          Schema.Types.ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      type: {
        type: String,

        enum: [
          "image",
          "video",
          "text",
        ],

        required: true,
      },

      media: {
        url: {
          type: String,

          trim: true,
        },

        publicId: {
          type: String,

          trim: true,
        },
      },

      text: {
        type: String,

        trim: true,

        maxlength: 1000,
      },

      backgroundColor: {
        type: String,

        default:
          "#18181b",
      },

      visibility: {
        type: String,

        enum: [
          "followers",
          "followers_except",
          "only_share_with",
          "only_me",
        ],

        default:
          "followers",

        index: true,
      },

      /**
       * Used when visibility === "followers_except"
       */
      excludedUsers: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "User",
        },
      ],

      /**
       * Used when visibility === "only_share_with"
       */
      allowedUsers: [
        {
          type:
            Schema.Types.ObjectId,

          ref: "User",
        },
      ],

      viewsCount: {
        type: Number,

        default: 0,

        min: 0,
      },

      commentsCount: {
        type: Number,

        default: 0,

        min: 0,
      },

      expiresAt: {
        type: Date,

        required: true,

        default: () =>
          new Date(
            Date.now() +
              24 *
                60 *
                60 *
                1000
          ),
      },
    },
    {
      timestamps: true,

      versionKey: false,
    }
  );

/**
 * Feed
 */

storySchema.index({
  author: 1,
  createdAt: -1,
});

/**
 * TTL Expiration
 *
 * MongoDB will automatically
 * remove expired stories.
 */

storySchema.index(
  {
    expiresAt: 1,
  },
  {
    expireAfterSeconds: 0,
  }
);

/**
 * Visibility
 */

storySchema.index({
  visibility: 1,
});

/**
 * Auto expire query helper
 */

storySchema.query.active =
  function () {
    return this.where({
      expiresAt: {
        $gt: new Date(),
      },
    });
  };

module.exports =
  mongoose.model(
    "Story",
    storySchema
  );
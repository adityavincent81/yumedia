const mongoose = require(
  "mongoose"
);

const postLikeSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",

        required: true,

        index: true,
      },

      post: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Post",

        required: true,

        index: true,
      },
    },
    {
      timestamps: true,
    }
  );

/**
 * Prevent duplicate likes
 *
 * One User
 * ↓
 * One Like
 * ↓
 * One Post
 */
postLikeSchema.index(
  {
    user: 1,
    post: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.model(
    "PostLike",
    postLikeSchema
  );
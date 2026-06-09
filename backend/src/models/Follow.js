const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Prevent duplicate follow records
 *
 * Example:
 * User A -> User B
 * User A -> User B ❌
 */
followSchema.index(
  {
    follower: 1,
    following: 1,
  },
  {
    unique: true,
  }
);

/**
 * Optimize following queries
 *
 * Find users that a user follows
 */
followSchema.index({
  follower: 1,
});

/**
 * Optimize followers queries
 *
 * Find users following a user
 */
followSchema.index({
  following: 1,
});

module.exports = mongoose.model("Follow", followSchema);
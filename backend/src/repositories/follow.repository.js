const Follow = require(
  "../models/Follow"
);

class FollowRepository {
  async create(data) {
    return Follow.create(
      data
    );
  }

  async findById(id) {
    return Follow.findById(
      id
    );
  }

  async findFollow(
    followerId,
    followingId
  ) {
    return Follow.findOne({
      follower:
        followerId,

      following:
        followingId,
    });
  }

  async deleteFollow(
    followerId,
    followingId
  ) {
    return Follow.findOneAndDelete(
      {
        follower:
          followerId,

        following:
          followingId,
      }
    );
  }

  async getFollowers(
    userId,
    options = {}
  ) {
    const {
      page = 1,
      limit = 20,
    } = options;

    const skip =
      (page - 1) *
      limit;

    return Follow.find({
      following:
        userId,
    })
      .populate(
        "follower",
        `
          username
          fullName
          avatar
          faculty
          major
          batchYear
        `
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
  }

  async getFollowing(
    userId,
    options = {}
  ) {
    const {
      page = 1,
      limit = 20,
    } = options;

    const skip =
      (page - 1) *
      limit;

    return Follow.find({
      follower:
        userId,
    })
      .populate(
        "following",
        `
          username
          fullName
          avatar
          faculty
          major
          batchYear
        `
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
  }

  async countFollowers(
    userId
  ) {
    return Follow.countDocuments(
      {
        following:
          userId,
      }
    );
  }

  async countFollowing(
    userId
  ) {
    return Follow.countDocuments(
      {
        follower:
          userId,
      }
    );
  }

  async isFollowing(
    followerId,
    followingId
  ) {
    const follow =
      await Follow.exists({
        follower:
          followerId,

        following:
          followingId,
      });

    return !!follow;
  }

  /**
   * Story System
   */

  async isMutualFollow(
  userId,
  targetUserId
) {
  const userFollow =
    await Follow.exists({
      follower: userId,
      following: targetUserId,
    });

  const targetFollow =
    await Follow.exists({
      follower: targetUserId,
      following: userId,
    });

  return !!(
    userFollow &&
    targetFollow
  );
}

async getMutualFollows(
  userId
) {
  const following =
    await Follow.find({
      follower: userId,
    }).select(
      "following"
    );

  const followingIds =
    following.map(
      (item) =>
        item.following.toString()
    );

  const mutual =
    await Follow.find({
      follower: {
        $in:
          followingIds,
      },

      following: userId,
    }).select(
      "follower"
    );

  return mutual.map(
    (item) =>
      item.follower.toString()
  );
}
}

module.exports =
  new FollowRepository();
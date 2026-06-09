const followRepository = require("../../repositories/follow.repository");
const userRepository = require("../../repositories/user.repository");

const AppError = require("../../utils/AppError");

class FollowService {
  async followUser(
    currentUserId,
    targetUserId
  ) {
    if (
      currentUserId.toString() ===
      targetUserId.toString()
    ) {
      throw new AppError(
        "You cannot follow yourself",
        400
      );
    }

    const targetUser =
      await userRepository.findById(
        targetUserId
      );

    if (!targetUser) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const existingFollow =
      await followRepository.findFollow(
        currentUserId,
        targetUserId
      );

    if (existingFollow) {
      throw new AppError(
        "Already following this user",
        409
      );
    }

    const follow =
      await followRepository.create({
        follower: currentUserId,
        following: targetUserId,
      });

    await Promise.all([
      userRepository.incrementFollowersCount(
        targetUserId
      ),
      userRepository.incrementFollowingCount(
        currentUserId
      ),
    ]);

    return follow;
  }

  async unfollowUser(
    currentUserId,
    targetUserId
  ) {
    const existingFollow =
      await followRepository.findFollow(
        currentUserId,
        targetUserId
      );

    if (!existingFollow) {
      throw new AppError(
        "Follow relationship not found",
        404
      );
    }

    await followRepository.deleteFollow(
      currentUserId,
      targetUserId
    );

    await Promise.all([
      userRepository.decrementFollowersCount(
        targetUserId
      ),
      userRepository.decrementFollowingCount(
        currentUserId
      ),
    ]);

    return {
      isFollowing: false,
    };
  }

  async getFollowers(
    userId,
    page = 1,
    limit = 20
  ) {
    const user =
      await userRepository.findById(
        userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return followRepository.getFollowers(
      userId,
      {
        page,
        limit,
      }
    );
  }

  async getFollowing(
    userId,
    page = 1,
    limit = 20
  ) {
    const user =
      await userRepository.findById(
        userId
      );

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return followRepository.getFollowing(
      userId,
      {
        page,
        limit,
      }
    );
  }

  async getFollowStatus(
    currentUserId,
    targetUserId
  ) {
    const targetUser =
      await userRepository.findById(
        targetUserId
      );

    if (!targetUser) {
      throw new AppError(
        "User not found",
        404
      );
    }

    const isFollowing =
      await followRepository.isFollowing(
        currentUserId,
        targetUserId
      );

    return {
      isFollowing,
      followersCount:
        targetUser.followersCount || 0,
      followingCount:
        targetUser.followingCount || 0,
    };
  }
}

module.exports =
  new FollowService();
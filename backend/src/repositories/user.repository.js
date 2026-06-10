const User = require("../models/User");

class UserRepository {
  async create(payload) {
    return User.create(payload);
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByUsername(username) {
    return User.findOne({
      username,
    });
  }

  async findByNim(nim) {
    return User.findOne({
      nim,
    });
  }

  async updateById(id, payload) {
    return User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateProfile(id, payload) {
    return User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateAvatar(
    id,
    avatar
  ) {
    return User.findByIdAndUpdate(
      id,
      {
        avatar,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateCover(
    id,
    cover
  ) {
    return User.findByIdAndUpdate(
      id,
      {
        cover,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async updateLastSeen(id) {
    return User.findByIdAndUpdate(
      id,
      {
        lastSeenAt: new Date(),
      },
      {
        new: false,
      }
    );
  }

  async incrementFollowersCount(
    userId
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          followersCount: 1,
        },
      },
      {
        new: false,
      }
    );
  }

  async decrementFollowersCount(
    userId
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          followersCount: -1,
        },
      },
      {
        new: false,
      }
    );
  }

  async incrementFollowingCount(
    userId
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          followingCount: 1,
        },
      },
      {
        new: false,
      }
    );
  }

  async decrementFollowingCount(
    userId
  ) {
    return User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          followingCount: -1,
        },
      },
      {
        new: false,
      }
    );
  }

  async incrementPostsCount(
  userId
) {
  return User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        postsCount: 1,
      },
    },
    {
      new: false,
    }
  );
}

async decrementPostsCount(
  userId
) {
  return User.findByIdAndUpdate(
    userId,
    {
      $inc: {
        postsCount: -1,
      },
    },
    {
      new: false,
    }
  );
}

  async existsByUsername(
    username
  ) {
    return User.exists({
      username,
    });
  }

  async existsByNim(nim) {
    return User.exists({
      nim,
    });
  }
}

module.exports =
  new UserRepository();
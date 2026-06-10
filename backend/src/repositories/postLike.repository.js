const PostLike = require(
  "../models/PostLike"
);

class PostLikeRepository {
  async createLike(
    userId,
    postId
  ) {
    return PostLike.create({
      user: userId,
      post: postId,
    });
  }

  async deleteLike(
    userId,
    postId
  ) {
    return PostLike.findOneAndDelete(
      {
        user: userId,
        post: postId,
      }
    );
  }

  async findLike(
    userId,
    postId
  ) {
    return PostLike.findOne({
      user: userId,
      post: postId,
    });
  }

  async countLikes(
    postId
  ) {
    return PostLike.countDocuments(
      {
        post: postId,
      }
    );
  }

  async getPostLikes(
    postId,
    options = {}
  ) {
    const {
      page = 1,
      limit = 20,
    } = options;

    const skip =
      (page - 1) * limit;

    return PostLike.find({
      post: postId,
    })
      .populate(
        "user",
        `
          username
          fullName
          avatar
          isVerified
        `
      )
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
  }

  async exists(
    userId,
    postId
  ) {
    return PostLike.exists({
      user: userId,
      post: postId,
    });
  }
}

module.exports =
  new PostLikeRepository();
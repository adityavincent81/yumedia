const Post = require("../models/Post");

class FeedRepository {
  async findFeedPosts(
    authorIds,
    options = {}
  ) {
    const {
      page = 1,
      limit = 10,
    } = options;

    const skip =
      (page - 1) * limit;

    return Post.find({
      author: {
        $in: authorIds,
      },
    })
      .populate(
        "author",
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

  async countFeedPosts(
    authorIds
  ) {
    return Post.countDocuments({
      author: {
        $in: authorIds,
      },
    });
  }
}

module.exports =
  new FeedRepository();
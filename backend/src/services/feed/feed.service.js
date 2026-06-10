const feedRepository = require(
  "../../repositories/feed.repository"
);

const followRepository = require(
  "../../repositories/follow.repository"
);

const getFeed = async (
  userId,
  page = 1,
  limit = 10
) => {
  const following =
    await followRepository.getFollowing(
      userId,
      {
        page: 1,
        limit: 1000,
      }
    );

  const followingIds =
    following.map(
      (item) =>
        item.following._id
    );

  const authorIds = [
    userId,
    ...followingIds,
  ];

  const posts =
    await feedRepository.findFeedPosts(
      authorIds,
      {
        page,
        limit,
      }
    );

  const visiblePosts =
    posts.filter((post) => {
      if (
        post.visibility ===
        "public"
      ) {
        return true;
      }

      if (
        post.visibility ===
        "followers"
      ) {
        return true;
      }

      if (
        post.visibility ===
        "private"
      ) {
        return (
          post.author._id.toString() ===
          userId
        );
      }

      return false;
    });

  const total =
    await feedRepository.countFeedPosts(
      authorIds
    );

  return {
    posts: visiblePosts,

    pagination: {
      page,

      limit,

      total,

      totalPages:
        Math.ceil(
          total / limit
        ),
    },
  };
};

module.exports = {
  getFeed,
};
const feedRepository = require(
  "../../repositories/feed.repository"
);

const followRepository = require(
  "../../repositories/follow.repository"
);

const collectionPostRepository = require(
  "../../repositories/collectionPost.repository"
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

  const enrichedPosts =
  await Promise.all(
    visiblePosts.map(
      async (post) => {
        const savesCount =
          await collectionPostRepository.countByPost(
            post._id
          );

        const isSaved =
          await collectionPostRepository.existsByOwnerAndPost(
            userId,
            post._id
          );

        return {
          ...post.toObject(),

          savesCount,

          isSaved,
        };
      }
    )
  );

const total =
  await feedRepository.countFeedPosts(
    authorIds
  );

return {
  posts: enrichedPosts,

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
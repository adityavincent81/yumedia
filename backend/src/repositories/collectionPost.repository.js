const CollectionPost = require(
  "../models/CollectionPost"
);

const Collection = require(
  "../models/Collection"
);

/**
 * CRUD
 */

const create = (data) => {
  return CollectionPost.create(
    data
  );
};

const findByCollectionAndPost = (
  collectionId,
  postId
) => {
  return CollectionPost.findOne({
    collection: collectionId,

    post: postId,
  });
};

const deleteByCollectionAndPost =
  (
    collectionId,
    postId
  ) => {
    return CollectionPost.findOneAndDelete(
      {
        collection:
          collectionId,

        post: postId,
      }
    );
  };

/**
 * Collection Posts
 */

const findPostsByCollection = (
  collectionId,
  {
    page = 1,
    limit = 20,
  } = {}
) => {
  const skip =
    (page - 1) * limit;

  return CollectionPost.find({
    collection:
      collectionId,
  })
    .populate({
      path: "post",

      populate: {
        path: "author",

        select: `
          username
          fullName
          avatar
          isVerified
        `,
      },
    })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

const countByCollection = (
  collectionId
) => {
  return CollectionPost.countDocuments(
    {
      collection:
        collectionId,
    }
  );
};

const deleteManyByCollection =
  (
    collectionId
  ) => {
    return CollectionPost.deleteMany(
      {
        collection:
          collectionId,
      }
    );
  };

/**
 * Bookmark Helpers (V2.1)
 */

const countByPost = (
  postId
) => {
  return CollectionPost.countDocuments(
    {
      post: postId,
    }
  );
};

const findByPost = (
  postId
) => {
  return CollectionPost.find({
    post: postId,
  });
};

const existsByOwnerAndPost =
  async (
    ownerId,
    postId
  ) => {
    const collections =
      await Collection.find({
        owner: ownerId,
      }).select("_id");

    const collectionIds =
      collections.map(
        (item) => item._id
      );

    if (
      collectionIds.length === 0
    ) {
      return false;
    }

    const relation =
      await CollectionPost.exists(
        {
          collection: {
            $in:
              collectionIds,
          },

          post: postId,
        }
      );

    return Boolean(
      relation
    );
  };

module.exports = {
  create,

  findByCollectionAndPost,

  deleteByCollectionAndPost,

  findPostsByCollection,

  countByCollection,

  deleteManyByCollection,

  countByPost,

  findByPost,

  existsByOwnerAndPost,
};
const collectionRepository = require(
  "../../repositories/collection.repository"
);

const collectionPostRepository = require(
  "../../repositories/collectionPost.repository"
);

const postRepository = require(
  "../../repositories/post.repository"
);

const AppError = require(
  "../../utils/AppError"
);

/**
 * Helpers
 */

const ensureCollectionExists =
  async (
    collectionId
  ) => {
    const collection =
      await collectionRepository.findById(
        collectionId
      );

    if (!collection) {
      throw new AppError(
        "Collection not found",
        404
      );
    }

    return collection;
  };

const ensureOwner = (
  collection,
  ownerId
) => {
  const collectionOwnerId =
    collection.owner?._id
      ? collection.owner._id.toString()
      : collection.owner.toString();

  if (
    collectionOwnerId !== ownerId
  ) {
    throw new AppError(
      "Forbidden",
      403
    );
  }
};

/**
 * Collection CRUD
 */

const createCollection =
  async (
    ownerId,
    payload
  ) => {
    return collectionRepository.create({
      owner: ownerId,

      ...payload,
    });
  };

const getMyCollections =
  async (
    ownerId,
    page = 1,
    limit = 20
  ) => {
    return collectionRepository.findByOwner(
      ownerId,
      {
        page,
        limit,
      }
    );
  };

const getCollectionById =
  async (
    collectionId
  ) => {
    return ensureCollectionExists(
      collectionId
    );
  };

const updateCollection =
  async (
    ownerId,
    collectionId,
    payload
  ) => {
    const collection =
      await ensureCollectionExists(
        collectionId
      );

    ensureOwner(
      collection,
      ownerId
    );

    return collectionRepository.updateById(
      collectionId,
      payload
    );
  };

const deleteCollection =
  async (
    ownerId,
    collectionId
  ) => {
    const collection =
      await ensureCollectionExists(
        collectionId
      );

    ensureOwner(
      collection,
      ownerId
    );

    await collectionPostRepository.deleteManyByCollection(
      collectionId
    );

    await collectionRepository.deleteById(
      collectionId
    );
  };

/**
 * Collection Posts
 */

const addPostToCollection =
  async (
    ownerId,
    collectionId,
    postId
  ) => {
    const collection =
      await ensureCollectionExists(
        collectionId
      );

    ensureOwner(
      collection,
      ownerId
    );

    const postExists =
      await postRepository.existsById(
        postId
      );

    if (!postExists) {
      throw new AppError(
        "Post not found",
        404
      );
    }

    const existing =
      await collectionPostRepository.findByCollectionAndPost(
        collectionId,
        postId
      );

    if (existing) {
      throw new AppError(
        "Post already exists in collection",
        400
      );
    }

    await collectionPostRepository.create(
      {
        collection:
          collectionId,

        post: postId,
      }
    );

    await collectionRepository.incrementPostsCount(
      collectionId
    );

    return {
      success: true,
    };
  };

const removePostFromCollection =
  async (
    ownerId,
    collectionId,
    postId
  ) => {
    const collection =
      await ensureCollectionExists(
        collectionId
      );

    ensureOwner(
      collection,
      ownerId
    );

    const relation =
      await collectionPostRepository.findByCollectionAndPost(
        collectionId,
        postId
      );

    if (!relation) {
      throw new AppError(
        "Post not found in collection",
        404
      );
    }

    await collectionPostRepository.deleteByCollectionAndPost(
      collectionId,
      postId
    );

    await collectionRepository.decrementPostsCount(
      collectionId
    );

    return {
      success: true,
    };
  };

const getCollectionPosts =
  async (
    collectionId,
    page = 1,
    limit = 20
  ) => {
    const collection =
      await ensureCollectionExists(
        collectionId
      );

    const collectionPosts =
      await collectionPostRepository.findPostsByCollection(
        collectionId,
        {
          page,
          limit,
        }
      );

    const posts =
      collectionPosts
        .map(
          (item) =>
            item.post
        )
        .filter(Boolean);

    return {
      collection,

      posts,
    };
  };

module.exports = {
  createCollection,

  getMyCollections,

  getCollectionById,

  updateCollection,

  deleteCollection,

  addPostToCollection,

  removePostFromCollection,

  getCollectionPosts,
};
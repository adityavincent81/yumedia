const Collection = require(
  "../models/Collection"
);

/**
 * CRUD
 */

const create = (data) => {
  return Collection.create(data);
};

const findById = (
  collectionId
) => {
  return Collection.findById(
    collectionId
  ).populate(
    "owner",
    `
      username
      fullName
      avatar
      isVerified
    `
  );
};

const findByOwner = (
  ownerId,
  {
    page = 1,
    limit = 20,
  } = {}
) => {
  const skip =
    (page - 1) * limit;

  return Collection.find({
    owner: ownerId,
  })
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);
};

const countByOwner = (
  ownerId
) => {
  return Collection.countDocuments(
    {
      owner: ownerId,
    }
  );
};

const updateById = (
  collectionId,
  data
) => {
  return Collection.findByIdAndUpdate(
    collectionId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

const deleteById = (
  collectionId
) => {
  return Collection.findByIdAndDelete(
    collectionId
  );
};

const existsById = (
  collectionId
) => {
  return Collection.exists({
    _id: collectionId,
  });
};

/**
 * Counter Helpers
 */

const incrementPostsCount = (
  collectionId
) => {
  return Collection.findByIdAndUpdate(
    collectionId,
    {
      $inc: {
        postsCount: 1,
      },
    },
    {
      new: true,
    }
  );
};

const decrementPostsCount = (
  collectionId
) => {
  return Collection.findByIdAndUpdate(
    collectionId,
    {
      $inc: {
        postsCount: -1,
      },
    },
    {
      new: true,
    }
  );
};

/**
 * Collection Cover
 */

const updateCoverImage = (
  collectionId,
  coverImage
) => {
  return Collection.findByIdAndUpdate(
    collectionId,
    {
      coverImage,
    },
    {
      new: true,
    }
  );
};

const clearCoverImage = (
  collectionId
) => {
  return Collection.findByIdAndUpdate(
    collectionId,
    {
      $unset: {
        coverImage: 1,
      },
    },
    {
      new: true,
    }
  );
};

module.exports = {
  create,

  findById,

  findByOwner,

  countByOwner,

  updateById,

  deleteById,

  existsById,

  incrementPostsCount,

  decrementPostsCount,

  updateCoverImage,

  clearCoverImage,
};
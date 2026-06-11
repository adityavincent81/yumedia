const Story = require(
  "../models/Story"
);

/**
 * CRUD
 */

const create = (data) => {
  return Story.create(data);
};

const findById = (
  storyId
) => {
  return Story.findById(
    storyId
  ).populate(
    "author",
    `
      username
      fullName
      avatar
      isVerified
    `
  );
};

const deleteById = (
  storyId
) => {
  return Story.findByIdAndDelete(
    storyId
  );
};

const existsById = (
  storyId
) => {
  return Story.exists({
    _id: storyId,
  });
};

/**
 * Active Stories
 */

const findActiveStoriesByAuthor =
  (
    authorId
  ) => {
    return Story.find({
      author: authorId,

      expiresAt: {
        $gt: new Date(),
      },
    })
      .sort({
        createdAt: 1,
      })
      .populate(
        "author",
        `
          username
          fullName
          avatar
          isVerified
        `
      );
  };

const findActiveStoriesByAuthors =
  (
    authorIds
  ) => {
    return Story.find({
      author: {
        $in: authorIds,
      },

      expiresAt: {
        $gt: new Date(),
      },
    })
      .sort({
        createdAt: 1,
      })
      .populate(
        "author",
        `
          username
          fullName
          avatar
          isVerified
        `
      );
  };

/**
 * Feed
 */

const findFeedStories = (
  authorIds
) => {
  return Story.find({
    author: {
      $in: authorIds,
    },

    expiresAt: {
      $gt: new Date(),
    },
  })
    .sort({
      createdAt: 1,
    })
    .populate(
      "author",
      `
        username
        fullName
        avatar
        isVerified
      `
    );
};

/**
 * Counters
 */

const incrementViewsCount =
  (
    storyId
  ) => {
    return Story.findByIdAndUpdate(
      storyId,
      {
        $inc: {
          viewsCount: 1,
        },
      },
      {
        new: true,
      }
    );
  };

const incrementCommentsCount =
  (
    storyId
  ) => {
    return Story.findByIdAndUpdate(
      storyId,
      {
        $inc: {
          commentsCount: 1,
        },
      },
      {
        new: true,
      }
    );
  };

const decrementCommentsCount =
  (
    storyId
  ) => {
    return Story.findByIdAndUpdate(
      storyId,
      {
        $inc: {
          commentsCount: -1,
        },
      },
      {
        new: true,
      }
    );
  };

/**
 * Analytics
 */

const countActiveStoriesByAuthor =
  (
    authorId
  ) => {
    return Story.countDocuments({
      author: authorId,

      expiresAt: {
        $gt: new Date(),
      },
    });
  };

  const updateById = (
  storyId,
  data
) => {
  return Story.findByIdAndUpdate(
    storyId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
};

module.exports = {
  create,

  findById,

  deleteById,

  existsById,

  findActiveStoriesByAuthor,

  findActiveStoriesByAuthors,

  findFeedStories,

  incrementViewsCount,

  incrementCommentsCount,

  decrementCommentsCount,

  countActiveStoriesByAuthor,

  updateById
};
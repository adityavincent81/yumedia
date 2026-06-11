const StoryComment = require(
  "../models/StoryComment"
);

/**
 * CRUD
 */

const create = (
  data
) => {
  return StoryComment.create(
    data
  );
};

const findById = (
  commentId
) => {
  return StoryComment.findById(
    commentId
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

/**
 * Story Comments
 */

const findByStory = (
  storyId,
  {
    page = 1,
    limit = 20,
  } = {}
) => {
  const skip =
    (page - 1) * limit;

  return StoryComment.find({
    story: storyId,

    parentComment:
      null,
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
};

const countByStory =
  (
    storyId
  ) => {
    return StoryComment.countDocuments(
      {
        story: storyId,

        parentComment:
          null,
      }
    );
  };

/**
 * Replies
 */

const findReplies =
  (
    parentCommentId,
    {
      page = 1,
      limit = 20,
    } = {}
  ) => {
    const skip =
      (page - 1) * limit;

    return StoryComment.find({
      parentComment:
        parentCommentId,
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
        createdAt: 1,
      })
      .skip(skip)
      .limit(limit);
  };

const countReplies =
  (
    parentCommentId
  ) => {
    return StoryComment.countDocuments(
      {
        parentComment:
          parentCommentId,
      }
    );
  };

/**
 * Soft Delete
 */

const softDelete =
  (
    commentId
  ) => {
    return StoryComment.findByIdAndUpdate(
      commentId,
      {
        isDeleted: true,

        content:
          "[deleted]",
      },
      {
        new: true,
      }
    );
  };

const deleteById = (
  commentId
) => {
  return StoryComment.findByIdAndDelete(
    commentId
  );
};

/**
 * Counters
 */

const incrementRepliesCount =
  (
    commentId
  ) => {
    return StoryComment.findByIdAndUpdate(
      commentId,
      {
        $inc: {
          repliesCount: 1,
        },
      },
      {
        new: true,
      }
    );
  };

const decrementRepliesCount =
  (
    commentId
  ) => {
    return StoryComment.findByIdAndUpdate(
      commentId,
      {
        $inc: {
          repliesCount: -1,
        },
      },
      {
        new: true,
      }
    );
  };

/**
 * Cleanup
 */

const deleteManyByStory =
  (
    storyId
  ) => {
    return StoryComment.deleteMany(
      {
        story: storyId,
      }
    );
  };

module.exports = {
  create,

  findById,

  findByStory,

  countByStory,

  findReplies,

  countReplies,

  softDelete,

  deleteById,

  incrementRepliesCount,

  decrementRepliesCount,

  deleteManyByStory,
};
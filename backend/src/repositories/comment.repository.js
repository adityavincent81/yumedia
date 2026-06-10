const Comment = require(
  "../models/Comment"
);

const create = (data) => {
  return Comment.create(data);
};

const findById = (
  commentId
) => {
  return Comment.findById(
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

const findPostComments = (
  postId,
  {
    page = 1,
    limit = 20,
  } = {}
) => {
  const skip =
    (page - 1) * limit;

  return Comment.find({
    post: postId,

    parentComment: null,

    isDeleted: false,
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

const findReplies = (
  commentId,
  {
    page = 1,
    limit = 20,
  } = {}
) => {
  const skip =
    (page - 1) * limit;

  return Comment.find({
    parentComment:
      commentId,

    isDeleted: false,
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

const countPostComments = (
  postId
) => {
  return Comment.countDocuments({
    post: postId,

    isDeleted: false,
  });
};

const countReplies = (
  commentId
) => {
  return Comment.countDocuments({
    parentComment:
      commentId,

    isDeleted: false,
  });
};

const incrementRepliesCount = (
  commentId
) => {
  return Comment.findByIdAndUpdate(
    commentId,
    {
      $inc: {
        repliesCount: 1,
      },
    }
  );
};

const decrementRepliesCount = (
  commentId
) => {
  return Comment.findByIdAndUpdate(
    commentId,
    {
      $inc: {
        repliesCount: -1,
      },
    }
  );
};

const markDeleted = (
  commentId
) => {
  return Comment.findByIdAndUpdate(
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
  return Comment.findByIdAndDelete(
    commentId
  );
};

module.exports = {
  create,

  findById,

  findPostComments,

  findReplies,

  countPostComments,

  countReplies,

  incrementRepliesCount,

  decrementRepliesCount,

  markDeleted,

  deleteById,
};
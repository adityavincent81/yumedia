const Post = require("../models/Post");

const create = (data) => {
  return Post.create(data);
};

const findById = (postId) => {
  return Post.findById(postId).populate(
    "author",
    "username fullName avatar isVerified"
  );
};

const findByAuthor = (
  authorId,
  { page = 1, limit = 10 } = {}
) => {
  const skip = (page - 1) * limit;

  return Post.find({ author: authorId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate(
      "author",
      "username fullName avatar isVerified"
    );
};

const updateById = (postId, data) => {
  return Post.findByIdAndUpdate(postId, data, {
    new: true,
    runValidators: true,
  });
};

const deleteById = (postId) => {
  return Post.findByIdAndDelete(postId);
};

const existsById = (postId) => {
  return Post.exists({ _id: postId });
};

module.exports = {
  create,
  findById,
  findByAuthor,
  updateById,
  deleteById,
  existsById,
};
const commentRepository = require(
  "../../repositories/comment.repository"
);

const postRepository = require(
  "../../repositories/post.repository"
);

const AppError = require(
  "../../utils/AppError"
);

const createComment = async ({
  userId,
  postId,
  content,
}) => {
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

  const comment =
    await commentRepository.create({
      post: postId,

      author: userId,

      content,
    });

  await postRepository.incrementCommentsCount(
    postId
  );

  return commentRepository.findById(
    comment._id
  );
};

const createReply = async ({
  userId,
  commentId,
  content,
}) => {
  const parentComment =
    await commentRepository.findById(
      commentId
    );

  if (!parentComment) {
    throw new AppError(
      "Comment not found",
      404
    );
  }

  const reply =
    await commentRepository.create({
      post:
        parentComment.post,

      author: userId,

      content,

      parentComment:
        parentComment._id,
    });

  await commentRepository.incrementRepliesCount(
    parentComment._id
  );

  await postRepository.incrementCommentsCount(
    parentComment.post
  );

  return commentRepository.findById(
    reply._id
  );
};

const getPostComments =
  async (
    postId,
    page = 1,
    limit = 20
  ) => {
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

    const comments =
      await commentRepository.findPostComments(
        postId,
        {
          page,
          limit,
        }
      );

    const total =
      await commentRepository.countPostComments(
        postId
      );

    return {
      comments,

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

const getReplies = async (
  commentId,
  page = 1,
  limit = 20
) => {
  const comment =
    await commentRepository.findById(
      commentId
    );

  if (!comment) {
    throw new AppError(
      "Comment not found",
      404
    );
  }

  const replies =
    await commentRepository.findReplies(
      commentId,
      {
        page,
        limit,
      }
    );

  const total =
    await commentRepository.countReplies(
      commentId
    );

  return {
    replies,

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

const deleteComment =
  async (
    commentId,
    userId
  ) => {
    const comment =
      await commentRepository.findById(
        commentId
      );

    if (!comment) {
      throw new AppError(
        "Comment not found",
        404
      );
    }

    if (
      comment.author._id.toString() !==
      userId
    ) {
      throw new AppError(
        "You are not authorized to delete this comment",
        403
      );
    }

    if (
      comment.repliesCount >
      0
    ) {
      await commentRepository.markDeleted(
        commentId
      );
    } else {
      await commentRepository.deleteById(
        commentId
      );
    }

    if (
      comment.parentComment
    ) {
      await commentRepository.decrementRepliesCount(
        comment.parentComment
      );
    }

    await postRepository.decrementCommentsCount(
      comment.post
    );

    return {
      success: true,
    };
  };

module.exports = {
  createComment,

  createReply,

  getPostComments,

  getReplies,

  deleteComment,
};
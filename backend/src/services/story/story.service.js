const storyRepository = require(
  "../../repositories/story.repository"
);

const storyViewRepository = require(
  "../../repositories/storyView.repository"
);

const storyCommentRepository = require(
  "../../repositories/storyComment.repository"
);

const followRepository = require(
  "../../repositories/follow.repository"
);

const cloudinaryService = require(
  "../cloudinary/cloudinary.service"
);

const AppError = require(
  "../../utils/AppError"
);

const {
  canViewStory,
} = require(
  "../../utils/storyVisibility"
);

const {
  STORY_VISIBILITY,
} = require(
  "../../constants/story.constants"
);

const ensureStoryNotExpired = (
  story
) => {
  if (
    story.expiresAt &&
    story.expiresAt <=
      new Date()
  ) {
    throw new AppError(
      "Story expired",
      410
    );
  }
};

/**
 * Story CRUD
 */

const createStory = async (
  userId,
  payload,
  file
) => {
  let media = {};
  if (
  payload.type === "image" &&
  !file
) {
  throw new AppError(
    "Image story requires media file",
    400
  );
}

if (
  payload.type === "video" &&
  !file
) {
  throw new AppError(
    "Video story requires media file",
    400
  );
}

if (
  payload.type === "text" &&
  !payload.text?.trim()
) {
  throw new AppError(
    "Text story content is required",
    400
  );
}

  if (file) {
    const uploadResult =
      await cloudinaryService.uploadMedia(
        file.buffer,
        "yumedia/stories"
      );

    media = {
      url:
        uploadResult.url,

      publicId:
        uploadResult.publicId,
    };
  }

  const story =
    await storyRepository.create(
      {
        author: userId,

        type:
          payload.type,

        media,

        text:
          payload.text,

        backgroundColor:
          payload.backgroundColor,

        visibility:
            payload.visibility ||
            STORY_VISIBILITY.FOLLOWERS,

        allowedUsers:
          payload.allowedUsers ||
          [],

        excludedUsers:
          payload.excludedUsers ||
          [],
      }
    );

  return story;
};

const updateStory =
  async (
    userId,
    storyId,
    payload
  ) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
      throw new AppError(
        "Story not found",
        404
      );
    }

    if (
      story.author._id.toString() !==
      userId
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    return storyRepository.updateById(
      storyId,
      payload
    );
  };

const deleteStory =
  async (
    userId,
    storyId
  ) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
      throw new AppError(
        "Story not found",
        404
      );
    }

    if (
      story.author._id.toString() !==
      userId
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    if (
      story.media?.publicId
    ) {
      await cloudinaryService.deleteMedia(
        story.media.publicId
      );
    }

    await Promise.all([
      storyViewRepository.deleteManyByStory(
        storyId
      ),

      storyCommentRepository.deleteManyByStory(
        storyId
      ),
    ]);

    await storyRepository.deleteById(
      storyId
    );

    return {
      success: true,
    };
  };

const getStoryById =
  async (
    storyId,
    viewerId
  ) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
  throw new AppError(
    "Story not found",
    404
  );
}

    ensureStoryNotExpired(
    story
    );

    const visible =
      await canViewStory(
        story,
        viewerId,
        followRepository
    );

    if (!visible) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    return story;
  };

/**
 * Feed
 */

const getStoryFeed =
  async (
    userId
  ) => {
    const mutualUsers =
      await followRepository.getMutualFollows(
        userId
      );

    const stories =
      await storyRepository.findFeedStories(
        [
          userId,
          ...mutualUsers,
        ]
      );

    const viewedIds =
      await storyViewRepository.findViewedStoryIdsByUser(
        userId
      );

    const visibleStories =
      [];

    for (const story of stories) {
      const visible =
        await canViewStory(
          story,
          userId,
          followRepository
        );

      if (visible) {
        visibleStories.push(
          story
        );
      }
    }

    const grouped =
      new Map();

    for (const story of visibleStories) {
      const authorId =
        story.author._id.toString();

      const viewed =
        viewedIds.includes(
          story._id.toString()
        );

      if (
        !grouped.has(
          authorId
        )
      ) {
        grouped.set(
          authorId,
          {
            author:
              story.author,

            hasUnseen:
              !viewed,

            stories: [
              story,
            ],
          }
        );
      } else {
        const item =
          grouped.get(
            authorId
          );

        item.stories.push(
          story
        );

        if (!viewed) {
          item.hasUnseen =
            true;
        }
      }
    }

    return Array.from(
      grouped.values()
    );
  };

/**
 * Views
 */

const markStoryViewed =
  async (
    storyId,
    viewerId
  ) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
      throw new AppError(
        "Story not found",
        404
      );
    }

    ensureStoryNotExpired(
        story
    );

    const visible =
      await canViewStory(
        story,
        viewerId,
        followRepository
    );

    if (!visible) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    const viewed =
      await storyViewRepository.existsViewer(
        storyId,
        viewerId
      );

    if (!viewed) {
      await storyViewRepository.create(
        {
          story:
            storyId,

          viewer:
            viewerId,
        }
      );

      await storyRepository.incrementViewsCount(
        storyId
      );
    }

    return {
      success: true,
    };
  };

const getStoryViewers =
  async (
    storyId,
    ownerId,
    page = 1,
    limit = 50
  ) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
      throw new AppError(
        "Story not found",
        404
      );
    }
    ensureStoryNotExpired(
  story
);

    if (
      story.author._id.toString() !==
      ownerId
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    return storyViewRepository.findViewersByStory(
      storyId,
      {
        page,
        limit,
      }
    );
  };

/**
 * Comments
 */

const createComment =
  async ({
    userId,
    storyId,
    content,
  }) => {
    const story =
      await storyRepository.findById(
        storyId
      );

    if (!story) {
      throw new AppError(
        "Story not found",
        404
      );
    }

    ensureStoryNotExpired(
      story
    );

    const visible =
      await canViewStory(
        story,
        userId,
        followRepository
    );

    if (!visible) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    const comment =
      await storyCommentRepository.create(
        {
          story:
            storyId,

          author:
            userId,

          content,
        }
      );

    await storyRepository.incrementCommentsCount(
      storyId
    );

    return comment;
  };

const createReply =
  async ({
    userId,
    commentId,
    content,
  }) => {
    const parent =
      await storyCommentRepository.findById(
        commentId
      );

    if (!parent) {
      throw new AppError(
        "Comment not found",
        404
      );
    }

    const story =
  await storyRepository.findById(
    parent.story
  );

if (!story) {
  throw new AppError(
    "Story not found",
    404
  );
}

ensureStoryNotExpired(
  story
);

const visible =
  await canViewStory(
    story,
    userId,
    followRepository
  );

if (!visible) {
  throw new AppError(
    "Forbidden",
    403
  );
}

    const reply =
      await storyCommentRepository.create(
        {
          story:
            parent.story,

          author:
            userId,

          parentComment:
            commentId,

          content,
        }
      );

    await storyCommentRepository.incrementRepliesCount(
      commentId
    );

    return reply;
  };

const getComments =
  async (
    storyId,
    userId,
    page = 1,
    limit = 20
  ) => {
    const story =
  await storyRepository.findById(
    storyId
  );

if (!story) {
  throw new AppError(
    "Story not found",
    404
  );
}

ensureStoryNotExpired(
  story
);

const visible =
  await canViewStory(
    story,
    userId,
    followRepository
  );

if (!visible) {
  throw new AppError(
    "Forbidden",
    403
  );
}
    return storyCommentRepository.findByStory(
      storyId,
      {
        page,
        limit,
      }
    );
  };

const getReplies =
  async (
    commentId,
    userId,
    page = 1,
    limit = 20
  ) => {
    const comment =
  await storyCommentRepository.findById(
    commentId
  );

if (!comment) {
  throw new AppError(
    "Comment not found",
    404
  );
}

const story =
  await storyRepository.findById(
    comment.story
  );

if (!story) {
  throw new AppError(
    "Story not found",
    404
  );
}

ensureStoryNotExpired(
  story
);

const visible =
  await canViewStory(
    story,
    userId,
    followRepository
  );

if (!visible) {
  throw new AppError(
    "Forbidden",
    403
  );
}
    return storyCommentRepository.findReplies(
      commentId,
      {
        page,
        limit,
      }
    );
  };

const deleteComment =
  async (
    commentId,
    userId
  ) => {
    const comment =
      await storyCommentRepository.findById(
        commentId
      );

    if (!comment) {
      throw new AppError(
        "Comment not found",
        404
      );
    }

    const story =
      await storyRepository.findById(
        comment.story
      );

    const isCommentOwner =
      comment.author._id.toString() ===
      userId;

    const isStoryOwner =
      story.author._id.toString() ===
      userId;

    if (
      !isCommentOwner &&
      !isStoryOwner
    ) {
      throw new AppError(
        "Forbidden",
        403
      );
    }

    await storyCommentRepository.softDelete(
      commentId
    );

    if (
      !comment.parentComment
    ) {
      await storyRepository.decrementCommentsCount(
        story._id
      );
    }

    return {
      success: true,
    };
  };

module.exports = {
  createStory,

  updateStory,

  deleteStory,

  getStoryById,

  getStoryFeed,

  markStoryViewed,

  getStoryViewers,

  createComment,

  createReply,

  getComments,

  getReplies,

  deleteComment,
};
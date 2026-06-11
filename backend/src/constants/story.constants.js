const STORY_TYPES = {
  IMAGE: "image",

  VIDEO: "video",

  TEXT: "text",
};

const STORY_VISIBILITY = {
  FOLLOWERS:
    "followers",

  FOLLOWERS_EXCEPT:
    "followers_except",

  ONLY_SHARE_WITH:
    "only_share_with",

  ONLY_ME:
    "only_me",
};

const STORY_LIMITS = {
  TEXT_MAX_LENGTH:
    1000,

  COMMENT_MAX_LENGTH:
    1000,

  MAX_IMAGE_SIZE:
    10 * 1024 * 1024,

  MAX_VIDEO_SIZE:
    50 * 1024 * 1024,

  STORY_DURATION_HOURS:
    24,

  VIEWERS_PAGE_LIMIT:
    50,

  COMMENTS_PAGE_LIMIT:
    20,
};

const STORY_ERRORS = {
  STORY_NOT_FOUND:
    "Story not found",

  COMMENT_NOT_FOUND:
    "Comment not found",

  FORBIDDEN:
    "Forbidden",

  STORY_EXPIRED:
    "Story expired",

  INVALID_VISIBILITY:
    "Invalid story visibility",

  ALREADY_VIEWED:
    "Story already viewed",
};

module.exports = {
  STORY_TYPES,

  STORY_VISIBILITY,

  STORY_LIMITS,

  STORY_ERRORS,
};
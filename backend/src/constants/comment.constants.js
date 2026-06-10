const COMMENT_EVENTS = {
  CREATED:
    "comment:created",

  UPDATED:
    "comment:updated",

  DELETED:
    "comment:deleted",

  REPLY_CREATED:
    "comment:reply-created",
};

const COMMENT_TYPES = {
  ROOT: "root",

  REPLY: "reply",
};

const COMMENT_LIMITS = {
  MAX_LENGTH: 1000,

  DEFAULT_PAGE: 1,

  DEFAULT_LIMIT: 20,

  MAX_LIMIT: 100,
};

module.exports = {
  COMMENT_EVENTS,

  COMMENT_TYPES,

  COMMENT_LIMITS,
};
const MESSAGE_TYPES = {
  TEXT: "text",

  IMAGE: "image",

  VIDEO: "video",

  FILE: "file",

  AUDIO: "audio",

  STORY: "story",

  POST: "post",
};

const MESSAGE_LIMITS = {
  TEXT_MAX_LENGTH:
    5000,

  FILE_NAME_MAX_LENGTH:
    255,

  MAX_IMAGE_SIZE:
    10 * 1024 * 1024,

  MAX_VIDEO_SIZE:
    100 * 1024 * 1024,

  MAX_AUDIO_SIZE:
    25 * 1024 * 1024,

  MAX_FILE_SIZE:
    50 * 1024 * 1024,

  DEFAULT_PAGE_SIZE:
    30,

  MAX_PAGE_SIZE:
    100,
};

const MESSAGE_EVENTS = {
  JOIN_CONVERSATION:
    "join_conversation",

  LEAVE_CONVERSATION:
    "leave_conversation",

  SEND_MESSAGE:
    "send_message",

  NEW_MESSAGE:
    "new_message",

  TYPING_START:
    "typing_start",

  TYPING_STOP:
    "typing_stop",

  TYPING:
    "typing",

  MARK_READ:
    "mark_read",

  MESSAGE_READ:
    "message_read",

  CONVERSATION_UPDATED:
    "conversation_updated",
};

const MESSAGE_ERRORS = {
  CONVERSATION_NOT_FOUND:
    "Conversation not found",

  MESSAGE_NOT_FOUND:
    "Message not found",

  USER_NOT_IN_CONVERSATION:
    "User is not a participant in this conversation",

  FORBIDDEN:
    "Forbidden",

  INVALID_MESSAGE_TYPE:
    "Invalid message type",

  EMPTY_MESSAGE:
    "Message content is required",
};

module.exports = {
  MESSAGE_TYPES,

  MESSAGE_LIMITS,

  MESSAGE_EVENTS,

  MESSAGE_ERRORS,
};
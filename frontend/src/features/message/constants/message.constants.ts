// src/features/message/constants/message.constants.ts

import type {
  ConversationType,
  MessageType,
} from "../types/message.types";

/**
 * Conversation
 */

export const CONVERSATION_TYPES: Record<
  string,
  ConversationType
> = {
  DIRECT:
    "direct",

  GROUP:
    "group",

  COMMUNITY:
    "community",
} as const;

/**
 * Message
 */

export const MESSAGE_TYPES: Record<
  string,
  MessageType
> = {
  TEXT:
    "text",

  IMAGE:
    "image",

  VIDEO:
    "video",

  FILE:
    "file",

  AUDIO:
    "audio",

  STORY:
    "story",

  POST:
    "post",
} as const;

/**
 * Socket Events
 */

export const MESSAGE_EVENTS =
  {
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
  } as const;

/**
 * Pagination
 */

export const MESSAGE_PAGINATION =
  {
    DEFAULT_PAGE:
      1,

    DEFAULT_LIMIT:
      30,

    MAX_LIMIT:
      100,
  } as const;

/**
 * Upload Limits
 */

export const MESSAGE_LIMITS =
  {
    TEXT_MAX_LENGTH:
      5000,

    IMAGE_MAX_SIZE:
      10 * 1024 * 1024,

    VIDEO_MAX_SIZE:
      100 * 1024 * 1024,

    AUDIO_MAX_SIZE:
      25 * 1024 * 1024,

    FILE_MAX_SIZE:
      50 * 1024 * 1024,
  } as const;

/**
 * Future Features
 */

export const MESSAGE_FEATURES =
  {
    /**
     * V1
     */

    CHAT:
      true,

    IMAGE:
      true,

    VIDEO:
      true,

    FILE:
      true,

    STORY_SHARE:
      true,

    POST_SHARE:
      true,

    TYPING:
      true,

    READ_RECEIPTS:
      true,

    /**
     * V2
     */

    REPLY:
      false,

    FORWARD:
      false,

    VOICE_MESSAGE:
      false,

    DELETE_FOR_EVERYONE:
      false,

    SEARCH:
      false,

    /**
     * V3
     */

    GROUP_CHAT:
      false,

    COMMUNITY:
      false,

    REACTIONS:
      false,

    POLLS:
      false,

    PINNED_MESSAGES:
      false,

    VOICE_CALL:
      false,

    VIDEO_CALL:
      false,
  } as const;

/**
 * UI
 */

export const MESSAGE_UI =
  {
    SIDEBAR_WIDTH:
      320,

    INFO_PANEL_WIDTH:
      320,

    MESSAGE_MAX_WIDTH:
      420,
  } as const;

/**
 * Empty States
 */

export const MESSAGE_EMPTY =
  {
    NO_CONVERSATIONS:
      "No conversations yet",

    NO_MESSAGES:
      "No messages yet",

    START_CHAT:
      "Start a conversation",
  } as const;
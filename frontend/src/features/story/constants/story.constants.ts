// src/features/story/constants/story.constants.ts

import {
  StoryType,
  StoryVisibility,
} from "../types/story.types";

/**
 * Story Types
 */

export const STORY_TYPES: Record<
  string,
  StoryType
> = {
  IMAGE: "image",

  VIDEO: "video",

  TEXT: "text",
};

/**
 * Story Visibility
 */

export const STORY_VISIBILITY: Record<
  string,
  StoryVisibility
> = {
  FOLLOWERS: "followers",

  FOLLOWERS_EXCEPT:
    "followers_except",

  ONLY_SHARE_WITH:
    "only_share_with",

  ONLY_ME: "only_me",
};

/**
 * Viewer Timing
 */

export const STORY_DURATION = {
  IMAGE: 5000,

  TEXT: 5000,

  VIDEO: 0,
} as const;

/**
 * Pagination
 */

export const STORY_PAGE_SIZE =
  20;

export const STORY_VIEWERS_PAGE_SIZE =
  50;

/**
 * Query Keys
 */

export const STORY_QUERY_KEYS =
  {
    FEED: [
      "story-feed",
    ] as const,

    STORY: (
      storyId: string
    ) =>
      [
        "story",
        storyId,
      ] as const,

    VIEWERS: (
      storyId: string
    ) =>
      [
        "story-viewers",
        storyId,
      ] as const,

    COMMENTS: (
      storyId: string
    ) =>
      [
        "story-comments",
        storyId,
      ] as const,

    REPLIES: (
      commentId: string
    ) =>
      [
        "story-replies",
        commentId,
      ] as const,
  };

/**
 * Create Story
 */

export const STORY_TEXT_LIMIT =
  1000;

/**
 * Visibility Options
 */

export const STORY_VISIBILITY_OPTIONS =
  [
    {
      value:
        STORY_VISIBILITY.FOLLOWERS,

      label:
        "Followers",
    },

    {
      value:
        STORY_VISIBILITY.FOLLOWERS_EXCEPT,

      label:
        "Followers Except",
    },

    {
      value:
        STORY_VISIBILITY.ONLY_SHARE_WITH,

      label:
        "Only Share With",
    },

    {
      value:
        STORY_VISIBILITY.ONLY_ME,

      label:
        "Only Me",
    },
  ] as const;

/**
 * Viewer Keyboard
 */

export const STORY_KEYS =
  {
    NEXT:
      "ArrowRight",

    PREVIOUS:
      "ArrowLeft",

    CLOSE:
      "Escape",
  } as const;

/**
 * Upload
 */

export const STORY_ACCEPTED_IMAGES =
  [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

export const STORY_ACCEPTED_VIDEOS =
  [
    "video/mp4",
    "video/webm",
    "video/quicktime",
  ];

export const STORY_MAX_FILE_SIZE =
  100 *
  1024 *
  1024;

/**
 * UI
 */

export const STORY_RING_SIZE =
  72;

export const STORY_AVATAR_SIZE =
  64;
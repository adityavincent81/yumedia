import type { Media } from "@/types/media.types";

export type StoryType =
  | "image"
  | "video"
  | "text";

export type StoryVisibility =
  | "followers"
  | "followers_except"
  | "only_share_with"
  | "only_me";

export interface StoryMedia {
  url: string;

  publicId: string;
}

export interface StoryAuthor {
  _id: string;

  username: string;

  fullName: string;

  avatar: Media | null;
}

export interface Story {
  _id: string;

  author: StoryAuthor;

  type: StoryType;

  media?: StoryMedia;

  text?: string;

  backgroundColor?: string;

  visibility: StoryVisibility;

  allowedUsers?: string[];

  excludedUsers?: string[];

  viewsCount: number;

  commentsCount: number;

  expiresAt: string;

  createdAt: string;

  updatedAt: string;
}

export interface StoryGroup {
  author: StoryAuthor;

  hasUnseen: boolean;

  stories: Story[];
}

export interface StoryFeedResponse {
  success: boolean;

  message: string;

  data: StoryGroup[];
}

export interface StoryResponse {
  success: boolean;

  message: string;

  data: Story;
}

export interface CreateStoryPayload {
  type: StoryType;

  text?: string;

  backgroundColor?: string;

  visibility?: StoryVisibility;

  allowedUsers?: string[];

  excludedUsers?: string[];

  media?: File;
}

export interface UpdateStoryPayload {
  text?: string;

  backgroundColor?: string;

  visibility?: StoryVisibility;

  allowedUsers?: string[];

  excludedUsers?: string[];

  media?: File;
}

export interface StoryViewer {
  _id: string;

  username: string;

  fullName: string;

  avatar: Media | null;
}

export interface StoryViewersResponse {
  success: boolean;

  message: string;

  data: {
    viewers: StoryViewer[];

    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface StoryComment {
  _id: string;

  story: string;

  author: StoryAuthor;

  content: string;

  parentComment?: string | null;

  repliesCount: number;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface StoryReply
  extends StoryComment {}

export interface CreateStoryCommentPayload {
  content: string;
}

export interface CreateStoryReplyPayload {
  content: string;
}

export interface StoryCommentsResponse {
  success: boolean;

  message: string;

  data: {
    comments: StoryComment[];

    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface StoryRepliesResponse {
  success: boolean;

  message: string;

  data: {
    replies: StoryReply[];

    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface StoryActionResponse {
  success: boolean;

  message: string;

  data: {
    success: boolean;
  };
}

export interface StoryQueryParams {
  page?: number;

  limit?: number;
}

export interface StoryStoreState {
  feed: StoryGroup[];

  selectedStory: Story | null;

  selectedAuthorId: string | null;

  comments: Record<
    string,
    StoryComment[]
  >;

  replies: Record<
    string,
    StoryReply[]
  >;

  viewers: Record<
    string,
    StoryViewer[]
  >;

  isViewerOpen: boolean;

  isCreateStoryOpen: boolean;

  loading: boolean;
}
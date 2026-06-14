import type { Media } from "@/types/media.types";

import type {
  Post,
} from "@/features/post/types/post.types";

export interface CommentAuthor {
  _id: string;

  username: string;

  fullName: string;

  avatar: Media | null;

  isVerified?: boolean;
}

export interface Comment {
  _id: string;

  post: string;

  author: CommentAuthor;

  content: string;

  parentComment: string | null;

  repliesCount: number;

  isEdited: boolean;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CommentPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface PostCommentsResponse {
  comments: Comment[];

  pagination: CommentPagination;
}

export interface RepliesResponse {
  replies: Comment[];

  pagination: CommentPagination;
}

export interface CreateCommentPayload {
  postId: string;

  content: string;
}

export interface CreateReplyPayload {
  commentId: string;

  content: string;
}

export interface CommentStoreState {
  commentsByPost: Record<
    string,
    Comment[]
  >;

  repliesByComment: Record<
    string,
    Comment[]
  >;

  selectedPost:
    | Post
    | null;

  isPostDetailOpen: boolean;

  loading: boolean;
}
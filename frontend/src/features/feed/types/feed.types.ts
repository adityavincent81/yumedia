import type {
  Post,
} from "@/features/post/types/post.types";

export interface FeedPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface FeedResponse {
  posts: Post[];

  pagination: FeedPagination;
}

export interface FeedQuery {
  page?: number;

  limit?: number;
}

export interface FeedState {
  posts: Post[];

  pagination: FeedPagination | null;

  isLoading: boolean;

  error: string | null;
}
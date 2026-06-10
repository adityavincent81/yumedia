import type {
  User,
} from "@/features/auth/types/auth.types";

export interface LikeStatus {
  liked: boolean;
}

export interface ToggleLikeResponse {
  liked: boolean;

  likesCount: number;
}

export interface LikeUser {
  _id: string;

  username: string;

  fullName: string;

  avatar?: {
    url?: string;
  } | null;

  isVerified?: boolean;
}

export interface PostLikesPagination {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface PostLikesResponse {
  likes: LikeUser[];

  pagination: PostLikesPagination;
}

export interface LikeStoreState {
  likedPosts: Record<
    string,
    boolean
  >;

  loadingPosts: Record<
    string,
    boolean
  >;
}

export interface ToggleLikePayload {
  postId: string;
}
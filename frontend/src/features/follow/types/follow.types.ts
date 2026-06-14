import type { Media } from "@/types/media.types";

export interface FollowUser {
  _id: string;

  username: string;

  fullName: string;

  avatar: Media | null;

  faculty?: string | null;

  major?: string | null;

  batchYear?: number | null;

  isVerified?: boolean;
}

export interface FollowRelation {
  _id: string;

  follower: FollowUser;

  following: FollowUser;

  createdAt: string;

  updatedAt: string;
}

export interface FollowStatus {
  isFollowing: boolean;

  followersCount: number;

  followingCount: number;
}

export interface FollowersResponse {
  success: boolean;

  message: string;

  data: FollowRelation[];
}

export interface FollowingResponse {
  success: boolean;

  message: string;

  data: FollowRelation[];
}

export interface FollowStatusResponse {
  success: boolean;

  message: string;

  data: FollowStatus;
}

export interface FollowActionResponse {
  success: boolean;

  message: string;

  data: {
    isFollowing: boolean;
  };
}

export interface FollowListParams {
  page?: number;

  limit?: number;
}
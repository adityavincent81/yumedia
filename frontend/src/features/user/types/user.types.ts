import type { Media } from "@/types/media.types";

export interface User {
  _id: string;

  fullName: string;

  nim: string;

  username: string;

  avatar: Media | null;

  cover: Media | null;

  bio: string;

  faculty: string | null;

  major: string | null;

  batchYear: number | null;

  website: string | null;

  location: string | null;

  followersCount: number;

  followingCount: number;

  postsCount: number;

  isVerified: boolean;

  isActive: boolean;

  lastSeenAt: string | null;

  createdAt: string;

  updatedAt: string;
}

export interface UpdateProfilePayload {
  fullName?: string;

  bio?: string;

  faculty?: string | null;

  major?: string | null;

  batchYear?: number | null;

  website?: string | null;

  location?: string | null;
}

export interface ProfileResponse {
  success: boolean;

  data: User;
}

export interface UpdateProfileResponse {
  success: boolean;

  message: string;

  data: User;
}
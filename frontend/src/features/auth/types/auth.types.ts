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

  followersCount: number;
  followingCount: number;
  postsCount: number;

  isVerified: boolean;
  isPrivate: boolean;

  website: string | null;
  location: string | null;

  lastSeenAt: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  fullName: string;
  nim: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  nim: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
  };
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface AuthStore {
  user: User | null;

  isAuthenticated: boolean;

  isInitialized: boolean;

  setInitialized: (
    value: boolean
  ) => void;

  setUser: (
    user: User | null
  ) => void;

  clearUser: () => void;
}
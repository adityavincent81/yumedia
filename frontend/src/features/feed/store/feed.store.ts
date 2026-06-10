import { create } from "zustand";

import type {
  FeedPagination,
} from "../types/feed.types";

import type {
  Post,
} from "@/features/post/types/post.types";

interface FeedStore {
  posts: Post[];

  pagination: FeedPagination | null;

  isLoading: boolean;

  error: string | null;

  setPosts: (
    posts: Post[]
  ) => void;

  appendPosts: (
    posts: Post[]
  ) => void;

  setPagination: (
    pagination: FeedPagination
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  setError: (
    error: string | null
  ) => void;

  clearFeed: () => void;
}

export const useFeedStore =
  create<FeedStore>(
    (set) => ({
      posts: [],

      pagination: null,

      isLoading: false,

      error: null,

      setPosts: (
        posts
      ) =>
        set({
          posts,
        }),

      appendPosts: (
        posts
      ) =>
        set((state) => ({
          posts: [
            ...state.posts,
            ...posts,
          ],
        })),

      setPagination: (
        pagination
      ) =>
        set({
          pagination,
        }),

      setLoading: (
        isLoading
      ) =>
        set({
          isLoading,
        }),

      setError: (
        error
      ) =>
        set({
          error,
        }),

      clearFeed: () =>
        set({
          posts: [],

          pagination: null,

          isLoading: false,

          error: null,
        }),
    })
  );
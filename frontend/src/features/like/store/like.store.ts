"use client";

import { create } from "zustand";

import type {
  LikeStoreState,
} from "../types/like.types";

interface LikeStore
  extends LikeStoreState {
  setLiked: (
    postId: string,
    liked: boolean
  ) => void;

  setLoading: (
    postId: string,
    loading: boolean
  ) => void;

  clearLikes: () => void;
}

export const useLikeStore =
  create<LikeStore>(
    (set) => ({
      likedPosts: {},

      loadingPosts: {},

      setLiked: (
        postId,
        liked
      ) =>
        set((state) => ({
          likedPosts: {
            ...state.likedPosts,

            [postId]: liked,
          },
        })),

      setLoading: (
        postId,
        loading
      ) =>
        set((state) => ({
          loadingPosts: {
            ...state.loadingPosts,

            [postId]: loading,
          },
        })),

      clearLikes: () =>
        set({
          likedPosts: {},

          loadingPosts: {},
        }),
    })
  );
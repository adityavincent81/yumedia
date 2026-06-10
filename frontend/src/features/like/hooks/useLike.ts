"use client";

import { useCallback } from "react";

import { likeService } from "../service/like.service";

import { useLikeStore } from "../store/like.store";

export const useLike = () => {
  const {
    likedPosts,

    loadingPosts,

    setLiked,

    setLoading,
  } = useLikeStore();

  const fetchLikeStatus =
    useCallback(
      async (
        postId: string
      ) => {
        try {
          setLoading(
            postId,
            true
          );

          const data =
            await likeService.getLikeStatus(
              postId
            );

          setLiked(
            postId,
            data.liked
          );

          return data;
        } catch (error) {
          console.error(
            error
          );

          throw error;
        } finally {
          setLoading(
            postId,
            false
          );
        }
      },
      [
        setLiked,
        setLoading,
      ]
    );

  const toggleLike =
    useCallback(
      async (
        postId: string
      ) => {
        const previous =
          likedPosts[
            postId
          ] ?? false;

        try {
          setLoading(
            postId,
            true
          );

          /**
           * Optimistic Update
           */
          setLiked(
            postId,
            !previous
          );

          const result =
            await likeService.toggleLike(
              postId
            );

          setLiked(
            postId,
            result.liked
          );

          return result;
        } catch (error) {
          /**
           * Rollback
           */
          setLiked(
            postId,
            previous
          );

          console.error(
            error
          );

          throw error;
        } finally {
          setLoading(
            postId,
            false
          );
        }
      },
      [
        likedPosts,
        setLiked,
        setLoading,
      ]
    );

  return {
    likedPosts,

    loadingPosts,

    fetchLikeStatus,

    toggleLike,
  };
};
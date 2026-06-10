"use client";

import { useCallback } from "react";

import { feedService } from "../service/feed.service";

import { useFeedStore } from "../store/feed.store";

export const useFeed = () => {
  const {
    posts,
    pagination,
    isLoading,
    error,

    setPosts,
    appendPosts,
    setPagination,
    setLoading,
    setError,
    clearFeed,
  } = useFeedStore();

  const fetchFeed =
    useCallback(
      async (
        page = 1,
        limit = 10
      ) => {
        try {
          setLoading(true);

          setError(null);

          const data =
            await feedService.getFeed(
              {
                page,
                limit,
              }
            );

          if (page === 1) {
            setPosts(
              data.posts
            );
          } else {
            appendPosts(
              data.posts
            );
          }

          setPagination(
            data.pagination
          );

          return data;
        } catch (err: any) {
          const message =
            err?.response?.data
              ?.message ||
            err?.message ||
            "Failed to load feed";

          setError(message);

          throw err;
        } finally {
          setLoading(false);
        }
      },
      [
        appendPosts,
        setError,
        setLoading,
        setPagination,
        setPosts,
      ]
    );

  const refreshFeed =
    useCallback(async () => {
      clearFeed();

      return fetchFeed(
        1,
        pagination?.limit ||
          10
      );
    }, [
      clearFeed,
      fetchFeed,
      pagination,
    ]);

  const loadMore =
    useCallback(async () => {
      if (!pagination) {
        return;
      }

      const nextPage =
        pagination.page + 1;

      if (
        nextPage >
        pagination.totalPages
      ) {
        return;
      }

      return fetchFeed(
        nextPage,
        pagination.limit
      );
    }, [
      fetchFeed,
      pagination,
    ]);

  const hasMore =
    pagination
      ? pagination.page <
        pagination.totalPages
      : false;

  return {
    posts,

    pagination,

    isLoading,

    error,

    hasMore,

    fetchFeed,

    refreshFeed,

    loadMore,
  };
};
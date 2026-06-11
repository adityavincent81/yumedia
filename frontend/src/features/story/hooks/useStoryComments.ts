// src/features/story/hooks/useStoryComments.ts

import {
  useEffect,
  useMemo,
} from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { storyService } from "../services/story.service";
import { STORY_QUERY_KEYS } from "../constants/story.constants";
import { useStoryStore } from "../store/story.store";

import type {
  CreateStoryCommentPayload,
} from "../types/story.types";

interface UseStoryCommentsOptions {
  storyId: string;

  enabled?: boolean;
}

export function useStoryComments({
  storyId,
  enabled = true,
}: UseStoryCommentsOptions) {
  const queryClient =
    useQueryClient();

  /**
   * Store
   */

  const storeComments =
    useStoryStore(
      (state) =>
        state.comments[
          storyId
        ]
    );

  const comments =
    useMemo(
      () =>
        storeComments ??
        [],
      [storeComments]
    );

  const setComments =
    useStoryStore(
      (state) =>
        state.setComments
    );

  const addComment =
    useStoryStore(
      (state) =>
        state.addComment
    );

  const removeComment =
    useStoryStore(
      (state) =>
        state.removeComment
    );

  /**
   * Query
   */

  const query =
    useQuery({
      queryKey:
        STORY_QUERY_KEYS.COMMENTS(
          storyId
        ),

      queryFn: () =>
        storyService.getComments(
          storyId
        ),

      enabled:
        enabled &&
        !!storyId,

      staleTime:
        1000 * 30,
    });

  /**
   * Sync Query -> Store
   */

  useEffect(() => {
    const fetchedComments =
      query.data?.data
        ?.comments;

    if (
      !fetchedComments
    ) {
      return;
    }

    setComments(
      storyId,
      fetchedComments
    );
  }, [
    storyId,
    query.data,
    setComments,
  ]);

  /**
   * Create Comment
   */

  const createMutation =
    useMutation({
      mutationFn: (
        payload: CreateStoryCommentPayload
      ) =>
        storyService.createComment(
          storyId,
          payload
        ),

      onSuccess:
        async (
          response
        ) => {
          addComment(
            storyId,
            response.data
          );

          await queryClient.invalidateQueries(
            {
              queryKey:
                STORY_QUERY_KEYS.COMMENTS(
                  storyId
                ),
            }
          );
        },
    });

  /**
   * Delete Comment
   */

  const deleteMutation =
    useMutation({
      mutationFn: (
        commentId: string
      ) =>
        storyService.deleteComment(
          commentId
        ),

      onSuccess:
        async (
          _,
          commentId
        ) => {
          removeComment(
            storyId,
            commentId
          );

          await queryClient.invalidateQueries(
            {
              queryKey:
                STORY_QUERY_KEYS.COMMENTS(
                  storyId
                ),
            }
          );
        },
    });

  return {
    comments,

    isLoading:
      query.isLoading,

    isFetching:
      query.isFetching,

    error:
      query.error,

    refreshComments:
      query.refetch,

    createComment:
      createMutation.mutateAsync,

    isCreating:
      createMutation.isPending,

    deleteComment:
      deleteMutation.mutateAsync,

    isDeleting:
      deleteMutation.isPending,
  };
}
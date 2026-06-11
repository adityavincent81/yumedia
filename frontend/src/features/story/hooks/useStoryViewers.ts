// src/features/story/hooks/useStoryViewers.ts

import {
  useEffect,
  useMemo,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import { storyService } from "../services/story.service";
import { STORY_QUERY_KEYS } from "../constants/story.constants";
import { useStoryStore } from "../store/story.store";

interface UseStoryViewersOptions {
  storyId: string;

  enabled?: boolean;
}

export function useStoryViewers({
  storyId,
  enabled = true,
}: UseStoryViewersOptions) {
  /**
   * Store
   */

  const storeViewers =
    useStoryStore(
      (state) =>
        state.viewers[
          storyId
        ]
    );

  const viewers =
    useMemo(
      () =>
        storeViewers ??
        [],
      [storeViewers]
    );

  const setViewers =
    useStoryStore(
      (state) =>
        state.setViewers
    );

  /**
   * Query
   */

  const query =
    useQuery({
      queryKey:
        STORY_QUERY_KEYS.VIEWERS(
          storyId
        ),

      queryFn: () =>
        storyService.getViewers(
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
    const fetchedViewers =
      query.data?.data
        ?.viewers;

    if (
      !fetchedViewers
    ) {
      return;
    }

    setViewers(
      storyId,
      fetchedViewers
    );
  }, [
    storyId,
    query.data,
    setViewers,
  ]);

  return {
    viewers,

    total:
      query.data?.data
        ?.total ??
      0,

    page:
      query.data?.data
        ?.page ??
      1,

    limit:
      query.data?.data
        ?.limit ??
      50,

    totalPages:
      query.data?.data
        ?.totalPages ??
      1,

    isLoading:
      query.isLoading,

    isFetching:
      query.isFetching,

    error:
      query.error,

    refreshViewers:
      query.refetch,
  };
}
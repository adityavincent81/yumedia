// src/features/story/hooks/useStoryFeed.ts

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { storyService } from "../services/story.service";
import { STORY_QUERY_KEYS } from "../constants/story.constants";
import { useStoryStore } from "../store/story.store";

export function useStoryFeed() {
  const feed = useStoryStore(
    (state) => state.feed
  );

  const setFeed =
    useStoryStore(
      (state) => state.setFeed
    );

  const {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery({
    queryKey:
      STORY_QUERY_KEYS.FEED,

    queryFn: () =>
      storyService.getFeed(),

    staleTime:
      1000 * 60,

    gcTime:
      1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.data) {
      setFeed(
        data.data
      );
    }
  }, [
    data,
    setFeed,
  ]);

  return {
    feed,

    isLoading,

    isFetching,

    error,

    refreshStories:
      refetch,
  };
}
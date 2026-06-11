// src/features/story/hooks/useCreateStory.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { storyService } from "../services/story.service";
import { STORY_QUERY_KEYS } from "../constants/story.constants";
import { useStoryStore } from "../store/story.store";

import type {
  CreateStoryPayload,
} from "../types/story.types";

export function useCreateStory() {
  const queryClient =
    useQueryClient();

  const closeCreateStory =
    useStoryStore(
      (state) =>
        state.closeCreateStory
    );

  const mutation =
    useMutation({
      mutationFn: (
        payload: CreateStoryPayload
      ) =>
        storyService.createStory(
          payload
        ),

      onSuccess:
        async () => {
          await queryClient.invalidateQueries(
            {
              queryKey:
                STORY_QUERY_KEYS.FEED,
            }
          );

          closeCreateStory();
        },
    });

  return {
    createStory:
      mutation.mutateAsync,

    isPending:
      mutation.isPending,

    isSuccess:
      mutation.isSuccess,

    isError:
      mutation.isError,

    error:
      mutation.error,

    reset:
      mutation.reset,
  };
}
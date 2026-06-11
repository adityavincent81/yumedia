// src/features/story/hooks/useStoryView.ts

import { useCallback } from "react";

import { storyService } from "../services/story.service";
import { useStoryStore } from "../store/story.store";

export function useStoryView() {
  const feed = useStoryStore(
    (state) => state.feed
  );

  const selectedStory =
    useStoryStore(
      (state) =>
        state.selectedStory
    );

  const selectedAuthorId =
    useStoryStore(
      (state) =>
        state.selectedAuthorId
    );

  const openViewer =
    useStoryStore(
      (state) =>
        state.openViewer
    );

  const closeViewer =
    useStoryStore(
      (state) =>
        state.closeViewer
    );

  const setSelectedStory =
    useStoryStore(
      (state) =>
        state.setSelectedStory
    );

  /**
   * Open Story
   */

  const openStory =
    useCallback(
      async (
        storyId: string,
        authorId: string
      ) => {
        const group =
          feed.find(
            (item) =>
              item.author
                ._id ===
              authorId
          );

        if (!group) {
          return;
        }

        const story =
          group.stories.find(
            (item) =>
              item._id ===
              storyId
          );

        if (!story) {
          return;
        }

        openViewer(
          story,
          authorId
        );

        try {
          await storyService.markViewed(
            storyId
          );
        } catch (
          error
        ) {
          console.error(
            "Failed to mark story viewed",
            error
          );
        }
      },
      [
        feed,
        openViewer,
      ]
    );

  /**
   * Close Story
   */

  const closeStory =
    useCallback(() => {
      closeViewer();
    }, [
      closeViewer,
    ]);

  /**
   * Next Story
   */

  const nextStory =
    useCallback(
      async () => {
        if (
          !selectedStory ||
          !selectedAuthorId
        ) {
          return;
        }

        const group =
          feed.find(
            (item) =>
              item.author
                ._id ===
              selectedAuthorId
          );

        if (!group) {
          return;
        }

        const currentIndex =
          group.stories.findIndex(
            (
              story
            ) =>
              story._id ===
              selectedStory._id
          );

        const next =
          group.stories[
            currentIndex +
              1
          ];

        if (!next) {
          closeViewer();
          return;
        }

        setSelectedStory(
          next
        );

        try {
          await storyService.markViewed(
            next._id
          );
        } catch (
          error
        ) {
          console.error(
            "Failed to mark story viewed",
            error
          );
        }
      },
      [
        feed,
        selectedStory,
        selectedAuthorId,
        closeViewer,
        setSelectedStory,
      ]
    );

  /**
   * Previous Story
   */

  const previousStory =
    useCallback(
      () => {
        if (
          !selectedStory ||
          !selectedAuthorId
        ) {
          return;
        }

        const group =
          feed.find(
            (item) =>
              item.author
                ._id ===
              selectedAuthorId
          );

        if (!group) {
          return;
        }

        const currentIndex =
          group.stories.findIndex(
            (
              story
            ) =>
              story._id ===
              selectedStory._id
          );

        const previous =
          group.stories[
            currentIndex -
              1
          ];

        if (!previous) {
          return;
        }

        setSelectedStory(
          previous
        );
      },
      [
        feed,
        selectedStory,
        selectedAuthorId,
        setSelectedStory,
      ]
    );

  const currentStoryIndex =
    selectedStory &&
    selectedAuthorId
      ? (
          feed.find(
            (group) =>
              group.author
                ._id ===
              selectedAuthorId
          )?.stories || []
        ).findIndex(
          (story) =>
            story._id ===
            selectedStory._id
        )
      : -1;

  const currentAuthorStories =
    selectedAuthorId
      ? feed.find(
          (group) =>
            group.author
              ._id ===
            selectedAuthorId
        )?.stories || []
      : [];

  return {
    feed,

    selectedStory,

    selectedAuthorId,

    currentStoryIndex,

    currentAuthorStories,

    openStory,

    closeStory,

    nextStory,

    previousStory,
  };
}
// src/components/story/StoryViewer.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import StoryProgressBar from "./StoryProgressBar";
import StoryHeader from "./StoryHeader";
import StoryContent from "./StoryContent";
import StoryNavigation from "./StoryNavigation";
import StoryCommentDrawer from "./StoryCommentDrawer";
import StoryViewersModal from "./StoryViewersModal";
import StoryBottomBar from "./StoryBottomBar";
import StoryMoreActions from "./StoryMoreAction";
import StoryCommentOverlay from "./StoryCommentOverlay";

import {
  STORY_DURATION,
} from "@/features/story/constants/story.constants";

import { useStoryView } from "@/features/story/hooks/useStoryView";
import { useStoryStore } from "@/features/story/store/story.store";
import {useStoryComments,} from "@/features/story/hooks/useStoryComments";

export default function StoryViewer() {
  const isViewerOpen =
    useStoryStore(
      (state) =>
        state.isViewerOpen
    );

  const {
    selectedStory,
    currentStoryIndex,
    currentAuthorStories,
    nextStory,
    previousStory,
    closeStory,
  } = useStoryView();

  const {
  comments,
  createComment,
} = useStoryComments({
  storyId:
    selectedStory?._id || "",
  enabled:
    !!selectedStory,
});

  const [
    progress,
    setProgress,
  ] = useState(0);

  const [
    isCommentsOpen,
    setIsCommentsOpen,
  ] = useState(false);

  const [
    isViewersOpen,
    setIsViewersOpen,
  ] = useState(false);

  const [
    isPaused,
    setIsPaused,
  ] = useState(false);

  const [
    isMuted,
    setIsMuted,
  ] = useState(true);

  const [
  isMoreActionsOpen,
  setIsMoreActionsOpen,
] = useState(false);

  /**
   * Reset overlays
   */

  useEffect(() => {
  if (!isViewerOpen) {
    setIsCommentsOpen(
      false
    );

    setIsViewersOpen(
      false
    );

    setIsMoreActionsOpen(
      false
    );

    setIsPaused(
      false
    );
  }
}, [
  isViewerOpen,
]);

  /**
   * Reset story state
   */

  useEffect(() => {
  setIsCommentsOpen(
    false
  );

  setIsViewersOpen(
    false
  );

  setIsMoreActionsOpen(
    false
  );

  setIsPaused(
    false
  );
}, [
  selectedStory?._id,
]);

  /**
   * Story progress
   */

  useEffect(() => {
    if (
      !isViewerOpen ||
      !selectedStory
    ) {
      setProgress(0);
      return;
    }

    if (
      selectedStory.type ===
      "video"
    ) {
      setProgress(0);
      return;
    }

    setProgress(0);

    const duration =
      selectedStory.type ===
      "image"
        ? STORY_DURATION.IMAGE
        : STORY_DURATION.TEXT;

    const startedAt =
      Date.now();

    let pausedTime =
      0;

    let pauseStarted =
      0;

    let completed =
      false;

    const interval =
      window.setInterval(
        () => {
          if (
            isPaused
          ) {
            if (
              !pauseStarted
            ) {
              pauseStarted =
                Date.now();
            }

            return;
          }

          if (
            pauseStarted
          ) {
            pausedTime +=
              Date.now() -
              pauseStarted;

            pauseStarted =
              0;
          }

          const elapsed =
            Date.now() -
            startedAt -
            pausedTime;

          const percent =
            Math.min(
              (elapsed /
                duration) *
                100,
              100
            );

          setProgress(
            percent
          );

          if (
            percent >=
              100 &&
            !completed
          ) {
            completed =
              true;

            window.clearInterval(
              interval
            );

            void nextStory();
          }
        },
        50
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [
    isViewerOpen,
    selectedStory,
    nextStory,
    isPaused,
  ]);

  if (
    !isViewerOpen ||
    !selectedStory
  ) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black">
      <div className="relative flex h-full w-full flex-col overflow-hidden bg-black md:max-w-md">
        {/* Navigation */}

        <StoryNavigation
          onNext={
            nextStory
          }
          onPrevious={
            previousStory
          }
          onClose={
            closeStory
          }
        />

        {/* Top Gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            top-0
            z-10
            h-40
            bg-gradient-to-b
            from-black/80
            via-black/30
            to-transparent
          "
        />

        {/* Bottom Gradient */}

        <div
          className="
            pointer-events-none
            absolute
            inset-x-0
            bottom-0
            z-10
            h-48
            bg-gradient-to-t
            from-black/90
            via-black/40
            to-transparent
          "
        />

        {/* Header */}

        <div className="absolute left-0 right-0 top-0 z-20 flex flex-col gap-3 p-4">
          <StoryProgressBar
            totalStories={
              currentAuthorStories.length
            }
            currentIndex={Math.max(
              currentStoryIndex,
              0
            )}
            progress={
              progress
            }
          />

          <StoryHeader
  story={selectedStory}
  isPaused={isPaused}
  isMuted={isMuted}
  onTogglePause={() =>
    setIsPaused(
      (prev) => !prev
    )
  }
  onToggleMute={() =>
    setIsMuted(
      (prev) => !prev
    )
  }
  onMoreActions={() =>
    setIsMoreActionsOpen(
      true
    )
  }
  onOpenViewers={() =>
    setIsViewersOpen(
      true
    )
  }
/>
        </div>

        {/* Story Content */}

        <div className="h-full w-full">
          <StoryContent
            story={
              selectedStory
            }
            isPaused={
              isPaused
            }
            isMuted={
              isMuted
            }
            onVideoEnded={() => {
              void nextStory();
            }}
          />
        </div>

        {/* Comment Overlay */}

<div
  className="
    absolute
    bottom-20
    left-4
    right-4
    z-20
  "
>
  <StoryCommentOverlay
    comments={comments}
    onClick={() =>
      setIsCommentsOpen(
        true
      )
    }
  />
</div>

        {/* Bottom Bar */}

        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <StoryBottomBar
  story={selectedStory}
  onSubmitComment={
    async (
      content
    ) => {
      await createComment(
        {
          content,
        }
      );
    }
  }
  onShare={() => {
    console.log(
      "Share Story"
    );
  }}
/>
        </div>

        {/* Comments */}

        <StoryCommentDrawer
          storyId={
            selectedStory._id
          }
          open={
            isCommentsOpen
          }
          onClose={() =>
            setIsCommentsOpen(
              false
            )
          }
        />

        {/* Viewers */}

        <StoryViewersModal
          storyId={
            selectedStory._id
          }
          open={
            isViewersOpen
          }
          onClose={() =>
            setIsViewersOpen(
              false
            )
          }
        />

        {/* More Action */}
        <StoryMoreActions
  open={
    isMoreActionsOpen
  }
  onClose={() =>
    setIsMoreActionsOpen(
      false
    )
  }
/>
      </div>
    </div>
  );
}
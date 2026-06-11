// src/components/story/StoryRingList.tsx

"use client";

import StoryRing from "./StoryRing";
import CreateStoryRing from "./CreateStoryRing";
import StorySkeleton from "./StorySkeleton";

import { useStoryFeed } from "@/features/story/hooks/useStoryFeed";
import { useStoryView } from "@/features/story/hooks/useStoryView";

export default function StoryRingList() {
  const {
    feed,
    isLoading,
  } = useStoryFeed();

  const {
    openStory,
  } = useStoryView();

  /**
   * Loading
   */

  if (isLoading) {
    return (
      <StorySkeleton
        variant="ring"
        count={8}
      />
    );
  }

  /**
   * Empty State
   */

  if (
    feed.length === 0
  ) {
    return (
      <div className="w-full overflow-x-auto scrollbar-none">
        <div className="flex min-w-max items-start gap-4 px-4 py-3">
          <CreateStoryRing />
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Stories"
      className="w-full overflow-x-auto scrollbar-none"
    >
      <div className="flex min-w-max items-start gap-4 px-4 py-3">
        <CreateStoryRing />

        {feed.map(
          (group) => (
            <StoryRing
              key={
                group.author._id
              }
              group={group}
              onClick={
                openStory
              }
            />
          )
        )}
      </div>
    </section>
  );
}
// src/components/story/CreateStoryRing.tsx

"use client";

import { Plus } from "lucide-react";

import { useStoryStore } from "@/features/story/store/story.store";

export default function CreateStoryRing() {
  const openCreateStory =
    useStoryStore(
      (state) =>
        state.openCreateStory
    );

  return (
    <button
      type="button"
      aria-label="Create Story"
      title="Create Story"
      onClick={
        openCreateStory
      }
      className="
        flex
        shrink-0
        flex-col
        items-center
        gap-2
      "
    >
      {/* Ring */}

      <div
        className="
          relative
          flex
          h-[72px]
          w-[72px]
          items-center
          justify-center
          rounded-full
          border-2
          border-zinc-700
          bg-zinc-900
        "
      >
        {/* Add Badge */}

        <div
          className="
            absolute
            bottom-0
            right-0
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border-2
            border-background
            bg-primary
            text-primary-foreground
          "
        >
          <Plus className="h-3.5 w-3.5" />
        </div>

        {/* Avatar Placeholder */}

        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-zinc-800
          "
        >
          <span
            className="
              text-lg
              font-semibold
              text-zinc-300
            "
          >
            +
          </span>
        </div>
      </div>

      {/* Label */}

      <span
        className="
          max-w-[72px]
          truncate
          text-xs
          text-zinc-300
        "
      >
        Your Story
      </span>
    </button>
  );
}
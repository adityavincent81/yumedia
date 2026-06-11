// src/components/story/StoryVisibilitySelector.tsx

"use client";

import {
  STORY_VISIBILITY_OPTIONS,
} from "@/features/story/constants/story.constants";

import type {
  StoryVisibility,
} from "@/features/story/types/story.types";

interface StoryVisibilitySelectorProps {
  value: StoryVisibility;

  onChange: (
    value: StoryVisibility
  ) => void;
}

const VISIBILITY_DESCRIPTIONS: Record<
  StoryVisibility,
  string
> = {
  followers:
    "Only mutual followers can view this story.",

  followers_except:
    "Visible to followers except selected users.",

  only_share_with:
    "Visible only to selected users.",

  only_me:
    "Only you can view this story.",
};

export default function StoryVisibilitySelector({
  value,
  onChange,
}: StoryVisibilitySelectorProps) {
  return (
    <div>
      <label
        htmlFor="story-visibility"
        className="mb-2 block text-sm text-zinc-400"
      >
        Visibility
      </label>

      <select
        id="story-visibility"
        aria-label="Story visibility"
        value={value}
        onChange={(e) =>
          onChange(
            e.target
              .value as StoryVisibility
          )
        }
        className="
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          px-3
          py-2
          text-white
          outline-none
          transition
          focus:border-zinc-600
        "
      >
        {STORY_VISIBILITY_OPTIONS.map(
          (option) => (
            <option
              key={
                option.value
              }
              value={
                option.value
              }
            >
              {option.label}
            </option>
          )
        )}
      </select>

      <p className="mt-2 text-xs text-zinc-500">
        {
          VISIBILITY_DESCRIPTIONS[
            value
          ]
        }
      </p>
    </div>
  );
}
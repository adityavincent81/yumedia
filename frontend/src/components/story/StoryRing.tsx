// src/components/story/StoryRing.tsx

"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import type {
  StoryGroup,
} from "@/features/story/types/story.types";

interface StoryRingProps {
  group: StoryGroup;

  onClick: (
    storyId: string,
    authorId: string
  ) => void;
}

export default function StoryRing({
  group,
  onClick,
}: StoryRingProps) {
  const firstStory =
    group.stories[0];

  const avatarUrl =
    group.author.avatar?.url;

  const hasUnseen =
    group.hasUnseen;

  const handleClick =
    () => {
      if (!firstStory) {
        return;
      }

      onClick(
        firstStory._id,
        group.author._id
      );
    };

  if (
    !firstStory
  ) {
    return null;
  }

  return (
    <button
      type="button"
      aria-label={`View ${group.author.username} story`}
      title={
        group.author
          .username
      }
      onClick={
        handleClick
      }
      className="
        shrink-0
        flex
        flex-col
        items-center
        gap-2
      "
    >
      {/* Ring */}

      <div
        className={cn(
          "relative flex items-center justify-center rounded-full p-[2px]",
          hasUnseen
            ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-orange-400"
            : "bg-zinc-700"
        )}
      >
        <div className="flex items-center justify-center rounded-full bg-background p-[2px]">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-zinc-800">
            {avatarUrl ? (
              <Image
                src={
                  avatarUrl
                }
                alt={
                  group.author
                    .username
                }
                fill
                sizes="64px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-zinc-300">
                {group.author.username
                  ?.charAt(
                    0
                  )
                  .toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Username */}

      <span
        className="
          max-w-[72px]
          truncate
          text-xs
          text-zinc-300
        "
      >
        {
          group.author
            .username
        }
      </span>
    </button>
  );
}
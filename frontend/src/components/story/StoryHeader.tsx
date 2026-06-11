// src/components/story/StoryHeader.tsx

"use client";

import Image from "next/image";

import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  Eye,
  MoreHorizontal,
} from "lucide-react";

import type {
  Story,
} from "@/features/story/types/story.types";

interface StoryHeaderProps {
  story: Story;

  isPaused?: boolean;

  isMuted?: boolean;

  onTogglePause?: () => void;

  onToggleMute?: () => void;

  onMoreActions?: () => void;
}

function formatStoryTime(
  date: string
) {
  const now =
    Date.now();

  const createdAt =
    new Date(
      date
    ).getTime();

  const diff =
    Math.floor(
      (now -
        createdAt) /
        1000
    );

  if (
    diff < 60
  ) {
    return `${diff}s`;
  }

  if (
    diff <
    3600
  ) {
    return `${Math.floor(
      diff /
        60
    )}m`;
  }

  if (
    diff <
    86400
  ) {
    return `${Math.floor(
      diff /
        3600
    )}h`;
  }

  return `${Math.floor(
    diff /
      86400
  )}d`;
}

export default function StoryHeader({
  story,
  isPaused =
    false,
  isMuted = true,
  onTogglePause,
  onToggleMute,
  onMoreActions,
}: StoryHeaderProps) {
  const avatarUrl =
    story.author.avatar
      ?.url;

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Author */}

      <div className="flex min-w-0 items-center gap-3">
        <div
          className="
            relative
            h-10
            w-10
            shrink-0
            overflow-hidden
            rounded-full
            ring-2
            ring-white/20
          "
        >
          {avatarUrl ? (
            <Image
              src={
                avatarUrl
              }
              alt={
                story.author
                  .username
              }
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-zinc-800
                text-sm
                font-semibold
                text-zinc-300
              "
            >
              {story.author.username
                ?.charAt(
                  0
                )
                .toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="
                max-w-[140px]
                truncate
                text-sm
                font-medium
                text-white
              "
            >
              {
                story.author
                  .username
              }
            </span>

            <span className="text-xs text-zinc-300">
              •
            </span>

            <span className="text-xs text-zinc-400">
              {formatStoryTime(
                story.createdAt
              )}
            </span>
          </div>

          {/* Dummy music title */}

          <div className="truncate text-xs text-zinc-300">
            Original Audio
          </div>
        </div>
      </div>

      {/* Actions */}

<div className="flex flex-col items-end gap-2">
  {/* Top Buttons */}

  <div className="flex items-center gap-1">
    <button
      type="button"
      aria-label="Toggle mute"
      onClick={
        onToggleMute
      }
      className="
        rounded-full
        bg-black/40
        p-2
        text-white
        backdrop-blur-md
        transition
        hover:bg-black/60
      "
    >
      {isMuted ? (
        <VolumeX className="h-4 w-4" />
      ) : (
        <Volume2 className="h-4 w-4" />
      )}
    </button>

    <button
      type="button"
      aria-label="Toggle pause"
      onClick={
        onTogglePause
      }
      className="
        rounded-full

        bg-black/40
        p-2
        text-white
        backdrop-blur-md
        transition
        hover:bg-black/60
      "
    >
      {isPaused ? (
        <Play className="h-4 w-4" />
      ) : (
        <Pause className="h-4 w-4" />
      )}
    </button>

    <button
      type="button"
      aria-label="More actions"
      onClick={
        onMoreActions
      }
      className="
        rounded-full

        bg-black/40
        p-2
        text-white
        backdrop-blur-md
        transition
        hover:bg-black/60
      "
    >
      <MoreHorizontal className="h-4 w-4" />
    </button>
  </div>

  {/* View Count */}

  <div
    className="
      flex
      items-center
      gap-1
      rounded-full
      bg-black/40
      px-2.5
      py-1
      text-xs
      text-white
      backdrop-blur-md
    "
  >
    <Eye className="h-3.5 w-3.5" />

    <span>
      {story.viewsCount}
    </span>
  </div>
</div>
    </div>
  );
}
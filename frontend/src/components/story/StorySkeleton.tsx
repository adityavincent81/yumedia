// src/components/story/StorySkeleton.tsx

"use client";

interface StorySkeletonProps {
  variant?:
    | "ring"
    | "viewer"
    | "comment";

  count?: number;
}

export default function StorySkeleton({
  variant = "ring",
  count = 1,
}: StorySkeletonProps) {
  const safeCount =
    Math.max(
      count,
      1
    );

  /**
   * Viewer Skeleton
   */

  if (
    variant ===
    "viewer"
  ) {
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full flex-col bg-black"
      >
        {/* Progress */}

        <div className="p-4">
          <div className="h-1 w-full animate-pulse rounded-full bg-zinc-800" />
        </div>

        {/* Header */}

        <div className="flex items-center gap-3 px-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-800" />

          <div className="space-y-2">
            <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />

            <div className="h-3 w-16 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>

        {/* Content */}

        <div className="flex flex-1 items-center justify-center p-6">
          <div className="h-full w-full animate-pulse rounded-2xl bg-zinc-900" />
        </div>
      </div>
    );
  }

  /**
   * Comment Skeleton
   */

  if (
    variant ===
    "comment"
  ) {
    return (
      <div
        aria-hidden="true"
        className="space-y-4 p-4"
      >
        {Array.from({
          length:
            safeCount,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="rounded-xl bg-zinc-900 p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-800" />

                <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />

                <div className="h-3 w-4/5 animate-pulse rounded bg-zinc-800" />
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  /**
   * Ring Skeleton
   */

  return (
    <div
      aria-hidden="true"
      className="flex gap-4 overflow-x-auto px-4 py-3"
    >
      {Array.from({
        length:
          safeCount,
      }).map(
        (_, index) => (
          <div
            key={index}
            className="flex shrink-0 flex-col items-center gap-2"
          >
            <div className="h-[72px] w-[72px] animate-pulse rounded-full bg-zinc-800" />

            <div className="h-3 w-12 animate-pulse rounded bg-zinc-800" />
          </div>
        )
      )}
    </div>
  );
}
"use client";

import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

interface PostSkeletonProps {
  count?: number;
}

export default function PostSkeleton({
  count = 1,
}: PostSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <article
          key={index}
          className="
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
          "
        >
          <div className="p-4">
            <div className="flex items-center gap-3">
              <LoadingSkeleton className="h-12 w-12 rounded-full" />

              <div className="flex-1 space-y-2">
                <LoadingSkeleton className="h-4 w-32" />

                <LoadingSkeleton className="h-3 w-20" />
              </div>

              <LoadingSkeleton className="h-8 w-8 rounded-lg" />
            </div>
          </div>

          <LoadingSkeleton
            className="
              aspect-square
              w-full
              rounded-none
            "
          />

          <div className="space-y-4 p-4">
            <LoadingSkeleton className="h-4 w-full" />

            <LoadingSkeleton className="h-4 w-5/6" />

            <LoadingSkeleton className="h-4 w-2/3" />

            <div className="flex items-center gap-6 pt-2">
              <LoadingSkeleton className="h-5 w-14" />

              <LoadingSkeleton className="h-5 w-14" />

              <LoadingSkeleton className="ml-auto h-5 w-14" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
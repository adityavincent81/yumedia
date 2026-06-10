"use client";

interface FeedSkeletonProps {
  count?: number;
}

export default function FeedSkeleton({
  count = 3,
}: FeedSkeletonProps) {
  return (
    <div className="space-y-6">
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="
            animate-pulse
            overflow-hidden
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
          "
        >
          {/* Header */}
          <div className="p-4">
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <div
                className="
                  h-10
                  w-10
                  rounded-full
                  bg-zinc-800
                "
              />

              <div className="flex-1">
                <div
                  className="
                    h-4
                    w-32
                    rounded
                    bg-zinc-800
                  "
                />

                <div
                  className="
                    mt-2
                    h-3
                    w-24
                    rounded
                    bg-zinc-800
                  "
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div
            className="
              aspect-square
              w-full
              bg-zinc-800
            "
          />

          {/* Caption */}
          <div className="space-y-3 p-4">
            <div
              className="
                h-4
                w-full
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-4
                w-5/6
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-4
                w-2/3
                rounded
                bg-zinc-800
              "
            />
          </div>

          {/* Actions */}
          <div
            className="
              flex
              items-center
              gap-6
              border-t
              border-zinc-800
              p-4
            "
          >
            <div
              className="
                h-5
                w-12
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-5
                w-12
                rounded
                bg-zinc-800
              "
            />

            <div
              className="
                h-5
                w-12
                rounded
                bg-zinc-800
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
"use client";

interface CommentSkeletonProps {
  count?: number;
}

export default function CommentSkeleton({
  count = 5,
}: CommentSkeletonProps) {
  return (
    <div
      className="
        space-y-6
      "
    >
      {Array.from({
        length: count,
      }).map((_, index) => (
        <div
          key={index}
          className="
            flex
            gap-3
            animate-pulse
          "
        >
          {/* Avatar */}
          <div
            className="
              h-8
              w-8
              rounded-full
              bg-zinc-800
            "
          />

          {/* Content */}
          <div className="flex-1">
            {/* Username */}
            <div
              className="
                mb-2
                h-3
                w-24
                rounded
                bg-zinc-800
              "
            />

            {/* Line 1 */}
            <div
              className="
                mb-2
                h-3
                w-full
                rounded
                bg-zinc-800
              "
            />

            {/* Line 2 */}
            <div
              className="
                h-3
                w-3/4
                rounded
                bg-zinc-800
              "
            />

            {/* Actions */}
            <div
              className="
                mt-3
                flex
                gap-4
              "
            >
              <div
                className="
                  h-3
                  w-10
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  h-3
                  w-10
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
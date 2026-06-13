// src/components/message/skeleton/MessageSkeleton.tsx

"use client";

interface MessageSkeletonProps {
  mine?: boolean;
}

export default function MessageSkeleton({
  mine = false,
}: MessageSkeletonProps) {
  return (
    <div
      className={`
        flex
        w-full

        ${
          mine
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className="
          max-w-[320px]
        "
      >
        {/* Bubble */}

        <div
          className="
            animate-pulse

            rounded-2xl

            bg-zinc-800

            px-4
            py-3
          "
        >
          <div
            className="
              h-3
              w-40

              rounded

              bg-zinc-700
            "
          />

          <div
            className="
              mt-2

              h-3
              w-28

              rounded

              bg-zinc-700
            "
          />
        </div>

        {/* Footer */}

        <div
          className="
            mt-2

            flex
            justify-end
          "
        >
          <div
            className="
              h-3
              w-12

              animate-pulse

              rounded

              bg-zinc-800
            "
          />
        </div>
      </div>
    </div>
  );
}
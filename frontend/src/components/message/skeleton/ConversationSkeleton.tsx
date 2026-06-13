// src/components/message/skeleton/ConversationSkeleton.tsx

"use client";

export default function ConversationSkeleton() {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        rounded-2xl

        p-3
      "
    >
      {/* Avatar */}

      <div
        className="
          h-12
          w-12
          shrink-0

          animate-pulse

          rounded-full

          bg-zinc-800
        "
      />

      {/* Content */}

      <div
        className="
          flex-1
          space-y-2
        "
      >
        <div
          className="
            h-4
            w-32

            animate-pulse

            rounded

            bg-zinc-800
          "
        />

        <div
          className="
            h-3
            w-24

            animate-pulse

            rounded

            bg-zinc-800
          "
        />
      </div>

      {/* Time */}

      <div
        className="
          h-3
          w-10

          animate-pulse

          rounded

          bg-zinc-800
        "
      />
    </div>
  );
}
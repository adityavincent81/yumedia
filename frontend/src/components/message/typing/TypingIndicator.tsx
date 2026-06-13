// src/components/message/typing/TypingIndicator.tsx

"use client";

import type {
  TypingUser,
} from "@/features/message/types/message.types";

interface TypingIndicatorProps {
  users: TypingUser[];
}

export default function TypingIndicator({
  users,
}: TypingIndicatorProps) {
  if (
    !users ||
    users.length === 0
  ) {
    return null;
  }

  const text =
    users.length === 1
      ? `${users[0].username} is typing...`
      : users.length === 2
      ? `${users[0].username} and ${users[1].username} are typing...`
      : `${users.length} people are typing...`;

  return (
    <div
      className="
        flex
        items-center
        gap-3

        border-t
        border-zinc-800

        px-4
        py-2
      "
    >
      {/* Dots */}

      <div
        className="
          flex
          items-center
          gap-1
        "
      >
        <span
          className="
            h-2
            w-2

            animate-bounce

            rounded-full
            bg-zinc-500
          "
        />

        <span
          className="
            h-2
            w-2

            animate-bounce

            rounded-full
            bg-zinc-500

            [animation-delay:150ms]
          "
        />

        <span
          className="
            h-2
            w-2

            animate-bounce

            rounded-full
            bg-zinc-500

            [animation-delay:300ms]
          "
        />
      </div>

      {/* Text */}

      <span
        className="
          text-xs
          text-zinc-500
        "
      >
        {text}
      </span>
    </div>
  );
}
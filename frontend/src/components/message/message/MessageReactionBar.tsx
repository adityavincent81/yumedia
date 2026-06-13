// src/components/message/message/MessageReactionBar.tsx

"use client";

import {
  SmilePlus,
} from "lucide-react";

interface Reaction {
  emoji: string;

  count: number;

  reacted?: boolean;
}

interface MessageReactionBarProps {
  reactions?: Reaction[];

  onReact?: (
    emoji: string
  ) => void;
}

export default function MessageReactionBar({
  reactions = [],

  onReact,
}: MessageReactionBarProps) {
  /**
   * V3 Component
   */

  const quickReactions =
    [
      "👍",
      "❤️",
      "😂",
      "🔥",
      "😮",
      "😢",
    ];

  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-1.5
      "
    >
      {/* Existing Reactions */}

      {reactions.map(
        (
          reaction
        ) => (
          <button
            key={
              reaction.emoji
            }
            type="button"
            onClick={() =>
              onReact?.(
                reaction.emoji
              )
            }
            className={`
              flex
              items-center
              gap-1

              rounded-full

              border

              px-2
              py-1

              text-xs

              transition-colors

              ${
                reaction.reacted
                  ? `
                    border-sky-500
                    bg-sky-500/10
                  `
                  : `
                    border-zinc-800

                    hover:bg-zinc-900
                  `
              }
            `}
          >
            <span>
              {
                reaction.emoji
              }
            </span>

            <span
              className="
                text-zinc-400
              "
            >
              {
                reaction.count
              }
            </span>
          </button>
        )
      )}

      {/* Add Reaction */}

      <div
        className="
          group
          relative
        "
      >
        <button
          type="button"
          disabled
          title="Coming Soon (V3)"
          className="
            flex
            items-center
            justify-center

            rounded-full

            border
            border-dashed
            border-zinc-700

            px-2
            py-1

            text-zinc-500

            transition-colors

            hover:bg-zinc-900
          "
        >
          <SmilePlus
            size={14}
          />
        </button>

        {/* Preview */}

        <div
          className="
            absolute
            bottom-full
            left-0

            mb-2

            hidden

            rounded-xl

            border
            border-zinc-800

            bg-zinc-950

            p-2

            shadow-xl

            group-hover:flex
          "
        >
          <div
            className="
              flex
              gap-1
            "
          >
            {quickReactions.map(
              (
                emoji
              ) => (
                <button
                  key={
                    emoji
                  }
                  type="button"
                  disabled
                  className="
                    rounded-lg

                    p-1.5

                    text-lg

                    opacity-70
                  "
                >
                  {emoji}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
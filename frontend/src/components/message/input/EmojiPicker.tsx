// src/components/message/input/EmojiPicker.tsx

"use client";

import {
  Smile,
} from "lucide-react";

interface EmojiPickerProps {
  isOpen: boolean;

  onSelect: (
    emoji: string
  ) => void;
}

const EMOJIS = [
  "😀",
  "😂",
  "😍",
  "🥰",
  "😎",
  "🤔",
  "😭",
  "😡",

  "👍",
  "👎",
  "👏",
  "🙏",
  "🔥",
  "❤️",
  "💯",
  "🎉",

  "🚀",
  "✨",
  "⭐",
  "🎓",
  "📚",
  "💻",
  "📸",
  "🎮",
];

export default function EmojiPicker({
  isOpen,

  onSelect,
}: EmojiPickerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        absolute
        bottom-16
        right-0

        z-50

        w-72

        overflow-hidden

        rounded-2xl

        border
        border-zinc-800

        bg-zinc-950

        shadow-xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-2

          border-b
          border-zinc-800

          px-4
          py-3
        "
      >
        <Smile
          size={16}
          className="
            text-yellow-500
          "
        />

        <span
          className="
            text-sm
            font-medium
            text-white
          "
        >
          Emoji Picker
        </span>
      </div>

      {/* Emojis */}

      <div
        className="
          grid
          grid-cols-8

          gap-1

          p-3
        "
      >
        {EMOJIS.map(
          (emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() =>
                onSelect(
                  emoji
                )
              }
              className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-lg

                text-xl

                transition-colors

                hover:bg-zinc-800
              "
            >
              {emoji}
            </button>
          )
        )}
      </div>

      {/* Footer */}

      <div
        className="
          border-t
          border-zinc-800

          px-4
          py-2
        "
      >
        <p
          className="
            text-xs
            text-zinc-500
          "
        >
          More emojis coming in V2
        </p>
      </div>
    </div>
  );
}
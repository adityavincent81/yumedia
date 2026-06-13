// src/components/message/input/SendButton.tsx

"use client";

import { Send } from "lucide-react";

interface SendButtonProps {
  disabled?: boolean;

  loading?: boolean;

  onClick?: () => void;
}

export default function SendButton({
  disabled = false,

  loading = false,

  onClick,
}: SendButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={
        disabled ||
        loading
      }
      className="
        flex
        h-10
        w-10
        shrink-0

        items-center
        justify-center

        rounded-xl

        bg-white

        text-black

        transition-all

        hover:scale-105

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:scale-100
      "
    >
      {loading ? (
        <div
          className="
            h-4
            w-4

            animate-spin

            rounded-full

            border-2
            border-black
            border-t-transparent
          "
        />
      ) : (
        <Send
          size={18}
        />
      )}
    </button>
  );
}
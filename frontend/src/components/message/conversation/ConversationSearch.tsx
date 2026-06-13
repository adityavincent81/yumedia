// src/components/message/conversation/ConversationSearch.tsx

"use client";

import { Search, X } from "lucide-react";

interface ConversationSearchProps {
  value: string;

  onChange: (
    value: string
  ) => void;

  placeholder?: string;
}

export default function ConversationSearch({
  value,
  onChange,
  placeholder = "Search conversations...",
}: ConversationSearchProps) {
  return (
    <div
      className="
        relative
      "
    >
      {/* Search Icon */}

      <Search
        size={16}
        className="
          absolute
          left-3
          top-1/2

          -translate-y-1/2

          text-zinc-500
        "
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        placeholder={
          placeholder
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target.value
          )
        }
        className="
          w-full

          rounded-xl

          border
          border-zinc-800

          bg-zinc-900

          py-2.5
          pl-9
          pr-10

          text-sm
          text-white

          outline-none

          transition-colors

          placeholder:text-zinc-500

          focus:border-zinc-700
        "
      />

      {/* Clear */}

      {value && (
        <button
          type="button"
          onClick={() =>
            onChange("")
          }
          className="
            absolute
            right-3
            top-1/2

            -translate-y-1/2

            text-zinc-500

            transition-colors

            hover:text-white
          "
        >
          <X
            size={14}
          />
        </button>
      )}
    </div>
  );
}
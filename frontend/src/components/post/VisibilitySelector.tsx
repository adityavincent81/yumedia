"use client";

import type {
  PostVisibility,
} from "@/features/post/types/post.types";

interface VisibilitySelectorProps {
  value: PostVisibility;

  onChange: (
    visibility: PostVisibility
  ) => void;

  disabled?: boolean;
}

const visibilityOptions = [
  {
    value: "public",
    label: "🌎 Public",
  },

  {
    value: "followers",
    label: "👥 Followers",
  },

  {
    value: "private",
    label: "🔒 Private",
  },
] as const;

export default function VisibilitySelector({
  value,
  onChange,
  disabled = false,
}: VisibilitySelectorProps) {
  return (
    <div className="space-y-2">
      <label
        className="
          text-sm
          font-medium
          text-zinc-300
        "
      >
        Visibility
      </label>

      <select
        value={value}
        disabled={disabled}
        onChange={(e) =>
          onChange(
            e.target
              .value as PostVisibility
          )
        }
        className="
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-950
          p-3
          text-white
          outline-none
          transition
          focus:border-zinc-600
          disabled:opacity-50
        "
      >
        {visibilityOptions.map(
          (option) => (
            <option
              key={option.value}
              value={
                option.value
              }
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
}
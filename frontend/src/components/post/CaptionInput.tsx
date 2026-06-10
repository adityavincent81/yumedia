"use client";

interface CaptionInputProps {
  value: string;

  onChange: (
    value: string
  ) => void;

  maxLength?: number;

  placeholder?: string;

  rows?: number;

  disabled?: boolean;
}

export default function CaptionInput({
  value,
  onChange,
  maxLength = 2200,
  placeholder = "What's happening?",
  rows = 5,
  disabled = false,
}: CaptionInputProps) {
  return (
    <div className="space-y-2">
      <label
        className="
          text-sm
          font-medium
          text-zinc-300
        "
      >
        Caption
      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className="
          w-full
          rounded-xl
          border
          border-zinc-800
          bg-zinc-950
          p-4
          text-white
          outline-none
          transition
          focus:border-zinc-600
          disabled:opacity-50
        "
      />

      <div
        className="
          text-right
          text-xs
          text-zinc-500
        "
      >
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
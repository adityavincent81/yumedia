// src/components/story/StoryTextEditor.tsx

"use client";

import {
  STORY_TEXT_LIMIT,
} from "@/features/story/constants/story.constants";

interface StoryTextEditorProps {
  text: string;

  backgroundColor: string;

  onTextChange: (
    value: string
  ) => void;

  onBackgroundColorChange: (
    value: string
  ) => void;
}

export default function StoryTextEditor({
  text,
  backgroundColor,
  onTextChange,
  onBackgroundColorChange,
}: StoryTextEditorProps) {
  const remainingCharacters =
    STORY_TEXT_LIMIT -
    text.length;

  return (
    <div className="space-y-4">
      {/* Preview */}

      <div
        className="
          flex
          min-h-[320px]
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-zinc-800
          p-6
        "
        style={{
          backgroundColor,
        }}
      >
        <p
          className="
            whitespace-pre-wrap
            break-words
            text-center
            text-xl
            font-semibold
            text-white
            md:text-3xl
          "
        >
          {text.trim() ||
            "Your story preview"}
        </p>
      </div>

      {/* Text */}

      <div>
        <label
          htmlFor="story-text"
          className="mb-2 block text-sm text-zinc-400"
        >
          Story Text
        </label>

        <textarea
          id="story-text"
          aria-label="Story text"
          value={text}
          onChange={(e) =>
            onTextChange(
              e.target.value
            )
          }
          maxLength={
            STORY_TEXT_LIMIT
          }
          placeholder="What's on your mind?"
          className="
            h-36
            w-full
            resize-none
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-3
            text-white
            outline-none
            transition
            focus:border-zinc-600
          "
        />

        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="text-zinc-500">
            Maximum{" "}
            {
              STORY_TEXT_LIMIT
            }{" "}
            characters
          </span>

          <span
            className={
              remainingCharacters <
              20
                ? "text-amber-400"
                : "text-zinc-500"
            }
          >
            {text.length}/
            {
              STORY_TEXT_LIMIT
            }
          </span>
        </div>
      </div>

      {/* Background Color */}

      <div>
        <label
          htmlFor="story-background-color"
          className="mb-2 block text-sm text-zinc-400"
        >
          Background Color
        </label>

        <div className="flex items-center gap-3">
          <input
            id="story-background-color"
            aria-label="Background color"
            type="color"
            value={
              backgroundColor
            }
            onChange={(e) =>
              onBackgroundColorChange(
                e.target.value
              )
            }
            className="
              h-12
              w-16
              cursor-pointer
              rounded-lg
              border
              border-zinc-800
              bg-transparent
            "
          />

          <span className="font-mono text-sm text-zinc-400">
            {
              backgroundColor
            }
          </span>
        </div>
      </div>
    </div>
  );
}
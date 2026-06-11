// src/components/story/StoryBottomBar.tsx

"use client";

import {
  useState,
} from "react";

import {
  Heart,
  Send,
} from "lucide-react";

import type {
  Story,
} from "@/features/story/types/story.types";

interface StoryBottomBarProps {
  story: Story;

  onSubmitComment?: (
    content: string
  ) => Promise<void> | void;

  onShare?: () => void;
}

export default function StoryBottomBar({
  story,
  onSubmitComment,
  onShare,
}: StoryBottomBarProps) {
  const [
    liked,
    setLiked,
  ] = useState(false);

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleSubmit =
    async () => {
      const value =
        comment.trim();

      if (
        !value ||
        isSubmitting
      ) {
        return;
      }

      try {
        setIsSubmitting(
          true
        );

        await onSubmitComment?.(
          value
        );

        setComment("");
      } catch (
        error
      ) {
        console.error(
          error
        );
      } finally {
        setIsSubmitting(
          false
        );
      }
    };

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      {/* Comment Input */}

      <div
        className="
          flex
          h-12
          flex-1
          items-center
          gap-3
          rounded-full
          border
          border-white/15
          bg-black/30
          px-4
          backdrop-blur-xl
        "
      >
        <input
          type="text"
          value={comment}
          maxLength={500}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          onKeyDown={(
            e
          ) => {
            if (
              e.key ===
                "Enter" &&
              !e.shiftKey
            ) {
              e.preventDefault();

              void handleSubmit();
            }
          }}
          placeholder={`Reply to ${story.author.username}...`}
          className="
            h-full
            w-full
            bg-transparent
            text-sm
            text-white
            outline-none
            placeholder:text-zinc-400
          "
        />

        {comment.trim()
          .length >
          0 && (
          <button
            type="button"
            aria-label="Send Comment"
            disabled={
              isSubmitting
            }
            onClick={() => {
              void handleSubmit();
            }}
            className="
              shrink-0
              text-sm
              font-semibold
              text-amber-50
              transition
              hover:text-emerald-200
              disabled:opacity-50
            "
          >
            {isSubmitting
              ? "Sending..."
              : "Send"}
          </button>
        )}
      </div>

      {/* Like */}

      <button
        type="button"
        aria-label="Like Story"
        onClick={() =>
          setLiked(
            (
              prev
            ) => !prev
          )
        }
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/15
          hover:border-red-500
          bg-black/30
          backdrop-blur-xl
          transition
          hover:scale-105
        "
      >
        <Heart
          className={`h-5 w-5 transition ${
            liked
              ? "fill-red-500 text-red-500" 
              : "text-white "
          }`}
        />
      </button>

      {/* Share */}

      <button
        type="button"
        aria-label="Share Story"
        onClick={
          onShare
        }
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white/15
          hover:border-amber-500
          bg-black/30
          text-white
          backdrop-blur-xl
          transition
          hover:scale-105
        "
      >
        <Send className="h-5 w-5" />
      </button>
    </div>
  );
}
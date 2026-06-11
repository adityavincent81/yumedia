// src/components/story/StoryCommentInput.tsx

"use client";

import {
  FormEvent,
  KeyboardEvent,
  useState,
} from "react";

interface StoryCommentInputProps {
  placeholder?: string;

  disabled?: boolean;

  isSubmitting?: boolean;

  onSubmit: (
    content: string
  ) => Promise<void> | void;
}

export default function StoryCommentInput({
  placeholder = "Write a comment...",
  disabled = false,
  isSubmitting = false,
  onSubmit,
}: StoryCommentInputProps) {
  const [content, setContent] =
    useState("");

  const handleSubmit = async (
    e?: FormEvent
  ) => {
    e?.preventDefault();

    if (
      disabled ||
      isSubmitting
    ) {
      return;
    }

    const value =
      content.trim();

    if (!value) {
      return;
    }

    try {
      await onSubmit(
        value
      );

      setContent("");
    } catch (
      error
    ) {
      console.error(
        error
      );
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      void handleSubmit();
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="border-t border-zinc-800 p-4"
    >
      <div className="flex gap-2">
        <textarea
          rows={1}
          value={content}
          disabled={
            disabled ||
            isSubmitting
          }
          aria-label="Comment"
          placeholder={
            placeholder
          }
          onChange={(e) =>
            setContent(
              e.target.value
            )
          }
          onKeyDown={
            handleKeyDown
          }
          className="
            min-h-[42px]
            flex-1
            resize-none
            rounded-lg
            border
            border-zinc-800
            bg-zinc-900
            px-3
            py-2
            text-sm
            text-white
            outline-none
            transition
            focus:border-zinc-600
            disabled:opacity-50
          "
        />

        <button
          type="submit"
          disabled={
            disabled ||
            isSubmitting ||
            !content.trim()
          }
          className="
            rounded-lg
            bg-primary
            px-4
            py-2
            text-sm
            font-medium
            text-primary-foreground
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isSubmitting
            ? "Sending..."
            : "Send"}
        </button>
      </div>
    </form>
  );
}
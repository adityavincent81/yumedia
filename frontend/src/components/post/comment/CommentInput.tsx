"use client";

import {
  KeyboardEvent,
  useState,
} from "react";

import Avatar from "@/components/ui/Avatar";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface CommentInputProps {
  placeholder?: string;

  submitLabel?: string;

  autoFocus?: boolean;

  loading?: boolean;

  onSubmit: (
    content: string
  ) => Promise<void> | void;
}

export default function CommentInput({
  placeholder = "Add a comment...",

  submitLabel = "Post",

  autoFocus = false,

  loading = false,

  onSubmit,
}: CommentInputProps) {
  const user =
    useAuthStore(
      (state) => state.user
    );

  const [content, setContent] =
    useState("");

  const avatarSrc =
    typeof user?.avatar ===
    "string"
      ? user.avatar
      : user?.avatar?.url;

  const handleSubmit =
    async () => {
      const value =
        content.trim();

      if (!value) {
        return;
      }

      await onSubmit(value);

      setContent("");
    };

  const handleKeyDown = async (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      await handleSubmit();
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
      <Avatar
        src={
          avatarSrc?.trim()
            ? avatarSrc
            : undefined
        }
        alt={
          user?.username ||
          "User"
        }
        size="sm"
      />

      <div
        className="
          flex
          flex-1
          items-center
          gap-3

          rounded-full
          border
          border-zinc-800

          bg-zinc-950

          px-4
          py-2
        "
      >
        <input
          type="text"
          value={content}
          autoFocus={
            autoFocus
          }
          disabled={loading}
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
            flex-1
            bg-transparent

            text-sm
            text-white

            outline-none

            placeholder:text-zinc-500
          "
        />

        <button
          type="button"
          disabled={
            loading ||
            !content.trim()
          }
          onClick={
            handleSubmit
          }
          className="
            text-sm
            font-medium

            text-blue-500

            transition

            hover:text-blue-400

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading
            ? "..."
            : submitLabel}
        </button>
      </div>
    </div>
  );
}
"use client";

import {
  KeyboardEvent,
  useState,
} from "react";

import Avatar from "@/components/ui/Avatar";

import { useAuthStore } from "@/features/auth/store/auth.store";

interface ReplyInputProps {
  username: string;

  loading?: boolean;

  autoFocus?: boolean;

  onSubmit: (
    content: string
  ) => Promise<void> | void;

  onCancel?: () => void;
}

export default function ReplyInput({
  username,

  loading = false,

  autoFocus = true,

  onSubmit,

  onCancel,
}: ReplyInputProps) {
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
        mt-3
        rounded-xl
        border
        border-zinc-800
        bg-zinc-950
        p-3
      "
    >
      <div
        className="
          mb-3
          flex
          items-center
          justify-between
        "
      >
        <span
          className="
            text-xs
            text-zinc-400
          "
        >
          Replying to{" "}
          <span
            className="
              font-medium
              text-white
            "
          >
            @{username}
          </span>
        </span>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="
              text-xs
              text-zinc-500
              transition
              hover:text-white
            "
          >
            Cancel
          </button>
        )}
      </div>

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

            bg-black

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
            placeholder={`Reply to @${username}...`}
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
              : "Reply"}
          </button>
        </div>
      </div>
    </div>
  );
}
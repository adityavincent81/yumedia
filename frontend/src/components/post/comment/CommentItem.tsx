"use client";

import {
  Heart,
  MessageCircle,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import Avatar from "@/components/ui/Avatar";

import type {
  Comment,
} from "@/features/comment/types/comment.types";

interface CommentItemProps {
  comment: Comment;

  isOwner?: boolean;

  showReplies?: boolean;

  repliesCount?: number;

  onReply?: () => void;

  onDelete?: () => void;

  onToggleReplies?: () => void;
}

export default function CommentItem({
  comment,

  isOwner = false,

  showReplies = false,

  repliesCount = 0,

  onReply,

  onDelete,

  onToggleReplies,
}: CommentItemProps) {
  const avatarSrc =
    typeof comment.author.avatar ===
    "string"
      ? comment.author.avatar
      : comment.author.avatar?.url;

  const createdAt =
    new Date(
      comment.createdAt
    ).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
      }
    );

  return (
    <div
      className="
        flex
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
          comment.author.username
        }
        size="sm"
      />

      <div className="flex-1">
        {/* Header */}
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <span
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            {
              comment.author
                .username
            }
          </span>

          {comment.author
            .isVerified && (
            <span
              className="
                text-xs
                text-blue-500
              "
            >
              ✓
            </span>
          )}

          <span
            className="
              text-xs
              text-zinc-500
            "
          >
            {createdAt}
          </span>
        </div>

        {/* Content */}
        <p
          className="
            mt-1
            whitespace-pre-wrap
            break-words

            text-sm
            text-zinc-200
          "
        >
          {comment.content}
        </p>

        {/* Actions */}
        <div
          className="
            mt-2
            flex
            items-center
            gap-4

            text-xs
            text-zinc-500
          "
        >
          <button
            type="button"
            className="
              flex
              items-center
              gap-1

              transition
              hover:text-red-500
            "
          >
            <Heart size={14} />
            Like
          </button>

          <button
            type="button"
            onClick={onReply}
            className="
              flex
              items-center
              gap-1

              transition
              hover:text-white
            "
          >
            <MessageCircle
              size={14}
            />
            Reply
          </button>

          {isOwner && (
            <button
              type="button"
              onClick={
                onDelete
              }
              className="
                flex
                items-center
                gap-1

                text-red-500

                transition
                hover:text-red-400
              "
            >
              <Trash2
                size={14}
              />
              Delete
            </button>
          )}
        </div>

        {/* Replies Toggle */}
        {repliesCount >
          0 && (
          <button
            type="button"
            onClick={
              onToggleReplies
            }
            className="
              mt-3

              flex
              items-center
              gap-2

              text-xs
              text-zinc-400

              transition
              hover:text-white
            "
          >
            {showReplies ? (
              <ChevronUp
                size={14}
              />
            ) : (
              <ChevronDown
                size={14}
              />
            )}

            {showReplies
              ? "Hide replies"
              : `View ${repliesCount} replies`}
          </button>
        )}
      </div>
    </div>
  );
}
"use client";

import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Loader2,
} from "lucide-react";

interface PostActionsProps {
  likesCount?: number;

  commentsCount?: number;

  savesCount?: number;

  sharesCount?: number;

  isLiked?: boolean;

  isSaved?: boolean;

  isLikeLoading?: boolean;

  onLike?: () => void;

  onComment?: () => void;

  onSave?: () => void;

  onShare?: () => void;
}

export default function PostActions({
  likesCount = 0,

  commentsCount = 0,

  savesCount = 0,

  sharesCount = 0,

  isLiked = false,

  isSaved = false,

  isLikeLoading = false,

  onLike,

  onComment,

  onSave,

  onShare,
}: PostActionsProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div
        className="
          flex
          items-center
          gap-6
        "
      >
        {/* LIKE */}
        <button
          type="button"
          aria-label="Like post"
          disabled={isLikeLoading}
          onClick={onLike}
          className="
            group
            flex
            items-center
            gap-2

            text-sm

            transition-all

            hover:scale-105

            disabled:cursor-not-allowed
            disabled:opacity-70
          "
        >
          {isLikeLoading ? (
            <Loader2
              size={20}
              className="
                animate-spin
                text-zinc-400
              "
            />
          ) : (
            <Heart
              size={20}
              className={
                isLiked
                  ? `
                    fill-red-500
                    text-red-500
                  `
                  : `
                    text-zinc-400
                    transition-colors
                    group-hover:text-red-500
                  `
              }
            />
          )}

          <span
            className="
              text-zinc-300
            "
          >
            {likesCount}
          </span>
        </button>

        {/* COMMENT */}
        <button
          type="button"
          aria-label="Open comments"
          onClick={onComment}
          className="
            group
            flex
            items-center
            gap-2

            text-sm

            transition-all

            hover:scale-105
          "
        >
          <MessageCircle
            size={20}
            className="
              text-zinc-400
              transition-colors
              group-hover:text-blue-500
            "
          />

          <span
            className="
              text-zinc-300
            "
          >
            {commentsCount}
          </span>
        </button>

        {/* SHARE */}
        <button
          type="button"
          aria-label="Share post"
          onClick={onShare}
          className="
            group
            flex
            items-center
            gap-2

            text-sm

            transition-all

            hover:scale-105
          "
        >
          <Share2
            size={20}
            className="
              text-zinc-400
              transition-colors
              group-hover:text-green-500
            "
          />

          <span
            className="
              text-zinc-300
            "
          >
            {sharesCount}
          </span>
        </button>
      </div>

      {/* SAVE / COLLECTION */}
      <button
        type="button"
        aria-label="Save to collection"
        onClick={onSave}
        className="
          group
          flex
          items-center
          gap-2

          text-sm

          transition-all

          hover:scale-105
        "
      >
        <Bookmark
          size={20}
          className={
            isSaved
              ? `
                fill-yellow-500
                text-yellow-500
              `
              : `
                text-zinc-400
                transition-colors
                group-hover:text-yellow-500
              `
          }
        />

        <span
          className="
            text-zinc-300
          "
        >
          {savesCount}
        </span>
      </button>
    </div>
  );
}
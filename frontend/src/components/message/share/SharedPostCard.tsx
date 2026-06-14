// src/components/message/share/SharedPostCard.tsx

"use client";

import Image from "next/image";

import {
  FileText,
  Heart,
  MessageCircle,
  Eye,
} from "lucide-react";

import type { Media } from "@/types/media.types";

interface SharedPostCardProps {
  post?: {
    _id: string;

    content?: string;

    media?: Media | null;

    author?: {
      _id: string;

      username: string;

      fullName: string;

      avatar?: Media | null;
    };

    likesCount?: number;

    commentsCount?: number;

    viewsCount?: number;
  };

  onClick?: (
    postId: string
  ) => void;
}

export default function SharedPostCard({
  post,
  onClick,
}: SharedPostCardProps) {
  if (!post) {
    return (
      <div
        className="
          border-b
          border-zinc-800

          p-4
        "
      >
        <div
          className="
            mb-2

            text-xs
            font-semibold
            uppercase
            tracking-wide

            text-sky-400
          "
        >
          Shared Post
        </div>

        <p
          className="
            text-sm
            text-zinc-400
          "
        >
          Post unavailable
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        onClick?.(
          post._id
        )
      }
      className="
        w-full

        overflow-hidden

        border-b
        border-zinc-800

        text-left

        transition-colors

        hover:bg-zinc-800/40
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-2

          px-4
          pt-4
        "
      >
        <FileText
          size={14}
          className="
            text-sky-400
          "
        />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide

            text-sky-400
          "
        >
          Shared Post
        </span>
      </div>

      {/* Author */}

      <div
        className="
          flex
          items-center
          gap-2

          px-4
          py-3
        "
      >
        {post.author?.avatar?.url ? (
          <Image
            src={
              post.author.avatar.url
            }
            alt={
              post.author.fullName
            }
            width={28}
            height={28}
            className="
              rounded-full
            "
          />
        ) : (
          <div
            className="
              flex
              h-7
              w-7

              items-center
              justify-center

              rounded-full

              bg-zinc-700

              text-[10px]
              font-semibold
            "
          >
            {post.author?.fullName?.charAt(
              0
            ) ?? "U"}
          </div>
        )}

        <div
          className="
            min-w-0
          "
        >
          <p
            className="
              truncate

              text-sm
              font-medium
            "
          >
            {post.author
              ?.fullName ??
              "Unknown User"}
          </p>

          <p
            className="
              truncate

              text-xs
              text-zinc-500
            "
          >
            @
            {post.author
              ?.username ??
              "unknown"}
          </p>
        </div>
      </div>

      {/* Media */}

      {post.media?.url && (
        <div
          className="
            px-4
          "
        >
          <Image
            src={
              post.media.url
            }
            alt="Post"
            width={800}
            height={800}
            className="
              h-40
              w-full

              rounded-xl

              object-cover
            "
          />
        </div>
      )}

      {/* Content */}

      {post.content && (
        <div
          className="
            px-4
            py-3
          "
        >
          <p
            className="
              line-clamp-3

              text-sm
            "
          >
            {post.content}
          </p>
        </div>
      )}

      {/* Stats */}

      <div
        className="
          flex
          items-center
          gap-4

          px-4
          pb-4

          text-xs
          text-zinc-500
        "
      >
        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          <Heart
            size={12}
          />

          <span>
            {post.likesCount ??
              0}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          <MessageCircle
            size={12}
          />

          <span>
            {post.commentsCount ??
              0}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          <Eye
            size={12}
          />

          <span>
            {post.viewsCount ??
              0}
          </span>
        </div>
      </div>
    </button>
  );
}
"use client";

import Link from "next/link";

import Avatar from "@/components/ui/Avatar";

import type {
  PostAuthor,
} from "@/features/post/types/post.types";

interface PostHeaderProps {
  author: PostAuthor;

  createdAt: string;

  showMenu?: boolean;

  onMenuClick?: () => void;
}

export default function PostHeader({
  author,
  createdAt,
  showMenu = true,
  onMenuClick,
}: PostHeaderProps) {
  const formattedDate =
    new Date(
      createdAt
    ).toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const avatarSrc =
    typeof author.avatar === "string"
      ? author.avatar
      : author.avatar &&
        typeof author.avatar === "object" &&
        "url" in author.avatar
      ? (author.avatar as { url: string }).url
      : undefined;

  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <Link
        href={`/${author.username}`}
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
            author.username
          }
        />

        <div>
          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <span
              className="
                font-semibold
                text-white
                hover:underline
              "
            >
              {
                author.username
              }
            </span>

            {author.isVerified && (
              <span
                title="Verified"
                className="
                  text-blue-500
                "
              >
                ✓
              </span>
            )}
          </div>

          <div
            className="
              text-sm
              text-zinc-400
            "
          >
            {author.fullName}
          </div>

          <div
            className="
              text-xs
              text-zinc-500
            "
          >
            {formattedDate}
          </div>
        </div>
      </Link>

      {showMenu && (
        <button
          type="button"
          onClick={
            onMenuClick
          }
          className="
            rounded-lg
            p-2
            text-zinc-400
            transition
            hover:bg-zinc-800
            hover:text-white
          "
        >
          ⋯
        </button>
      )}
    </div>
  );
}
"use client";

import type {
  Post,
} from "@/features/post/types/post.types";

interface PostGridItemProps {
  post: Post;

  onClick?: (
    post: Post
  ) => void;
}

export default function PostGridItem({
  post,
  onClick,
}: PostGridItemProps) {
  const firstMedia =
    post.media?.[0];

  const isVideo =
    firstMedia?.type ===
    "video";

  const hasMultipleMedia =
    post.media.length > 1;

  return (
    <button
      type="button"
      onClick={() =>
        onClick?.(post)
      }
      className="
        group
        relative
        aspect-square
        overflow-hidden
        bg-zinc-900
      "
    >
      {firstMedia ? (
        isVideo ? (
          <video
            src={
              firstMedia.url
            }
            muted
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <img
            src={
              firstMedia.url
            }
            alt="Post"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-300
              group-hover:scale-105
            "
          />
        )
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-zinc-900
            p-4
            text-center
            text-sm
            text-zinc-400
          "
        >
          {post.caption ||
            "Post"}
        </div>
      )}

      <div
        className="
          absolute
          inset-0
          bg-black/0
          transition
          duration-300
          group-hover:bg-black/20
        "
      />

      {isVideo && (
        <div
          className="
            absolute
            right-2
            top-2
            rounded-md
            bg-black/70
            px-2
            py-1
            text-xs
            text-white
          "
        >
          ▶
        </div>
      )}

      {hasMultipleMedia && (
        <div
          className="
            absolute
            left-2
            top-2
            rounded-md
            bg-black/70
            px-2
            py-1
            text-xs
            text-white
          "
        >
          ⧉
        </div>
      )}
    </button>
  );
}
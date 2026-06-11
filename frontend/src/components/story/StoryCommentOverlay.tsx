// src/components/story/StoryCommentOverlay.tsx

"use client";

import type {
  StoryComment,
} from "@/features/story/types/story.types";

interface StoryCommentOverlayProps {
  comments: StoryComment[];

  onClick?: () => void;
}

export default function StoryCommentOverlay({
  comments,
  onClick,
}: StoryCommentOverlayProps) {
  /**
   * Ambil 3 komentar terbaru
   *
   * Urutan:
   * Lama -> Baru
   *
   * index 0 = paling lama
   * index 2 = paling baru
   */

  const latestComments =
    comments.slice(-3);

  if (
    latestComments.length === 0
  ) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        flex-col
        gap-2
        text-left
      "
    >
      {latestComments.map(
        (
          comment,
          index
        ) => {
          const opacity =
            index === 0
              ? "opacity-40"
              : index === 1
              ? "opacity-70"
              : "opacity-100";

          return (
            <div
              key={
                comment._id
              }
              className={`
                max-w-[85%]
                rounded-2xl
                bg-black/25
                px-3
                py-2
                text-white
                backdrop-blur-md
                transition-all
                ${opacity}
              `}
            >
              <div
                className="
                  mb-0.5
                  text-xs
                  font-semibold
                "
              >
                {
                  comment
                    .author
                    .username
                }
              </div>

              <p
                className="
                  line-clamp-2
                  break-words
                  text-sm
                "
              >
                {
                  comment.content
                }
              </p>
            </div>
          );
        }
      )}

      <div
        className="
          mt-1
          text-xs
          text-zinc-300
        "
      >
        Tap to view all comments
      </div>
    </button>
  );
}
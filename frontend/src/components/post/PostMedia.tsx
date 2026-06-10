"use client";

import { useState } from "react";

import type {
  PostMedia as PostMediaType,
} from "@/features/post/types/post.types";

interface PostMediaProps {
  media: PostMediaType[];
}

export default function PostMedia({
  media,
}: PostMediaProps) {
  const [currentIndex, setCurrentIndex] =
    useState(0);

  if (!media.length) {
    return null;
  }

  const currentMedia =
    media[currentIndex];

  const isVideo =
    currentMedia.type === "video";

  const hasMultipleMedia =
    media.length > 1;

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? media.length - 1
        : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === media.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-xl
        border
        border-zinc-800
      "
    >
      {isVideo ? (
        <video
          src={currentMedia.url}
          controls
          playsInline
          className="
            w-full
            max-h-[700px]
            bg-black
          "
        />
      ) : (
        <img
          src={currentMedia.url}
          alt="Post media"
          className="
            w-full
            max-h-[700px]
            object-cover
          "
        />
      )}

      {hasMultipleMedia && (
        <>
          <button
            type="button"
            onClick={handlePrevious}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-black/60
              px-3
              py-2
              text-white
            "
          >
            ←
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-black/60
              px-3
              py-2
              text-white
            "
          >
            →
          </button>

          <div
            className="
              absolute
              bottom-3
              left-1/2
              -translate-x-1/2
              rounded-full
              bg-black/70
              px-3
              py-1
              text-xs
              text-white
            "
          >
            {currentIndex + 1} /{" "}
            {media.length}
          </div>
        </>
      )}
    </div>
  );
}
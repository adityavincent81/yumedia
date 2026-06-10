"use client";

import { useState } from "react";

interface PostCaptionProps {
  caption?: string;

  maxLength?: number;
}

export default function PostCaption({
  caption = "",
  maxLength = 180,
}: PostCaptionProps) {
  const [expanded, setExpanded] =
    useState(false);

  if (!caption.trim()) {
    return null;
  }

  const shouldTruncate =
    caption.length > maxLength;

  const displayedCaption =
    !expanded && shouldTruncate
      ? `${caption.slice(
          0,
          maxLength
        )}...`
      : caption;

  return (
    <div className="space-y-2">
      <p
        className="
          whitespace-pre-wrap
          break-words
          text-sm
          text-zinc-200
        "
      >
        {displayedCaption}
      </p>

      {shouldTruncate && (
        <button
          type="button"
          onClick={() =>
            setExpanded(
              !expanded
            )
          }
          className="
            text-sm
            text-zinc-400
            transition
            hover:text-white
          "
        >
          {expanded
            ? "Show less"
            : "Show more"}
        </button>
      )}
    </div>
  );
}
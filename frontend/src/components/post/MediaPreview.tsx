"use client";

import { useMemo } from "react";

interface MediaPreviewProps {
  files: File[];

  onRemove?: (
    index: number
  ) => void;
}

export default function MediaPreview({
  files,
  onRemove,
}: MediaPreviewProps) {
  const previews = useMemo(
    () =>
      files.map((file) => ({
        file,
        url:
          URL.createObjectURL(
            file
          ),
      })),
    [files]
  );

  if (!files.length) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-3
        md:grid-cols-3
      "
    >
      {previews.map(
        (
          preview,
          index
        ) => {
          const isVideo =
            preview.file.type.startsWith(
              "video/"
            );

          return (
            <div
              key={`${preview.file.name}-${index}`}
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
                  src={
                    preview.url
                  }
                  controls
                  className="
                    aspect-square
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <img
                  src={
                    preview.url
                  }
                  alt={
                    preview.file
                      .name
                  }
                  className="
                    aspect-square
                    h-full
                    w-full
                    object-cover
                  "
                />
              )}

              {onRemove && (
                <button
                  type="button"
                  onClick={() =>
                    onRemove(
                      index
                    )
                  }
                  className="
                    absolute
                    right-2
                    top-2
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-black/70
                    text-sm
                    text-white
                  "
                >
                  ✕
                </button>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
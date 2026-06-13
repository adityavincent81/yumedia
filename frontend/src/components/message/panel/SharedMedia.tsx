// src/components/message/panel/SharedMedia.tsx

"use client";

import Image from "next/image";

import {
  Images,
  Play,
} from "lucide-react";

interface SharedMediaItem {
  _id: string;

  type:
    | "image"
    | "video";

  url: string;
}

interface SharedMediaProps {
  media?: SharedMediaItem[];

  onMediaClick?: (
    media: SharedMediaItem
  ) => void;
}

export default function SharedMedia({
  media = [],

  onMediaClick,
}: SharedMediaProps) {
  return (
    <div
      className="
        border-b
        border-zinc-800

        p-4
      "
    >
      {/* Header */}

      <div
        className="
          mb-4

          flex
          items-center
          justify-between
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <Images
            size={16}
            className="
              text-zinc-400
            "
          />

          <h3
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            Shared Media
          </h3>
        </div>

        <button
          disabled
          className="
            text-xs
            text-zinc-500
          "
        >
          View All
        </button>
      </div>

      {/* Empty */}

      {media.length ===
        0 && (
        <div
          className="
            rounded-xl

            border
            border-dashed
            border-zinc-800

            p-6

            text-center
          "
        >
          <Images
            size={28}
            className="
              mx-auto
              mb-2

              text-zinc-700
            "
          />

          <p
            className="
              text-xs
              text-zinc-500
            "
          >
            No shared media
          </p>
        </div>
      )}

      {/* Grid */}

      {media.length >
        0 && (
        <div
          className="
            grid
            grid-cols-3

            gap-2
          "
        >
          {media
            .slice(0, 9)
            .map(
              (
                item
              ) => (
                <button
                  key={
                    item._id
                  }
                  type="button"
                  onClick={() =>
                    onMediaClick?.(
                      item
                    )
                  }
                  className="
                    relative

                    overflow-hidden

                    rounded-xl

                    aspect-square

                    bg-zinc-900
                  "
                >
                  <Image
                    src={
                      item.url
                    }
                    alt="Media"
                    fill
                    className="
                      object-cover
                    "
                  />

                  {item.type ===
                    "video" && (
                    <div
                      className="
                        absolute
                        inset-0

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <div
                        className="
                          rounded-full

                          bg-black/60

                          p-2

                          text-white
                        "
                      >
                        <Play
                          size={
                            14
                          }
                        />
                      </div>
                    </div>
                  )}
                </button>
              )
            )}
        </div>
      )}
    </div>
  );
}
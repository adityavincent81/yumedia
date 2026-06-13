// src/components/message/share/SharedStoryCard.tsx

"use client";

import Image from "next/image";

import {
  Clock3,
  Play,
  BookOpen,
} from "lucide-react";

interface SharedStoryCardProps {
  story?: {
    _id: string;

    type:
      | "image"
      | "video"
      | "text";

    text?: string;

    media?: {
      url?: string;
    };

    author?: {
      _id: string;

      username: string;

      fullName: string;

      avatar?: string;
    };

    expiresAt?: string;
  };

  onClick?: (
    storyId: string
  ) => void;
}

export default function SharedStoryCard({
  story,

  onClick,
}: SharedStoryCardProps) {
  if (!story) {
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

            text-purple-400
          "
        >
          Shared Story
        </div>

        <p
          className="
            text-sm
            text-zinc-400
          "
        >
          Story unavailable
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        onClick?.(
          story._id
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
        <BookOpen
          size={14}
          className="
            text-purple-400
          "
        />

        <span
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide

            text-purple-400
          "
        >
          Shared Story
        </span>
      </div>

      {/* Preview */}

      {story.type ===
        "image" &&
        story.media?.url && (
          <div
            className="
              px-4
              py-3
            "
          >
            <Image
              src={
                story.media.url
              }
              alt="Story"
              width={500}
              height={500}
              className="
                h-40
                w-full

                rounded-xl

                object-cover
              "
            />
          </div>
        )}

      {story.type ===
        "video" &&
        story.media?.url && (
          <div
            className="
              relative

              px-4
              py-3
            "
          >
            <Image
              src={
                story.media.url
              }
              alt="Story Video"
              width={500}
              height={500}
              className="
                h-40
                w-full

                rounded-xl

                object-cover
              "
            />

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

                  p-3

                  text-white
                "
              >
                <Play
                  size={18}
                />
              </div>
            </div>
          </div>
        )}

      {story.type ===
        "text" && (
          <div
            className="
              p-4
            "
          >
            <div
              className="
                rounded-xl

                bg-zinc-800

                p-4
              "
            >
              <p
                className="
                  line-clamp-4

                  text-sm
                "
              >
                {story.text ||
                  "Text Story"}
              </p>
            </div>
          </div>
        )}

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between

          px-4
          pb-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          {story.author
            ?.avatar ? (
            <Image
              src={
                story.author
                  .avatar
              }
              alt={
                story.author
                  .fullName
              }
              width={24}
              height={24}
              className="
                rounded-full
              "
            />
          ) : (
            <div
              className="
                flex
                h-6
                w-6

                items-center
                justify-center

                rounded-full

                bg-zinc-700

                text-[10px]
                font-semibold
              "
            >
              {story.author?.fullName?.charAt(
                0
              ) || "U"}
            </div>
          )}

          <span
            className="
              text-xs
              text-zinc-400
            "
          >
            {story.author
              ?.fullName ||
              "Unknown User"}
          </span>
        </div>

        <div
          className="
            flex
            items-center
            gap-1

            text-xs
            text-zinc-500
          "
        >
          <Clock3
            size={12}
          />

          <span>
            View Story
          </span>
        </div>
      </div>
    </button>
  );
}
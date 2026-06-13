// src/components/message/modals/ShareStoryModal.tsx

"use client";

import Image from "next/image";

import {
  Search,
  X,
  Send,
  BookOpen,
  Play,
  Clock3,
} from "lucide-react";

interface ShareStoryModalProps {
  open: boolean;

  onClose: () => void;

  onShare?: (
    storyId: string,
    conversationIds: string[]
  ) => void;
}

export default function ShareStoryModal({
  open,

  onClose,

  onShare,
}: ShareStoryModalProps) {
  if (!open) {
    return null;
  }

  /**
   * Dummy Story
   * Replace with real story later
   */

  const story = {
    _id: "story-1",

    type: "image",

    media:
      "https://placehold.co/400x700",

    text: "Welcome to Yumedia Stories 🚀",

    author: {
      fullName:
        "Vincent",
    },

    expiresAt:
      "24 hours",
  };

  const conversations = [
    {
      _id: "1",

      name: "John Doe",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "2",

      name: "Frontend Team",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "3",

      name: "Campus Community",

      avatar:
        "https://placehold.co/100",
    },
  ];

  return (
    <div
      className="
        fixed
        inset-0

        z-[100]

        flex
        items-center
        justify-center

        bg-black/70

        p-4
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-2xl
          flex-col

          overflow-hidden

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-950
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-zinc-800

            px-5
            py-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            Share Story
          </h2>

          <button
            onClick={
              onClose
            }
            className="
              rounded-xl

              p-2

              text-zinc-400

              hover:bg-zinc-900
            "
          >
            <X
              size={18}
            />
          </button>
        </div>

        {/* Story Preview */}

        <div
          className="
            border-b
            border-zinc-800

            p-4
          "
        >
          <div
            className="
              mb-3

              flex
              items-center
              gap-2

              text-xs
              font-semibold
              uppercase

              text-purple-400
            "
          >
            <BookOpen
              size={14}
            />

            Shared Story
          </div>

          <div
            className="
              flex
              gap-4
            "
          >
            <div
              className="
                relative

                h-48
                w-28

                shrink-0

                overflow-hidden

                rounded-2xl
              "
            >
              <Image
                src={
                  story.media
                }
                alt="Story"
                fill
                className="
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/70
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  bottom-2
                  left-2
                "
              >
                <Play
                  size={14}
                  className="
                    text-white
                  "
                />
              </div>
            </div>

            <div
              className="
                flex-1
              "
            >
              <p
                className="
                  text-sm
                  text-white
                "
              >
                {
                  story.text
                }
              </p>

              <p
                className="
                  mt-3

                  text-xs
                  text-zinc-500
                "
              >
                by{" "}
                {
                  story.author
                    .fullName
                }
              </p>

              <div
                className="
                  mt-2

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
                  Expires in{" "}
                  {
                    story.expiresAt
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}

        <div
          className="
            border-b
            border-zinc-800

            p-4
          "
        >
          <div
            className="
              relative
            "
          >
            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2

                -translate-y-1/2

                text-zinc-500
              "
            />

            <input
              placeholder="Search conversation..."
              className="
                w-full

                rounded-xl

                border
                border-zinc-800

                bg-zinc-900

                py-2.5
                pl-10
                pr-4

                text-sm
                text-white

                outline-none
              "
            />
          </div>
        </div>

        {/* Conversations */}

        <div
          className="
            flex-1
            overflow-y-auto

            p-3
          "
        >
          <div
            className="
              space-y-2
            "
          >
            {conversations.map(
              (
                conversation
              ) => (
                <button
                  key={
                    conversation._id
                  }
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    rounded-2xl

                    border
                    border-zinc-800

                    p-3

                    text-left

                    transition-colors

                    hover:bg-zinc-900
                  "
                >
                  <Image
                    src={
                      conversation.avatar
                    }
                    alt={
                      conversation.name
                    }
                    width={42}
                    height={42}
                    className="
                      rounded-full
                    "
                  />

                  <div
                    className="
                      flex-1
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {
                        conversation.name
                      }
                    </p>
                  </div>

                  <div
                    className="
                      h-5
                      w-5

                      rounded-full

                      border
                      border-zinc-700
                    "
                  />
                </button>
              )
            )}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-zinc-800

            p-4
          "
        >
          <button
            disabled
            onClick={() =>
              onShare?.(
                story._id,
                []
              )
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-white

              px-4
              py-3

              font-medium
              text-black

              opacity-60
            "
          >
            <Send
              size={16}
            />

            Share Story
          </button>

          <p
            className="
              mt-2

              text-center
              text-xs
              text-zinc-500
            "
          >
            Story sharing flow
            will be activated in V2
          </p>
        </div>
      </div>
    </div>
  );
}
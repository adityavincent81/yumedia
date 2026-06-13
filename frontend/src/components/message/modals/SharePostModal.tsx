// src/components/message/modals/SharePostModal.tsx

"use client";

import Image from "next/image";

import {
  Search,
  X,
  Send,
  FileText,
} from "lucide-react";

interface SharePostModalProps {
  open: boolean;

  onClose: () => void;

  onShare?: (
    postId: string,
    conversationIds: string[]
  ) => void;
}

export default function SharePostModal({
  open,

  onClose,

  onShare,
}: SharePostModalProps) {
  if (!open) {
    return null;
  }

  /**
   * Dummy Data
   * Replace later
   */

  const post = {
    _id: "post-1",

    content:
      "Welcome to Yumedia Campus Social Platform 🚀",

    media:
      "https://placehold.co/600x400",

    author: {
      fullName:
        "Vincent",
    },
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

      name: "UI Team",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "3",

      name: "Backend Team",

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
            Share Post
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

        {/* Post Preview */}

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

              flex
              items-center
              gap-2

              text-xs
              font-semibold
              uppercase

              text-sky-400
            "
          >
            <FileText
              size={14}
            />
            Shared Post
          </div>

          <div
            className="
              overflow-hidden

              rounded-2xl

              border
              border-zinc-800
            "
          >
            <Image
              src={
                post.media
              }
              alt="Post"
              width={600}
              height={400}
              className="
                h-40
                w-full

                object-cover
              "
            />

            <div
              className="
                p-4
              "
            >
              <p
                className="
                  text-sm
                  text-white
                "
              >
                {
                  post.content
                }
              </p>

              <p
                className="
                  mt-2

                  text-xs
                  text-zinc-500
                "
              >
                by{" "}
                {
                  post.author
                    .fullName
                }
              </p>
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
                post._id,
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
            Share Post
          </button>

          <p
            className="
              mt-2

              text-center
              text-xs
              text-zinc-500
            "
          >
            Multi-select conversation
            coming in V2
          </p>
        </div>
      </div>
    </div>
  );
}
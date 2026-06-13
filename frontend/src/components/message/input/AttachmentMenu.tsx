// src/components/message/input/AttachmentMenu.tsx

"use client";

import {
  ImageIcon,
  Paperclip,
  FileVideo,
  FileAudio,
  BookOpen,
  FileText,
} from "lucide-react";

interface AttachmentMenuProps {
  onImage?: () => void;

  onVideo?: () => void;

  onFile?: () => void;

  onAudio?: () => void;

  onShareStory?: () => void;

  onSharePost?: () => void;

  isOpen: boolean;
}

export default function AttachmentMenu({
  onImage,

  onVideo,

  onFile,

  onAudio,

  onShareStory,

  onSharePost,

  isOpen,
}: AttachmentMenuProps) {
  if (!isOpen) {
    return null;
  }

  const items = [
    {
      label: "Image",

      icon: ImageIcon,

      onClick: onImage,

      enabled: true,
    },

    {
      label: "Video",

      icon: FileVideo,

      onClick: onVideo,

      enabled: true,
    },

    {
      label: "File",

      icon: Paperclip,

      onClick: onFile,

      enabled: true,
    },

    {
      label: "Audio",

      icon: FileAudio,

      onClick: onAudio,

      enabled: false,
    },

    /**
     * Share Story
     */

    {
      label: "Share Story",

      icon: BookOpen,

      onClick: onShareStory,

      enabled: false,
    },

    /**
     * Share Post
     */

    {
      label: "Share Post",

      icon: FileText,

      onClick: onSharePost,

      enabled: false,
    },
  ];

  return (
    <div
      className="
        absolute
        bottom-16
        left-0

        z-50

        w-56

        overflow-hidden

        rounded-2xl

        border
        border-zinc-800

        bg-zinc-950

        shadow-xl
      "
    >
      <div
        className="
          p-2
        "
      >
        {items.map(
          (
            item
          ) => {
            const Icon =
              item.icon;

            return (
              <button
                key={
                  item.label
                }
                type="button"
                disabled={
                  !item.enabled
                }
                title={
                  item.enabled
                    ? item.label
                    : "Coming Soon"
                }
                onClick={
                  item.onClick
                }
                className={`
                  flex
                  w-full
                  items-center
                  gap-3

                  rounded-xl

                  px-3
                  py-2.5

                  text-sm

                  transition-colors

                  ${
                    item.enabled
                      ? `
                        text-white

                        hover:bg-zinc-900
                      `
                      : `
                        cursor-not-allowed

                        text-zinc-500
                      `
                  }
                `}
              >
                <Icon
                  size={16}
                />

                <span>
                  {
                    item.label
                  }
                </span>
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
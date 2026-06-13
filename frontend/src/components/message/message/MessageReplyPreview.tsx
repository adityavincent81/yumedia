// src/components/message/message/MessageReplyPreview.tsx

"use client";

import {
  CornerUpLeft,
  X,
  ImageIcon,
  FileText,
  Play,
} from "lucide-react";

interface MessageReplyPreviewProps {
  message?: {
    _id: string;

    text?: string;

    sender?: {
      fullName?: string;
    };

    type?:
      | "text"
      | "image"
      | "video"
      | "file"
      | "story"
      | "post";
  };

  onCancel?: () => void;
}

export default function MessageReplyPreview({
  message,

  onCancel,
}: MessageReplyPreviewProps) {
  if (!message) {
    return null;
  }

  const getPreview = () => {
    switch (
      message.type
    ) {
      case "image":
        return {
          icon: (
            <ImageIcon
              size={14}
            />
          ),

          text: "Photo",
        };

      case "video":
        return {
          icon: (
            <Play
              size={14}
            />
          ),

          text: "Video",
        };

      case "file":
        return {
          icon: (
            <FileText
              size={14}
            />
          ),

          text: "File",
        };

      case "story":
        return {
          icon: (
            <CornerUpLeft
              size={14}
            />
          ),

          text: "Shared Story",
        };

      case "post":
        return {
          icon: (
            <CornerUpLeft
              size={14}
            />
          ),

          text: "Shared Post",
        };

      default:
        return {
          icon: null,

          text:
            message.text ||
            "Message",
        };
    }
  };

  const preview =
    getPreview();

  return (
    <div
      className="
        mb-3

        flex
        items-start
        justify-between
        gap-3

        rounded-xl

        border
        border-zinc-800

        bg-zinc-900

        p-3
      "
    >
      {/* Left */}

      <div
        className="
          flex
          min-w-0
          flex-1
          gap-3
        "
      >
        <div
          className="
            mt-0.5

            text-zinc-500
          "
        >
          <CornerUpLeft
            size={14}
          />
        </div>

        <div
          className="
            min-w-0
          "
        >
          <p
            className="
              text-xs
              font-medium

              text-sky-400
            "
          >
            Replying to{" "}
            {message.sender
              ?.fullName ||
              "User"}
          </p>

          <div
            className="
              mt-1

              flex
              items-center
              gap-2

              text-xs
              text-zinc-400
            "
          >
            {preview.icon}

            <span
              className="
                truncate
              "
            >
              {
                preview.text
              }
            </span>
          </div>
        </div>
      </div>

      {/* Close */}

      <button
        type="button"
        onClick={
          onCancel
        }
        className="
          shrink-0

          rounded-lg

          p-1

          text-zinc-500

          transition-colors

          hover:bg-zinc-800
          hover:text-white
        "
      >
        <X
          size={14}
        />
      </button>
    </div>
  );
}
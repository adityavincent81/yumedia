// src/components/message/message/MessageAttachment.tsx

"use client";

import Image from "next/image";

import {
  FileText,
  Play,
  Download,
} from "lucide-react";

import type {
  Message,
} from "@/features/message/types/message.types";

interface MessageAttachmentProps {
  message: Message;
}

export default function MessageAttachment({
  message,
}: MessageAttachmentProps) {
  /**
   * No Attachment
   */

  if (
    !message.media?.url
  ) {
    return null;
  }

  /**
   * Image
   */

  if (
    message.type ===
    "image"
  ) {
    return (
      <Image
        src={
          message.media.url
        }
        alt="Attachment"
        width={800}
        height={800}
        className="
          max-h-[420px]
          w-full

          object-cover
        "
      />
    );
  }

  /**
   * Video
   */

  if (
    message.type ===
    "video"
  ) {
    return (
      <div
        className="
          relative
        "
      >
        <video
          controls
          className="
            max-h-[420px]
            w-full
          "
        >
          <source
            src={
              message.media.url
            }
          />
        </video>

        <div
          className="
            absolute
            left-3
            top-3

            rounded-full

            bg-black/60

            p-2

            text-white
          "
        >
          <Play
            size={14}
          />
        </div>
      </div>
    );
  }

  /**
   * Audio
   */

  if (
    message.type ===
    "audio"
  ) {
    return (
      <div
        className="
          p-3
        "
      >
        <audio
          controls
          className="
            w-full
          "
        >
          <source
            src={
              message.media.url
            }
          />
        </audio>
      </div>
    );
  }

  /**
   * File
   */

  if (
    message.type ===
    "file"
  ) {
    return (
      <a
        href={
          message.media.url
        }
        target="_blank"
        rel="noreferrer"
        className="
          flex
          items-center
          gap-3

          p-4

          transition-colors

          hover:bg-zinc-800/50
        "
      >
        <div
          className="
            flex
            h-10
            w-10

            items-center
            justify-center

            rounded-xl

            bg-zinc-800
          "
        >
          <FileText
            size={18}
          />
        </div>

        <div
          className="
            min-w-0
            flex-1
          "
        >
          <p
            className="
              truncate

              text-sm
              font-medium
            "
          >
            {message
              .media
              .filename ||
              "File"}
          </p>

          <p
            className="
              text-xs
              text-zinc-500
            "
          >
            Click to download
          </p>
        </div>

        <Download
          size={16}
        />
      </a>
    );
  }

  return null;
}
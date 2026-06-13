// src/components/message/message/MessageBubble.tsx

"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Message,
} from "@/features/message/types/message.types";

import MessageAttachment from "./MessageAttachment";
import MessageMeta from "./MessageMeta";
import MessageReactionBar from "./MessageReactionBar";
import MessageReplyPreview from "./MessageReplyPreview";

import SharedStoryCard from "../share/SharedStoryCard";
import SharedPostCard from "../share/SharedPostCard";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({
  message,
}: MessageBubbleProps) {
  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const isMine =
    message.sender?._id ===
    currentUser?._id;

  const repliedMessage =
    (message as any)
      ?.replyTo;

  const reactions =
    (message as any)
      ?.reactions || [];

  return (
    <div
      className={`
        flex
        w-full

        ${
          isMine
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      <div
        className="
          relative
        "
      >

        {/* Bubble */}

        <div
          className={`
            relative
            z-10

            max-w-[420px]

            overflow-hidden

            shadow-sm

            ${
              isMine
                ? `
                  rounded-2xl
                  rounded-br-md

                  border
                  border-amber-50/50
                  bg-blue-600/30
                

                  text-white
                `
                : `
                  rounded-2xl
                  rounded-bl-md

                  border
                  border-amber-50/50

                  bg-zinc-800/30

                  text-white
                `
            }
          `}
        >
          {/* Reply Preview */}

          {repliedMessage && (
            <div
              className="
                px-3
                pt-3
              "
            >
              <MessageReplyPreview
                message={
                  repliedMessage
                }
              />
            </div>
          )}

          {/* Attachment */}

          <MessageAttachment
            message={message}
          />

          {/* Shared Story */}

          {message.type ===
            "story" && (
            <SharedStoryCard
              story={
                (
                  message as any
                ).story
              }
            />
          )}

          {/* Shared Post */}

          {message.type ===
            "post" && (
            <SharedPostCard
              post={
                (
                  message as any
                ).post
              }
            />
          )}

          {/* Text */}

          {message.text && (
            <div
              className="
                whitespace-pre-wrap
                break-words

                px-4
                py-3

                text-sm
                leading-relaxed
              "
            >
              {message.text}
            </div>
          )}

          {/* Reactions */}

          {reactions.length >
            0 && (
            <div
              className="
                px-3
                pb-2
              "
            >
              <MessageReactionBar
                reactions={
                  reactions
                }
              />
            </div>
          )}

          {/* Footer */}

          <div
            className="
              px-3
              pb-2
            "
          >
            <MessageMeta
              createdAt={
                message.createdAt
              }
              isMine={isMine}
              status={
                message.isRead
                  ? "read"
                  : "sent"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
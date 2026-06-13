// src/components/message/message/MessageList.tsx

"use client";

import {
  useEffect,
  useRef,
} from "react";

import { useMessage } from "@/features/message/hooks/useMessage";
import { useAuthStore } from "@/features/auth/store/auth.store";

import MessageBubble from "./MessageBubble";
import MessageAvatar from "./MessageAvatar";

import MessageSkeleton from "../skeleton/MessageSkeleton";

interface MessageListProps {
  conversationId: string;
}

export default function MessageList({
  conversationId,
}: MessageListProps) {
  const {
    getConversationMessages,

    messagesLoading,
  } = useMessage();

  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const bottomRef =
    useRef<HTMLDivElement>(
      null
    );

  const messages =
    getConversationMessages(
      conversationId
    );

  /**
   * Auto Scroll
   */

  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [messages]);

  if (
    messagesLoading
  ) {
    return (
      <div
        className="
          flex
          h-full
          flex-col
          gap-4

          overflow-y-auto

          p-4
        "
      >
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
        <MessageSkeleton />
      </div>
    );
  }

  if (
    messages.length === 0
  ) {
    return (
      <div
        className="
          flex
          h-full
          flex-col
          items-center
          justify-center

          px-6
          text-center
        "
      >
        <div
          className="
            mb-4

            text-5xl
          "
        >
          💬
        </div>

        <h3
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          No Messages Yet
        </h3>

        <p
          className="
            mt-2
            text-sm
            text-zinc-500
          "
        >
          Start the conversation
          by sending the first
          message.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        h-full
        overflow-y-auto
      "
    >
      <div
        className="
          flex
          min-h-full
          flex-col

          gap-3

          px-4
          py-6
        "
      >
        {messages.map(
          (
            message,
            index
          ) => {
            const isMine =
              message.sender?._id ===
              currentUser?._id;

            const previousMessage =
              messages[
                index - 1
              ];

            const showAvatar =
              !isMine &&
              (
                !previousMessage ||
                previousMessage
                  .sender?._id !==
                  message.sender
                    ?._id
              );

            return (
              <div
                key={
                  message._id
                }
                className={`
                  flex
                  items-start
                  gap-2

                  ${
                    isMine
                      ? "justify-end"
                      : "justify-start"
                  }
                `}
              >
                {!isMine && (
                  <div
                    className="
                      w-9
                      shrink-0
                    "
                  >
                    {showAvatar ? (
                      <MessageAvatar
                        avatar={
                          message
                            .sender
                            ?.avatar ?? undefined
                        }
                        fullName={
                          message
                            .sender
                            ?.fullName
                        }
                      />
                    ) : null}
                  </div>
                )}

                <MessageBubble
                  message={
                    message
                  }
                />
              </div>
            );
          }
        )}

        <div
          ref={bottomRef}
        />
      </div>
    </div>
  );
}
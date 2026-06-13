// src/components/message/conversation/ConversationItem.tsx

"use client";

import Image from "next/image";

import { useMemo } from "react";

import { Check, CheckCheck } from "lucide-react";

import { useMessage } from "@/features/message/hooks/useMessage";
import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Conversation,
  Message,
} from "@/features/message/types/message.types";

interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({
  conversation,
}: ConversationItemProps) {
  const {
    selectedConversation,

    setSelectedConversation,
  } = useMessage();

  const isActive =
    selectedConversation?._id ===
    conversation._id;

  const currentUser =
  useAuthStore(
    (state) => state.user
  );

const otherParticipant =
  useMemo(() => {
    return (
      conversation.participants?.find(
        (
          participant
        ) =>
          participant._id !==
          currentUser?._id
      ) ||
      conversation
        .participants?.[0]
    );
  }, [
    conversation,
    currentUser,
  ]);

  const avatarUrl =
  otherParticipant?.avatar?.url;

  const lastMessage =
    conversation.lastMessage as
      | Message
      | undefined;

  const previewText =
    useMemo(() => {
      if (
        !lastMessage
      ) {
        return (
          "Start a conversation"
        );
      }

      switch (
        lastMessage.type
      ) {
        case "image":
          return "📷 Photo";

        case "video":
          return "🎥 Video";

        case "audio":
          return "🎤 Voice Message";

        case "file":
          return "📄 File";

        case "story":
          return "📖 Shared Story";

        case "post":
          return "📰 Shared Post";

        default:
          return (
            lastMessage.text ||
            "Message"
          );
      }
    }, [lastMessage]);

  const formattedTime =
    useMemo(() => {
      if (
        !conversation.lastMessageAt
      ) {
        return "";
      }

      const date =
        new Date(
          conversation.lastMessageAt
        );

      return date.toLocaleTimeString(
        [],
        {
          hour:
            "2-digit",

          minute:
            "2-digit",
        }
      );
    }, [
      conversation.lastMessageAt,
    ]);

    

  return (
    <button
      onClick={() =>
        setSelectedConversation(
          conversation
        )
      }
      className={`
        group
        mb-1
        flex
        w-full
        items-center
        gap-3

        rounded-2xl
        p-3

        text-left

        transition-all

        ${
          isActive
            ? `
              bg-zinc-900
            `
            : `
              hover:bg-zinc-900/50
            `
        }
      `}
    >
      {/* Avatar */}

      <div
        className="
          relative
          shrink-0
        "
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={
              otherParticipant?.username ||
              "User"
            }
            width={48}
            height={48}
            className="
              h-12
              w-12
              rounded-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-full
              bg-zinc-800

              text-sm
              font-semibold
              text-white
            "
          >
            {otherParticipant?.fullName?.charAt(
              0
            ) || "U"}
          </div>
        )}

        {/* Online Status V2 */}

        <div
          className="
            absolute
            bottom-0
            right-0

            h-3
            w-3

            rounded-full
            border-2
            border-zinc-950

            bg-emerald-500
          "
        />
      </div>

      {/* Content */}

      <div
        className="
          min-w-0
          flex-1
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >
          <div
            className="
              truncate

              text-sm
              font-medium
              text-white
            "
          >
            {otherParticipant
              ?.fullName ||
              "Unknown User"}
          </div>

          <span
            className="
              shrink-0

              text-xs
              text-zinc-500
            "
          >
            {
              formattedTime
            }
          </span>
        </div>

        <div
          className="
            mt-1
            flex
            items-center
            gap-1
          "
        >
          {/* Read Status */}

          {lastMessage && (
            <span
              className="
                shrink-0
                text-zinc-500
              "
            >
              {lastMessage.isRead ? (
                <CheckCheck
                  size={14}
                />
              ) : (
                <Check
                  size={14}
                />
              )}
            </span>
          )}

          <p
            className="
              truncate

              text-xs
              text-zinc-500
            "
          >
            {previewText}
          </p>
        </div>
      </div>

      {/* Unread Badge */}

      {!!conversation.unreadCount &&
        conversation.unreadCount >
          0 && (
          <div
            className="
              flex
              h-5
              min-w-[20px]
              items-center
              justify-center

              rounded-full
              bg-white

              px-1.5

              text-[10px]
              font-semibold
              text-black
            "
          >
            {
              conversation.unreadCount
            }
          </div>
        )}
    </button>
  );
}
// src/components/message/header/ChatHeader.tsx

"use client";

import Image from "next/image";

import { useMemo } from "react";

import {
  ShieldCheck,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Conversation,
} from "@/features/message/types/message.types";

import UserPresence from "./UserPresence";
import ChatHeaderActions from "./ChatHeaderActions";

interface ChatHeaderProps {
  conversation: Conversation;
}

export default function ChatHeader({
  conversation,
}: ChatHeaderProps) {
  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const participant =
    useMemo(() => {
      return (
        conversation.participants?.find(
          (user) =>
            user._id !==
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
    participant?.avatar?.url;

  return (
    <header
      className="
        flex
        h-16
        shrink-0
        items-center
        justify-between

        border-b
        border-zinc-800

        px-4
      "
    >
      {/* Left */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-3
        "
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
                participant?.fullName ??
                "User"
              }
              width={44}
              height={44}
              className="
                h-11
                w-11

                rounded-full

                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-zinc-800

                font-semibold
                text-white
              "
            >
              {participant?.fullName?.charAt(
                0
              ) ?? "U"}
            </div>
          )}

          {/* Presence Badge */}

          <div
            className="
              absolute
              bottom-0
              right-0
            "
          >
            <UserPresence
              status="online"
              showLabel={false}
            />
          </div>
        </div>

        {/* User Info */}

        <div
          className="
            min-w-0
          "
        >
          <div
            className="
              flex
              items-center
              gap-1.5
            "
          >
            <h2
              className="
                truncate

                text-sm
                font-semibold
                text-white
              "
            >
              {participant?.fullName ??
                "Unknown User"}
            </h2>

            {participant?.isVerified && (
              <ShieldCheck
                size={14}
                className="
                  text-sky-500
                "
              />
            )}
          </div>

          <UserPresence
            status="online"
          />
        </div>
      </div>

      {/* Actions */}

      <ChatHeaderActions />
    </header>
  );
}
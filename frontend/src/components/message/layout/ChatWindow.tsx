// src/components/message/layout/ChatWindow.tsx

"use client";

import {
  useEffect,
  useState,
} from "react";

import { useMessage } from "@/features/message/hooks/useMessage";

import { useMessageSocket } from "@/features/message/providers/MessageSocketProvider";

import ChatHeader from "../header/ChatHeader";

import MessageList from "../message/MessageList";

import MessageInput from "../input/MessageInput";

import TypingIndicator from "../typing/TypingIndicator";

import EmptyConversation from "../conversation/EmptyConversation";

import SharePostModal from "../modals/SharePostModal";

import ShareStoryModal from "../modals/ShareStoryModal";

import CreateGroupModal from "../modals/CreateGroupModal";

export default function ChatWindow() {
  const {
    selectedConversation,

    getMessages,

    markRead,

    getTypingUsers,
  } = useMessage();

  const {
    joinConversation,

    leaveConversation,
  } = useMessageSocket();

  /**
   * Future Modals
   */

  const [
    isSharePostOpen,
    setIsSharePostOpen,
  ] = useState(false);

  const [
    isShareStoryOpen,
    setIsShareStoryOpen,
  ] = useState(false);

  const [
    isCreateGroupOpen,
    setIsCreateGroupOpen,
  ] = useState(false);

  /**
   * Load Messages
   */

  useEffect(() => {
    if (
      !selectedConversation
    ) {
      return;
    }

    getMessages(
      selectedConversation._id
    );

    markRead(
      selectedConversation._id
    );
  }, [
    selectedConversation,
    getMessages,
    markRead,
  ]);

  /**
   * Join Socket Room
   */

  useEffect(() => {
    if (
      !selectedConversation
    ) {
      return;
    }

    joinConversation(
      selectedConversation._id
    );

    return () => {
      leaveConversation(
        selectedConversation._id
      );
    };
  }, [
    selectedConversation,
    joinConversation,
    leaveConversation,
  ]);

  /**
   * Empty State
   */

  if (
    !selectedConversation
  ) {
    return (
      <EmptyConversation />
    );
  }

  const typingUsers =
    getTypingUsers(
      selectedConversation._id
    );

  return (
    <>
      <div
        className="
          flex
          h-full
          flex-col

          bg-zinc-950
        "
      >
        {/* Header */}

        <ChatHeader
          conversation={
            selectedConversation
          }
        />

        {/* Messages */}

        <div
          className="
            min-h-0
            flex-1
            overflow-hidden
          "
        >
          <MessageList
            conversationId={
              selectedConversation._id
            }
          />
        </div>

        {/* Typing */}

        {typingUsers.length >
          0 && (
          <TypingIndicator
            users={
              typingUsers
            }
          />
        )}

        {/* Input */}

        <MessageInput
          conversationId={
            selectedConversation._id
          }
        />
      </div>

      {/* ========================= */}
      {/* Future Modals */}
      {/* ========================= */}

      <SharePostModal
        open={
          isSharePostOpen
        }
        onClose={() =>
          setIsSharePostOpen(
            false
          )
        }
      />

      <ShareStoryModal
        open={
          isShareStoryOpen
        }
        onClose={() =>
          setIsShareStoryOpen(
            false
          )
        }
      />

      <CreateGroupModal
        open={
          isCreateGroupOpen
        }
        onClose={() =>
          setIsCreateGroupOpen(
            false
          )
        }
      />
    </>
  );
}
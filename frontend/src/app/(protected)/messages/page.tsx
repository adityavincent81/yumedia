// src/app/(protected)/messages/page.tsx

"use client";

import {
  useEffect,
} from "react";

import ChatLayout from "@/components/message/layout/ChatLayout";

import {
  MessageSocketProvider,
} from "@/features/message/providers/MessageSocketProvider";

import {
  useMessage,
} from "@/features/message/hooks/useMessage";

function MessagesContent() {
  const {
    getConversations,
  } = useMessage();

  useEffect(() => {
    getConversations();
  }, [getConversations]);

  return (
    <div
      className="
        h-full
        p-4
      "
    >
      <ChatLayout />
    </div>
  );
}

export default function MessagesPage() {
  return (
    <MessageSocketProvider>
      <MessagesContent />
    </MessageSocketProvider>
  );
}
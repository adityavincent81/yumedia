// src/features/message/hooks/useMessage.ts

"use client";

import { useCallback } from "react";

import { useMessageStore } from "../store/message.store";

import type {
  Conversation,
  CreateConversationPayload,
  Message,
  SendMessagePayload,
  TypingUser,
} from "../types/message.types";

export function useMessage() {
  const conversations =
    useMessageStore(
      (state) =>
        state.conversations
    );

  const selectedConversation =
    useMessageStore(
      (state) =>
        state.selectedConversation
    );

  const messages =
    useMessageStore(
      (state) =>
        state.messages
    );

  const typingUsers =
    useMessageStore(
      (state) =>
        state.typingUsers
    );

  const loading =
    useMessageStore(
      (state) =>
        state.loading
    );

  const conversationsLoading =
    useMessageStore(
      (state) =>
        state.conversationsLoading
    );

  const messagesLoading =
    useMessageStore(
      (state) =>
        state.messagesLoading
    );

  const sending =
    useMessageStore(
      (state) =>
        state.sending
    );

  const setSelectedConversation =
    useMessageStore(
      (state) =>
        state.setSelectedConversation
    );

  const createConversation =
    useMessageStore(
      (state) =>
        state.createConversation
    );

  const getConversations =
    useMessageStore(
      (state) =>
        state.getConversations
    );

  const getConversation =
    useMessageStore(
      (state) =>
        state.getConversation
    );

  const getMessages =
    useMessageStore(
      (state) =>
        state.getMessages
    );

  const sendMessage =
    useMessageStore(
      (state) =>
        state.sendMessage
    );

  const markRead =
    useMessageStore(
      (state) =>
        state.markRead
    );

  const deleteMessage =
    useMessageStore(
      (state) =>
        state.deleteMessage
    );

  const addMessage =
    useMessageStore(
      (state) =>
        state.addMessage
    );

  const updateMessageRead =
    useMessageStore(
      (state) =>
        state.updateMessageRead
    );

    const updateConversation =
  useMessageStore(
    (state) =>
      state.updateConversation
  );

  const setTyping =
    useMessageStore(
      (state) =>
        state.setTyping
    );

  const removeTyping =
    useMessageStore(
      (state) =>
        state.removeTyping
    );

  const reset =
    useMessageStore(
      (state) =>
        state.reset
    );

  /**
   * Helpers
   */

  const getConversationMessages =
    useCallback(
      (
        conversationId?: string
      ): Message[] => {
        if (
          !conversationId
        ) {
          return [];
        }

        return (
          messages[
            conversationId
          ] || []
        );
      },
      [messages]
    );

  const getTypingUsers =
    useCallback(
      (
        conversationId?: string
      ): TypingUser[] => {
        if (
          !conversationId
        ) {
          return [];
        }

        return (
          typingUsers[
            conversationId
          ] || []
        );
      },
      [typingUsers]
    );

  const hasMessages =
    useCallback(
      (
        conversationId?: string
      ) => {
        return (
          getConversationMessages(
            conversationId
          ).length > 0
        );
      },
      [
        getConversationMessages,
      ]
    );

  const isTyping =
    useCallback(
      (
        conversationId?: string
      ) => {
        return (
          getTypingUsers(
            conversationId
          ).length > 0
        );
      },
      [getTypingUsers]
    );

  return {
    /**
     * State
     */

    conversations,

    selectedConversation,

    messages,

    typingUsers,

    loading,

    conversationsLoading,

    messagesLoading,

    sending,

    /**
     * Helpers
     */

    getConversationMessages,

    getTypingUsers,

    hasMessages,

    isTyping,

    /**
     * Actions
     */

    setSelectedConversation,

    createConversation: (
      payload:
        CreateConversationPayload
    ): Promise<Conversation> =>
      createConversation(
        payload
      ),

    getConversations,

    getConversation,

    getMessages,

    sendMessage: (
      conversationId: string,
      payload: SendMessagePayload
    ): Promise<Message> =>
      sendMessage(
        conversationId,
        payload
      ),

    markRead,

    deleteMessage,

    /**
     * Socket Actions
     */

    addMessage,

    updateMessageRead,
    
    updateConversation,

    setTyping,

    removeTyping,

    /**
     * Reset
     */

    reset,
  };
}
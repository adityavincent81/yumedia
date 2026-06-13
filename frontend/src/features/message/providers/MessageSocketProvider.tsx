"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import { socket } from "@/lib/socket";

import {
  MESSAGE_EVENTS,
} from "../constants/message.constants";

import { useMessageStore } from "../store/message.store";

import type {
  Message,
  MessageReadEvent,
  TypingEvent,
  Conversation,
} from "../types/message.types";

interface MessageSocketContextValue {
  joinConversation: (
    conversationId: string
  ) => void;

  leaveConversation: (
    conversationId: string
  ) => void;

  startTyping: (
    conversationId: string,
    user: {
      _id: string;
      username: string;
      avatar?: string;
    }
  ) => void;

  stopTyping: (
    conversationId: string,
    user: {
      _id: string;
      username: string;
      avatar?: string;
    }
  ) => void;

  markRead: (
    conversationId: string,
    userId: string
  ) => void;
}

const MessageSocketContext =
  createContext<
    MessageSocketContextValue | undefined
  >(undefined);

interface Props {
  children: ReactNode;
}

interface ConversationUpdatedPayload {
  conversationId: string;

  conversation: Conversation;

  lastMessage?: Message;
}

export function MessageSocketProvider({
  children,
}: Props) {
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

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    /**
     * New Message
     */

    const handleNewMessage =
      (
        message: Message
      ) => {
        addMessage(
          message
        );
      };

    /**
     * Read Receipt
     */

    const handleMessageRead =
      (
        payload: MessageReadEvent
      ) => {
        updateMessageRead(
          payload.conversationId,
          payload.userId
        );
      };

    /**
     * Conversation Update
     */

    const handleConversationUpdated =
      (
        payload: ConversationUpdatedPayload
      ) => {
        updateConversation(
          payload.conversation
        );
      };

    /**
     * Typing
     */

    const handleTyping =
      (
        payload: TypingEvent
      ) => {
        if (
          payload.isTyping
        ) {
          setTyping(
            payload.conversationId,
            {
              conversationId:
                payload.conversationId,

              userId:
                payload.user
                  ._id,

              username:
                payload.user
                  .username,

              isTyping:
                true,
            }
          );

          return;
        }

        removeTyping(
          payload.conversationId,
          payload.user
            ._id
        );
      };

    socket.on(
      MESSAGE_EVENTS.NEW_MESSAGE,
      handleNewMessage
    );

    socket.on(
      MESSAGE_EVENTS.MESSAGE_READ,
      handleMessageRead
    );

    socket.on(
      MESSAGE_EVENTS.CONVERSATION_UPDATED,
      handleConversationUpdated
    );

    socket.on(
      MESSAGE_EVENTS.TYPING,
      handleTyping
    );

    return () => {
      socket.off(
        MESSAGE_EVENTS.NEW_MESSAGE,
        handleNewMessage
      );

      socket.off(
        MESSAGE_EVENTS.MESSAGE_READ,
        handleMessageRead
      );

      socket.off(
        MESSAGE_EVENTS.CONVERSATION_UPDATED,
        handleConversationUpdated
      );

      socket.off(
        MESSAGE_EVENTS.TYPING,
        handleTyping
      );
    };
  }, [
    addMessage,
    updateMessageRead,
    updateConversation,
    setTyping,
    removeTyping,
  ]);

  const value: MessageSocketContextValue =
    {
      joinConversation:
        (
          conversationId
        ) => {
          socket.emit(
            MESSAGE_EVENTS.JOIN_CONVERSATION,
            conversationId
          );
        },

      leaveConversation:
        (
          conversationId
        ) => {
          socket.emit(
            MESSAGE_EVENTS.LEAVE_CONVERSATION,
            conversationId
          );
        },

      startTyping: (
        conversationId,
        user
      ) => {
        socket.emit(
          MESSAGE_EVENTS.TYPING_START,
          {
            conversationId,
            user,
          }
        );
      },

      stopTyping: (
        conversationId,
        user
      ) => {
        socket.emit(
          MESSAGE_EVENTS.TYPING_STOP,
          {
            conversationId,
            user,
          }
        );
      },

      markRead: (
        conversationId,
        userId
      ) => {
        socket.emit(
          MESSAGE_EVENTS.MARK_READ,
          {
            conversationId,
            userId,
          }
        );
      },
    };

  return (
    <MessageSocketContext.Provider
      value={value}
    >
      {children}
    </MessageSocketContext.Provider>
  );
}

export function useMessageSocket() {
  const context =
    useContext(
      MessageSocketContext
    );

  if (!context) {
    throw new Error(
      "useMessageSocket must be used within MessageSocketProvider"
    );
  }

  return context;
}
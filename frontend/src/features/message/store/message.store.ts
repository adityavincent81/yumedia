// src/features/message/store/message.store.ts

import { create } from "zustand";

import { messageService } from "../services/message.service";

import type {
  Conversation,
  Message,
  TypingUser,
  CreateConversationPayload,
  SendMessagePayload,
} from "../types/message.types";

interface MessageStoreState {
  /**
   * Data
   */

  conversations: Conversation[];

  selectedConversation:
    Conversation | null;

  messages: Record<
    string,
    Message[]
  >;

  typingUsers: Record<
    string,
    TypingUser[]
  >;

  /**
   * Loading
   */

  loading: boolean;

  conversationsLoading: boolean;

  messagesLoading: boolean;

  sending: boolean;

  /**
   * Pagination
   */

  conversationsPage: number;

  conversationsTotalPages: number;

  /**
   * Actions
   */

  setSelectedConversation: (
    conversation: Conversation | null
  ) => void;

  /**
   * Conversation
   */

  createConversation: (
    payload: CreateConversationPayload
  ) => Promise<Conversation>;

  getConversations: (
    page?: number,
    limit?: number
  ) => Promise<void>;

  getConversation: (
    conversationId: string
  ) => Promise<void>;

  /**
   * Messages
   */

  getMessages: (
    conversationId: string,
    page?: number,
    limit?: number
  ) => Promise<void>;

  sendMessage: (
    conversationId: string,
    payload: SendMessagePayload
  ) => Promise<Message>;

  markRead: (
    conversationId: string
  ) => Promise<void>;

  deleteMessage: (
    messageId: string
  ) => Promise<void>;

  /**
   * Socket
   */

  addMessage: (
    message: Message
  ) => void;

  updateMessageRead: (
    conversationId: string,
    userId: string
  ) => void;

  updateConversation: (
  conversation: Conversation
) => void;

  setTyping: (
    conversationId: string,
    typingUser: TypingUser
  ) => void;

  removeTyping: (
    conversationId: string,
    userId: string
  ) => void;

  /**
   * Reset
   */

  reset: () => void;
}

export const useMessageStore =
  create<MessageStoreState>(
    (set, get) => ({
      /**
       * Data
       */

      conversations: [],

      selectedConversation:
        null,

      messages: {},

      typingUsers: {},

      /**
       * Loading
       */

      loading: false,

      conversationsLoading:
        false,

      messagesLoading: false,

      sending: false,

      /**
       * Pagination
       */

      conversationsPage: 1,

      conversationsTotalPages:
        1,

      /**
       * Actions
       */

      setSelectedConversation:
        (
          conversation
        ) =>
          set({
            selectedConversation:
              conversation,
          }),

      /**
       * Conversation
       */

      createConversation:
  async (payload) => {
    const conversation =
      await messageService.createConversation(
        payload
      );

    /**
     * Conversation akan masuk
     * melalui socket event
     * conversation_updated.
     */

    return conversation;
  },

      getConversations:
        async (
          page = 1,
          limit = 20
        ) => {
          try {
            set({
              conversationsLoading:
                true,
            });

            const result =
              await messageService.getConversations(
                page,
                limit
              );

            set({
              conversations:
                result.conversations,

              conversationsPage:
                result.pagination.page,

              conversationsTotalPages:
                result.pagination.totalPages,
            });
          } finally {
            set({
              conversationsLoading:
                false,
            });
          }
        },

      getConversation:
        async (
          conversationId
        ) => {
          const conversation =
            await messageService.getConversation(
              conversationId
            );

          set({
            selectedConversation:
              conversation,
          });
        },

      /**
       * Messages
       */

      getMessages:
        async (
          conversationId,
          page = 1,
          limit = 30
        ) => {
          try {
            set({
              messagesLoading:
                true,
            });

            const result =
              await messageService.getMessages(
                conversationId,
                page,
                limit
              );

            set(
              (
                state
              ) => ({
                messages:
                  {
                    ...state.messages,

                    [
                      conversationId
                    ]:
                      result.messages,
                  },
              })
            );
          } finally {
            set({
              messagesLoading:
                false,
            });
          }
        },

      sendMessage:
  async (
    conversationId,
    payload
  ) => {
    try {
      set({
        sending: true,
      });

      /**
       * Realtime Mode
       *
       * Message akan masuk
       * melalui socket
       * NEW_MESSAGE.
       */

      const message =
        await messageService.sendMessage(
          conversationId,
          payload
        );

      return message;
    } finally {
      set({
        sending: false,
      });
    }
  },

  updateMessageRead:
  (
    conversationId
  ) => {
    set(
      (
        state
      ) => ({
        messages: {
          ...state.messages,

          [
            conversationId
          ]:
            (
              state.messages[
                conversationId
              ] || []
            ).map(
              (
                message
              ) => ({
                ...message,
                isRead: true,
              })
            ),
        },
      })
    );
  },


      markRead:
        async (
          conversationId
        ) => {
          await messageService.markRead(
            conversationId
          );
        },

      deleteMessage:
        async (
          messageId
        ) => {
          await messageService.deleteMessage(
            messageId
          );

          set(
            (
              state
            ) => ({
              messages:
                Object.fromEntries(
                  Object.entries(
                    state.messages
                  ).map(
                    ([
                      conversationId,
                      messages,
                    ]) => [
                      conversationId,
                      messages.filter(
                        (
                          message
                        ) =>
                          message._id !==
                          messageId
                      ),
                    ]
                  )
                ),
            })
          );
        },

      /**
       * Socket
       */

      addMessage:
        (
          message
        ) => {
          set(
            (
              state
            ) => ({
              messages:
                {
                  ...state.messages,

                  [
                    message.conversation
                  ]: [
                    ...(
                      state
                        .messages[
                        message
                          .conversation
                      ] ||
                      []
                    ),
                    message,
                  ],
                },
            })
          );
        },

      updateConversation:
  (
    conversation
  ) => {
    set(
      (
        state
      ) => {
        const exists =
          state.conversations.some(
            (
              item
            ) =>
              item._id ===
              conversation._id
          );

        if (
          !exists
        ) {
          return {
            conversations:
              [
                conversation,
                ...state.conversations,
              ],
          };
        }

        return {
          conversations:
            [
              conversation,

              ...state.conversations.filter(
                (
                  item
                ) =>
                  item._id !==
                  conversation._id
              ),
            ],
        };
      }
    );
  },

      setTyping:
        (
          conversationId,
          typingUser
        ) => {
          set(
            (
              state
            ) => {
              const users =
                state
                  .typingUsers[
                  conversationId
                ] || [];

              const exists =
                users.some(
                  (
                    user
                  ) =>
                    user.userId ===
                    typingUser.userId
                );

              if (
                exists
              ) {
                return state;
              }

              return {
                typingUsers:
                  {
                    ...state.typingUsers,

                    [
                      conversationId
                    ]: [
                      ...users,
                      typingUser,
                    ],
                  },
              };
            }
          );
        },

      removeTyping:
        (
          conversationId,
          userId
        ) => {
          set(
            (
              state
            ) => ({
              typingUsers:
                {
                  ...state.typingUsers,

                  [
                    conversationId
                  ]:
                    (
                      state
                        .typingUsers[
                        conversationId
                      ] ||
                      []
                    ).filter(
                      (
                        user
                      ) =>
                        user.userId !==
                        userId
                    ),
                },
            })
          );
        },

      /**
       * Reset
       */

      reset: () =>
        set({
          conversations:
            [],

          selectedConversation:
            null,

          messages: {},

          typingUsers: {},

          loading: false,

          conversationsLoading:
            false,

          messagesLoading:
            false,

          sending: false,
        }),
    })
  );
// src/features/message/services/message.service.ts

import { api } from "@/lib/api";

import type {
  Conversation,
  ConversationsResponse,
  CreateConversationPayload,
  Message,
  MessagesResponse,
  SendMessagePayload,
} from "../types/message.types";

class MessageService {
  /**
   * Conversation
   */

  async createConversation(
    payload: CreateConversationPayload
  ): Promise<Conversation> {
    const response =
      await api.post(
        "/messages/conversations",
        payload
      );

    return response.data.data;
  }

  async getConversations(
    page = 1,
    limit = 20
  ): Promise<ConversationsResponse> {
    const response =
      await api.get(
        "/messages/conversations",
        {
          params: {
            page,
            limit,
          },
        }
      );

    return {
      conversations:
        response.data
          .conversations,

      pagination:
        response.data
          .pagination,
    };
  }

  async getConversation(
    conversationId: string
  ): Promise<Conversation> {
    const response =
      await api.get(
        `/messages/conversations/${conversationId}`
      );

    return response.data.data;
  }

  /**
   * Messages
   */

  async getMessages(
    conversationId: string,
    page = 1,
    limit = 30
  ): Promise<MessagesResponse> {
    const response =
      await api.get(
        `/messages/conversations/${conversationId}/messages`,
        {
          params: {
            page,
            limit,
          },
        }
      );

    return {
      messages:
        response.data.messages,

      pagination:
        response.data
          .pagination,
    };
  }

  async sendMessage(
  conversationId: string,
  payload: SendMessagePayload
): Promise<Message> {
  /**
   * Text Message
   *
   * Kirim JSON biasa agar
   * req.body terbentuk dan
   * lolos Zod validation.
   */

  if (
    payload.type === "text" &&
    !payload.file
  ) {
    const response =
      await api.post(
        `/messages/conversations/${conversationId}/messages`,
        {
          type:
            payload.type,

          text:
            payload.text,

          postId:
            payload.postId,

          storyId:
            payload.storyId,
        }
      );

    return response.data.data;
  }

  /**
   * Media Message
   *
   * Image / Video / File
   * tetap menggunakan
   * multipart/form-data.
   */

  const formData =
    new FormData();

  if (
    payload.type
  ) {
    formData.append(
      "type",
      payload.type
    );
  }

  if (
    payload.text
  ) {
    formData.append(
      "text",
      payload.text
    );
  }

  if (
    payload.postId
  ) {
    formData.append(
      "postId",
      payload.postId
    );
  }

  if (
    payload.storyId
  ) {
    formData.append(
      "storyId",
      payload.storyId
    );
  }

  if (
    payload.file
  ) {
    formData.append(
      "file",
      payload.file
    );
  }

  const response =
    await api.post(
      `/messages/conversations/${conversationId}/messages`,
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

  return response.data.data;
}

  /**
   * Read Status
   */

  async markRead(
    conversationId: string
  ): Promise<void> {
    await api.patch(
      `/messages/conversations/${conversationId}/read`
    );
  }

  /**
   * Delete
   */

  async deleteMessage(
    messageId: string
  ): Promise<void> {
    await api.delete(
      `/messages/${messageId}`
    );
  }

  /**
   * Future V2
   */

  async searchMessages() {
    throw new Error(
      "Coming Soon"
    );
  }

  async forwardMessage() {
    throw new Error(
      "Coming Soon"
    );
  }

  /**
   * Future V3
   */

  async createGroup() {
    throw new Error(
      "Coming Soon"
    );
  }

  async startVoiceCall() {
    throw new Error(
      "Coming Soon"
    );
  }

  async startVideoCall() {
    throw new Error(
      "Coming Soon"
    );
  }
}

export const messageService =
  new MessageService();
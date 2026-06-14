// src/features/message/types/message.types.ts

import type {
  User,
} from "@/features/auth/types/auth.types";

import type {
  Post,
} from "@/features/post/types/post.types";

import type {
  Story,
} from "@/features/story/types/story.types";

import type {
  Media,
} from "@/types/media.types";

/**
 * Conversation
 */

export type ConversationType =
  | "direct"
  | "group"
  | "community";

/**
 * Message
 */

export type MessageType =
  | "text"
  | "image"
  | "video"
  | "file"
  | "audio"
  | "story"
  | "post";

/**
 * Presence
 */

export type UserPresence =
  | "online"
  | "offline"
  | "away";

/**
 * Message Attachment
 */

export interface MessageMedia {
  url: string;

  publicId?: string;

  filename?: string;

  mimeType?: string;

  size?: number;
}

/**
 * Message
 */

export interface Message {
  _id: string;

  conversation: string;

  sender: User;

  type: MessageType;

  text?: string;

  media?: MessageMedia;

  story?: Story | null;

  post?: Post | null;

  replyTo?: Message | null;

  isRead: boolean;

  readAt?: string | null;

  deletedFor?: string[];

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;
}

/**
 * Conversation
 */

export interface Conversation {
  _id: string;

  participants: User[];

  lastMessage?:
    | Message
    | null;

  lastMessageSender?:
    | User
    | null;

  lastMessageAt?:
    | string
    | null;

  unreadCount?: number;

  /**
   * Future V3
   */

  type?: ConversationType;

  groupName?: string;

  groupAvatar?: Media | null;

  isGroup?: boolean;

  createdAt: string;

  updatedAt: string;
}

/**
 * Typing
 */

export interface TypingUser {
  conversationId: string;

  userId: string;

  username: string;

  isTyping: boolean;
}

/**
 * API
 */

export interface ConversationsResponse {
  conversations: Conversation[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

export interface MessagesResponse {
  messages: Message[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;
  };
}

/**
 * Create Conversation
 */

export interface CreateConversationPayload {
  participantId: string;
}

/**
 * Send Message
 */

export interface SendMessagePayload {
  type?: MessageType;

  text?: string;

  postId?: string;

  storyId?: string;

  file?: File;
}

/**
 * Socket Events
 */

export interface NewMessageEvent {
  message: Message;
}

export interface MessageReadEvent {
  conversationId: string;

  userId: string;
}

export interface TypingEvent {
  conversationId: string;

  user: {
    _id: string;

    username: string;

    avatar: Media | null;
  };

  isTyping: boolean;
}
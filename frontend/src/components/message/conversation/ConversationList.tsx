// src/components/message/conversation/ConversationList.tsx

"use client";

import {
  useMemo,
} from "react";

import ConversationItem from "./ConversationItem";

import type {
  Conversation,
} from "@/features/message/types/message.types";

import type {
  ConversationFilter,
} from "./ConversationFilters";

interface ConversationListProps {
  conversations: Conversation[];

  search: string;

  filter: ConversationFilter;
}

export default function ConversationList({
  conversations,
  search,
  filter,
}: ConversationListProps) {
  const filteredConversations =
    useMemo(() => {
      let result =
        [...conversations];

      /**
       * Search
       */

      if (
        search.trim()
      ) {
        const query =
          search.toLowerCase();

        result =
          result.filter(
            (
              conversation
            ) => {
              const participants =
                conversation.participants ||
                [];

              return participants.some(
                (
                  participant
                ) =>
                  participant.fullName
                    ?.toLowerCase()
                    .includes(
                      query
                    ) ||
                  participant.username
                    ?.toLowerCase()
                    .includes(
                      query
                    )
              );
            }
          );
      }

      /**
       * Filters
       */

      switch (
        filter
      ) {
        case "unread":
          result =
            result.filter(
              (
                conversation
              ) =>
                (
                  conversation.unreadCount ||
                  0
                ) > 0
            );
          break;

        /**
         * V2
         */

        case "pinned":
          return [];

        case "archived":
          return [];

        /**
         * V3
         */

        case "groups":
          return [];

        case "communities":
          return [];

        default:
          break;
      }

      return result;
    }, [
      conversations,
      search,
      filter,
    ]);

  if (
    filteredConversations.length ===
    0
  ) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center

          py-12
          px-6

          text-center
        "
      >
        <div
          className="
            mb-3

            text-4xl
          "
        >
          💬
        </div>

        <h3
          className="
            text-sm
            font-medium
            text-white
          "
        >
          No Conversations
        </h3>

        <p
          className="
            mt-2

            text-xs
            text-zinc-500
          "
        >
          {search
            ? "No conversations match your search."
            : "Start chatting with your friends."}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        flex-col

        gap-1

        p-2
      "
    >
      {filteredConversations.map(
        (
          conversation
        ) => (
          <ConversationItem
            key={
              conversation._id
            }
            conversation={
              conversation
            }
          />
        )
      )}
    </div>
  );
}
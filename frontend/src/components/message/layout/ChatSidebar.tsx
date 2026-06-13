// src/components/message/layout/ChatSidebar.tsx

"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  MessageCircle,
} from "lucide-react";

import {
  useMessage,
} from "@/features/message/hooks/useMessage";

import ConversationSearch from "../conversation/ConversationSearch";

import ConversationFilters, {
  type ConversationFilter,
} from "../conversation/ConversationFilters";

import ConversationList from "../conversation/ConversationList";

import ConversationSkeleton from "../skeleton/ConversationSkeleton";

import CreateChatModal from "../modals/CreateChatModal";

export default function ChatSidebar() {
  const {
    conversations,

    conversationsLoading,
  } = useMessage();

  const [search, setSearch] =
    useState("");

  const [
    filter,
    setFilter,
  ] =
    useState<ConversationFilter>(
      "all"
    );

  const [
    isCreateChatOpen,
    setIsCreateChatOpen,
  ] = useState(false);

  const unreadCount =
    useMemo(() => {
      return conversations.reduce(
        (
          total,
          conversation
        ) =>
          total +
          (
            conversation.unreadCount ||
            0
          ),
        0
      );
    }, [conversations]);

  return (
    <>
      <aside
        className="
          flex
          h-full
          flex-col

          bg-zinc-950
        "
      >
        {/* Header */}

        <div
          className="
            border-b
            border-zinc-800

            p-4
          "
        >
          <div
            className="
              mb-4

              flex
              items-center
              justify-between
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Messages
              </h2>

              <p
                className="
                  text-xs
                  text-zinc-500
                "
              >
                {unreadCount}
                {" "}
                unread messages
              </p>
            </div>

            <button
              onClick={() =>
                setIsCreateChatOpen(
                  true
                )
              }
              title="New Chat"
              className="
                rounded-xl

                border
                border-zinc-800

                p-2

                text-zinc-400

                transition-colors

                hover:bg-zinc-900
                hover:text-white
              "
            >
              <MessageCircle
                size={18}
              />
            </button>
          </div>

          {/* Search */}

          <ConversationSearch
            value={search}
            onChange={
              setSearch
            }
          />

          {/* Filters */}

          <div
            className="
              mt-4
            "
          >
            <ConversationFilters
              value={filter}
              onChange={
                setFilter
              }
            />
          </div>
        </div>

        {/* Conversation List */}

        <div
          className="
            flex-1
            overflow-y-auto
          "
        >
          {conversationsLoading ? (
            <div
              className="
                space-y-3
                p-3
              "
            >
              <ConversationSkeleton />
              <ConversationSkeleton />
              <ConversationSkeleton />
              <ConversationSkeleton />
              <ConversationSkeleton />
            </div>
          ) : (
            <ConversationList
              conversations={
                conversations
              }
              search={search}
              filter={filter}
            />
          )}
        </div>
      </aside>

      {/* Create Chat */}

      <CreateChatModal
        open={
          isCreateChatOpen
        }
        onClose={() =>
          setIsCreateChatOpen(
            false
          )
        }
      />
    </>
  );
}
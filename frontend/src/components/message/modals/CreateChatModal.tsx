// src/components/message/modals/CreateChatModal.tsx

"use client";

import Image from "next/image";

import {
  Search,
  X,
  MessageCircle,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { useFollowing } from "@/features/follow/hooks/useFollowing";

import { useMessage } from "@/features/message/hooks/useMessage";

interface CreateChatModalProps {
  open: boolean;

  onClose: () => void;
}

export default function CreateChatModal({
  open,
  onClose,
}: CreateChatModalProps) {
  const [search, setSearch] =
    useState("");

  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const {
    createConversation,
    setSelectedConversation,
  } = useMessage();

  const {
    data: followingData,
    isLoading,
  } = useFollowing({
    userId:
      currentUser?._id || "",
  });

  const users =
    followingData?.data?.map(
      (follow) =>
        follow.following
    ) || [];

  const filteredUsers =
    useMemo(() => {
      const keyword =
        search.toLowerCase();

      return users.filter(
        (user) =>
          user.fullName
            ?.toLowerCase()
            .includes(
              keyword
            ) ||
          user.username
            ?.toLowerCase()
            .includes(
              keyword
            )
      );
    }, [
      search,
      users,
    ]);

  const handleStartChat =
    async (
      participantId: string
    ) => {
      try {
        const conversation =
          await createConversation(
            {
              participantId,
            }
          );

        setSelectedConversation(
          conversation
        );

        onClose();
      } catch (
        error
      ) {
        console.error(
          "Failed to create conversation",
          error
        );
      }
    };

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]

        flex
        items-center
        justify-center

        bg-black/70
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full
          max-w-md

          overflow-hidden

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-950
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-zinc-800

            px-5
            py-4
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
              New Chat
            </h2>

            <p
              className="
                text-xs
                text-zinc-500
              "
            >
              Start a conversation
            </p>
          </div>

          <button
            onClick={onClose}
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
            <X size={18} />
          </button>
        </div>

        {/* Search */}

        <div
          className="
            border-b
            border-zinc-800

            p-4
          "
        >
          <div
            className="
              relative
            "
          >
            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2

                -translate-y-1/2

                text-zinc-500
              "
            />

            <input
              value={search}
              onChange={(
                event
              ) =>
                setSearch(
                  event.target
                    .value
                )
              }
              placeholder="Search people..."
              className="
                w-full

                rounded-xl

                border
                border-zinc-800

                bg-zinc-900

                py-2.5
                pl-9
                pr-4

                text-sm
                text-white

                outline-none

                placeholder:text-zinc-500

                focus:border-zinc-700
              "
            />
          </div>
        </div>

        {/* User List */}

        <div
          className="
            max-h-[420px]
            overflow-y-auto
          "
        >
          {isLoading && (
            <div
              className="
                p-6

                text-center
                text-sm
                text-zinc-500
              "
            >
              Loading following...
            </div>
          )}

          {!isLoading &&
            filteredUsers.length ===
              0 && (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center

                  p-10
                  text-center
                "
              >
                <MessageCircle
                  size={36}
                  className="
                    mb-3
                    text-zinc-700
                  "
                />

                <p
                  className="
                    text-sm
                    text-zinc-500
                  "
                >
                  No users found
                </p>
              </div>
            )}

          {!isLoading &&
            filteredUsers.map(
              (user) => (
                <button
                  key={
                    user._id
                  }
                  onClick={() =>
                    handleStartChat(
                      user._id
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    px-4
                    py-3

                    text-left

                    transition-colors

                    hover:bg-zinc-900
                  "
                >
                  {user.avatar?.url ? (
                    <Image
                        src={user.avatar.url}
                        alt={user.fullName}
                        width={48}
                        height={48}
                        className="
                        h-12
                        w-12
                        rounded-full
                        object-cover
                        "
                    />
                    ) : (
                    <div
                      className="
                        flex
                        h-12
                        w-12

                        items-center
                        justify-center

                        rounded-full

                        bg-zinc-800

                        font-semibold
                        text-white
                      "
                    >
                      {user.fullName?.charAt(
                        0
                      ) || "U"}
                    </div>
                  )}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        truncate

                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {
                        user.fullName
                      }
                    </p>

                    <p
                      className="
                        truncate

                        text-xs
                        text-zinc-500
                      "
                    >
                      @
                      {
                        user.username
                      }
                    </p>
                  </div>
                </button>
              )
            )}
        </div>
      </div>
    </div>
  );
}
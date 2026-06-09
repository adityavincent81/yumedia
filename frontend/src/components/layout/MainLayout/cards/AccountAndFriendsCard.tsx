"use client";

import { Users } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AccountAndFriendsCard() {
  const user = useAuthStore(
    (state) => state.user
  );

  const suggestedFriends = [
    {
      id: 1,
      fullName: "John Doe",
      username: "johndoe",
    },
    {
      id: 2,
      fullName: "Jane Smith",
      username: "janesmith",
    },
    {
      id: 3,
      fullName: "Alex Johnson",
      username: "alexj",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-4
        backdrop-blur-md
      "
    >
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <Users
          size={18}
          className="text-zinc-300"
        />

        <h2 className="font-semibold text-zinc-100">
          Account & Friends
        </h2>
      </div>

      {/* ACCOUNT */}
      <div className="mt-4 flex items-center gap-3">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-zinc-800
            text-sm
            font-semibold
            text-white
          "
        >
          {user?.fullName?.charAt(0) ??
            "U"}
        </div>

        <div className="min-w-0">
          <p className="truncate font-medium text-white">
            {user?.fullName ??
              "User"}
          </p>

          <p className="truncate text-sm text-zinc-400">
            @
            {user?.username ??
              "username"}
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-zinc-800/50 p-3 text-center">
          <p className="text-lg font-semibold text-white">
            0
          </p>

          <p className="text-xs text-zinc-400">
            Followers
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800/50 p-3 text-center">
          <p className="text-lg font-semibold text-white">
            0
          </p>

          <p className="text-xs text-zinc-400">
            Following
          </p>
        </div>
      </div>

      {/* SUGGESTED */}
      <div className="mt-5">
        <h3 className="mb-3 text-sm font-medium text-zinc-300">
          Suggested Friends
        </h3>

        <div className="space-y-3">
          {suggestedFriends.map(
            (friend) => (
              <div
                key={friend.id}
                className="
                  flex
                  items-center
                  justify-between
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-zinc-800
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    {friend.fullName.charAt(
                      0
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-white">
                      {friend.fullName}
                    </p>

                    <p className="text-xs text-zinc-500">
                      @{friend.username}
                    </p>
                  </div>
                </div>

                <button
                  className="
                    rounded-lg
                    bg-white
                    px-3
                    py-1
                    text-xs
                    font-medium
                    text-black
                    transition
                    hover:opacity-90
                  "
                >
                  Follow
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
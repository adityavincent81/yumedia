// src/components/message/modals/CreateGroupModal.tsx

"use client";

import { useState } from "react";

import Image from "next/image";

import {
  Users,
  Search,
  Camera,
  X,
  Check,
} from "lucide-react";

interface CreateGroupModalProps {
  open: boolean;

  onClose: () => void;

  onCreate?: (
    payload: {
      name: string;

      members: string[];
    }
  ) => void;
}

export default function CreateGroupModal({
  open,

  onClose,

  onCreate,
}: CreateGroupModalProps) {
  const [groupName, setGroupName] =
    useState("");

  if (!open) {
    return null;
  }

  /**
   * Dummy Users
   * Replace with real users later
   */

  const users = [
    {
      _id: "1",

      fullName:
        "John Doe",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "2",

      fullName:
        "Frontend Team",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "3",

      fullName:
        "Backend Team",

      avatar:
        "https://placehold.co/100",
    },

    {
      _id: "4",

      fullName:
        "UI Designer",

      avatar:
        "https://placehold.co/100",
    },
  ];

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

        p-4
      "
    >
      <div
        className="
          flex
          max-h-[90vh]
          w-full
          max-w-3xl
          flex-col

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
              Create Group
            </h2>

            <p
              className="
                mt-1

                text-xs
                text-zinc-500
              "
            >
              Group Chat (V3)
            </p>
          </div>

          <button
            onClick={
              onClose
            }
            className="
              rounded-xl

              p-2

              text-zinc-400

              hover:bg-zinc-900
            "
          >
            <X
              size={18}
            />
          </button>
        </div>

        {/* Group Info */}

        <div
          className="
            border-b
            border-zinc-800

            p-5
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <button
              disabled
              className="
                flex
                h-20
                w-20

                items-center
                justify-center

                rounded-full

                border
                border-dashed
                border-zinc-700

                text-zinc-500
              "
            >
              <Camera
                size={24}
              />
            </button>

            <div
              className="
                flex-1
              "
            >
              <label
                className="
                  mb-2
                  block

                  text-xs
                  font-medium

                  text-zinc-400
                "
              >
                Group Name
              </label>

              <input
                value={
                  groupName
                }
                onChange={(
                  event
                ) =>
                  setGroupName(
                    event.target
                      .value
                  )
                }
                placeholder="Enter group name..."
                className="
                  w-full

                  rounded-xl

                  border
                  border-zinc-800

                  bg-zinc-900

                  px-4
                  py-3

                  text-sm
                  text-white

                  outline-none
                "
              />
            </div>
          </div>
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
              placeholder="Search users..."
              className="
                w-full

                rounded-xl

                border
                border-zinc-800

                bg-zinc-900

                py-2.5
                pl-10
                pr-4

                text-sm
                text-white

                outline-none
              "
            />
          </div>
        </div>

        {/* Members */}

        <div
          className="
            flex-1
            overflow-y-auto

            p-3
          "
        >
          <div
            className="
              space-y-2
            "
          >
            {users.map(
              (
                user
              ) => (
                <button
                  key={
                    user._id
                  }
                  type="button"
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    rounded-2xl

                    border
                    border-zinc-800

                    p-3

                    text-left

                    transition-colors

                    hover:bg-zinc-900
                  "
                >
                  <Image
                    src={
                      user.avatar
                    }
                    alt={
                      user.fullName
                    }
                    width={44}
                    height={44}
                    className="
                      rounded-full
                    "
                  />

                  <div
                    className="
                      flex-1
                    "
                  >
                    <p
                      className="
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {
                        user.fullName
                      }
                    </p>
                  </div>

                  <div
                    className="
                      flex
                      h-5
                      w-5

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-zinc-700
                    "
                  >
                    <Check
                      size={12}
                      className="
                        opacity-0
                      "
                    />
                  </div>
                </button>
              )
            )}
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-zinc-800

            p-4
          "
        >
          <button
            disabled
            onClick={() =>
              onCreate?.({
                name:
                  groupName,

                members:
                  [],
              })
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-white

              px-4
              py-3

              font-medium
              text-black

              opacity-60
            "
          >
            <Users
              size={16}
            />

            Create Group
          </button>

          <p
            className="
              mt-2

              text-center
              text-xs
              text-zinc-500
            "
          >
            Group Chat will be
            activated in V3
          </p>
        </div>
      </div>
    </div>
  );
}
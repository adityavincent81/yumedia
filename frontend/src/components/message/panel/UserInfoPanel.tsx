// src/components/message/panel/UserInfoPanel.tsx

"use client";

import Image from "next/image";

import {
  ShieldCheck,
  Users,
  UserPlus,
  GraduationCap,
  Building2,
} from "lucide-react";

import UserPresence, {
  type PresenceStatus,
} from "../header/UserPresence";

interface UserInfoPanelProps {
  user?: {
    _id: string;

    username: string;

    fullName: string;

    avatar?: string;

    bio?: string;

    faculty?: string;

    major?: string;

    isVerified?: boolean;

    followersCount?: number;

    followingCount?: number;
  };

  presence?: PresenceStatus;
}

export default function UserInfoPanel({
  user,

  presence = "online",
}: UserInfoPanelProps) {
  if (!user) {
    return (
      <div
        className="
          p-6
        "
      >
        <div
          className="
            flex
            flex-col
            items-center
          "
        >
          <div
            className="
              h-24
              w-24

              animate-pulse

              rounded-full

              bg-zinc-800
            "
          />

          <div
            className="
              mt-4

              h-4
              w-32

              animate-pulse

              rounded

              bg-zinc-800
            "
          />

          <div
            className="
              mt-2

              h-3
              w-24

              animate-pulse

              rounded

              bg-zinc-800
            "
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        border-b
        border-zinc-800

        p-6
      "
    >
      <div
        className="
          flex
          flex-col
          items-center

          text-center
        "
      >
        {/* Avatar */}

        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.fullName}
            width={96}
            height={96}
            className="
              mb-4

              h-24
              w-24

              rounded-full

              object-cover
            "
          />
        ) : (
          <div
            className="
              mb-4

              flex
              h-24
              w-24

              items-center
              justify-center

              rounded-full

              bg-zinc-800

              text-3xl
              font-bold
              text-white
            "
          >
            {user.fullName?.charAt(
              0
            )}
          </div>
        )}

        {/* Name */}

        <div
          className="
            flex
            items-center
            gap-1.5
          "
        >
          <h3
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            {user.fullName}
          </h3>

          {user.isVerified && (
            <ShieldCheck
              size={16}
              className="
                text-sky-500
              "
            />
          )}
        </div>

        <p
          className="
            mt-1

            text-sm
            text-zinc-500
          "
        >
          @{user.username}
        </p>

        {/* Presence */}

        <div
          className="
            mt-3
          "
        >
          <UserPresence
            status={presence}
          />
        </div>

        {/* Bio */}

        {user.bio && (
          <p
            className="
              mt-4

              max-w-xs

              text-sm
              text-zinc-400
            "
          >
            {user.bio}
          </p>
        )}

        {/* Academic Info */}

        {(user.faculty ||
          user.major) && (
          <div
            className="
              mt-5

              w-full

              space-y-2
            "
          >
            {user.faculty && (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  text-xs
                  text-zinc-500
                "
              >
                <Building2
                  size={12}
                />

                <span>
                  {
                    user.faculty
                  }
                </span>
              </div>
            )}

            {user.major && (
              <div
                className="
                  flex
                  items-center
                  justify-center
                  gap-2

                  text-xs
                  text-zinc-500
                "
              >
                <GraduationCap
                  size={12}
                />

                <span>
                  {user.major}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Stats */}

        <div
          className="
            mt-6

            flex
            w-full

            items-center
            justify-center

            gap-6
          "
        >
          <div
            className="
              text-center
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              {user.followersCount ||
                0}
            </p>

            <p
              className="
                text-xs
                text-zinc-500
              "
            >
              Followers
            </p>
          </div>

          <div
            className="
              text-center
            "
          >
            <p
              className="
                text-sm
                font-semibold
                text-white
              "
            >
              {user.followingCount ||
                0}
            </p>

            <p
              className="
                text-xs
                text-zinc-500
              "
            >
              Following
            </p>
          </div>
        </div>

        {/* Future Actions */}

        <div
          className="
            mt-6

            flex
            w-full

            gap-2
          "
        >
          <button
            disabled
            className="
              flex-1

              rounded-xl

              border
              border-zinc-800

              px-3
              py-2

              text-sm
              text-zinc-500
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <UserPlus
                size={14}
              />

              Profile
            </div>
          </button>

          <button
            disabled
            className="
              flex-1

              rounded-xl

              border
              border-zinc-800

              px-3
              py-2

              text-sm
              text-zinc-500
            "
          >
            <div
              className="
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Users
                size={14}
              />

              Mutuals
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
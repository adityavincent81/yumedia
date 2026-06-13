"use client";

import Image from "next/image";

import UserPresence, {
  type PresenceStatus,
} from "../header/UserPresence";

interface MessageAvatarProps {
  avatar?: string;

  fullName?: string;

  size?: number;

  showPresence?: boolean;

  presence?: PresenceStatus;
}

export default function MessageAvatar({
  avatar,

  fullName = "User",

  size = 36,

  showPresence = false,

  presence = "online",
}: MessageAvatarProps) {
  const avatarUrl =
    avatar?.trim();

  return (
    <div
      className="
        relative
        shrink-0
      "
      style={{
        width: size,
        height: size,
      }}
    >
      <div
        className="
          h-full
          w-full
          overflow-hidden
          rounded-full
        "
      >
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={fullName}
            width={size}
            height={size}
            className="
              h-full
              w-full
              rounded-full
              object-cover
            "
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              rounded-full
              bg-zinc-800
              font-semibold
              text-white
            "
            style={{
              fontSize:
                size * 0.4,
            }}
          >
            {fullName
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}
          </div>
        )}
      </div>

      {showPresence && (
        <div
          className="
            absolute
            bottom-0
            right-0
            z-10
          "
        >
          <UserPresence
            status={presence}
            showLabel={false}
          />
        </div>
      )}
    </div>
  );
}
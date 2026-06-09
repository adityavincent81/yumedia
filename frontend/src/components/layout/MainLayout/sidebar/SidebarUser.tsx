"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

interface SidebarUserProps {
  fullName?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
}

export default function SidebarUser({
  fullName,
  username,
  avatarUrl,
}: SidebarUserProps) {
  const router = useRouter();

  return (
    <div className="border-b border-zinc-800 p-3">
      <button
        type="button"
        onClick={() =>
          router.push("/profile")
        }
        className="
          flex
          w-full
          items-center
          gap-3

          rounded-xl

          p-2

          text-left

          transition-all
          duration-200

          hover:bg-white/5
        "
      >
        <div
          className="
            relative
            h-10
            w-10

            shrink-0

            overflow-hidden
            rounded-full

            border
            border-zinc-700

            bg-zinc-800
          "
        >
          <Image
            src={
              avatarUrl?.trim()
                ? avatarUrl
                : "/assets/logo/avatar.png"
            }
            alt={
              fullName ??
              "User Avatar"
            }
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>

        <div
          className="
            min-w-0

            opacity-0

            transition-opacity
            duration-200

            group-hover:opacity-100
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
            {fullName ?? "User"}
          </p>

          <p
            className="
              truncate
              text-xs
              text-zinc-400
            "
          >
            @{username ?? "username"}
          </p>
        </div>
      </button>
    </div>
  );
}
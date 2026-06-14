"use client";

import Link from "next/link";

import FollowButton from "./FollowButton";

import type {
  FollowUser,
} from "@/features/follow/types/follow.types";

interface FollowUserCardProps {
  user: FollowUser;
}

export default function FollowUserCard({
  user,
}: FollowUserCardProps) {
  const avatarUrl =
    user.avatar?.url;

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border p-4">
      <Link
        href={`/${user.username}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <div className="h-12 w-12 overflow-hidden rounded-full border">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={user.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold">
              {user.fullName
                ?.charAt(0)
                ?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate font-semibold">
            {user.fullName}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            @{user.username}
          </p>

          {(user.faculty ||
            user.major ||
            user.batchYear) && (
            <p className="truncate text-xs text-muted-foreground">
              {[
                user.faculty,
                user.major,
                user.batchYear,
              ]
                .filter(Boolean)
                .join(" • ")}
            </p>
          )}
        </div>
      </Link>

      <FollowButton
        userId={user._id}
      />
    </div>
  );
}
"use client";

import Link from "next/link";

interface FollowStatsProps {
  username: string;

  followersCount: number;

  followingCount: number;
}

export default function FollowStats({
  username,
  followersCount,
  followingCount,
}: FollowStatsProps) {
  return (
    <div className="flex items-center gap-6 text-sm">
      <Link
        href={`/${username}/followers`}
        className="transition hover:opacity-80"
      >
        <span className="font-semibold">
          {followersCount}
        </span>{" "}
        Followers
      </Link>

      <Link
        href={`/${username}/following`}
        className="transition hover:opacity-80"
      >
        <span className="font-semibold">
          {followingCount}
        </span>{" "}
        Following
      </Link>
    </div>
  );
}
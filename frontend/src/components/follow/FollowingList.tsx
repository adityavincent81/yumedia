"use client";

import FollowUserCard from "./FollowUserCard";

import type {
  FollowRelation,
} from "@/features/follow/types/follow.types";

interface FollowingListProps {
  following: FollowRelation[];
}

export default function FollowingList({
  following,
}: FollowingListProps) {
  if (following.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No following found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {following.map(
        (follow) => (
          <FollowUserCard
            key={follow._id}
            user={
              follow.following
            }
          />
        )
      )}
    </div>
  );
}
"use client";

import FollowUserCard from "./FollowUserCard";

import type {
  FollowRelation,
} from "@/features/follow/types/follow.types";

interface FollowersListProps {
  followers: FollowRelation[];
}

export default function FollowersList({
  followers,
}: FollowersListProps) {
  if (followers.length === 0) {
    return (
      <div className="rounded-xl border p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No followers found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {followers.map(
        (follow) => (
          <FollowUserCard
            key={follow._id}
            user={
              follow.follower
            }
          />
        )
      )}
    </div>
  );
}
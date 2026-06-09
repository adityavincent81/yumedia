"use client";

import FollowersList from "./FollowersList";

import { useProfile } from "@/features/user/hooks/useProfile";
import { useFollowers } from "@/features/follow/hooks/useFollowers";

interface FollowersPageClientProps {
  username: string;
}

export default function FollowersPageClient({
  username,
}: FollowersPageClientProps) {
  const {
    data: profileData,
    isLoading: profileLoading,
  } = useProfile(username);

  const userId =
    profileData?.data?._id;

  const {
    data: followersData,
    isLoading: followersLoading,
  } = useFollowers({
    userId: userId ?? "",
  });

  if (
    profileLoading ||
    followersLoading
  ) {
    return (
      <div className="p-6">
        Loading followers...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Followers
        </h1>

        <p className="text-sm text-muted-foreground">
          @{username}
        </p>
      </div>

      <FollowersList
        followers={
          followersData?.data ?? []
        }
      />
    </div>
  );
}
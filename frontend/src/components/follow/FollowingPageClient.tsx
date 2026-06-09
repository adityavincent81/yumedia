"use client";

import FollowingList from "./FollowingList";

import { useProfile } from "@/features/user/hooks/useProfile";
import { useFollowing } from "@/features/follow/hooks/useFollowing";

interface FollowingPageClientProps {
  username: string;
}

export default function FollowingPageClient({
  username,
}: FollowingPageClientProps) {
  const {
    data: profileData,
    isLoading: profileLoading,
  } = useProfile(username);

  const userId =
    profileData?.data?._id;

  const {
    data: followingData,
    isLoading: followingLoading,
  } = useFollowing({
    userId: userId ?? "",
  });

  if (
    profileLoading ||
    followingLoading
  ) {
    return (
      <div className="p-6">
        Loading following...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Following
        </h1>

        <p className="text-sm text-muted-foreground">
          @{username}
        </p>
      </div>

      <FollowingList
        following={
          followingData?.data ?? []
        }
      />
    </div>
  );
}
"use client";

import { useQueryClient } from "@tanstack/react-query";

import { useFollowUser } from "@/features/follow/hooks/useFollowUser";
import { useUnfollowUser } from "@/features/follow/hooks/useUnfollowUser";
import { useFollowStatus } from "@/features/follow/hooks/useFollowStatus";

interface FollowButtonProps {
  userId: string;
}

export default function FollowButton({
  userId,
}: FollowButtonProps) {
  const queryClient =
    useQueryClient();

  const { data, isLoading } =
    useFollowStatus(userId);

  const {
    mutate: followUser,
    isPending: isFollowingPending,
  } = useFollowUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "follow-status",
          userId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "followers",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "following",
        ],
      });
    },
  });

  const {
    mutate: unfollowUser,
    isPending:
      isUnfollowingPending,
  } = useUnfollowUser({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "follow-status",
          userId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "followers",
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "following",
        ],
      });
    },
  });

  const isPending =
    isFollowingPending ||
    isUnfollowingPending;

  const isFollowing =
    data?.data?.isFollowing ??
    false;

  const handleClick = () => {
    if (isFollowing) {
      unfollowUser(userId);
      return;
    }

    followUser(userId);
  };

  if (isLoading) {
    return (
      <button
        disabled
        className="rounded-lg border px-4 py-2 text-sm"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg border px-4 py-2 text-sm font-medium transition"
    >
      {isPending
        ? "Processing..."
        : isFollowing
        ? "Following"
        : "Follow"}
    </button>
  );
}
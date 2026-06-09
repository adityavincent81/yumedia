"use client";

import FollowingList from "../FollowingList";
import FollowModal from "./FollowModal";

import { useProfile } from "@/features/user/hooks/useProfile";
import { useFollowing } from "@/features/follow/hooks/useFollowing";

interface FollowingModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

export default function FollowingModal({
  open,
  onClose,
  username,
}: FollowingModalProps) {
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

  return (
    <FollowModal
      open={open}
      onClose={onClose}
      title="Following"
      searchPlaceholder="Search following..."
      loading={
        profileLoading ||
        followingLoading
      }
    >
      <FollowingList
        following={
          followingData?.data ?? []
        }
      />
    </FollowModal>
  );
}
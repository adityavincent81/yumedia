"use client";

import FollowersList from "../FollowersList";
import FollowModal from "./FollowModal";

import { useProfile } from "@/features/user/hooks/useProfile";
import { useFollowers } from "@/features/follow/hooks/useFollowers";

interface FollowersModalProps {
  open: boolean;
  onClose: () => void;
  username: string;
}

export default function FollowersModal({
  open,
  onClose,
  username,
}: FollowersModalProps) {
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

  return (
    <FollowModal
      open={open}
      onClose={onClose}
      title="Followers"
      searchPlaceholder="Search followers..."
      loading={
        profileLoading ||
        followersLoading
      }
    >
      <FollowersList
        followers={
          followersData?.data ?? []
        }
      />
    </FollowModal>
  );
}
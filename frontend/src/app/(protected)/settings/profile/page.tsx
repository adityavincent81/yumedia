"use client";

import AvatarUploader from "@/components/user/AvatarUploader";
import CoverUploader from "@/components/user/CoverUploader";
import EditProfileForm from "@/components/user/EditProfileForm";

import { useMyProfile } from "@/features/user/hooks/useMyProfile";

export default function ProfileSettingsPage() {
  const {
    data,
    isLoading,
    isError,
  } = useMyProfile();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading profile settings...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="p-6">
        Failed to load profile.
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Profile Settings
        </h1>

        <p className="text-muted-foreground">
          Manage your profile information,
          avatar, and cover image.
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Cover Image
          </h2>

          <CoverUploader
            coverUrl={
              user.cover?.url
            }
          />
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Profile Picture
          </h2>

          <AvatarUploader
            avatarUrl={
              user.avatar?.url
            }
            fullName={
              user.fullName
            }
          />
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Profile Information
          </h2>

          <EditProfileForm
            user={user}
          />
        </div>
      </div>
    </div>
  );
}
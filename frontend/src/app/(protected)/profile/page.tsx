"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import ProfileAbout from "@/components/user/ProfileAbout";
import ProfileHeader from "@/components/user/ProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";

import { useMyProfile } from "@/features/user/hooks/useMyProfile";

import type { ProfileTab } from "@/features/user/constants/profile-tabs";

export default function ProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<ProfileTab>("posts");

  const {
    data,
    isLoading,
    isError,
  } = useMyProfile();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading profile...
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
    <div className="space-y-6">
      <ProfileHeader
        user={user}
        isOwner
        onEditProfile={() =>
          router.push("/accounts/edit")
        }
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "posts" && (
        <div className="rounded-xl border p-6">
          Posts feature coming soon.
        </div>
      )}

      {activeTab === "media" && (
        <div className="rounded-xl border p-6">
          Media feature coming soon.
        </div>
      )}

      {activeTab === "likes" && (
        <div className="rounded-xl border p-6">
          Likes feature coming soon.
        </div>
      )}

      {activeTab ===
        "collections" && (
        <div className="rounded-xl border p-6">
          Collections feature coming
          soon.
        </div>
      )}

      {activeTab === "about" && (
        <ProfileAbout user={user} />
      )}
    </div>
  );
}
"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import ProfileAbout from "@/components/user/ProfileAbout";
import ProfileHeader from "@/components/user/ProfileHeader";
import ProfileTabs from "@/components/user/ProfileTabs";

import ProfilePosts from "@/components/user/ProfilePost";
import ProfileMedia from "@/components/user/ProfileMedia";

import { useProfile } from "@/features/user/hooks/useProfile";
import { useAuthStore } from "@/features/auth/store/auth.store";

import type { ProfileTab } from "@/features/user/constants/profile-tabs";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] =
    useState<ProfileTab>("posts");

  const params = useParams();

  const username =
    params.username as string;

  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const {
    data,
    isLoading,
    isError,
  } = useProfile(username);

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
        User not found.
      </div>
    );
  }

  const user = data.data;

  const isOwner =
    currentUser?.username ===
    user.username;

  return (
    <div className="space-y-6">
      <ProfileHeader
        user={user}
        isOwner={isOwner}
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "posts" && (
        <ProfilePosts
          username={
            user.username
          }
        />
      )}

      {activeTab === "media" && (
        <ProfileMedia
          username={
            user.username
          }
        />
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
        <ProfileAbout
          user={user}
        />
      )}
    </div>
  );
}
// src/components/message/layout/ChatInfoPanel.tsx

"use client";

import UserInfoPanel from "../panel/UserInfoPanel";

import SharedMedia from "../panel/SharedMedia";

import SharedFiles from "../panel/SharedFiles";

import SharedLinks from "../panel/SharedLinks";

interface ChatInfoPanelProps {
  user?: {
    _id: string;

    username: string;

    fullName: string;

    avatar?: string;

    bio?: string;

    faculty?: string;

    major?: string;

    isVerified?: boolean;

    followersCount?: number;

    followingCount?: number;
  };

  media?: {
    _id: string;

    type:
      | "image"
      | "video";

    url: string;
  }[];

  files?: {
    _id: string;

    filename: string;

    size?: number;

    url?: string;

    extension?: string;
  }[];

  links?: {
    _id: string;

    url: string;

    title?: string;

    domain?: string;
  }[];
}

export default function ChatInfoPanel({
  user,

  media = [],

  files = [],

  links = [],
}: ChatInfoPanelProps) {
  return (
    <aside
      className="
        h-full

        overflow-y-auto

        border-l
        border-zinc-800

        bg-zinc-950
      "
    >
      <UserInfoPanel
        user={user}
      />

      <SharedMedia
        media={media}
      />

      <SharedFiles
        files={files}
      />

      <SharedLinks
        links={links}
      />
    </aside>
  );
}
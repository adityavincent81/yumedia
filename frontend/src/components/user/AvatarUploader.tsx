"use client";

import { useState } from "react";

import ProfileAvatar from "./ProfileAvatar";

import { useUpdateAvatar } from "@/features/user/hooks/useUpdateAvatar";

interface AvatarUploaderProps {
  avatarUrl?: string | null;

  fullName: string;
}

export default function AvatarUploader({
  avatarUrl,
  fullName,
}: AvatarUploaderProps) {
  const updateAvatar =
    useUpdateAvatar();

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(
      avatarUrl ?? null
    );

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const localPreview =
      URL.createObjectURL(file);

    setPreviewUrl(localPreview);

    try {
      await updateAvatar.mutateAsync(
        file
      );
    } catch {
      setPreviewUrl(
        avatarUrl ?? null
      );
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <ProfileAvatar
        avatarUrl={previewUrl}
        fullName={fullName}
        size={140}
      />

      <label className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium">
        {updateAvatar.isPending
          ? "Uploading..."
          : "Change Avatar"}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={
            updateAvatar.isPending
          }
        />
      </label>

      {updateAvatar.isError && (
        <p className="text-sm text-destructive">
          Failed to upload avatar.
        </p>
      )}
    </div>
  );
}
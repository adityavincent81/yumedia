"use client";

import { useState } from "react";

import ProfileCover from "./ProfileCover";

import { useUpdateCover } from "@/features/user/hooks/useUpdateCover";

interface CoverUploaderProps {
  coverUrl?: string | null;
}

export default function CoverUploader({
  coverUrl,
}: CoverUploaderProps) {
  const updateCover =
    useUpdateCover();

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(
      coverUrl ?? null
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
      await updateCover.mutateAsync(
        file
      );
    } catch {
      setPreviewUrl(
        coverUrl ?? null
      );
    }
  };

  return (
    <div className="space-y-4">
      <ProfileCover
        coverUrl={previewUrl}
        height={220}
      />

      <label className="inline-flex cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium">
        {updateCover.isPending
          ? "Uploading..."
          : "Change Cover"}

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={
            updateCover.isPending
          }
        />
      </label>

      {updateCover.isError && (
        <p className="text-sm text-destructive">
          Failed to upload cover.
        </p>
      )}
    </div>
  );
}
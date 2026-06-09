"use client";

import { useEffect, useState } from "react";

import { useUpdateProfile } from "@/features/user/hooks/useUpdateProfile";

import type {
  UpdateProfilePayload,
  User,
} from "@/features/user/types/user.types";

interface EditProfileFormProps {
  user: User;
}

export default function EditProfileForm({
  user,
}: EditProfileFormProps) {
  const updateProfile =
    useUpdateProfile();

  const [form, setForm] =
    useState<UpdateProfilePayload>({
      fullName: "",
      bio: "",
      faculty: "",
      major: "",
      batchYear: null,
      website: "",
      location: "",
    });

  useEffect(() => {
    setForm({
      fullName: user.fullName,
      bio: user.bio,
      faculty:
        user.faculty ?? "",
      major: user.major ?? "",
      batchYear:
        user.batchYear,
      website:
        user.website ?? "",
      location:
        user.location ?? "",
    });
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "batchYear"
          ? value
            ? Number(value)
            : null
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await updateProfile.mutateAsync(
      form
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="fullName"
          value={
            form.fullName ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Bio
        </label>

        <textarea
          name="bio"
          rows={4}
          value={
            form.bio ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Faculty
        </label>

        <input
          type="text"
          name="faculty"
          value={
            form.faculty ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Major
        </label>

        <input
          type="text"
          name="major"
          value={
            form.major ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Batch Year
        </label>

        <input
          type="number"
          name="batchYear"
          value={
            form.batchYear ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Website
        </label>

        <input
          type="url"
          name="website"
          value={
            form.website ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Location
        </label>

        <input
          type="text"
          name="location"
          value={
            form.location ?? ""
          }
          onChange={
            handleChange
          }
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={
          updateProfile.isPending
        }
        className="rounded-lg border px-4 py-2 font-medium"
      >
        {updateProfile.isPending
          ? "Saving..."
          : "Save Changes"}
      </button>
    </form>
  );
}
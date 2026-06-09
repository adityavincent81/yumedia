import { create } from "zustand";

interface ProfileStore {
  isEditProfileOpen: boolean;

  setEditProfileOpen: (
    value: boolean
  ) => void;
}

export const useProfileStore =
  create<ProfileStore>((set) => ({
    isEditProfileOpen: false,

    setEditProfileOpen: (
      value
    ) =>
      set({
        isEditProfileOpen:
          value,
      }),
  }));
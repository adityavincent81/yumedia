import { create } from "zustand";

import type {
  PostVisibility,
} from "../types/post.types";

interface PostStore {
  isCreatePostOpen: boolean;

  caption: string;

  visibility: PostVisibility;

  files: File[];

  isUploading: boolean;

  openCreatePost: () => void;

  closeCreatePost: () => void;

  setCaption: (
    caption: string
  ) => void;

  setVisibility: (
    visibility: PostVisibility
  ) => void;

  setFiles: (
    files: File[]
  ) => void;

  addFiles: (
    files: File[]
  ) => void;

  removeFile: (
    index: number
  ) => void;

  clearFiles: () => void;

  setUploading: (
    uploading: boolean
  ) => void;

  reset: () => void;
}

export const usePostStore =
  create<PostStore>(
    (set) => ({
      isCreatePostOpen: false,

      caption: "",

      visibility: "public",

      files: [],

      isUploading: false,

      openCreatePost: () =>
        set({
          isCreatePostOpen: true,
        }),

      closeCreatePost: () =>
        set({
          isCreatePostOpen: false,
        }),

      setCaption: (
        caption
      ) =>
        set({
          caption,
        }),

      setVisibility: (
        visibility
      ) =>
        set({
          visibility,
        }),

      setFiles: (
        files
      ) =>
        set({
          files,
        }),

      addFiles: (
        newFiles
      ) =>
        set((state) => ({
          files: [
            ...state.files,
            ...newFiles,
          ],
        })),

      removeFile: (
        index
      ) =>
        set((state) => ({
          files:
            state.files.filter(
              (_, i) =>
                i !== index
            ),
        })),

      clearFiles: () =>
        set({
          files: [],
        }),

      setUploading: (
        isUploading
      ) =>
        set({
          isUploading,
        }),

      reset: () =>
        set({
          caption: "",

          visibility:
            "public",

          files: [],

          isUploading:
            false,

          isCreatePostOpen:
            false,
        }),
    })
  );
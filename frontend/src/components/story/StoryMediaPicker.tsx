// src/components/story/StoryMediaPicker.tsx

"use client";

import Image from "next/image";
import {
  ChangeEvent,
  useRef,
} from "react";

import {
  Trash2,
  Upload,
} from "lucide-react";

import {
  STORY_ACCEPTED_IMAGES,
  STORY_ACCEPTED_VIDEOS,
  STORY_MAX_FILE_SIZE,
} from "@/features/story/constants/story.constants";

import type {
  StoryType,
} from "@/features/story/types/story.types";

interface StoryMediaPickerProps {
  type: StoryType;

  file: File | null;

  previewUrl: string | null;

  onChange: (
    file: File | null
  ) => void;
}

export default function StoryMediaPicker({
  type,
  file,
  previewUrl,
  onChange,
}: StoryMediaPickerProps) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile =
      event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (
      selectedFile.size >
      STORY_MAX_FILE_SIZE
    ) {
      alert(
        `Maximum file size is ${Math.round(
          STORY_MAX_FILE_SIZE /
            1024 /
            1024
        )} MB`
      );

      event.target.value =
        "";

      return;
    }

    const acceptedMimeTypes =
      type === "image"
        ? STORY_ACCEPTED_IMAGES
        : STORY_ACCEPTED_VIDEOS;

    if (
      !acceptedMimeTypes.includes(
        selectedFile.type
      )
    ) {
      alert(
        `Invalid ${type} format`
      );

      event.target.value =
        "";

      return;
    }

    onChange(
      selectedFile
    );

    /**
     * allow selecting same file again
     */

    event.target.value =
      "";
  };

  const handleRemove =
    () => {
      onChange(null);

      if (
        inputRef.current
      ) {
        inputRef.current.value =
          "";
      }
    };

  return (
    <div className="space-y-4">
      {/* Upload */}

      {!file && (
        <label
          className="
            flex
            cursor-pointer
            flex-col
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-dashed
            border-zinc-700
            bg-zinc-900
            p-10
            transition
            hover:border-zinc-500
          "
        >
          <Upload className="h-8 w-8 text-zinc-400" />

          <span className="text-sm text-zinc-300">
            Click to upload{" "}
            {type}
          </span>

          <span className="text-xs text-zinc-500">
            Max size:{" "}
            {Math.round(
              STORY_MAX_FILE_SIZE /
                1024 /
                1024
            )}{" "}
            MB
          </span>

          <input
            ref={
              inputRef
            }
            type="file"
            aria-label={`Upload ${type}`}
            accept={
              type === "image"
                ? STORY_ACCEPTED_IMAGES.join(
                    ","
                  )
                : STORY_ACCEPTED_VIDEOS.join(
                    ","
                  )
            }
            onChange={
              handleFileChange
            }
            className="hidden"
          />
        </label>
      )}

      {/* Preview */}

      {file &&
        previewUrl && (
          <div className="overflow-hidden rounded-2xl border border-zinc-800">
            {type ===
            "image" ? (
              <div className="relative aspect-[9/16] w-full bg-black">
                <Image
                  src={
                    previewUrl
                  }
                  alt="Story Preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-contain"
                />
              </div>
            ) : (
              <video
                src={
                  previewUrl
                }
                controls
                preload="metadata"
                className="max-h-[500px] w-full bg-black"
              />
            )}

            <div className="flex justify-end border-t border-zinc-800 p-3">
              <button
                type="button"
                aria-label="Remove media"
                onClick={
                  handleRemove
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-red-500/10
                  px-3
                  py-2
                  text-sm
                  text-red-400
                  transition
                  hover:bg-red-500/20
                "
              >
                <Trash2 className="h-4 w-4" />

                Remove
              </button>
            </div>
          </div>
        )}
    </div>
  );
}
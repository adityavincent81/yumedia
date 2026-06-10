"use client";

import { useRef } from "react";

interface MediaDropzoneProps {
  onFilesSelected: (
    files: File[]
  ) => void;
}

export default function MediaDropzone({
  onFilesSelected,
}: MediaDropzoneProps) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const handleFiles = (
    fileList: FileList | null
  ) => {
    if (!fileList) {
      return;
    }

    onFilesSelected(
      Array.from(fileList)
    );
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();

    handleFiles(
      event.dataTransfer.files
    );
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
  };

  const handleBrowseClick =
    () => {
      inputRef.current?.click();
    };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={
        handleDragOver
      }
      className="
        flex
        min-h-[400px]
        flex-col
        items-center
        justify-center
        rounded-xl
        border-2
        border-dashed
        border-zinc-700
        p-8
        text-center
      "
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Drag photos and videos
          here
        </h3>

        <p className="text-sm text-zinc-400">
          Upload images or
          videos to create a
          post
        </p>

        <button
          type="button"
          onClick={
            handleBrowseClick
          }
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          Select Media
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="
          image/jpeg,
          image/jpg,
          image/png,
          image/webp,
          video/mp4,
          video/webm,
          video/quicktime
        "
        className="hidden"
        onChange={(e) =>
          handleFiles(
            e.target.files
          )
        }
      />
    </div>
  );
}
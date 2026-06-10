"use client";

import { usePostStore } from "@/features/post/store/post.store";

import { useCreatePost } from "@/features/post/hooks/useCreatePost";

import Modal from "@/components/ui/Modal";

import MediaDropzone from "./MediaDropzone";

import MediaPreview from "./MediaPreview";

export default function CreatePostModal() {
  const {
    isCreatePostOpen,

    closeCreatePost,

    caption,
    visibility,
    files,

    setCaption,
    setVisibility,

    addFiles,
    removeFile,
  } = usePostStore();

  const {
    mutate: createPost,
    isPending,
  } = useCreatePost();

  const handleSubmit = () => {
    createPost({
      caption,
      visibility,
      files,
    });
  };

  return (
    <Modal
      isOpen={isCreatePostOpen}
      onClose={closeCreatePost}
      title="Create Post"
      size="xl"
    >
      <div className="space-y-6">
        {!files.length ? (
          <MediaDropzone
            onFilesSelected={
              addFiles
            }
          />
        ) : (
          <MediaPreview
            files={files}
            onRemove={
              removeFile
            }
          />
        )}

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-medium
              text-zinc-300
            "
          >
            Caption
          </label>

          <textarea
            value={caption}
            onChange={(e) =>
              setCaption(
                e.target.value
              )
            }
            placeholder="What's happening?"
            rows={5}
            maxLength={2200}
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-950
              p-4
              text-white
              outline-none
              focus:border-zinc-600
            "
          />

          <div
            className="
              text-right
              text-xs
              text-zinc-500
            "
          >
            {caption.length}
            /2200
          </div>
        </div>

        <div className="space-y-2">
          <label
            className="
              text-sm
              font-medium
              text-zinc-300
            "
          >
            Visibility
          </label>

          <select
            value={visibility}
            onChange={(e) =>
              setVisibility(
                e.target.value as
                  | "public"
                  | "followers"
                  | "private"
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-950
              p-3
              text-white
              outline-none
              focus:border-zinc-600
            "
          >
            <option value="public">
              🌎 Public
            </option>

            <option value="followers">
              👥 Followers
            </option>

            <option value="private">
              🔒 Private
            </option>
          </select>
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
          "
        >
          <button
            type="button"
            onClick={
              closeCreatePost
            }
            disabled={
              isPending
            }
            className="
              rounded-xl
              border
              border-zinc-800
              px-4
              py-2
              text-white
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={
              handleSubmit
            }
            disabled={
              isPending
            }
            className="
              rounded-xl
              bg-blue-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {isPending
              ? "Posting..."
              : "Post"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/Modal";

import { useUpdatePost } from "@/features/post/hooks/useUpdatePost";

import type {
  Post,
  PostVisibility,
} from "@/features/post/types/post.types";

interface EditPostModalProps {
  isOpen: boolean;

  onClose: () => void;

  post: Post;
}

export default function EditPostModal({
  isOpen,
  onClose,
  post,
}: EditPostModalProps) {
  const [caption, setCaption] =
    useState("");

  const [
    visibility,
    setVisibility,
  ] =
    useState<PostVisibility>(
      "public"
    );

  const {
    mutate: updatePost,
    isPending,
  } = useUpdatePost();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCaption(
      post.caption || ""
    );

    setVisibility(
      post.visibility
    );
  }, [isOpen, post]);

  const handleSubmit = () => {
    updatePost(
      {
        postId: post._id,

        payload: {
          caption,

          visibility,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Post"
      size="lg"
    >
      <div className="space-y-6">
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
            rows={6}
            maxLength={2200}
            placeholder="What's happening?"
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
                e.target
                  .value as PostVisibility
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
            onClick={onClose}
            disabled={isPending}
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
            onClick={handleSubmit}
            disabled={isPending}
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
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
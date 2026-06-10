"use client";

import Modal from "@/components/ui/Modal";

import { useDeletePost } from "@/features/post/hooks/useDeletePost";

interface DeletePostModalProps {
  isOpen: boolean;

  onClose: () => void;

  postId: string;
}

export default function DeletePostModal({
  isOpen,
  onClose,
  postId,
}: DeletePostModalProps) {
  const {
    mutate: deletePost,
    isPending,
  } = useDeletePost();

  const handleDelete = () => {
    deletePost(postId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Post"
      size="sm"
    >
      <div className="space-y-6">
        <p className="text-zinc-300">
          Are you sure you want to
          delete this post?
        </p>

        <p className="text-sm text-zinc-500">
          This action cannot be
          undone.
        </p>

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
            onClick={handleDelete}
            disabled={isPending}
            className="
              rounded-xl
              bg-red-600
              px-4
              py-2
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
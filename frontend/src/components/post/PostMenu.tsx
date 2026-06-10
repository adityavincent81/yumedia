"use client";

import {
  Bookmark,
  Flag,
  EyeOff,
  UserX,
  Pencil,
  Trash2,
  Link2,
} from "lucide-react";

interface PostMenuProps {
  open: boolean;

  isOwner?: boolean;

  onEdit?: () => void;

  onDelete?: () => void;

  onCopyLink?: () => void;
}

export default function PostMenu({
  open,
  isOwner = false,
  onEdit,
  onDelete,
  onCopyLink,
}: PostMenuProps) {
  if (!open) {
    return null;
  }

  const handleComingSoon = (
    feature: string
  ) => {
    alert(
      `${feature} feature coming soon`
    );
  };

  return (
    <div
      className="
        absolute
        right-0
        top-full
        z-[999]
        mt-2

        w-60

        overflow-hidden

        rounded-2xl

        border
        border-zinc-800

        bg-zinc-900

        shadow-2xl
        shadow-black/50
      "
    >
      {/* GENERAL */}
      <button
        type="button"
        onClick={onCopyLink}
        className="
          flex
          w-full
          items-center
          gap-3

          px-4
          py-3

          text-sm
          text-white

          transition-all

          hover:bg-zinc-800
        "
      >
        <Link2 size={16} />
        Copy Link
      </button>

      <button
        type="button"
        onClick={() =>
          handleComingSoon(
            "Save Post"
          )
        }
        className="
          flex
          w-full
          items-center
          gap-3

          px-4
          py-3

          text-sm
          text-white

          transition-all

          hover:bg-zinc-800
        "
      >
        <Bookmark size={16} />
        Save Post
      </button>

      <div className="border-t border-zinc-800" />

      {/* SAFETY */}
      <button
        type="button"
        onClick={() =>
          handleComingSoon(
            "Report Post"
          )
        }
        className="
          flex
          w-full
          items-center
          gap-3

          px-4
          py-3

          text-sm
          text-white

          transition-all

          hover:bg-zinc-800
        "
      >
        <Flag size={16} />
        Report Post
      </button>

      <button
        type="button"
        onClick={() =>
          handleComingSoon(
            "Hide Post"
          )
        }
        className="
          flex
          w-full
          items-center
          gap-3

          px-4
          py-3

          text-sm
          text-white

          transition-all

          hover:bg-zinc-800
        "
      >
        <EyeOff size={16} />
        Hide Post
      </button>

      <button
        type="button"
        onClick={() =>
          handleComingSoon(
            "Block User"
          )
        }
        className="
          flex
          w-full
          items-center
          gap-3

          px-4
          py-3

          text-sm
          text-white

          transition-all

          hover:bg-zinc-800
        "
      >
        <UserX size={16} />
        Block User
      </button>

      {/* OWNER */}
      {isOwner && (
        <>
          <div className="border-t border-zinc-800" />

          <button
            type="button"
            onClick={onEdit}
            className="
              flex
              w-full
              items-center
              gap-3

              px-4
              py-3

              text-sm
              text-white

              transition-all

              hover:bg-zinc-800
            "
          >
            <Pencil size={16} />
            Edit Post
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="
              flex
              w-full
              items-center
              gap-3

              px-4
              py-3

              text-sm
              text-red-500

              transition-all

              hover:bg-zinc-800
            "
          >
            <Trash2 size={16} />
            Delete Post
          </button>
        </>
      )}
    </div>
  );
}
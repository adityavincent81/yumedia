// src/components/story/StoryMoreActions.tsx

"use client";

import {
  Share2,
  Link2,
  Bookmark,
  Flag,
  BellOff,
  Trash2,
  X,
} from "lucide-react";

interface StoryMoreActionsProps {
  open: boolean;

  isOwner?: boolean;

  onClose: () => void;
}

export default function StoryMoreActions({
  open,
  isOwner = false,
  onClose,
}: StoryMoreActionsProps) {
  if (!open) {
    return null;
  }

  const handleAction = (
    action: string
  ) => {
    console.log(
      "Story Action:",
      action
    );

    onClose();
  };

  return (
    <>
      {/* Backdrop */}

      <button
        type="button"
        aria-label="Close actions"
        onClick={
          onClose
        }
        className="
          fixed
          inset-0
          z-[1001]
          bg-black/60
          backdrop-blur-sm
        "
      />

      {/* Sheet */}

      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-[1002]
          animate-in
          slide-in-from-bottom
          duration-300
          rounded-t-3xl
          border-t
          border-zinc-800
          bg-zinc-950
          pb-safe
        "
      >
        {/* Handle */}

        <div className="flex justify-center py-3">
          <div className="h-1.5 w-12 rounded-full bg-zinc-700" />
        </div>

        {/* Header */}

        <div className="flex items-center justify-between px-5 pb-4">
          <h3 className="text-base font-semibold text-white">
            Story Actions
          </h3>

          <button
            type="button"
            onClick={
              onClose
            }
            className="
              rounded-full
              p-2
              text-zinc-400
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Actions */}

        <div className="pb-6">
          <ActionButton
            icon={
              <Share2 className="h-5 w-5" />
            }
            label="Share Story"
            onClick={() =>
              handleAction(
                "share"
              )
            }
          />

          <ActionButton
            icon={
              <Link2 className="h-5 w-5" />
            }
            label="Copy Link"
            onClick={() =>
              handleAction(
                "copy-link"
              )
            }
          />

          <ActionButton
            icon={
              <Bookmark className="h-5 w-5" />
            }
            label="Save Story"
            onClick={() =>
              handleAction(
                "save"
              )
            }
          />

          {!isOwner && (
            <>
              <ActionButton
                icon={
                  <BellOff className="h-5 w-5" />
                }
                label="Mute User"
                onClick={() =>
                  handleAction(
                    "mute-user"
                  )
                }
              />

              <ActionButton
                icon={
                  <Flag className="h-5 w-5" />
                }
                label="Report Story"
                danger
                onClick={() =>
                  handleAction(
                    "report"
                  )
                }
              />
            </>
          )}

          {isOwner && (
            <ActionButton
              icon={
                <Trash2 className="h-5 w-5" />
              }
              label="Delete Story"
              danger
              onClick={() =>
                handleAction(
                  "delete-story"
                )
              }
            />
          )}
        </div>
      </div>
    </>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;

  label: string;

  danger?: boolean;

  onClick: () => void;
}

function ActionButton({
  icon,
  label,
  danger = false,
  onClick,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className="
        flex
        w-full
        items-center
        gap-4
        px-5
        py-4
        text-left
        transition
        hover:bg-zinc-900
      "
    >
      <div
        className={
          danger
            ? "text-red-500"
            : "text-zinc-300"
        }
      >
        {icon}
      </div>

      <span
        className={
          danger
            ? "text-red-500"
            : "text-white"
        }
      >
        {label}
      </span>
    </button>
  );
}
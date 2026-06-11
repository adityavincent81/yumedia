// src/components/story/StoryCommentDrawer.tsx

"use client";

import {
  X,
} from "lucide-react";

import {
  useStoryComments,
} from "@/features/story/hooks/useStoryComments";

import StoryCommentInput from "./StoryCommentInput";
import StoryCommentList from "./StoryCommentList";
import StorySkeleton from "./StorySkeleton";

interface StoryCommentDrawerProps {
  storyId: string;

  open: boolean;

  onClose: () => void;
}

export default function StoryCommentDrawer({
  storyId,
  open,
  onClose,
}: StoryCommentDrawerProps) {
  const {
    comments,
    isLoading,
    createComment,
    deleteComment,
    isCreating,
  } =
    useStoryComments({
      storyId,
      enabled: open,
    });

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <button
        type="button"
        aria-label="Close comments"
        onClick={onClose}
        className="
          absolute
          inset-0
          z-40
          bg-black/40
          backdrop-blur-sm
        "
      />

      {/* Drawer */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-50
          flex
          h-[75vh]
          flex-col
          overflow-hidden
          rounded-t-[32px]
          border-t
          border-white/10
          bg-zinc-950/90
          backdrop-blur-xl
          animate-in
          slide-in-from-bottom
          duration-300
        "
      >
        {/* Handle */}

        <div className="flex justify-center pt-3">
          <div
            className="
              h-1.5
              w-14
              rounded-full
              bg-zinc-700
            "
          />
        </div>

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/10
            px-5
            py-4
          "
        >
          <div>
            <h3
              className="
                text-base
                font-semibold
                text-white
              "
            >
              Comments
            </h3>

            <p
              className="
                text-xs
                text-zinc-400
              "
            >
              {comments.length} comments
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-white/5
              text-zinc-400
              transition
              hover:bg-white/10
              hover:text-white
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}

        <div
          className="
            flex-1
            overflow-y-auto
          "
        >
          {isLoading ? (
            <StorySkeleton
              variant="comment"
              count={6}
            />
          ) : (
            <StoryCommentList
              comments={
                comments
              }
              onDelete={
                deleteComment
              }
            />
          )}
        </div>

        {/* Input */}

        <div
          className="
            border-t
            border-white/10
            bg-black/20
            backdrop-blur-md
          "
        >
          <StoryCommentInput
            isSubmitting={
              isCreating
            }
            onSubmit={async (
              content
            ) => {
              await createComment(
                {
                  content,
                }
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
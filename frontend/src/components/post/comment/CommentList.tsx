"use client";

import {
  useState,
} from "react";

import CommentItem from "./CommentItem";
import ReplyList from "./ReplyList";

import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Comment,
} from "@/features/comment/types/comment.types";

interface CommentListProps {
  comments: Comment[];

  repliesByComment?: Record<
    string,
    Comment[]
  >;

  onReply?: (
    comment: Comment
  ) => void;

  onDelete?: (
    comment: Comment
  ) => void;

  onLoadReplies?: (
    commentId: string
  ) => void;

  loading?: boolean;
}

export default function CommentList({
  comments,

  repliesByComment = {},

  onReply,

  onDelete,

  onLoadReplies,

  loading = false,
}: CommentListProps) {
  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  const [
    expandedReplies,
    setExpandedReplies,
  ] = useState<
    Record<
      string,
      boolean
    >
  >({});

  const toggleReplies = (
    comment: Comment
  ) => {
    const isOpen =
      expandedReplies[
        comment._id
      ];

    if (!isOpen) {
      onLoadReplies?.(
        comment._id
      );
    }

    setExpandedReplies(
      (prev) => ({
        ...prev,

        [comment._id]:
          !isOpen,
      })
    );
  };

  if (loading) {
    return (
      <div
        className="
          py-8
          text-center
          text-sm
          text-zinc-500
        "
      >
        Loading comments...
      </div>
    );
  }

  if (
    comments.length === 0
  ) {
    return (
      <div
        className="
          py-10
          text-center
          text-sm
          text-zinc-500
        "
      >
        No comments yet.
        Be the first to
        comment.
      </div>
    );
  }

  return (
    <div
      className="
        space-y-6
      "
    >
      {comments.map(
        (comment) => {
          const replies =
            repliesByComment[
              comment._id
            ] || [];

          const isOpen =
            expandedReplies[
              comment._id
            ];

          const isOwner =
            currentUser?._id ===
            comment.author._id;

          return (
            <div
              key={
                comment._id
              }
            >
              <CommentItem
                comment={
                  comment
                }
                isOwner={
                  isOwner
                }
                repliesCount={
                  comment.repliesCount
                }
                showReplies={
                  isOpen
                }
                onReply={() =>
                  onReply?.(
                    comment
                  )
                }
                onDelete={() =>
                  onDelete?.(
                    comment
                  )
                }
                onToggleReplies={() =>
                  toggleReplies(
                    comment
                  )
                }
              />

              {isOpen && (
                <div
                  className="
                    ml-12
                    mt-4
                  "
                >
                  <ReplyList
                    replies={
                      replies
                    }
                    parentCommentId={
                      comment._id
                    }
                  />
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
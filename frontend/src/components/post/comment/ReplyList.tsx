"use client";

import CommentItem from "./CommentItem";

import { useAuthStore } from "@/features/auth/store/auth.store";

import type {
  Comment,
} from "@/features/comment/types/comment.types";

interface ReplyListProps {
  replies: Comment[];

  parentCommentId: string;

  onReply?: (
    reply: Comment
  ) => void;

  onDelete?: (
    reply: Comment
  ) => void;
}

export default function ReplyList({
  replies,

  parentCommentId,

  onReply,

  onDelete,
}: ReplyListProps) {
  const currentUser =
    useAuthStore(
      (state) => state.user
    );

  if (
    !replies ||
    replies.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
        relative
        space-y-4
      "
    >
      {/* Thread Line */}
      <div
        className="
          absolute
          left-4
          top-0
          bottom-0
          w-px
          bg-zinc-800
        "
      />

      {replies.map(
        (reply) => {
          const isOwner =
            currentUser?._id ===
            reply.author._id;

          return (
            <div
              key={reply._id}
              className="
                relative
                pl-6
              "
            >
              {/* Connector */}
              <div
                className="
                  absolute
                  left-0
                  top-5

                  h-px
                  w-4

                  bg-zinc-800
                "
              />

              <CommentItem
                comment={reply}
                isOwner={
                  isOwner
                }
                repliesCount={0}
                showReplies={
                  false
                }
                onReply={() =>
                  onReply?.(
                    reply
                  )
                }
                onDelete={() =>
                  onDelete?.(
                    reply
                  )
                }
              />
            </div>
          );
        }
      )}
    </div>
  );
}
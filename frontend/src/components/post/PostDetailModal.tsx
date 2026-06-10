"use client";

import {
  useEffect,
} from "react";

import Modal from "@/components/ui/Modal";

import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostCaption from "./PostCaption";
import PostActions from "./PostActions";

import CommentInput from "@/components/post/comment/CommentInput";
import CommentList from "@/components/post/comment/CommentList";

import { useComment } from "@/features/comment/hooks/useComment";
import { useCommentStore } from "@/features/comment/store/comment.store";

export default function PostDetailModal() {
  const {
    selectedPost,

    isPostDetailOpen,

    closePostDetail,

    commentsByPost,

    repliesByComment,
  } = useCommentStore();

  const {
    getPostComments,

    getReplies,

    createComment,

    deleteComment,
  } = useComment();

  useEffect(() => {
    if (
      !selectedPost ||
      !isPostDetailOpen
    ) {
      return;
    }

    getPostComments(
      selectedPost._id
    );
  }, [
    selectedPost,
    isPostDetailOpen,
    getPostComments,
  ]);

  if (
    !selectedPost
  ) {
    return null;
  }

  const comments =
    commentsByPost[
      selectedPost._id
    ] || [];

  const hasMedia =
    selectedPost.media
      .length > 0;

  return (
    <Modal
      isOpen={
        isPostDetailOpen
      }
      onClose={
        closePostDetail
      }
      size="xl"
    >
      <div
        className={
          hasMedia
            ? `
              flex
              h-[80vh]
              overflow-hidden
            `
            : `
              flex
              h-[80vh]
              flex-col
            `
        }
      >
        {/* Media */}
        {hasMedia && (
          <div
            className="
              flex
              flex-1
              items-center
              justify-center

              border-r
              border-zinc-800

              bg-black
            "
          >
            <PostMedia
              media={
                selectedPost.media
              }
            />
          </div>
        )}

        {/* Right Panel */}
        <div
          className={`
            flex
            flex-col

            ${
              hasMedia
                ? "w-[420px]"
                : "w-full"
            }
          `}
        >
          {/* Header */}
          <div
            className="
              border-b
              border-zinc-800
              p-4
            "
          >
            <PostHeader
              author={
                selectedPost.author
              }
              createdAt={
                selectedPost.createdAt
              }
              showMenu
            />
          </div>

          {/* Caption + Comments */}
          <div
            className="
              flex-1
              overflow-y-auto
              p-4
            "
          >
            <div
              className="
                mb-6
              "
            >
              <PostCaption
                caption={
                  selectedPost.caption
                }
              />
            </div>

            <CommentList
              comments={
                comments
              }
              repliesByComment={
                repliesByComment
              }
              onLoadReplies={
                getReplies
              }
              onDelete={(
                comment
              ) =>
                deleteComment(
                  selectedPost._id,
                  comment._id
                )
              }
            />
          </div>

          {/* Actions */}
          <div
            className="
              border-t
              border-zinc-800
              p-4
            "
          >
            <PostActions
              likesCount={
                selectedPost.likesCount
              }
              commentsCount={
                selectedPost.commentsCount
              }
              savesCount={
                selectedPost.savesCount
              }
            />

            <div
              className="
                mt-4
              "
            >
              <CommentInput
                onSubmit={async (
                  content
                ) => {
                  await createComment(
                    selectedPost._id,
                    content
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
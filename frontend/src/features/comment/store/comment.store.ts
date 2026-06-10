"use client";

import { create } from "zustand";

import type {
  Post,
} from "@/features/post/types/post.types";

import type {
  Comment,
  CommentStoreState,
} from "../types/comment.types";

interface CommentStore
  extends CommentStoreState {
  openPostDetail: (
    post: Post
  ) => void;

  closePostDetail: () => void;

  setComments: (
    postId: string,
    comments: Comment[]
  ) => void;

  addComment: (
    postId: string,
    comment: Comment
  ) => void;

  removeComment: (
    postId: string,
    commentId: string
  ) => void;

  setReplies: (
    commentId: string,
    replies: Comment[]
  ) => void;

  addReply: (
    commentId: string,
    reply: Comment
  ) => void;

  removeReply: (
    commentId: string,
    replyId: string
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  clearComments: () => void;
}

export const useCommentStore =
  create<CommentStore>(
    (set) => ({
      commentsByPost: {},

      repliesByComment: {},

      selectedPost: null,

      isPostDetailOpen: false,

      loading: false,

      openPostDetail: (
        post
      ) =>
        set({
          selectedPost: post,

          isPostDetailOpen: true,
        }),

      closePostDetail: () =>
        set({
          selectedPost: null,

          isPostDetailOpen: false,
        }),

      setComments: (
        postId,
        comments
      ) =>
        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,

            [postId]:
              comments,
          },
        })),

      addComment: (
        postId,
        comment
      ) =>
        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,

            [postId]: [
              comment,
              ...(
                state
                  .commentsByPost[
                  postId
                ] || []
              ),
            ],
          },
        })),

      removeComment: (
        postId,
        commentId
      ) =>
        set((state) => ({
          commentsByPost: {
            ...state.commentsByPost,

            [postId]: (
              state
                .commentsByPost[
                postId
              ] || []
            ).filter(
              (
                comment
              ) =>
                comment._id !==
                commentId
            ),
          },
        })),

      setReplies: (
        commentId,
        replies
      ) =>
        set((state) => ({
          repliesByComment: {
            ...state.repliesByComment,

            [commentId]:
              replies,
          },
        })),

      addReply: (
        commentId,
        reply
      ) =>
        set((state) => ({
          repliesByComment: {
            ...state.repliesByComment,

            [commentId]: [
              reply,
              ...(
                state
                  .repliesByComment[
                  commentId
                ] || []
              ),
            ],
          },
        })),

      removeReply: (
        commentId,
        replyId
      ) =>
        set((state) => ({
          repliesByComment: {
            ...state.repliesByComment,

            [commentId]: (
              state
                .repliesByComment[
                commentId
              ] || []
            ).filter(
              (
                reply
              ) =>
                reply._id !==
                replyId
            ),
          },
        })),

      setLoading: (
        loading
      ) =>
        set({
          loading,
        }),

      clearComments: () =>
        set({
          commentsByPost: {},

          repliesByComment:
            {},

          loading: false,
        }),
    })
  );
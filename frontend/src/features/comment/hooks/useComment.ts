"use client";

import { useCallback } from "react";

import { commentService } from "../service/comment.service";

import { useCommentStore } from "../store/comment.store";

export function useComment() {
  const {
    commentsByPost,

    repliesByComment,

    setComments,

    addComment,

    removeComment,

    setReplies,

    addReply,

    removeReply,

    setLoading,
  } = useCommentStore();

  const getPostComments =
    useCallback(
      async (
        postId: string
      ) => {
        try {
          setLoading(true);

          const response =
            await commentService.getPostComments(
              postId
            );

          setComments(
            postId,
            response.comments
          );

          return response;
        } finally {
          setLoading(false);
        }
      },
      [
        setComments,
        setLoading,
      ]
    );

  const getReplies =
    useCallback(
      async (
        commentId: string
      ) => {
        try {
          setLoading(true);

          const response =
            await commentService.getReplies(
              commentId
            );

          setReplies(
            commentId,
            response.replies
          );

          return response;
        } finally {
          setLoading(false);
        }
      },
      [
        setReplies,
        setLoading,
      ]
    );

  const createComment =
    useCallback(
      async (
        postId: string,
        content: string
      ) => {
        const comment =
          await commentService.createComment(
            {
              postId,
              content,
            }
          );

        addComment(
          postId,
          comment
        );

        return comment;
      },
      [addComment]
    );

  const createReply =
    useCallback(
      async (
        commentId: string,
        content: string
      ) => {
        const reply =
          await commentService.createReply(
            {
              commentId,
              content,
            }
          );

        addReply(
          commentId,
          reply
        );

        return reply;
      },
      [addReply]
    );

  const deleteComment =
    useCallback(
      async (
        postId: string,
        commentId: string
      ) => {
        await commentService.deleteComment(
          commentId
        );

        removeComment(
          postId,
          commentId
        );
      },
      [removeComment]
    );

  const deleteReply =
    useCallback(
      async (
        commentId: string,
        replyId: string
      ) => {
        await commentService.deleteComment(
          replyId
        );

        removeReply(
          commentId,
          replyId
        );
      },
      [removeReply]
    );

  return {
    commentsByPost,

    repliesByComment,

    getPostComments,

    getReplies,

    createComment,

    createReply,

    deleteComment,

    deleteReply,
  };
}
import { api } from "@/lib/api";

import type {
  Comment,
  CreateCommentPayload,
  CreateReplyPayload,
  PostCommentsResponse,
  RepliesResponse,
} from "../types/comment.types";

interface ApiResponse<T> {
  success: boolean;

  message: string;

  data: T;
}

class CommentService {
  async getPostComments(
    postId: string,
    page = 1,
    limit = 20
  ): Promise<PostCommentsResponse> {
    const response =
      await api.get<
        ApiResponse<PostCommentsResponse>
      >(
        `/comments/post/${postId}`,
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data.data;
  }

  async getReplies(
    commentId: string,
    page = 1,
    limit = 20
  ): Promise<RepliesResponse> {
    const response =
      await api.get<
        ApiResponse<RepliesResponse>
      >(
        `/comments/${commentId}/replies`,
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data.data;
  }

  async createComment(
    payload: CreateCommentPayload
  ): Promise<Comment> {
    const response =
      await api.post<
        ApiResponse<Comment>
      >(
        "/comments",
        payload
      );

    return response.data.data;
  }

  async createReply(
    payload: CreateReplyPayload
  ): Promise<Comment> {
    const response =
      await api.post<
        ApiResponse<Comment>
      >(
        `/comments/${payload.commentId}/reply`,
        {
          content:
            payload.content,
        }
      );

    return response.data.data;
  }

  async deleteComment(
    commentId: string
  ): Promise<void> {
    await api.delete(
      `/comments/${commentId}`
    );
  }
}

export const commentService =
  new CommentService();
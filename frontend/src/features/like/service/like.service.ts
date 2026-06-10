import { api } from "@/lib/api";

import type {
  LikeStatus,
  ToggleLikeResponse,
  PostLikesResponse,
} from "../types/like.types";

const toggleLike = async (
  postId: string
): Promise<ToggleLikeResponse> => {
  const response =
    await api.post(
      `/likes/${postId}`
    );

  return response.data.data;
};

const getLikeStatus = async (
  postId: string
): Promise<LikeStatus> => {
  const response =
    await api.get(
      `/likes/${postId}/status`
    );

  return response.data.data;
};

const getPostLikes = async (
  postId: string,
  page = 1,
  limit = 20
): Promise<PostLikesResponse> => {
  const response =
    await api.get(
      `/likes/post/${postId}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

  return response.data.data;
};

export const likeService = {
  toggleLike,

  getLikeStatus,

  getPostLikes,
};
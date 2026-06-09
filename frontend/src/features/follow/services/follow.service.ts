import { api } from "@/lib/api";

import type {
  FollowActionResponse,
  FollowersResponse,
  FollowingResponse,
  FollowStatusResponse,
  FollowListParams,
} from "../types/follow.types";

class FollowService {
  async followUser(
    userId: string
  ): Promise<FollowActionResponse> {
    const response =
      await api.post(
        `/follows/${userId}`
      );

    return response.data;
  }

  async unfollowUser(
    userId: string
  ): Promise<FollowActionResponse> {
    const response =
      await api.delete(
        `/follows/${userId}`
      );

    return response.data;
  }

  async getFollowers(
    userId: string,
    params?: FollowListParams
  ): Promise<FollowersResponse> {
    const response =
      await api.get(
        `/follows/${userId}/followers`,
        {
          params,
        }
      );

    return response.data;
  }

  async getFollowing(
    userId: string,
    params?: FollowListParams
  ): Promise<FollowingResponse> {
    const response =
      await api.get(
        `/follows/${userId}/following`,
        {
          params,
        }
      );

    return response.data;
  }

  async getFollowStatus(
    userId: string
  ): Promise<FollowStatusResponse> {
    const response =
      await api.get(
        `/follows/${userId}/status`
      );

    return response.data;
  }
}

export const followService =
  new FollowService();
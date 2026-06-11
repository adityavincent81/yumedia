// src/features/story/services/story.service.ts

import { api } from "@/lib/api";

import type {
  CreateStoryPayload,
  CreateStoryCommentPayload,
  CreateStoryReplyPayload,
  StoryActionResponse,
  StoryCommentsResponse,
  StoryFeedResponse,
  StoryQueryParams,
  StoryRepliesResponse,
  StoryResponse,
  StoryViewersResponse,
  UpdateStoryPayload,
} from "../types/story.types";

class StoryService {
  /**
   * Feed
   */

  async getFeed() {
    const { data } =
      await api.get<StoryFeedResponse>(
        "/stories/feed"
      );

    return data;
  }

  /**
   * Story Detail
   */

  async getStory(
    storyId: string
  ) {
    const { data } =
      await api.get<StoryResponse>(
        `/stories/${storyId}`
      );

    return data;
  }

  /**
   * Create Story
   */

  async createStory(
    payload: CreateStoryPayload
  ) {
    const formData =
      new FormData();

    formData.append(
      "type",
      payload.type
    );

    if (payload.text) {
      formData.append(
        "text",
        payload.text
      );
    }

    if (
      payload.backgroundColor
    ) {
      formData.append(
        "backgroundColor",
        payload.backgroundColor
      );
    }

    if (
      payload.visibility
    ) {
      formData.append(
        "visibility",
        payload.visibility
      );
    }

    payload.allowedUsers?.forEach(
      (userId) => {
        formData.append(
          "allowedUsers",
          userId
        );
      }
    );

    payload.excludedUsers?.forEach(
      (userId) => {
        formData.append(
          "excludedUsers",
          userId
        );
      }
    );

    if (payload.media) {
      formData.append(
        "media",
        payload.media
      );
    }

    const { data } =
      await api.post(
        "/stories",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data;
  }

  /**
   * Update Story
   */

  async updateStory(
    storyId: string,
    payload: UpdateStoryPayload
  ) {
    const { data } =
      await api.patch(
        `/stories/${storyId}`,
        payload
      );

    return data;
  }

  /**
   * Delete Story
   */

  async deleteStory(
    storyId: string
  ) {
    const { data } =
      await api.delete<StoryActionResponse>(
        `/stories/${storyId}`
      );

    return data;
  }

  /**
   * Views
   */

  async markViewed(
    storyId: string
  ) {
    const { data } =
      await api.post<StoryActionResponse>(
        `/stories/${storyId}/view`
      );

    return data;
  }

  async getViewers(
    storyId: string,
    params?: StoryQueryParams
  ) {
    const { data } =
      await api.get<StoryViewersResponse>(
        `/stories/${storyId}/viewers`,
        {
          params,
        }
      );

    return data;
  }

  /**
   * Comments
   */

  async getComments(
    storyId: string,
    params?: StoryQueryParams
  ) {
    const { data } =
      await api.get<StoryCommentsResponse>(
        `/stories/${storyId}/comments`,
        {
          params,
        }
      );

    return data;
  }

  async createComment(
    storyId: string,
    payload: CreateStoryCommentPayload
  ) {
    const { data } =
      await api.post(
        `/stories/${storyId}/comments`,
        payload
      );

    return data;
  }

  /**
   * Replies
   */

  async getReplies(
    commentId: string,
    params?: StoryQueryParams
  ) {
    const { data } =
      await api.get<StoryRepliesResponse>(
        `/stories/comments/${commentId}/replies`,
        {
          params,
        }
      );

    return data;
  }

  async createReply(
    commentId: string,
    payload: CreateStoryReplyPayload
  ) {
    const { data } =
      await api.post(
        `/stories/comments/${commentId}/replies`,
        payload
      );

    return data;
  }

  /**
   * Delete Comment
   */

  async deleteComment(
    commentId: string
  ) {
    const { data } =
      await api.delete<StoryActionResponse>(
        `/stories/comments/${commentId}`
      );

    return data;
  }
}

export const storyService =
  new StoryService();
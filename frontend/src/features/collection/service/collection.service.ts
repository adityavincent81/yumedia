import { api } from "@/lib/api";

import type {
  Collection,
  CreateCollectionPayload,
  UpdateCollectionPayload,
  CollectionPostsResponse,
} from "../types/collection.types";

import type {
  Post,
} from "@/features/post/types/post.types";

class CollectionService {
  /**
   * Collections
   */

  async getMyCollections() {
    const response =
      await api.get<{
        success: boolean;

        data: Collection[];
      }>("/collections");

    return response.data.data;
  }

  async getCollection(
    collectionId: string
  ) {
    const response =
      await api.get<{
        success: boolean;

        data: Collection;
      }>(
        `/collections/${collectionId}`
      );

    return response.data.data;
  }

  async createCollection(
    payload: CreateCollectionPayload
  ) {
    const response =
      await api.post<{
        success: boolean;

        data: Collection;
      }>(
        "/collections",
        payload
      );

    return response.data.data;
  }

  async updateCollection(
    collectionId: string,
    payload: UpdateCollectionPayload
  ) {
    const response =
      await api.patch<{
        success: boolean;

        data: Collection;
      }>(
        `/collections/${collectionId}`,
        payload
      );

    return response.data.data;
  }

  async deleteCollection(
    collectionId: string
  ) {
    await api.delete(
      `/collections/${collectionId}`
    );

    return true;
  }

  /**
   * Collection Posts
   */

  async getCollectionPosts(
    collectionId: string,
    page = 1,
    limit = 20
  ) {
    const response =
      await api.get<{
        success: boolean;

        data: CollectionPostsResponse<Post>;
      }>(
        `/collections/${collectionId}/posts`,
        {
          params: {
            page,
            limit,
          },
        }
      );

    return response.data.data;
  }

  async addPostToCollection(
    collectionId: string,
    postId: string
  ) {
    const response =
      await api.post<{
        success: boolean;
      }>(
        `/collections/${collectionId}/posts`,
        {
          postId,
        }
      );

    return response.data;
  }

  async removePostFromCollection(
    collectionId: string,
    postId: string
  ) {
    const response =
      await api.delete<{
        success: boolean;
      }>(
        `/collections/${collectionId}/posts/${postId}`
      );

    return response.data;
  }
}

export const collectionService =
  new CollectionService();
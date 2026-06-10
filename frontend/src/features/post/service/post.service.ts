import { api } from "@/lib/api";

import type {
  Post,
  CreatePostPayload,
  UpdatePostPayload,
} from "../types/post.types";

const createPost = async (
  payload: CreatePostPayload
): Promise<Post> => {
  const formData = new FormData();

  if (payload.caption) {
    formData.append(
      "caption",
      payload.caption
    );
  }

  if (payload.visibility) {
    formData.append(
      "visibility",
      payload.visibility
    );
  }

  payload.files?.forEach(
    (file) => {
      formData.append(
        "media",
        file
      );
    }
  );

  const response =
    await api.post(
      "/posts",
      formData
    );

  return response.data.data;
};

const getPost = async (
  postId: string
): Promise<Post> => {
  const response =
    await api.get(
      `/posts/${postId}`
    );

  return response.data.data;
};

const getUserPosts = async (
  username: string,
  page = 1,
  limit = 12
): Promise<Post[]> => {
  const response =
    await api.get(
      `/posts/user/${username}`,
      {
        params: {
          page,
          limit,
        },
      }
    );

  return response.data.data;
};

const updatePost = async (
  postId: string,
  payload: UpdatePostPayload
): Promise<Post> => {
  const response =
    await api.patch(
      `/posts/${postId}`,
      payload
    );

  return response.data.data;
};

const deletePost = async (
  postId: string
): Promise<void> => {
  await api.delete(
    `/posts/${postId}`
  );
};

export const postService = {
  createPost,

  getPost,

  getUserPosts,

  updatePost,

  deletePost,
};
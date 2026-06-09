import { api } from "@/lib/api";

import type {
  ProfileResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from "../types/user.types";

export const userService = {
  async getMyProfile() {
    const response =
      await api.get<ProfileResponse>(
        "/users/me"
      );

    return response.data;
  },

  async getProfile(
    username: string
  ) {
    const response =
      await api.get<ProfileResponse>(
        `/users/${username}`
      );

    return response.data;
  },

  async updateProfile(
    payload: UpdateProfilePayload
  ) {
    const response =
      await api.patch<UpdateProfileResponse>(
        "/users/me",
        payload
      );

    return response.data;
  },

  async updateAvatar(
    file: File
  ) {
    const formData =
      new FormData();

    formData.append(
      "avatar",
      file
    );

    const response =
      await api.patch<UpdateProfileResponse>(
        "/users/me/avatar",
        formData
      );

    return response.data;
  },

  async updateCover(
    file: File
  ) {
    const formData =
      new FormData();

    formData.append(
      "cover",
      file
    );

    const response =
      await api.patch<UpdateProfileResponse>(
        "/users/me/cover",
        formData
      );

    return response.data;
  },
};
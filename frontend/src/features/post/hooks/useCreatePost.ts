import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { postService } from "../service/post.service";

import { usePostStore } from "../store/post.store";

import type {
  CreatePostPayload,
  Post,
} from "../types/post.types";

export const useCreatePost = () => {
  const queryClient =
    useQueryClient();

  const reset =
    usePostStore(
      (state) => state.reset
    );

  const setUploading =
    usePostStore(
      (state) =>
        state.setUploading
    );

  return useMutation<
    Post,
    Error,
    CreatePostPayload
  >({
    mutationFn: (
      payload
    ) =>
      postService.createPost(
        payload
      ),

    onMutate: () => {
      setUploading(true);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["posts"],
        }
      );

      queryClient.invalidateQueries(
        {
          queryKey: [
            "user-posts",
          ],
        }
      );

      reset();
    },

    onError: (
      error
    ) => {
      console.error(
        "Create post failed:",
        error
      );
    },

    onSettled: () => {
      setUploading(false);
    },
  });
};
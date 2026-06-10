import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { postService } from "../service/post.service";

import type {
  Post,
  UpdatePostPayload,
} from "../types/post.types";

interface UpdatePostVariables {
  postId: string;

  payload: UpdatePostPayload;
}

export const useUpdatePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation<
    Post,
    Error,
    UpdatePostVariables
  >({
    mutationFn: ({
      postId,
      payload,
    }) =>
      postService.updatePost(
        postId,
        payload
      ),

    onSuccess: (
      updatedPost
    ) => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "post",
            updatedPost._id,
          ],
        }
      );

      queryClient.invalidateQueries(
        {
          queryKey: [
            "user-posts",
          ],
        }
      );

      queryClient.invalidateQueries(
        {
          queryKey: [
            "posts",
          ],
        }
      );
    },

    onError: (
      error
    ) => {
      console.error(
        "Update post failed:",
        error
      );
    },
  });
};
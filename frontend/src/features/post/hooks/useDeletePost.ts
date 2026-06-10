import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { postService } from "../service/post.service";

export const useDeletePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation<
    void,
    Error,
    string
  >({
    mutationFn: (
      postId
    ) =>
      postService.deletePost(
        postId
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "posts",
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
    },

    onError: (
      error
    ) => {
      console.error(
        "Delete post failed:",
        error
      );
    },
  });
};
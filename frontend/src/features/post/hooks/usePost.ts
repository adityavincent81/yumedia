import { useQuery } from "@tanstack/react-query";

import { postService } from "../service/post.service";

import type {
  Post,
} from "../types/post.types";

interface UsePostParams {
  postId: string;

  enabled?: boolean;
}

export const usePost = ({
  postId,
  enabled = true,
}: UsePostParams) => {
  return useQuery<Post>({
    queryKey: [
      "post",
      postId,
    ],

    queryFn: () =>
      postService.getPost(
        postId
      ),

    enabled:
      enabled &&
      !!postId,
  });
};
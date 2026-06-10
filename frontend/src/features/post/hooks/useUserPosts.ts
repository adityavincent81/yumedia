import { useQuery } from "@tanstack/react-query";

import { postService } from "../service/post.service";

import type {
  Post,
} from "../types/post.types";

interface UseUserPostsParams {
  username: string;

  page?: number;

  limit?: number;

  enabled?: boolean;
}

export const useUserPosts = ({
  username,
  page = 1,
  limit = 12,
  enabled = true,
}: UseUserPostsParams) => {
  return useQuery<Post[]>({
    queryKey: [
      "user-posts",
      username,
      page,
      limit,
    ],

    queryFn: () =>
      postService.getUserPosts(
        username,
        page,
        limit
      ),

    enabled:
      enabled &&
      !!username,
  });
};
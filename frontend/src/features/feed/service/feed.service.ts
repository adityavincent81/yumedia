import { api } from "@/lib/api";

import type {
  FeedQuery,
  FeedResponse,
} from "../types/feed.types";

const getFeed = async ({
  page = 1,
  limit = 10,
}: FeedQuery = {}): Promise<FeedResponse> => {
  const response =
    await api.get("/feed", {
      params: {
        page,
        limit,
      },
    });

  return response.data.data;
};

export const feedService = {
  getFeed,
};
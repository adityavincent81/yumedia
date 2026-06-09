"use client";

import { useQuery } from "@tanstack/react-query";

import { followService } from "../services/follow.service";

interface UseFollowersProps {
  userId: string;
  page?: number;
  limit?: number;
}

export const useFollowers = ({
  userId,
  page = 1,
  limit = 20,
}: UseFollowersProps) => {
  return useQuery({
    queryKey: [
      "followers",
      userId,
      page,
      limit,
    ],

    queryFn: () =>
      followService.getFollowers(
        userId,
        {
          page,
          limit,
        }
      ),

    enabled: !!userId,
  });
};
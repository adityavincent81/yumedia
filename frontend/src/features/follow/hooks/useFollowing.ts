"use client";

import { useQuery } from "@tanstack/react-query";

import { followService } from "../services/follow.service";

interface UseFollowingProps {
  userId: string;
  page?: number;
  limit?: number;
}

export const useFollowing = ({
  userId,
  page = 1,
  limit = 20,
}: UseFollowingProps) => {
  return useQuery({
    queryKey: [
      "following",
      userId,
      page,
      limit,
    ],

    queryFn: () =>
      followService.getFollowing(
        userId,
        {
          page,
          limit,
        }
      ),

    enabled: !!userId,
  });
};
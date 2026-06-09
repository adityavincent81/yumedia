"use client";

import { useQuery } from "@tanstack/react-query";

import { followService } from "../services/follow.service";

export const useFollowStatus = (
  userId: string
) => {
  return useQuery({
    queryKey: [
      "follow-status",
      userId,
    ],

    queryFn: () =>
      followService.getFollowStatus(
        userId
      ),

    enabled: !!userId,
  });
};
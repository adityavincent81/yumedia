"use client";

import { useMutation } from "@tanstack/react-query";

import { followService } from "../services/follow.service";

interface UseFollowUserProps {
  onSuccess?: () => void;
}

export const useFollowUser = (
  props?: UseFollowUserProps
) => {
  return useMutation({
    mutationFn: (
      userId: string
    ) =>
      followService.followUser(
        userId
      ),

    onSuccess: () => {
      props?.onSuccess?.();
    },
  });
};
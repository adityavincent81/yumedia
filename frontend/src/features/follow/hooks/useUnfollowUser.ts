"use client";

import { useMutation } from "@tanstack/react-query";

import { followService } from "../services/follow.service";

interface UseUnfollowUserProps {
  onSuccess?: () => void;
}

export const useUnfollowUser = (
  props?: UseUnfollowUserProps
) => {
  return useMutation({
    mutationFn: (
      userId: string
    ) =>
      followService.unfollowUser(
        userId
      ),

    onSuccess: () => {
      props?.onSuccess?.();
    },
  });
};
import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";

export const useMyProfile = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn:
      userService.getMyProfile,
    enabled,
    retry: false,
  });
};
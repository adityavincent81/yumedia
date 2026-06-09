import { useQuery } from "@tanstack/react-query";

import { userService } from "../services/user.service";

export const useProfile = (
  username: string,
  enabled = true
) => {
  return useQuery({
    queryKey: [
      "profile",
      username,
    ],

    queryFn: () =>
      userService.getProfile(
        username
      ),

    enabled:
      enabled &&
      !!username,

    retry: false,
  });
};
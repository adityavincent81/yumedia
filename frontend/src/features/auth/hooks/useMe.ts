import { useQuery } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

export const useMe = (
  enabled = true
) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authService.getMe,
    enabled,
    retry: false,
  });
};
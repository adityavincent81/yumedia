import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

export const useLogoutAll = () => {
  return useMutation({
    mutationFn: authService.logoutAll,
  });
};
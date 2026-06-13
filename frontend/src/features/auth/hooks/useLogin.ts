import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

import type {
  LoginRequest,
  AuthResponse,
} from "../types/auth.types";

export const useLogin = () => {
  const setUser = useAuthStore(
    (state) => state.setUser
  );

  return useMutation<
    AuthResponse,
    Error,
    LoginRequest
  >({
    mutationFn: authService.login,

    onSuccess: (data) => {
      setUser(data.data.user);
    },
  });
};
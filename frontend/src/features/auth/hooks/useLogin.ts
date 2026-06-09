import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

import type {
  LoginRequest,
  AuthResponse,
} from "../types/auth.types";

export const useLogin = () => {
  return useMutation<
    AuthResponse,
    Error,
    LoginRequest
  >({
    mutationFn: authService.login,
  });
};
import { useMutation } from "@tanstack/react-query";

import { authService } from "../services/auth.service";

import type {
  RegisterRequest,
  AuthResponse,
} from "../types/auth.types";

export const useRegister = () => {
  return useMutation<
    AuthResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: authService.register,
  });
};
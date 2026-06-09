import { api } from "@/lib/api";

import type {
  AuthResponse,
  LoginRequest,
  MeResponse,
  RegisterRequest,
} from "../types/auth.types";

class AuthService {
  async register(
    payload: RegisterRequest
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/register",
      payload
    );

    return data;
  }

  async login(
    payload: LoginRequest
  ): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(
      "/auth/login",
      payload
    );

    return data;
  }

  async getMe(): Promise<MeResponse> {
    const { data } =
      await api.get<MeResponse>(
        "/auth/me"
      );

    return data;
  }

  async refresh(): Promise<void> {
    await api.post("/auth/refresh");
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout");
  }

  async logoutAll(): Promise<void> {
    await api.post(
      "/auth/logout-all"
    );
  }
}

export const authService =
  new AuthService();
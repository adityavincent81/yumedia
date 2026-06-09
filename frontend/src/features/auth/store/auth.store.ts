import { create } from "zustand";

import type {
  AuthStore,
  User,
} from "../types/auth.types";

export const useAuthStore = create<AuthStore>(
  (set) => ({
    user: null,

    isAuthenticated: false,

    isInitialized: false,

setInitialized: (value) =>
  set({
    isInitialized: value,
  }),

    setUser: (user: User | null) =>
      set({
        user,
        isAuthenticated: !!user,
      }),

    clearUser: () =>
      set({
        user: null,
        isAuthenticated: false,
      }),
  })
);
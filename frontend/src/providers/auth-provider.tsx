"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useMe } from "@/features/auth/hooks/useMe";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register";

  const {
    data,
    isSuccess,
    isError,
  } = useMe(!isAuthPage);

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const setInitialized = useAuthStore(
  (state) => state.setInitialized
);

  useEffect(() => {
  if (isSuccess && data?.data) {
    setUser(data.data);
    setInitialized(true);
  }
}, [
  data,
  isSuccess,
  setUser,
  setInitialized,
]);

useEffect(() => {
  if (isError) {
    clearUser();
    setInitialized(true);
  }
}, [
  isError,
  clearUser,
  setInitialized,
]);

  return children;
}
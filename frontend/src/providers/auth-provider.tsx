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

console.log("PATHNAME", pathname);

const isAuthPage =
  pathname === "/login" ||
  pathname === "/register";

console.log("IS AUTH PAGE", isAuthPage);

const meQuery = useMe(!isAuthPage);

console.log("ENABLED", !isAuthPage);

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


console.log("ME QUERY", meQuery);

const {
  status,
  fetchStatus,
} = meQuery;

useEffect(() => {
  console.log("STATUS", status);
  console.log("FETCH STATUS", fetchStatus);
  console.log("SUCCESS", isSuccess);
  console.log("ERROR", isError);
  console.log("DATA", data);
}, [
  status,
  fetchStatus,
  isSuccess,
  isError,
  data,
]);

  return children;
}
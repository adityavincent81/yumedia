"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import MainLayout from "@/components/layout/MainLayout";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const {
    user,
    isInitialized,
  } = useAuthStore();

  useEffect(() => {
    if (
      isInitialized &&
      !user
    ) {
      router.replace("/login");
    }
  }, [
    user,
    isInitialized,
    router,
  ]);

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712] text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
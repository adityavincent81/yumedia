"use client";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function DashboardPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <main className="min-h-screen bg-[#030712] p-8 text-white">
      <div className="mx-auto max-w-5xl">
        <div
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-xl
          "
        >
          <h1 className="text-4xl font-bold">
            Welcome to Yumedia 👋
          </h1>

          <p className="mt-2 text-gray-400">
            Authentication is working
            successfully.
          </p>

          <div className="mt-8 space-y-3">
            <div>
              <span className="font-semibold">
                Full Name:
              </span>{" "}
              {user?.fullName}
            </div>

            <div>
              <span className="font-semibold">
                Username:
              </span>{" "}
              {user?.username}
            </div>

            <div>
              <span className="font-semibold">
                NIM:
              </span>{" "}
              {user?.nim}
            </div>

            <div>
              <span className="font-semibold">
                User ID:
              </span>{" "}
              {user?._id}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
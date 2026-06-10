"use client";

import { SquarePen } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { usePostStore } from "@/features/post/store/post.store";

import CreatePostModal from "@/components/post/CreatePostModal";

import PostDetailModal from "@/components/post/PostDetailModal";

import FeedList from "@/components/feed/FeedList";

export default function DashboardPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const openCreatePost =
    usePostStore(
      (state) =>
        state.openCreatePost
    );

  return (
    <>
      <CreatePostModal />

      <main className="min-h-screen bg-black p-8 text-white">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Hero */}
          <div
            className="
              rounded-3xl
              border
              border-zinc-800
              bg-zinc-900
              p-8
            "
          >
            <h1 className="text-3xl font-bold">
              Welcome back,{" "}
              {user?.fullName}
              👋
            </h1>

            <p className="mt-2 text-zinc-400">
              Share your moments with
              the Yumedia community.
            </p>

            <button
              type="button"
              onClick={
                openCreatePost
              }
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-4
                py-3
                font-medium
                text-white
                transition
                hover:bg-blue-700
              "
            >
              <SquarePen size={18} />
              Create Post
            </button>
          </div>

          <PostDetailModal />

          {/* Home Feed */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              Home Feed
            </h2>

            <FeedList />
          </section>
        </div>
      </main>
    </>
  );
}
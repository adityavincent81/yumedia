"use client";

import { SquarePen } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

import { usePostStore } from "@/features/post/store/post.store";

import { useUserPosts } from "@/features/post/hooks/useUserPosts";

import CreatePostModal from "@/components/post/CreatePostModal";

import PostCard from "@/components/post/PostCard";

import PostSkeleton from "@/components/post/PostSkeleton";

import EmptyState from "@/components/ui/EmptyState";

export default function DashboardPage() {
  const user = useAuthStore(
    (state) => state.user
  );

  const openCreatePost =
    usePostStore(
      (state) =>
        state.openCreatePost
    );

  const {
    data: posts = [],
    isLoading,
  } = useUserPosts({
    username:
      user?.username || "",
    enabled:
      !!user?.username,
  });

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

          {/* Feed */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">
              Your Posts
            </h2>

            {isLoading ? (
              <PostSkeleton
                count={3}
              />
            ) : posts.length ===
              0 ? (
              <EmptyState
                title="No Posts Yet"
                description="Create your first post and start sharing with the community."
              />
            ) : (
              posts.map(
                (post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                )
              )
            )}
          </section>
        </div>
      </main>
    </>
  );
}
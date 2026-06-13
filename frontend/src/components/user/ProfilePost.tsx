"use client";

import PostCard from "@/components/post/PostCard";
import PostDetailModal from "@/components/post/PostDetailModal";

import { useUserPosts } from "@/features/post/hooks/useUserPosts";

interface ProfilePostsProps {
  username: string;
}

export default function ProfilePosts({
  username,
}: ProfilePostsProps) {
  const {
    data,
    isLoading,
    isError,
  } = useUserPosts({
    username,
  });

  if (isLoading) {
    return (
      <div
        className="
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          p-6
          text-zinc-400
        "
      >
        Loading posts...
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="
          rounded-xl
          border
          border-red-900
          bg-zinc-900
          p-6
          text-red-400
        "
      >
        Failed to load posts.
      </div>
    );
  }

  const posts = data ?? [];

  if (posts.length === 0) {
    return (
      <>
        <PostDetailModal />

        <div
          className="
            rounded-xl
            border
            border-zinc-800
            bg-zinc-900
            p-10
            text-center
            text-zinc-400
          "
        >
          No posts yet.
        </div>
      </>
    );
  }

  return (
    <>
      <PostDetailModal />

      <div
        className="
          space-y-4
        "
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        ))}
      </div>
    </>
  );
}
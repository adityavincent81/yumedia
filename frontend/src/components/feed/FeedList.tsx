"use client";

import { useEffect } from "react";

import { useFeed } from "@/features/feed/hooks/useFeed";

import PostCard from "@/components/post/PostCard";

import FeedSkeleton from "./FeedSkeleton";

export default function FeedList() {
  const {
    posts,

    isLoading,

    error,

    fetchFeed,
  } = useFeed();

  useEffect(() => {
    fetchFeed(1, 10);
  }, [fetchFeed]);

  if (
    isLoading &&
    posts.length === 0
  ) {
    return (
      <FeedSkeleton />
    );
  }

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-900
          bg-red-950/30
          p-6
          text-center
        "
      >
        <p
          className="
            text-red-400
          "
        >
          {error}
        </p>
      </div>
    );
  }

  if (
    !isLoading &&
    posts.length === 0
  ) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-10
          text-center
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-white
          "
        >
          No posts yet
        </h3>

        <p
          className="
            mt-2
            text-zinc-500
          "
        >
          Follow more users or
          create your first post.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        space-y-6
      "
    >
      {posts.map(
        (post) => (
          <PostCard
            key={post._id}
            post={post}
          />
        )
      )}
    </div>
  );
}
"use client";

import PostGridItem from "./PostGridItem";

import type {
  Post,
} from "@/features/post/types/post.types";

interface PostGridProps {
  posts: Post[];

  onPostClick?: (
    post: Post
  ) => void;

  emptyMessage?: string;
}

export default function PostGrid({
  posts,
  onPostClick,
  emptyMessage = "No posts yet.",
}: PostGridProps) {
  if (!posts.length) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          text-zinc-400
        "
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-3
        gap-1
        md:gap-2
      "
    >
      {posts.map(
        (post) => (
          <PostGridItem
            key={post._id}
            post={post}
            onClick={
              onPostClick
            }
          />
        )
      )}
    </div>
  );
}
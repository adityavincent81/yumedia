"use client";

import Image from "next/image";

import { useUserPosts } from "@/features/post/hooks/useUserPosts";

import PostDetailModal from "@/components/post/PostDetailModal";

import { useCommentStore } from "@/features/comment/store/comment.store";

interface ProfileMediaProps {
  username: string;
}

export default function ProfileMedia({
  username,
}: ProfileMediaProps) {
  const {
    openPostDetail,
  } = useCommentStore();

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
        Loading media...
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
        Failed to load media.
      </div>
    );
  }

  const posts =
    data ?? [];

  const media =
    posts.flatMap(
      (post) =>
        post.media.map(
          (item) => ({
            ...item,

            post,
          })
        )
    );

  if (
    media.length === 0
  ) {
    return (
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
        No media yet.
      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-2
          gap-2

          sm:grid-cols-3
          lg:grid-cols-4
        "
      >
        {media.map(
          (
            item
          ) => (
            <button
              key={
                item._id
              }
              type="button"
              onClick={() =>
                openPostDetail(
                  item.post
                )
              }
              className="
                relative
                aspect-square

                overflow-hidden

                rounded-xl

                border
                border-zinc-800

                bg-zinc-900

                transition-opacity

                hover:opacity-90
              "
            >
              {item.type ===
              "image" ? (
                <Image
                  src={
                    item.url
                  }
                  alt=""
                  fill
                  className="
                    object-cover
                  "
                />
              ) : (
                <video
                  src={
                    item.url
                  }
                  className="
                    h-full
                    w-full

                    object-cover
                  "
                  muted
                />
              )}
            </button>
          )
        )}
      </div>

      <PostDetailModal />
    </>
  );
}
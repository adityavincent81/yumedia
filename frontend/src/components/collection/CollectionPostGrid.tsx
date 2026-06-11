"use client";

import {
  Play,
  FileText,
} from "lucide-react";

import {
  useCommentStore,
} from "@/features/comment/store/comment.store";

import type {
  Post,
} from "@/features/post/types/post.types";

interface CollectionPostGridProps {
  posts: Post[];
}

export default function CollectionPostGrid({
  posts,
}: CollectionPostGridProps) {
  const openPostDetail =
    useCommentStore(
      (state) =>
        state.openPostDetail
    );

  if (posts.length === 0) {
    return (
      <div
        className="
          flex
          min-h-[300px]
          items-center
          justify-center

          rounded-2xl
          border
          border-dashed
          border-zinc-800

          bg-zinc-900
        "
      >
        <div
          className="
            text-center
          "
        >
          <div
            className="
              mb-4
              text-5xl
            "
          >
            📁
          </div>

          <h3
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            No Posts Yet
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-zinc-500
            "
          >
            Save posts to this
            collection to see
            them here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        gap-1

        md:grid-cols-3
        lg:grid-cols-4
      "
    >
      {posts.map(
        (post) => {
          const media =
            post.media?.[0];

          const hasMedia =
            post.media &&
            post.media.length >
              0;

          const isVideo =
            media?.type ===
            "video";

          return (
            <button
              key={post._id}
              type="button"
              onClick={() =>
                openPostDetail(
                  post
                )
              }
              className="
                group
                relative

                aspect-square
                overflow-hidden

                bg-zinc-900

                text-left

                transition-all

                hover:opacity-90
              "
            >
              {/* MEDIA */}
              {hasMedia ? (
                <>
                  {media.type ===
                  "image" ? (
                    <img
                      src={
                        media.url
                      }
                      alt=""
                      className="
                        h-full
                        w-full
                        object-cover

                        transition-transform
                        duration-300

                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <>
                      <video
                        src={
                          media.url
                        }
                        muted
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                      <div
                        className="
                          absolute
                          right-2
                          top-2

                          rounded-full
                          bg-black/70

                          p-2

                          text-white
                        "
                      >
                        <Play
                          size={14}
                          fill="currentColor"
                        />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div
                  className="
                    flex
                    h-full
                    flex-col
                    justify-between

                    bg-gradient-to-br
                    from-zinc-800
                    via-zinc-900
                    to-black

                    p-4
                  "
                >
                  <FileText
                    size={20}
                    className="
                      text-zinc-500
                    "
                  />

                  <p
                    className="
                      line-clamp-6

                      text-sm
                      leading-relaxed
                      text-white
                    "
                  >
                    {post.caption ||
                      "Text post"}
                  </p>

                  <span
                    className="
                      text-xs
                      text-zinc-500
                    "
                  >
                    Yumedia
                  </span>
                </div>
              )}

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0

                  bg-black/0

                  transition-all

                  group-hover:bg-black/10
                "
              />

              {/* VIDEO BADGE */}
              {isVideo && (
                <div
                  className="
                    absolute
                    bottom-2
                    right-2

                    rounded-md
                    bg-black/70

                    px-2
                    py-1

                    text-xs
                    text-white
                  "
                >
                  VIDEO
                </div>
              )}
            </button>
          );
        }
      )}
    </div>
  );
}
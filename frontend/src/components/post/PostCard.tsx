"use client";

import PostHeader from "./PostHeader";

import PostMedia from "./PostMedia";

import PostCaption from "./PostCaption";

import PostActions from "./PostActions";

import type {
  Post,
} from "@/features/post/types/post.types";

interface PostCardProps {
  post: Post;

  showActions?: boolean;

  showMenu?: boolean;

  onMenuClick?: (
    post: Post
  ) => void;

  onLike?: (
    post: Post
  ) => void;

  onComment?: (
    post: Post
  ) => void;

  onSave?: (
    post: Post
  ) => void;
}

export default function PostCard({
  post,

  showActions = true,

  showMenu = true,

  onMenuClick,

  onLike,

  onComment,

  onSave,
}: PostCardProps) {
  return (
    <article
      className="
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
      "
    >
      <div className="p-4">
        <PostHeader
          author={post.author}
          createdAt={
            post.createdAt
          }
          showMenu={
            showMenu
          }
          onMenuClick={() =>
            onMenuClick?.(
              post
            )
          }
        />
      </div>

      {post.media.length >
        0 && (
        <PostMedia
          media={
            post.media
          }
        />
      )}

      <div
        className="
          space-y-4
          p-4
        "
      >
        <PostCaption
          caption={
            post.caption
          }
        />

        {showActions && (
          <PostActions
            likesCount={
              post.likesCount
            }
            commentsCount={
              post.commentsCount
            }
            savesCount={
              post.savesCount
            }
            onLike={() =>
              onLike?.(
                post
              )
            }
            onComment={() =>
              onComment?.(
                post
              )
            }
            onSave={() =>
              onSave?.(
                post
              )
            }
          />
        )}
      </div>
    </article>
  );
}
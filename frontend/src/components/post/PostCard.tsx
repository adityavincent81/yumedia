"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import PostHeader from "./PostHeader";
import PostMedia from "./PostMedia";
import PostCaption from "./PostCaption";
import PostActions from "./PostActions";
import PostMenu from "./PostMenu";

import EditPostModal from "./EditPostModal";
import DeletePostModal from "./DeletePostModal";
import CollectionSelector from "@/components/collection/CollectionSelector";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCommentStore } from "@/features/comment/store/comment.store";

import { useLike } from "@/features/like/hooks/useLike";

import type {
  Post,
} from "@/features/post/types/post.types";

interface PostCardProps {
  post: Post;

  showActions?: boolean;

  showMenu?: boolean;

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

  onLike,

  onComment,

  onSave,
}: PostCardProps) {
  const currentUser =
    useAuthStore(
      (state) => state.user
    );
    

  const {
    likedPosts,
    loadingPosts,
    fetchLikeStatus,
    toggleLike,
  } = useLike();

  const openPostDetail =
  useCommentStore(
    (state) =>
      state.openPostDetail
  );

  const isOwner =
    currentUser?._id ===
    post.author._id;

  const liked =
    likedPosts[post._id] ??
    false;

  const isLikeLoading =
    loadingPosts[post._id] ??
    false;

  const menuRef =
    useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

    const [collectionOpen,setCollectionOpen,] = 
    useState(false);

  const [likesCount, setLikesCount] =
    useState(post.likesCount);

  useEffect(() => {
    setLikesCount(
      post.likesCount
    );
  }, [post.likesCount]);

  useEffect(() => {
    fetchLikeStatus(
      post._id
    );
  }, [
    post._id,
    fetchLikeStatus,
  ]);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleCopyLink =
    async () => {
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/posts/${post._id}`
        );

        setMenuOpen(false);
      } catch (error) {
        console.error(error);
      }
    };

  const handleLike =
    async () => {
      try {
        const result =
          await toggleLike(
            post._id
          );

        setLikesCount(
          result.likesCount
        );

        onLike?.(post);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <>
      <article
        className="
          overflow-visible
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
        "
      >
        <div
          ref={menuRef}
          className="
            relative
            p-4
          "
        >
          <PostHeader
            author={post.author}
            createdAt={
              post.createdAt
            }
            showMenu={
              showMenu
            }
            onMenuClick={() => {
              if (!showMenu)
                return;

              setMenuOpen(
                (prev) => !prev
              );
            }}
          />

          {showMenu && (
            <PostMenu
              open={menuOpen}
              isOwner={isOwner}
              onCopyLink={
                handleCopyLink
              }
              onEdit={
                isOwner
                  ? () => {
                      setMenuOpen(
                        false
                      );

                      setEditOpen(
                        true
                      );
                    }
                  : undefined
              }
              onDelete={
                isOwner
                  ? () => {
                      setMenuOpen(
                        false
                      );

                      setDeleteOpen(
                        true
                      );
                    }
                  : undefined
              }
            />
          )}
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
                likesCount
              }
              commentsCount={
                post.commentsCount
              }
              savesCount={
                post.savesCount
              }
              isSaved={
                post.isSaved

              }
              sharesCount={0}
              isLiked={liked}
              isLikeLoading={
                isLikeLoading
              }
              onLike={
                handleLike
              }
              onComment={() => {
                openPostDetail(
                  post
                );

                onComment?.(
                  post
                );
              }}
              onSave={() => {
                setCollectionOpen(
                  true
                );

                onSave?.(post);
              }}
              onShare={() =>
                navigator.clipboard.writeText(
                  `${window.location.origin}/posts/${post._id}`
                )
              }
            />
          )}
        </div>
      </article>

      {isOwner && (
        <>
          <EditPostModal
            post={post}
            isOpen={editOpen}
            onClose={() =>
              setEditOpen(false)
            }
          />

          <DeletePostModal
            postId={post._id}
            isOpen={deleteOpen}
            onClose={() =>
              setDeleteOpen(false)
            }
          />
        </>
      )}
      <CollectionSelector
            isOpen={collectionOpen}
            postId={post._id}
            onClose={() =>
              setCollectionOpen(false)
            }
          />
          
    </>
  );
}
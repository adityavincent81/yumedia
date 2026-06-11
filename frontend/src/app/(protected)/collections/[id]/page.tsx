"use client";

import {
  useEffect,
} from "react";

import {
  Lock,
  Globe,
} from "lucide-react";

import {
  useParams,
} from "next/navigation";

import CollectionPostGrid from "@/components/collection/CollectionPostGrid";
import PostDetailModal from "@/components/post/PostDetailModal";

import { useCollection } from "@/features/collection/hooks/useCollection";

export default function CollectionDetailPage() {
  const params =
    useParams();

  const collectionId =
    params.id as string;

  const {
    selectedCollection,

    collectionPosts,

    loading,

    getCollection,

    getCollectionPosts,
  } = useCollection();

  useEffect(() => {
    if (!collectionId)
      return;

    getCollection(
      collectionId
    );

    getCollectionPosts(
      collectionId
    );
  }, [
    collectionId,
    getCollection,
    getCollectionPosts,
  ]);

  const posts =
    collectionPosts[
      collectionId
    ] || [];

  if (
    loading &&
    !selectedCollection
  ) {
    return (
      <div
        className="
          animate-pulse
          space-y-6
        "
      >
        <div
          className="
            h-10
            w-64
            rounded
            bg-zinc-800
          "
        />

        <div
          className="
            h-5
            w-full
            max-w-xl
            rounded
            bg-zinc-800
          "
        />

        <div
          className="
            grid
            grid-cols-2
            gap-1

            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {Array.from({
            length: 12,
          }).map(
            (_, index) => (
              <div
                key={index}
                className="
                  aspect-square
                  bg-zinc-800
                "
              />
            )
          )}
        </div>
      </div>
    );
  }

  if (
    !selectedCollection
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
        <h2
          className="
            text-xl
            font-semibold
            text-white
          "
        >
          Collection not found
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
        mx-auto
        max-w-7xl
        space-y-8
      "
    >
      {/* Header */}
      <div
        className="
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-6
        "
      >
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-3
          "
        >
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            {
              selectedCollection.name
            }
          </h1>

          <div
            className="
              flex
              items-center
              gap-1

              rounded-full
              border
              border-zinc-700

              px-3
              py-1

              text-xs
              text-zinc-400
            "
          >
            {selectedCollection.isPrivate ? (
              <>
                <Lock
                  size={12}
                />
                Private
              </>
            ) : (
              <>
                <Globe
                  size={12}
                />
                Public
              </>
            )}
          </div>
        </div>

        {selectedCollection.description && (
          <p
            className="
              mt-4
              max-w-3xl
              text-zinc-400
            "
          >
            {
              selectedCollection.description
            }
          </p>
        )}

        <div
          className="
            mt-5
            flex
            items-center
            gap-6

            text-sm
            text-zinc-500
          "
        >
          <span>
            {
              selectedCollection.postsCount
            }{" "}
            posts
          </span>

          <span>
            Created{" "}
            {new Date(
              selectedCollection.createdAt
            ).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Posts */}
      <CollectionPostGrid
        posts={posts}
      />

      {/* Global Modal */}
    <PostDetailModal />
    </div>
  );
}
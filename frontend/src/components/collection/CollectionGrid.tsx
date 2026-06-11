"use client";

import CollectionCard from "./CollectionCard";

import type {
  Collection,
} from "@/features/collection/types/collection.types";

interface CollectionGridProps {
  collections: Collection[];

  loading?: boolean;
}

export default function CollectionGrid({
  collections,

  loading = false,
}: CollectionGridProps) {
  if (loading) {
    return (
      <div
        className="
          grid
          grid-cols-1
          gap-6

          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <div
            key={index}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-zinc-800
              bg-zinc-900
              animate-pulse
            "
          >
            <div
              className="
                aspect-square
                bg-zinc-800
              "
            />

            <div className="p-4">
              <div
                className="
                  h-5
                  w-2/3
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  mt-3
                  h-4
                  w-full
                  rounded
                  bg-zinc-800
                "
              />

              <div
                className="
                  mt-2
                  h-4
                  w-3/4
                  rounded
                  bg-zinc-800
                "
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (
    collections.length === 0
  ) {
    return (
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          rounded-2xl
          border
          border-dashed
          border-zinc-800
          bg-zinc-900
          px-8
          py-20
          text-center
        "
      >
        <div
          className="
            text-5xl
          "
        >
          📁
        </div>

        <h3
          className="
            mt-4
            text-xl
            font-semibold
            text-white
          "
        >
          No Collections Yet
        </h3>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            text-zinc-500
          "
        >
          Create your first
          collection and start
          organizing your favorite
          posts.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6

        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {collections.map(
        (collection) => (
          <CollectionCard
            key={collection._id}
            collection={
              collection
            }
          />
        )
      )}
    </div>
  );
}
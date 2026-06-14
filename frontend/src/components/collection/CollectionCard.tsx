"use client";

import Link from "next/link";

import {
  Folder,
  Lock,
  Globe,
} from "lucide-react";

import type {
  Collection,
} from "@/features/collection/types/collection.types";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({
  collection,
}: CollectionCardProps) {
  const coverImage =
    collection.coverImage?.url;

  return (
    <Link
      href={`/collections/${collection._id}`}
      className="
        group
        block
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        transition-all
        duration-300
        hover:border-zinc-700
        hover:bg-zinc-800
      "
    >
      {/* Cover */}
      <div
        className="
          relative
          aspect-square
          overflow-hidden
          border-b
          border-zinc-800
          bg-zinc-950
        "
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt={collection.name}
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div
            className="
              grid
              h-full
              w-full
              grid-cols-2
              grid-rows-2
              gap-1
              p-2
            "
          >
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="
                  flex
                  items-center
                  justify-center
                  rounded-lg
                  bg-zinc-800
                "
              >
                <Folder
                  size={18}
                  className="
                    text-zinc-600
                  "
                />
              </div>
            ))}
          </div>
        )}

        {/* Privacy Badge */}
        <div
          className="
            absolute
            right-3
            top-3
            flex
            items-center
            gap-1
            rounded-full
            bg-black/70
            px-2.5
            py-1
            text-xs
            text-white
            backdrop-blur-md
          "
        >
          {collection.isPrivate ? (
            <>
              <Lock size={12} />
              Private
            </>
          ) : (
            <>
              <Globe size={12} />
              Public
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="
            truncate
            text-base
            font-semibold
            text-white
          "
        >
          {collection.name}
        </h3>

        {collection.description && (
          <p
            className="
              mt-2
              line-clamp-2
              text-sm
              text-zinc-400
            "
          >
            {collection.description}
          </p>
        )}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-sm
              text-zinc-500
            "
          >
            {collection.postsCount}{" "}
            {collection.postsCount === 1
              ? "post"
              : "posts"}
          </span>

          <span
            className="
              text-xs
              text-zinc-600
            "
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
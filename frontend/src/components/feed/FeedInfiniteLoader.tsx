/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useEffect,
  useRef,
} from "react";

interface FeedInfiniteLoaderProps {
  hasMore: boolean;

  isLoading: boolean;

  onLoadMore: () => void;
}

export default function FeedInfiniteLoader({
  hasMore,
  isLoading,
  onLoadMore,
}: FeedInfiniteLoaderProps) {
  const loaderRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer =
      new IntersectionObserver(
        (entries) => {
          const entry =
            entries[0];

          if (
            entry.isIntersecting &&
            hasMore &&
            !isLoading
          ) {
            onLoadMore();
          }
        },
        {
          threshold: 0.5,
        }
      );

    const current =
      loaderRef.current;

    if (current) {
      observer.observe(
        current
      );
    }

    return () => {
      if (current) {
        observer.unobserve(
          current
        );
      }

      observer.disconnect();
    };
  }, [
    hasMore,
    isLoading,
    onLoadMore,
  ]);

  return (
    <div
      ref={loaderRef}
      className="
        flex
        justify-center
        py-6
      "
    >
      {isLoading && (
        <div
          className="
            h-8
            w-8
            animate-spin
            rounded-full
            border-2
            border-zinc-700
            border-t-white
          "
        />
      )}

      {!hasMore &&
        !isLoading && (
          <p
            className="
              text-sm
              text-zinc-500
            "
          >
            You've reached the end
            of the feed.
          </p>
        )}
    </div>
  );
}
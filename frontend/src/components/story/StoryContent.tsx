// src/components/story/StoryContent.tsx

"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
} from "react";

import type {
  Story,
} from "@/features/story/types/story.types";

interface StoryContentProps {
  story: Story;

  isPaused?: boolean;

  isMuted?: boolean;

  onVideoEnded?: () => void;
}

export default function StoryContent({
  story,
  isPaused = false,
  isMuted = true,
  onVideoEnded,
}: StoryContentProps) {
  const videoRef =
    useRef<HTMLVideoElement>(
      null
    );

  /**
   * Sync pause/play
   */

  useEffect(() => {
    const video =
      videoRef.current;

    if (!video) {
      return;
    }

    if (
      isPaused
    ) {
      video.pause();
      return;
    }

    void video
      .play()
      .catch(() => {
        //
      });
  }, [
    isPaused,
    story._id,
  ]);

  /**
   * Image Story
   */

  if (
    story.type ===
    "image"
  ) {
    return (
      <div className="relative h-full w-full bg-black">
        {story.media?.url ? (
          <>
            {/* Blur Background */}

            <Image
              src={
                story.media.url
              }
              alt="Story Background"
              fill
              priority
              sizes="100vw"
              className="
                object-cover
                blur-3xl
                scale-110
                opacity-30
              "
            />

            {/* Main Image */}

            <Image
              src={
                story.media.url
              }
              alt="Story"
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Image unavailable
          </div>
        )}
      </div>
    );
  }

  /**
   * Video Story
   */

  if (
    story.type ===
    "video"
  ) {
    return (
      <div className="relative flex h-full w-full items-center justify-center bg-black">
        {story.media?.url ? (
          <video
            ref={
              videoRef
            }
            key={
              story._id
            }
            src={
              story.media.url
            }
            className="h-full w-full object-contain"
            autoPlay
            playsInline
            controls={false}
            muted={
              isMuted
            }
            preload="metadata"
            onEnded={
              onVideoEnded
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            Video unavailable
          </div>
        )}
      </div>
    );
  }

  /**
   * Text Story
   */

  return (
    <div
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
        p-8
      "
      style={{
        backgroundColor:
          story.backgroundColor ||
          "#18181b",
      }}
    >
      <div className="max-w-3xl">
        <p
          className="
            whitespace-pre-wrap
            break-words
            text-center
            text-2xl
            font-semibold
            leading-relaxed
            text-white
            md:text-4xl
          "
        >
          {story.text ||
            "No content"}
        </p>
      </div>
    </div>
  );
}
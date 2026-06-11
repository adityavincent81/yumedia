// src/components/story/StoryNavigation.tsx

"use client";

import { useEffect } from "react";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  STORY_KEYS,
} from "@/features/story/constants/story.constants";

interface StoryNavigationProps {
  onNext: () => void;

  onPrevious: () => void;

  onClose?: () => void;
}

export default function StoryNavigation({
  onNext,
  onPrevious,
  onClose,
}: StoryNavigationProps) {
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      switch (
        event.key
      ) {
        case STORY_KEYS.NEXT:
          event.preventDefault();

          onNext();
          break;

        case STORY_KEYS.PREVIOUS:
          event.preventDefault();

          onPrevious();
          break;

        case STORY_KEYS.CLOSE:
          event.preventDefault();

          onClose?.();
          break;

        default:
          break;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    onNext,
    onPrevious,
    onClose,
  ]);

  return (
    <>
      {/* Mobile Tap Areas */}

      <button
        type="button"
        aria-label="Previous Story"
        title="Previous Story"
        onClick={
          onPrevious
        }
        className="
          absolute
          left-0
          top-0
          z-[15]
          h-full
          w-1/2
          bg-transparent
          md:hidden
        "
      />

      <button
        type="button"
        aria-label="Next Story"
        title="Next Story"
        onClick={
          onNext
        }
        className="
          absolute
          right-0
          top-0
          z-[15]
          h-full
          w-1/2
          bg-transparent
          md:hidden
        "
      />

      {/* Desktop Navigation */}

      <button
        type="button"
        aria-label="Previous Story"
        title="Previous Story"
        onClick={
          onPrevious
        }
        className="
          absolute
          left-4
          top-1/2
          z-30
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/30
          text-white
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black/50
          md:flex
        "
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="Next Story"
        title="Next Story"
        onClick={
          onNext
        }
        className="
          absolute
          right-4
          top-1/2
          z-30
          hidden
          h-12
          w-12
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/30
          text-white
          backdrop-blur-md
          transition-all
          duration-200
          hover:scale-105
          hover:bg-black/50
          md:flex
        "
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </>
  );
}
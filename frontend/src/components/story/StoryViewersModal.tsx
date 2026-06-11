// src/components/story/StoryViewersModal.tsx

"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { useStoryViewers } from "@/features/story/hooks/useStoryViewers";

interface StoryViewersModalProps {
  storyId: string;

  open: boolean;

  onClose: () => void;
}

export default function StoryViewersModal({
  storyId,
  open,
  onClose,
}: StoryViewersModalProps) {
  const {
    viewers,
    total,
    isLoading,
  } = useStoryViewers({
    storyId,
    enabled: open,
  });

  if (!open) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex h-[600px] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Story Viewers
            </h2>

            <p className="text-sm text-zinc-400">
              {total} views
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-300" />
          </button>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3 p-4">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <div className="h-12 w-12 animate-pulse rounded-full bg-zinc-800" />

                  <div className="space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded bg-zinc-800" />
                    <div className="h-3 w-16 animate-pulse rounded bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : viewers.length === 0 ? (
            <div className="flex h-full items-center justify-center text-sm text-zinc-500">
              No viewers yet
            </div>
          ) : (
            <div className="p-2">
              {viewers.map(
                (viewer) => {
                  const avatarUrl =
                    viewer.avatar?.url;

                  return (
                    <div
                      key={viewer._id}
                      className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-900"
                    >
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-zinc-800">
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={
                              viewer.username
                            }
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-zinc-300">
                            {viewer.username
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-white">
                          {viewer.fullName}
                        </div>

                        <div className="truncate text-xs text-zinc-400">
                          @{viewer.username}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
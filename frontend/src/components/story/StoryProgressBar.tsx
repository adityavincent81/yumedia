// src/components/story/StoryProgressBar.tsx

"use client";

interface StoryProgressBarProps {
  totalStories: number;

  currentIndex: number;

  progress: number;
}

export default function StoryProgressBar({
  totalStories,
  currentIndex,
  progress,
}: StoryProgressBarProps) {
  const safeTotalStories =
    Math.max(
      totalStories,
      0
    );

  const safeCurrentIndex =
    Math.max(
      currentIndex,
      0
    );

  const safeProgress =
    Math.min(
      Math.max(
        progress,
        0
      ),
      100
    );

  if (
    safeTotalStories === 0
  ) {
    return null;
  }

  return (
    <div
      aria-label="Story progress"
      className="
        flex
        w-full
        gap-1.5
      "
    >
      {Array.from({
        length:
          safeTotalStories,
      }).map(
        (_, index) => {
          const isCompleted =
            index <
            safeCurrentIndex;

          const isActive =
            index ===
            safeCurrentIndex;

          return (
            <div
              key={index}
              className="
                relative
                h-[3px]
                flex-1
                overflow-hidden
                rounded-full
                bg-white/20
                backdrop-blur-sm
              "
            >
              {/* Completed */}

              {isCompleted && (
                <div
                  className="
                    absolute
                    inset-0
                    bg-white
                  "
                />
              )}

              {/* Active */}

              {isActive && (
                <div
                  className="
                    absolute
                    inset-y-0
                    left-0
                    rounded-full
                    bg-white
                    shadow-[0_0_8px_rgba(255,255,255,0.9)]
                    transition-[width]
                    duration-75
                    ease-linear
                  "
                  style={{
                    width: `${safeProgress}%`,
                  }}
                />
              )}
            </div>
          );
        }
      )}
    </div>
  );
}
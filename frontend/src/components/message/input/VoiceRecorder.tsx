// src/components/message/input/VoiceRecorder.tsx

"use client";

import {
  Mic,
  MicOff,
  Timer,
} from "lucide-react";

interface VoiceRecorderProps {
  isRecording?: boolean;

  duration?: number;

  onStart?: () => void;

  onStop?: () => void;
}

export default function VoiceRecorder({
  isRecording = false,

  duration = 0,

  onStart,

  onStop,
}: VoiceRecorderProps) {
  const formatTime = (
    seconds: number
  ) => {
    const mins =
      Math.floor(
        seconds / 60
      );

    const secs =
      seconds % 60;

    return `${mins}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      

      {/* Timer */}

      {isRecording && (
        <div
          className="
            flex
            items-center
            gap-1

            text-xs
            text-red-500
          "
        >
          <Timer
            size={12}
          />

          <span>
            {formatTime(
              duration
            )}
          </span>
        </div>
      )}

      {/* Record Button */}

      <button
        type="button"
        disabled
        title="Voice Message Coming Soon"
        onClick={
          isRecording
            ? onStop
            : onStart
        }
        className={`
          flex
          h-10
          w-10

          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          transition-colors

          ${
            isRecording
              ? `
                bg-red-500/20
                text-red-500
              `
              : `
                text-zinc-500
              `
          }

          cursor-not-allowed
          opacity-60
        `}
      >
        {isRecording ? (
          <MicOff
            size={18}
          />
        ) : (
          <Mic
            size={18}
          />
        )}
      </button>
    </div>
  );
}
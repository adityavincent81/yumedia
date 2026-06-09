"use client";

import { ReactNode } from "react";

import { X } from "lucide-react";

interface FollowModalProps {
  open: boolean;

  onClose: () => void;

  title: string;

  searchPlaceholder: string;

  loading?: boolean;

  children: ReactNode;
}

export default function FollowModal({
  open,
  onClose,
  title,
  searchPlaceholder,
  loading = false,
  children,
}: FollowModalProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="
          fixed
          inset-0
          z-[90]

          bg-black/70

          backdrop-blur-sm
        "
      />

      {/* Modal */}
      <div
        className="
          fixed
          left-1/2
          top-1/2
          z-[100]

          flex
          h-[700px]
          w-full
          max-w-xl

          -translate-x-1/2
          -translate-y-1/2

          flex-col

          overflow-hidden

          rounded-3xl

          border
          border-white/10

          bg-zinc-950

          shadow-2xl
        "
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between

            border-b
            border-white/10

            px-6
            py-4
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-white
            "
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              p-2

              text-zinc-400

              transition-all

              hover:bg-white/5
              hover:text-white
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <input
            type="text"
            placeholder={
              searchPlaceholder
            }
            className="
              w-full

              rounded-2xl

              border
              border-white/10

              bg-white/5

              px-4
              py-3

              text-white

              outline-none

              placeholder:text-zinc-500

              focus:border-cyan-500/50
            "
          />
        </div>

        {/* Content */}
        <div
          className="
            flex-1
            overflow-y-auto

            px-4
            pb-4
          "
        >
          {loading ? (
            <div
              className="
                flex
                h-full
                items-center
                justify-center

                text-zinc-400
              "
            >
              Loading...
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
}
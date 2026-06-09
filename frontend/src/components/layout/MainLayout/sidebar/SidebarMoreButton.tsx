"use client";

import { MoreHorizontal } from "lucide-react";

import SidebarMoreModal from "./SidebarMoreModal";

interface SidebarMoreButtonProps {
  open: boolean;

  onOpen: () => void;

  onClose: () => void;
}

export default function SidebarMoreButton({
  open,
  onOpen,
  onClose,
}: SidebarMoreButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={() =>
          open
            ? onClose()
            : onOpen()
        }
        className="
          flex
          w-full
          items-center
          gap-3

          rounded-xl

          px-3
          py-3

          text-zinc-400

          transition-all
          duration-200

          hover:bg-white/5
          hover:text-white
        "
      >
        <MoreHorizontal
          size={20}
          className="shrink-0"
        />

        <span
          className="
            whitespace-nowrap

            opacity-0

            transition-opacity
            duration-200

            group-hover:opacity-100
          "
        >
          More
        </span>
      </button>

      <SidebarMoreModal
        open={open}
        onClose={onClose}
      />
    </>
  );
}
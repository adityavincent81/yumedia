"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;

  onClose: () => void;

  title?: string;

  children: ReactNode;

  size?: "sm" | "md" | "lg" | "xl" | "xxl";

  closeOnOverlayClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "auto";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const sizeClasses = {
    sm: "max-w-md",

    md: "max-w-lg",

    lg: "max-w-2xl",

    xl: "max-w-4xl",

    xxl: "max-w-7xl",
  };

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose();
        }
      }}
    >
      <div
        className={`
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          shadow-2xl
          ${sizeClasses[size]}
        `}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-zinc-800
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
              rounded-lg
              p-2
              text-zinc-400
              transition-all
              duration-200
              hover:bg-zinc-800
              hover:text-white
            "
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
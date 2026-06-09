"use client";

import Link from "next/link";

import type { LucideIcon } from "lucide-react";

interface SidebarMoreItemProps {
  label: string;

  icon: LucideIcon;

  href?: string;

  danger?: boolean;

  onClick?: () => void;
}

export default function SidebarMoreItem({
  label,
  icon: Icon,
  href,
  danger = false,
  onClick,
}: SidebarMoreItemProps) {
  const className = `
    flex
    w-full
    items-center
    gap-3

    rounded-xl

    px-3
    py-3

    text-left

    transition-all
    duration-200

    hover:bg-white/5

    ${
      danger
        ? "text-red-400 hover:bg-red-500/10"
        : "text-zinc-200"
    }
  `;

  if (href) {
    return (
      <Link
        href={href}
        className={className}
      >
        <Icon
          size={18}
          className="shrink-0"
        />

        <span className="text-sm font-medium">
          {label}
        </span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      <Icon
        size={18}
        className="shrink-0"
      />

      <span className="text-sm font-medium">
        {label}
      </span>
    </button>
  );
}
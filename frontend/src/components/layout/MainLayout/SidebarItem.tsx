"use client";

import Link from "next/link";

import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export default function SidebarItem({
  href,
  label,
  icon: Icon,
  active = false,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex
        items-center
        gap-3
        rounded-xl
        px-3
        py-3
        transition-all

        ${
          active
            ? "bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
        }
      `}
    >
      <Icon
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
        {label}
      </span>
    </Link>
  );
}
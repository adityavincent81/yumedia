"use client";

import Link from "next/link";

import type { LucideIcon } from "lucide-react";

import { usePostStore } from "@/features/post/store/post.store";

interface SidebarItemProps {
  item: {
    label: string;

    icon: LucideIcon;

    href?: string;

    action?: string;
  };

  pathname: string;
}

export default function SidebarItem({
  item,
  pathname,
}: SidebarItemProps) {
  const openCreatePost =
    usePostStore(
      (state) =>
        state.openCreatePost
    );

  const {
    href,
    label,
    icon: Icon,
    action,
  } = item;

  const active = href
    ? href === "/"
      ? pathname === "/"
      : pathname.startsWith(
          href
        )
    : false;

  const className = `
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
  `;

  if (
    action === "create-post"
  ) {
    return (
      <button
        type="button"
        onClick={
          openCreatePost
        }
        className={className}
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
      </button>
    );
  }

  if (!href) {
    return null;
  }

  return (
    <Link
      href={href}
      className={className}
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
"use client";

import SidebarItem from "../SidebarItem";

import type { LucideIcon } from "lucide-react";

interface SidebarMenuItem {
  label: string;

  icon: LucideIcon;

  href?: string;

  action?: string;
}

interface SidebarSectionProps {
  title: string;

  items: SidebarMenuItem[];

  pathname: string;
}

export default function SidebarSection({
  title,
  items,
  pathname,
}: SidebarSectionProps) {
  return (
    <div className="space-y-1">
      {/* Section Label */}
      <div
        className="
          px-3
          py-2

          opacity-0

          transition-opacity
          duration-200

          group-hover:opacity-100
        "
      >
        <p
          className="
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.2em]

            text-zinc-500
          "
        >
          {title}
        </p>
      </div>

      {/* Items */}
      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem
            key={
              item.href ??
              item.action ??
              item.label
            }
            item={item}
            pathname={pathname}
          />
        ))}
      </div>
    </div>
  );
}
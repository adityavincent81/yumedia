"use client";

import SidebarItem from "../SidebarItem";

import type { LucideIcon } from "lucide-react";

interface SidebarMenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
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
        {items.map(
          ({
            href,
            label,
            icon,
          }) => (
            <SidebarItem
              key={href}
              href={href}
              label={label}
              icon={icon}
              active={
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(
                      href
                    )
              }
            />
          )
        )}
      </div>
    </div>
  );
}
// src/components/message/conversation/ConversationFilters.tsx

"use client";

import {
  Archive,
  Pin,
  Users,
  MessageCircle,
  Bell,
} from "lucide-react";

export type ConversationFilter =
  | "all"
  | "unread"
  | "pinned"
  | "archived"
  | "groups"
  | "communities";

interface ConversationFiltersProps {
  value: ConversationFilter;

  onChange: (
    filter: ConversationFilter
  ) => void;
}

const filters = [
  {
    value: "all",
    label: "All",
    icon: MessageCircle,
    enabled: true,
  },

  {
    value: "unread",
    label: "Unread",
    icon: Bell,
    enabled: true,
  },

  /**
   * V2
   */

  {
    value: "pinned",
    label: "Pinned",
    icon: Pin,
    enabled: false,
  },

  {
    value: "archived",
    label: "Archive",
    icon: Archive,
    enabled: false,
  },

  /**
   * V3
   */

  {
    value: "groups",
    label: "Groups",
    icon: Users,
    enabled: false,
  },

  {
    value: "communities",
    label: "Communities",
    icon: Users,
    enabled: false,
  },
] as const;

export default function ConversationFilters({
  value,
  onChange,
}: ConversationFiltersProps) {
  return (
    <div
      className="
        flex
        gap-2

        overflow-x-auto

        scrollbar-none
      "
    >
      {filters.map(
        (filter) => {
          const Icon =
            filter.icon;

          const isActive =
            value ===
            filter.value;

          return (
            <button
              key={
                filter.value
              }
              type="button"
              disabled={
                !filter.enabled
              }
              title={
                filter.enabled
                  ? filter.label
                  : "Coming Soon"
              }
              onClick={() =>
                filter.enabled &&
                onChange(
                  filter.value
                )
              }
              className={`
                flex
                shrink-0
                items-center
                gap-1.5

                rounded-full

                px-3
                py-1.5

                text-xs
                font-medium

                transition-all

                ${
                  isActive
                    ? `
                      bg-white
                      text-black
                    `
                    : `
                      border
                      border-zinc-800

                      bg-zinc-950
                      text-zinc-400

                      hover:bg-zinc-900
                    `
                }

                ${
                  !filter.enabled
                    ? `
                      cursor-not-allowed
                      opacity-50
                    `
                    : ""
                }
              `}
            >
              <Icon
                size={12}
              />

              <span>
                {
                  filter.label
                }
              </span>
            </button>
          );
        }
      )}
    </div>
  );
}
// src/components/message/header/UserPresence.tsx

"use client";

import {
  Wifi,
  Moon,
  Clock3,
} from "lucide-react";

export type PresenceStatus =
  | "online"
  | "offline"
  | "away";

interface UserPresenceProps {
  status?: PresenceStatus;

  showLabel?: boolean;
}

export default function UserPresence({
  status = "online",

  showLabel = true,
}: UserPresenceProps) {
  const config = {
    online: {
      label: "Online",

      icon: Wifi,

      dot: "bg-emerald-500",

      text: "text-emerald-500",
    },

    offline: {
      label: "Offline",

      icon: Moon,

      dot: "bg-zinc-500",

      text: "text-zinc-500",
    },

    away: {
      label: "Away",

      icon: Clock3,

      dot: "bg-amber-500",

      text: "text-amber-500",
    },
  } as const;

  const current =
    config[status];

  const Icon =
    current.icon;

  if (!showLabel) {
    return (
      <div
        className={`
          h-3
          w-3

          rounded-full

          border-2
          border-zinc-950

          ${current.dot}
        `}
      />
    );
  }

  return (
    <div
      className="
        flex
        items-center
        gap-1.5
      "
    >
      <span
        className={`
          h-2.5
          w-2.5

          rounded-full

          ${current.dot}
        `}
      />

      <Icon
        size={12}
        className={
          current.text
        }
      />

      <span
        className={`
          text-xs

          ${current.text}
        `}
      >
        {current.label}
      </span>
    </div>
  );
}
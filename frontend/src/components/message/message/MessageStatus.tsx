// src/components/message/message/MessageStatus.tsx

"use client";

import {
  Check,
  CheckCheck,
  Clock3,
} from "lucide-react";

export type MessageDeliveryStatus =
  | "sending"
  | "sent"
  | "read";

interface MessageStatusProps {
  status?: MessageDeliveryStatus;

  size?: number;

  showLabel?: boolean;
}

export default function MessageStatus({
  status = "sent",

  size = 13,

  showLabel = false,
}: MessageStatusProps) {
  const config = {
    sending: {
      icon: Clock3,

      label: "Sending",

      className:
        "text-zinc-500",
    },

    sent: {
      icon: Check,

      label: "Sent",

      className:
        "text-zinc-500",
    },

    read: {
      icon: CheckCheck,

      label: "Read",

      className:
        "text-sky-500",
    },
  } as const;

  const current =
    config[status];

  const Icon =
    current.icon;

  return (
    <div
      className="
        flex
        items-center
        gap-1
      "
    >
      <Icon
        size={size}
        className={
          current.className
        }
      />

      {showLabel && (
        <span
          className={`
            text-[11px]

            ${current.className}
          `}
        >
          {current.label}
        </span>
      )}
    </div>
  );
}
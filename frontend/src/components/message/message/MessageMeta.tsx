// src/components/message/message/MessageMeta.tsx

"use client";

import MessageStatus, {
  type MessageDeliveryStatus,
} from "./MessageStatus";

interface MessageMetaProps {
  createdAt:
    | string
    | Date;

  isMine?: boolean;

  status?: MessageDeliveryStatus;

  showStatus?: boolean;
}

export default function MessageMeta({
  createdAt,

  isMine = false,

  status = "sent",

  showStatus = true,
}: MessageMetaProps) {
  const formattedTime =
    new Date(
      createdAt
    ).toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  return (
    <div
      className={`
        flex
        items-center
        justify-end
        gap-1

        text-[11px]

        ${
          isMine
            ? "text-zinc-700"
            : "text-zinc-500"
        }
      `}
    >
      <span>
        {formattedTime}
      </span>

      {isMine &&
        showStatus && (
          <MessageStatus
            status={status}
          />
        )}
    </div>
  );
}
// src/components/message/conversation/EmptyConversation.tsx

"use client";

import {
  MessageCircle,
  Users,
  Phone,
  Video,
} from "lucide-react";

export default function EmptyConversation() {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        items-center
        justify-center

        bg-zinc-950

        px-6
        text-center
      "
    >
      {/* Icon */}

      <div
        className="
          mb-8

          flex
          h-24
          w-24
          items-center
          justify-center

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-900
        "
      >
        <MessageCircle
          size={40}
          className="
            text-zinc-400
          "
        />
      </div>

      {/* Title */}

      <h2
        className="
          text-2xl
          font-bold
          text-white
        "
      >
        Your Messages
      </h2>

      <p
        className="
          mt-3
          max-w-md

          text-sm
          leading-relaxed
          text-zinc-500
        "
      >
        Select a conversation
        from the sidebar or
        start a new chat with
        your friends.
      </p>

      {/* Future Features */}

      <div
        className="
          mt-10

          flex
          flex-wrap
          items-center
          justify-center

          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-zinc-800

            px-4
            py-2

            text-xs
            text-zinc-500
          "
        >
          <Users
            size={14}
          />
          Group Chat
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-zinc-800

            px-4
            py-2

            text-xs
            text-zinc-500
          "
        >
          <Phone
            size={14}
          />
          Voice Call
        </div>

        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-zinc-800

            px-4
            py-2

            text-xs
            text-zinc-500
          "
        >
          <Video
            size={14}
          />
          Video Call
        </div>
      </div>

      {/* Coming Soon */}

      <p
        className="
          mt-4

          text-xs
          uppercase
          tracking-wider

          text-zinc-600
        "
      >
        Coming in V2 & V3
      </p>
    </div>
  );
}
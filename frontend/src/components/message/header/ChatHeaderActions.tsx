// src/components/message/header/ChatHeaderActions.tsx

"use client";

import {
  Info,
  Phone,
  Search,
  Video,
} from "lucide-react";

interface ChatHeaderActionsProps {
  onSearch?: () => void;

  onVoiceCall?: () => void;

  onVideoCall?: () => void;

  onInfo?: () => void;
}

export default function ChatHeaderActions({
  onSearch,

  onVoiceCall,

  onVideoCall,

  onInfo,
}: ChatHeaderActionsProps) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      {/* Search */}

      <button
        type="button"
        onClick={onSearch}
        disabled
        title="Coming Soon"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          text-zinc-500

          transition-colors

          hover:bg-zinc-900
        "
      >
        <Search
          size={18}
        />
      </button>

      {/* Voice Call */}

      <button
        type="button"
        onClick={
          onVoiceCall
        }
        disabled
        title="Coming Soon"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          text-zinc-500

          transition-colors

          hover:bg-zinc-900
        "
      >
        <Phone
          size={18}
        />
      </button>

      {/* Video Call */}

      <button
        type="button"
        onClick={
          onVideoCall
        }
        disabled
        title="Coming Soon"
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          text-zinc-500

          transition-colors

          hover:bg-zinc-900
        "
      >
        <Video
          size={18}
        />
      </button>

      {/* Info */}

      <button
        type="button"
        onClick={onInfo}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          border
          border-zinc-800

          text-zinc-400

          transition-colors

          hover:bg-zinc-900
          hover:text-white
        "
      >
        <Info
          size={18}
        />
      </button>
    </div>
  );
}
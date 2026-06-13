"use client";

import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
// import ChatInfoPanel from "./ChatInfoPanel";

import { useMessage } from "@/features/message/hooks/useMessage";

export default function ChatLayout() {
  const {
    selectedConversation,
  } = useMessage();

  return (
    <div
      className="
        flex
        h-[calc(100vh-64px)]
        overflow-hidden
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-950
      "
    >
      {/* Sidebar */}

      <div
        className="
          w-[320px]
          shrink-0
          border-r
          border-zinc-800
        "
      >
        <ChatSidebar />
      </div>

      {/* Chat Window */}

      <div
        className="
          flex-1
          min-w-0
        "
      >
        <ChatWindow />
      </div>

      {/* Right Panel */}
{/* 
      {selectedConversation && (
        <div
          className="
            hidden
            w-[320px]
            shrink-0
            border-l
            border-zinc-800
            xl:block
          "
        >
          <ChatInfoPanel />
        </div>
      )} */}
    </div>
  );
}
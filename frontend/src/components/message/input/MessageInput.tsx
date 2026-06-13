// src/components/message/input/MessageInput.tsx

"use client";

import {
  useRef,
  useState,
  KeyboardEvent,
} from "react";

import {
  Plus,
  Smile,
} from "lucide-react";

import { useMessage } from "@/features/message/hooks/useMessage";

import { useMessageSocket } from "@/features/message/providers/MessageSocketProvider";

import {
  MESSAGE_TYPES,
} from "@/features/message/constants/message.constants";

import AttachmentMenu from "./AttachmentMenu";

import EmojiPicker from "./EmojiPicker";

import VoiceRecorder from "./VoiceRecorder";

import SendButton from "./SendButton";

import MessageReplyPreview from "../message/MessageReplyPreview";

interface MessageInputProps {
  conversationId: string;
}

export default function MessageInput({
  conversationId,
}: MessageInputProps) {
  const [text, setText] =
    useState("");

  const [sending, setSending] =
    useState(false);

  const [
    isAttachmentOpen,
    setIsAttachmentOpen,
  ] = useState(false);

  const [
    isEmojiOpen,
    setIsEmojiOpen,
  ] = useState(false);

  /**
   * TODO
   *
   * Replace with store
   * when Reply System V2
   * is implemented.
   */

  const [
    replyingMessage,
    setReplyingMessage,
  ] = useState<any>(
    null
  );

  const imageInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const fileInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const videoInputRef =
    useRef<HTMLInputElement>(
      null
    );

  const {
    sendMessage,
  } = useMessage();

  const {
    startTyping,
    stopTyping,
  } = useMessageSocket();

  /**
   * TODO
   * Replace with Auth Store
   */

  const currentUser = {
    _id: "current-user",

    username: "You",
  };

  const handleSend =
    async () => {
      const value =
        text.trim();

      if (
        !value ||
        sending
      ) {
        return;
      }

      try {
        setSending(true);

        await sendMessage(
          conversationId,
          {
            type:
              MESSAGE_TYPES.TEXT,

            text: value,

            /**
             * V2
             */

            replyTo:
              replyingMessage?._id,
          } as any
        );

        setText("");

        setReplyingMessage(
          null
        );

        stopTyping(
          conversationId,
          currentUser
        );
      } finally {
        setSending(false);
      }
    };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key ===
        "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  const handleTypingChange =
    (
      value: string
    ) => {
      setText(value);

      if (
        value.trim()
      ) {
        startTyping(
          conversationId,
          currentUser
        );

        return;
      }

      stopTyping(
        conversationId,
        currentUser
      );
    };

  const handleImageSelect =
    async (
      file?: File
    ) => {
      if (!file) {
        return;
      }

      await sendMessage(
        conversationId,
        {
          type:
            MESSAGE_TYPES.IMAGE,

          file,
        }
      );
    };

  const handleVideoSelect =
    async (
      file?: File
    ) => {
      if (!file) {
        return;
      }

      await sendMessage(
        conversationId,
        {
          type:
            MESSAGE_TYPES.VIDEO,

          file,
        }
      );
    };

  const handleFileSelect =
    async (
      file?: File
    ) => {
      if (!file) {
        return;
      }

      await sendMessage(
        conversationId,
        {
          type:
            MESSAGE_TYPES.FILE,

          file,
        }
      );
    };

  const handleEmojiSelect =
    (
      emoji: string
    ) => {
      setText(
        (prev) =>
          prev + emoji
      );

      setIsEmojiOpen(
        false
      );
    };

  return (
    <div
      className="
        border-t
        border-zinc-800

        bg-zinc-950

        p-4
      "
    >
      {/* Hidden Inputs */}

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(
          event
        ) =>
          handleImageSelect(
            event.target
              .files?.[0]
          )
        }
      />

      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        hidden
        onChange={(
          event
        ) =>
          handleVideoSelect(
            event.target
              .files?.[0]
          )
        }
      />

      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={(
          event
        ) =>
          handleFileSelect(
            event.target
              .files?.[0]
          )
        }
      />

      {/* Reply Preview */}

      {replyingMessage && (
        <div
          className="
            mb-3
          "
        >
          <MessageReplyPreview
            message={
              replyingMessage
            }
            onCancel={() =>
              setReplyingMessage(
                null
              )
            }
          />
        </div>
      )}

      <div
        className="
          relative

          flex
          items-center
          gap-3
        "
      >
        {/* Attachment */}

        <div
          className="
            relative
          "
        >
          <button
            type="button"
            onClick={() =>
              setIsAttachmentOpen(
                (
                  prev
                ) =>
                  !prev
              )
            }
            className="
              flex
              h-10
              w-10

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
            <Plus
              size={18}
            />
          </button>

          <AttachmentMenu
            isOpen={
              isAttachmentOpen
            }
            onImage={() =>
              imageInputRef.current?.click()
            }
            onVideo={() =>
              videoInputRef.current?.click()
            }
            onFile={() =>
              fileInputRef.current?.click()
            }
          />
        </div>

        {/* Input */}

        <div
          className="
            relative
            flex
            flex-1
            items-center
            gap-3
          "
        >
          <textarea
            value={text}
            onChange={(
              event
            ) =>
              handleTypingChange(
                event.target
                  .value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            rows={1}
            placeholder="Type a message..."
            className="
              min-h-[44px]
              max-h-[160px]

              w-full
              resize-none

              rounded-2xl

              border
              border-zinc-800

              bg-zinc-900

              px-4
              py-[11px]

              text-sm
              text-white

              outline-none

              placeholder:text-zinc-500

              focus:border-zinc-700
            "
          />
        </div>

        {/* Emoji */}

        <div
          className="
            relative

            hidden
            md:block
          "
        >
          <button
            type="button"
            onClick={() =>
              setIsEmojiOpen(
                (
                  prev
                ) =>
                  !prev
              )
            }
            className="
              flex
              h-10
              w-10

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
            <Smile
              size={18}
            />
          </button>

          <EmojiPicker
            isOpen={
              isEmojiOpen
            }
            onSelect={
              handleEmojiSelect
            }
          />
        </div>

        {/* Voice */}

        <VoiceRecorder />

        {/* Send */}

        <SendButton
          loading={sending}
          disabled={
            !text.trim()
          }
          onClick={
            handleSend
          }
        />
      </div>
    </div>
  );
}
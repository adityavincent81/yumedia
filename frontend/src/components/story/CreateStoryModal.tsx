// src/components/story/CreateStoryModal.tsx

"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { X } from "lucide-react";

import {
  STORY_TYPES,
} from "@/features/story/constants/story.constants";

import { useCreateStory } from "@/features/story/hooks/useCreateStory";

import { useStoryStore } from "@/features/story/store/story.store";

import type {
  StoryType,
  StoryVisibility,
} from "@/features/story/types/story.types";

import StoryMediaPicker from "./StoryMediaPicker";
import StoryTextEditor from "./StoryTextEditor";
import StoryVisibilitySelector from "./StoryVisibilitySelector";

export default function CreateStoryModal() {
  const isOpen =
    useStoryStore(
      (state) =>
        state.isCreateStoryOpen
    );

  const closeModal =
    useStoryStore(
      (state) =>
        state.closeCreateStory
    );

  const {
    createStory,
    isPending,
  } = useCreateStory();

  const [type, setType] =
    useState<StoryType>(
      STORY_TYPES.IMAGE
    );

  const [file, setFile] =
    useState<File | null>(
      null
    );

  const [text, setText] =
    useState("");

  const [
    backgroundColor,
    setBackgroundColor,
  ] = useState(
    "#18181b"
  );

  const [
    visibility,
    setVisibility,
  ] = useState<StoryVisibility>(
    "followers"
  );

  const previewUrl =
    useMemo(() => {
      if (!file) {
        return null;
      }

      return URL.createObjectURL(
        file
      );
    }, [file]);

  useEffect(() => {
    return () => {
      if (
        previewUrl
      ) {
        URL.revokeObjectURL(
          previewUrl
        );
      }
    };
  }, [previewUrl]);

  const resetForm =
    () => {
      setType(
        STORY_TYPES.IMAGE
      );

      setFile(
        null
      );

      setText("");

      setBackgroundColor(
        "#18181b"
      );

      setVisibility(
        "followers"
      );
    };

  const handleClose =
    () => {
      resetForm();

      closeModal();
    };

  /**
   * Escape key
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown =
      (
        event: KeyboardEvent
      ) => {
        if (
          event.key ===
          "Escape"
        ) {
          handleClose();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen]);

  const isValid =
    type ===
    STORY_TYPES.TEXT
      ? text.trim()
          .length > 0
      : !!file;

  const handleSubmit =
    async () => {
      if (
        !isValid ||
        isPending
      ) {
        return;
      }

      try {
        await createStory(
          {
            type,

            media:
              file ||
              undefined,

            text:
              text.trim() ||
              undefined,

            backgroundColor,

            visibility,
          }
        );

        resetForm();

        closeModal();
      } catch (
        error
      ) {
        console.error(
          error
        );
      }
    };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[1000]
        flex
        items-center
        justify-center
        bg-black/70
        backdrop-blur-sm
      "
      onClick={
        handleClose
      }
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Create Story"
        onClick={(
          e
        ) =>
          e.stopPropagation()
        }
        className="
          max-h-[90vh]
          w-full
          max-w-xl
          overflow-y-auto
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          p-6
        "
      >
        {/* Header */}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Create Story
          </h2>

          <button
            type="button"
            aria-label="Close"
            onClick={
              handleClose
            }
            className="
              rounded-md
              p-1
              transition
              hover:bg-zinc-800
            "
          >
            <X className="h-5 w-5 text-zinc-300" />
          </button>
        </div>

        {/* Type */}

        <div className="mb-6">
          <label className="mb-2 block text-sm text-zinc-400">
            Story Type
          </label>

          <select
            value={type}
            onChange={(
              e
            ) =>
              setType(
                e.target
                  .value as StoryType
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              px-3
              py-2
              text-white
              outline-none
            "
          >
            <option value="image">
              Image
            </option>

            <option value="video">
              Video
            </option>

            <option value="text">
              Text
            </option>
          </select>
        </div>

        {/* Media */}

        {type !==
          STORY_TYPES.TEXT && (
          <div className="mb-6">
            <StoryMediaPicker
              type={type}
              file={file}
              previewUrl={
                previewUrl
              }
              onChange={
                setFile
              }
            />
          </div>
        )}

        {/* Text */}

        {type ===
          STORY_TYPES.TEXT && (
          <div className="mb-6">
            <StoryTextEditor
              text={text}
              backgroundColor={
                backgroundColor
              }
              onTextChange={
                setText
              }
              onBackgroundColorChange={
                setBackgroundColor
              }
            />
          </div>
        )}

        {/* Visibility */}

        <div className="mb-6">
          <StoryVisibilitySelector
            value={
              visibility
            }
            onChange={
              setVisibility
            }
          />
        </div>

        {/* Submit */}

        <button
          type="button"
          onClick={
            handleSubmit
          }
          disabled={
            !isValid ||
            isPending
          }
          className="
            w-full
            rounded-xl
            bg-primary
            px-4
            py-3
            font-medium
            text-primary-foreground
            transition
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isPending
            ? "Creating..."
            : "Create Story"}
        </button>
      </div>
    </div>
  );
}
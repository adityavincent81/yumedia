"use client";

interface PostActionsProps {
  likesCount?: number;

  commentsCount?: number;

  savesCount?: number;

  isLiked?: boolean;

  isSaved?: boolean;

  onLike?: () => void;

  onComment?: () => void;

  onSave?: () => void;
}

export default function PostActions({
  likesCount = 0,

  commentsCount = 0,

  savesCount = 0,

  isLiked = false,

  isSaved = false,

  onLike,

  onComment,

  onSave,
}: PostActionsProps) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
      "
    >
      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <button
          type="button"
          onClick={onLike}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-zinc-300
            transition
            hover:text-white
          "
        >
          <span>
            {isLiked
              ? "❤️"
              : "🤍"}
          </span>

          <span>
            {likesCount}
          </span>
        </button>

        <button
          type="button"
          onClick={onComment}
          className="
            flex
            items-center
            gap-2
            text-sm
            text-zinc-300
            transition
            hover:text-white
          "
        >
          <span>💬</span>

          <span>
            {commentsCount}
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={onSave}
        className="
          flex
          items-center
          gap-2
          text-sm
          text-zinc-300
          transition
          hover:text-white
        "
      >
        <span>
          {isSaved
            ? "🔖"
            : "📑"}
        </span>

        <span>
          {savesCount}
        </span>
      </button>
    </div>
  );
}
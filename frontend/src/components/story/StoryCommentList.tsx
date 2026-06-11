// src/components/story/StoryCommentList.tsx

"use client";

import Image from "next/image";

import type {
  StoryComment,
  StoryReply,
} from "@/features/story/types/story.types";

interface StoryCommentListProps {
  comments: StoryComment[];

  repliesMap?: Record<
    string,
    StoryReply[]
  >;

  onReply?: (
    commentId: string
  ) => void;

  onDelete?: (
    commentId: string
  ) => void;
}

function formatTime(
  date: string
) {
  const diff =
    Date.now() -
    new Date(
      date
    ).getTime();

  const seconds =
    Math.floor(
      diff / 1000
    );

  if (
    seconds < 60
  ) {
    return `${seconds}s`;
  }

  const minutes =
    Math.floor(
      seconds / 60
    );

  if (
    minutes < 60
  ) {
    return `${minutes}m`;
  }

  const hours =
    Math.floor(
      minutes / 60
    );

  if (
    hours < 24
  ) {
    return `${hours}h`;
  }

  const days =
    Math.floor(
      hours / 24
    );

  return `${days}d`;
}

export default function StoryCommentList({
  comments,
  repliesMap = {},
  onReply,
  onDelete,
}: StoryCommentListProps) {
  if (
    comments.length === 0
  ) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center
          p-8
          text-sm
          text-zinc-500
        "
      >
        No comments yet
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {comments.map(
        (comment) => {
          const replies =
            repliesMap[
              comment._id
            ] || [];

          const avatarUrl =
            comment.author
              .avatar?.url;

          return (
            <div
              key={
                comment._id
              }
            >
              {/* Comment */}

              <div className="flex gap-3">
                {/* Avatar */}

                <div
                  className="
                    relative
                    h-10
                    w-10
                    shrink-0
                    overflow-hidden
                    rounded-full
                    bg-zinc-800
                  "
                >
                  {avatarUrl ? (
                    <Image
                      src={
                        avatarUrl
                      }
                      alt={
                        comment
                          .author
                          .username
                      }
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-full
                        w-full
                        items-center
                        justify-center
                        text-sm
                        font-semibold
                        text-zinc-300
                      "
                    >
                      {comment.author.username
                        ?.charAt(
                          0
                        )
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Bubble */}

                <div className="min-w-0 flex-1">
                  <div
                    className="
                      rounded-2xl
                      bg-white/5
                      p-3
                      backdrop-blur-md
                    "
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >
                        {
                          comment
                            .author
                            .username
                        }
                      </span>

                      <span
                        className="
                          text-xs
                          text-zinc-500
                        "
                      >
                        {formatTime(
                          comment.createdAt
                        )}
                      </span>
                    </div>

                    <p
                      className="
                        whitespace-pre-wrap
                        break-words
                        text-sm
                        text-zinc-200
                      "
                    >
                      {comment.isDeleted
                        ? "This comment has been deleted."
                        : comment.content}
                    </p>
                  </div>

                  {!comment.isDeleted && (
                    <div
                      className="
                        mt-2
                        flex
                        items-center
                        gap-4
                        pl-3
                        text-xs
                      "
                    >
                      {onReply && (
                        <button
                          type="button"
                          onClick={() =>
                            onReply(
                              comment._id
                            )
                          }
                          className="
                            text-zinc-400
                            transition
                            hover:text-white
                          "
                        >
                          Reply
                        </button>
                      )}

                      {replies.length >
                        0 && (
                        <span
                          className="
                            text-zinc-500
                          "
                        >
                          {
                            replies.length
                          }{" "}
                          replies
                        </span>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          onClick={() =>
                            onDelete(
                              comment._id
                            )
                          }
                          className="
                            text-red-400
                            transition
                            hover:text-red-300
                          "
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  )}

                  {/* Replies */}

                  {replies.length >
                    0 && (
                    <div
                      className="
                        mt-3
                        ml-4
                        space-y-3
                        border-l
                        border-white/10
                        pl-4
                      "
                    >
                      {replies.map(
                        (
                          reply
                        ) => {
                          const replyAvatar =
                            reply
                              .author
                              .avatar
                              ?.url;

                          return (
                            <div
                              key={
                                reply._id
                              }
                              className="flex gap-3"
                            >
                              <div
                                className="
                                  relative
                                  h-8
                                  w-8
                                  shrink-0
                                  overflow-hidden
                                  rounded-full
                                  bg-zinc-800
                                "
                              >
                                {replyAvatar ? (
                                  <Image
                                    src={
                                      replyAvatar
                                    }
                                    alt={
                                      reply
                                        .author
                                        .username
                                    }
                                    fill
                                    sizes="32px"
                                    className="object-cover"
                                  />
                                ) : (
                                  <div
                                    className="
                                      flex
                                      h-full
                                      w-full
                                      items-center
                                      justify-center
                                      text-xs
                                      font-semibold
                                      text-zinc-300
                                    "
                                  >
                                    {reply.author.username
                                      ?.charAt(
                                        0
                                      )
                                      .toUpperCase()}
                                  </div>
                                )}
                              </div>

                              <div
                                className="
                                  flex-1
                                  rounded-xl
                                  bg-white/5
                                  p-2.5
                                  backdrop-blur-md
                                "
                              >
                                <div className="mb-1 flex items-center gap-2">
                                  <span
                                    className="
                                      text-xs
                                      font-semibold
                                      text-white
                                    "
                                  >
                                    {
                                      reply
                                        .author
                                        .username
                                    }
                                  </span>

                                  <span
                                    className="
                                      text-[10px]
                                      text-zinc-500
                                    "
                                  >
                                    {formatTime(
                                      reply.createdAt
                                    )}
                                  </span>
                                </div>

                                <p
                                  className="
                                    whitespace-pre-wrap
                                    break-words
                                    text-xs
                                    text-zinc-300
                                  "
                                >
                                  {
                                    reply.content
                                  }
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
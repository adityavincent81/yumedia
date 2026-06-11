// src/features/story/store/story.store.ts

import { create } from "zustand";

import type {
  Story,
  StoryComment,
  StoryGroup,
  StoryReply,
  StoryStoreState,
  StoryViewer,
} from "../types/story.types";

interface StoryStore
  extends StoryStoreState {
  setFeed: (
    feed: StoryGroup[]
  ) => void;

  setSelectedStory: (
    story: Story | null
  ) => void;

  setSelectedAuthorId: (
    authorId: string | null
  ) => void;

  openViewer: (
    story: Story,
    authorId: string
  ) => void;

  closeViewer: () => void;

  openCreateStory: () => void;

  closeCreateStory: () => void;

  setComments: (
    storyId: string,
    comments: StoryComment[]
  ) => void;

  addComment: (
    storyId: string,
    comment: StoryComment
  ) => void;

  removeComment: (
    storyId: string,
    commentId: string
  ) => void;

  setReplies: (
    commentId: string,
    replies: StoryReply[]
  ) => void;

  addReply: (
    commentId: string,
    reply: StoryReply
  ) => void;

  removeReply: (
    commentId: string,
    replyId: string
  ) => void;

  setViewers: (
    storyId: string,
    viewers: StoryViewer[]
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;

  clear: () => void;
}

export const useStoryStore =
  create<StoryStore>(
    (set) => ({
      feed: [],

      selectedStory:
        null,

      selectedAuthorId:
        null,

      comments: {},

      replies: {},

      viewers: {},

      isViewerOpen:
        false,

      isCreateStoryOpen:
        false,

      loading: false,

      setFeed: (
        feed
      ) =>
        set({
          feed,
        }),

      setSelectedStory: (
        selectedStory
      ) =>
        set({
          selectedStory,
        }),

      setSelectedAuthorId: (
        selectedAuthorId
      ) =>
        set({
          selectedAuthorId,
        }),

      openViewer: (
        story,
        authorId
      ) =>
        set({
          selectedStory:
            story,

          selectedAuthorId:
            authorId,

          isViewerOpen:
            true,
        }),

      closeViewer:
        () =>
          set({
            selectedStory:
              null,

            selectedAuthorId:
              null,

            isViewerOpen:
              false,
          }),

      openCreateStory:
        () =>
          set({
            isCreateStoryOpen:
              true,
          }),

      closeCreateStory:
        () =>
          set({
            isCreateStoryOpen:
              false,
          }),

      setComments: (
        storyId,
        comments
      ) =>
        set(
          (
            state
          ) => ({
            comments:
              {
                ...state.comments,

                [storyId]:
                  comments,
              },
          })
        ),

      addComment: (
        storyId,
        comment
      ) =>
        set(
          (
            state
          ) => ({
            comments:
              {
                ...state.comments,

                [storyId]:
                  [
                    comment,

                    ...(state
                      .comments[
                      storyId
                    ] ||
                      []),
                  ],
              },
          })
        ),

      removeComment: (
        storyId,
        commentId
      ) =>
        set(
          (
            state
          ) => ({
            comments:
              {
                ...state.comments,

                [storyId]:
                  (
                    state
                      .comments[
                      storyId
                    ] ||
                    []
                  ).filter(
                    (
                      comment
                    ) =>
                      comment._id !==
                      commentId
                  ),
              },
          })
        ),

      setReplies: (
        commentId,
        replies
      ) =>
        set(
          (
            state
          ) => ({
            replies:
              {
                ...state.replies,

                [commentId]:
                  replies,
              },
          })
        ),

      addReply: (
        commentId,
        reply
      ) =>
        set(
          (
            state
          ) => ({
            replies:
              {
                ...state.replies,

                [commentId]:
                  [
                    ...(state
                      .replies[
                      commentId
                    ] ||
                      []),

                    reply,
                  ],
              },
          })
        ),

      removeReply: (
        commentId,
        replyId
      ) =>
        set(
          (
            state
          ) => ({
            replies:
              {
                ...state.replies,

                [commentId]:
                  (
                    state
                      .replies[
                      commentId
                    ] ||
                    []
                  ).filter(
                    (
                      reply
                    ) =>
                      reply._id !==
                      replyId
                  ),
              },
          })
        ),

      setViewers: (
        storyId,
        viewers
      ) =>
        set(
          (
            state
          ) => ({
            viewers:
              {
                ...state.viewers,

                [storyId]:
                  viewers,
              },
          })
        ),

      setLoading: (
        loading
      ) =>
        set({
          loading,
        }),

      clear: () =>
        set({
          feed: [],

          selectedStory:
            null,

          selectedAuthorId:
            null,

          comments: {},

          replies: {},

          viewers: {},

          isViewerOpen:
            false,

          isCreateStoryOpen:
            false,

          loading: false,
        }),
    })
  );
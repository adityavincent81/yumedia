import { create } from "zustand";

import type {
  Collection,
} from "../types/collection.types";

interface CollectionStore {
  collections: Collection[];

  selectedCollection:
    Collection | null;

  collectionPosts: Record<
    string,
    any[]
  >;

  loading: boolean;

  createModalOpen: boolean;

  selectorModalOpen: boolean;

  selectedPostId:
    string | null;

  /**
   * Collection
   */
  setCollections: (
    collections: Collection[]
  ) => void;

  addCollection: (
    collection: Collection
  ) => void;

  updateCollection: (
    collection: Collection
  ) => void;

  removeCollection: (
    collectionId: string
  ) => void;

  /**
   * Selected Collection
   */
  setSelectedCollection: (
    collection: Collection | null
  ) => void;

  /**
   * Collection Posts
   */
  setCollectionPosts: (
    collectionId: string,
    posts: any[]
  ) => void;

  addPostToCollection: (
    collectionId: string,
    post: any
  ) => void;

  removePostFromCollection: (
    collectionId: string,
    postId: string
  ) => void;

  clearCollectionPosts: (
    collectionId: string
  ) => void;

  /**
   * Loading
   */
  setLoading: (
    loading: boolean
  ) => void;

  /**
   * Create Modal
   */
  openCreateModal: () => void;

  closeCreateModal: () => void;

  /**
   * Selector Modal
   */
  openSelectorModal: (
    postId: string
  ) => void;

  closeSelectorModal: () => void;
}

export const useCollectionStore =
  create<CollectionStore>(
    (set) => ({
      collections: [],

      selectedCollection:
        null,

      collectionPosts: {},

      loading: false,

      createModalOpen: false,

      selectorModalOpen:
        false,

      selectedPostId: null,

      /**
       * Collections
       */
      setCollections: (
        collections
      ) =>
        set({
          collections,
        }),

      addCollection: (
        collection
      ) =>
        set((state) => ({
          collections: [
            collection,
            ...state.collections,
          ],
        })),

      updateCollection: (
        updatedCollection
      ) =>
        set((state) => ({
          collections:
            state.collections.map(
              (
                collection
              ) =>
                collection._id ===
                updatedCollection._id
                  ? updatedCollection
                  : collection
            ),

          selectedCollection:
            state
              .selectedCollection
              ?._id ===
            updatedCollection._id
              ? updatedCollection
              : state.selectedCollection,
        })),

      removeCollection: (
        collectionId
      ) =>
        set((state) => ({
          collections:
            state.collections.filter(
              (
                collection
              ) =>
                collection._id !==
                collectionId
            ),

          selectedCollection:
            state
              .selectedCollection
              ?._id ===
            collectionId
              ? null
              : state.selectedCollection,
        })),

      /**
       * Selected Collection
       */
      setSelectedCollection: (
        collection
      ) =>
        set({
          selectedCollection:
            collection,
        }),

      /**
       * Collection Posts
       */
      setCollectionPosts: (
        collectionId,
        posts
      ) =>
        set((state) => ({
          collectionPosts: {
            ...state.collectionPosts,

            [collectionId]:
              posts,
          },
        })),

      addPostToCollection: (
        collectionId,
        post
      ) =>
        set((state) => ({
          collectionPosts: {
            ...state.collectionPosts,

            [collectionId]: [
              post,

              ...(state
                .collectionPosts[
                collectionId
              ] || []),
            ],
          },
        })),

      removePostFromCollection: (
        collectionId,
        postId
      ) =>
        set((state) => ({
          collectionPosts: {
            ...state.collectionPosts,

            [collectionId]: (
              state
                .collectionPosts[
                collectionId
              ] || []
            ).filter(
              (post: any) =>
                post._id !==
                postId
            ),
          },
        })),

      clearCollectionPosts: (
        collectionId
      ) =>
        set((state) => ({
          collectionPosts: {
            ...state.collectionPosts,

            [collectionId]:
              [],
          },
        })),

      /**
       * Loading
       */
      setLoading: (
        loading
      ) =>
        set({
          loading,
        }),

      /**
       * Create Modal
       */
      openCreateModal:
        () =>
          set({
            createModalOpen:
              true,
          }),

      closeCreateModal:
        () =>
          set({
            createModalOpen:
              false,
          }),

      /**
       * Selector Modal
       */
      openSelectorModal:
        (postId) =>
          set({
            selectorModalOpen:
              true,

            selectedPostId:
              postId,
          }),

      closeSelectorModal:
        () =>
          set({
            selectorModalOpen:
              false,

            selectedPostId:
              null,
          }),
    })
  );
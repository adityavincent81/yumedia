"use client";

import { useCallback } from "react";

import { collectionService } from "../service/collection.service";

import { useCollectionStore } from "../store/collection.store";

import type {
  CreateCollectionPayload,
  UpdateCollectionPayload,
  Collection,
} from "../types/collection.types";

export const useCollection =
  () => {
    const {
      collections,

      selectedCollection,

      collectionPosts,

      loading,

      setCollections,

      addCollection,

      updateCollection,

      removeCollection,

      setSelectedCollection,

      setCollectionPosts,

      setLoading,
    } =
      useCollectionStore();

    /**
     * Collections
     */
    const getMyCollections =
      useCallback(
        async () => {
          try {
            setLoading(
              true
            );

            const result =
              await collectionService.getMyCollections();

            setCollections(
              result
            );

            return result;
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          setCollections,
          setLoading,
        ]
      );

    const getCollection =
      useCallback(
        async (
          collectionId: string
        ) => {
          try {
            setLoading(
              true
            );

            const result =
              await collectionService.getCollection(
                collectionId
              );

            setSelectedCollection(
              result
            );

            return result;
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          setSelectedCollection,
          setLoading,
        ]
      );

    const createCollection =
      useCallback(
        async (
          payload: CreateCollectionPayload
        ) => {
          try {
            setLoading(
              true
            );

            const collection =
              await collectionService.createCollection(
                payload
              );

            addCollection(
              collection
            );

            return collection;
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          addCollection,
          setLoading,
        ]
      );

    const editCollection =
      useCallback(
        async (
          collectionId: string,
          payload: UpdateCollectionPayload
        ) => {
          try {
            setLoading(
              true
            );

            const collection =
              await collectionService.updateCollection(
                collectionId,
                payload
              );

            updateCollection(
              collection
            );

            return collection;
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          updateCollection,
          setLoading,
        ]
      );

    const deleteCollection =
      useCallback(
        async (
          collectionId: string
        ) => {
          try {
            setLoading(
              true
            );

            await collectionService.deleteCollection(
              collectionId
            );

            removeCollection(
              collectionId
            );
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          removeCollection,
          setLoading,
        ]
      );

    /**
     * Collection Posts
     */
    const getCollectionPosts =
      useCallback(
        async (
          collectionId: string,
          page = 1,
          limit = 20
        ) => {
          try {
            setLoading(
              true
            );

            const result =
              await collectionService.getCollectionPosts(
                collectionId,
                page,
                limit
              );

            setCollectionPosts(
              collectionId,
              result.posts
            );

            return result;
          } finally {
            setLoading(
              false
            );
          }
        },
        [
          setCollectionPosts,
          setLoading,
        ]
      );

    const addPostToCollection =
      useCallback(
        async (
          collectionId: string,
          postId: string
        ) => {
          return collectionService.addPostToCollection(
            collectionId,
            postId
          );
        },
        []
      );

    const removePostFromCollection =
      useCallback(
        async (
          collectionId: string,
          postId: string
        ) => {
          return collectionService.removePostFromCollection(
            collectionId,
            postId
          );
        },
        []
      );

    return {
      /**
       * State
       */
      collections,

      selectedCollection,

      collectionPosts,

      loading,

      /**
       * Collection
       */
      getMyCollections,

      getCollection,

      createCollection,

      editCollection,

      deleteCollection,

      /**
       * Posts
       */
      getCollectionPosts,

      addPostToCollection,

      removePostFromCollection,
    };
  };
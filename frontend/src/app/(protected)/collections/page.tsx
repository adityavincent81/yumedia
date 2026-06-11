"use client";

import {
  useEffect,
} from "react";

import {
  Plus,
} from "lucide-react";

import CollectionGrid from "@/components/collection/CollectionGrid";

import CreateCollectionModal from "@/components/collection/CreateCollectionModal";

import { useCollection } from "@/features/collection/hooks/useCollection";

import { useCollectionStore } from "@/features/collection/store/collection.store";

export default function CollectionsPage() {
  const {
    collections,

    loading,

    getMyCollections,
  } = useCollection();

  const {
    createModalOpen,

    openCreateModal,

    closeCreateModal,
  } = useCollectionStore();

  useEffect(() => {
    getMyCollections();
  }, [getMyCollections]);

  return (
    <div
      className="
        mx-auto
        max-w-7xl
        space-y-8
      "
    >
      {/* Header */}
      <div
        className="
          flex
          flex-col
          gap-4

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-white
            "
          >
            Collections
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-zinc-500
            "
          >
            Organize your saved
            posts into collections.
          </p>
        </div>

        <button
          type="button"
          onClick={
            openCreateModal
          }
          className="
            inline-flex
            items-center
            gap-2

            rounded-xl

            bg-white

            px-4
            py-2

            font-medium
            text-black

            transition-all

            hover:opacity-90
          "
        >
          <Plus size={18} />

          New Collection
        </button>
      </div>

      {/* Collections */}
      <CollectionGrid
        collections={
          collections
        }
        loading={loading}
      />

      {/* Modal */}
      <CreateCollectionModal
        isOpen={
          createModalOpen
        }
        onClose={
          closeCreateModal
        }
      />
    </div>
  );
}
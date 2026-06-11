"use client";

import {
  useState,
} from "react";

import CollectionModal from "./CollectionModal";

import { useCollection } from "@/features/collection/hooks/useCollection";

interface CreateCollectionModalProps {
  isOpen: boolean;

  onClose: () => void;
}

export default function CreateCollectionModal({
  isOpen,

  onClose,
}: CreateCollectionModalProps) {
  const {
    createCollection,
  } = useCollection();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const handleCreate =
    async ({
      name,
      description,
      isPrivate,
    }: {
      name: string;

      description: string;

      isPrivate: boolean;
    }) => {
      try {
        setLoading(true);

        await createCollection({
          name,

          description,

          isPrivate,
        });

        onClose();
      } finally {
        setLoading(false);
      }
    };

  return (
    <CollectionModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Collection"
      loading={loading}
      submitLabel="Create Collection"
      onSubmit={handleCreate}
    />
  );
}
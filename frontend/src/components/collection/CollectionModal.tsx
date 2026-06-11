"use client";

import Modal from "@/components/ui/Modal";

import CollectionForm from "./CollectionForm";

interface CollectionModalProps {
  isOpen: boolean;

  onClose: () => void;

  title: string;

  loading?: boolean;

  submitLabel: string;

  initialValues?: {
    name: string;

    description?: string;

    isPrivate: boolean;
  };

  onSubmit: (
    values: {
      name: string;

      description: string;

      isPrivate: boolean;
    }
  ) => Promise<void> | void;
}

export default function CollectionModal({
  isOpen,

  onClose,

  title,

  loading = false,

  submitLabel,

  initialValues,

  onSubmit,
}: CollectionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
    >
      <CollectionForm
        initialValues={
          initialValues
        }
        loading={loading}
        submitLabel={
          submitLabel
        }
        onSubmit={onSubmit}
      />
    </Modal>
  );
}
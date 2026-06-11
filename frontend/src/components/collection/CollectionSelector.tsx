"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  Folder,
  Plus,
} from "lucide-react";

import Modal from "@/components/ui/Modal";

import CreateCollectionModal from "./CreateCollectionModal";

import { useCollection } from "@/features/collection/hooks/useCollection";

interface CollectionSelectorProps {
  isOpen: boolean;

  postId: string;

  onClose: () => void;
}

export default function CollectionSelector({
  isOpen,

  postId,

  onClose,
}: CollectionSelectorProps) {
  const {
    collections,

    loading,

    getMyCollections,

    addPostToCollection,
  } = useCollection();

  const [
    selectedCollectionId,
    setSelectedCollectionId,
  ] = useState("");

  const [
    createModalOpen,
    setCreateModalOpen,
  ] = useState(false);

  const [
    saving,
    setSaving,
  ] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedCollectionId(
        ""
      );

      return;
    }

    getMyCollections();
  }, [
    isOpen,
    getMyCollections,
  ]);

  const handleSave =
    async () => {
      if (
        !selectedCollectionId
      ) {
        return;
      }

      try {
        setSaving(true);

        await addPostToCollection(
          selectedCollectionId,
          postId
        );

        await getMyCollections();

        setSelectedCollectionId(
          ""
        );

        onClose();
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Save To Collection"
        size="md"
      >
        <div
          className="
            space-y-4
          "
        >
          {/* Create Collection */}
          <button
            type="button"
            onClick={() =>
              setCreateModalOpen(
                true
              )
            }
            className="
              flex
              w-full
              items-center
              gap-3

              rounded-xl
              border
              border-dashed
              border-zinc-700

              p-4

              text-left

              transition-all

              hover:border-zinc-500
              hover:bg-zinc-800
            "
          >
            <Plus
              size={18}
            />

            <span>
              Create New
              Collection
            </span>
          </button>

          {/* Collections */}
          <div
            className="
              max-h-[350px]
              space-y-2
              overflow-y-auto
            "
          >
            {loading ? (
              Array.from({
                length: 5,
              }).map(
                (
                  _,
                  index
                ) => (
                  <div
                    key={
                      index
                    }
                    className="
                      h-16
                      animate-pulse
                      rounded-xl
                      bg-zinc-800
                    "
                  />
                )
              )
            ) : collections.length ===
              0 ? (
              <div
                className="
                  rounded-xl
                  border
                  border-zinc-800
                  p-6
                  text-center
                "
              >
                <Folder
                  size={32}
                  className="
                    mx-auto
                    mb-3
                    text-zinc-600
                  "
                />

                <p
                  className="
                    text-sm
                    text-zinc-500
                  "
                >
                  No collections
                  yet
                </p>
              </div>
            ) : (
              collections.map(
                (
                  collection
                ) => {
                  const selected =
                    selectedCollectionId ===
                    collection._id;

                  return (
                    <button
                      key={
                        collection._id
                      }
                      type="button"
                      onClick={() =>
                        setSelectedCollectionId(
                          collection._id
                        )
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between

                        rounded-xl
                        border

                        p-4

                        text-left

                        transition-all

                        ${
                          selected
                            ? `
                              border-white
                              bg-zinc-800
                            `
                            : `
                              border-zinc-800
                              hover:bg-zinc-800
                            `
                        }
                      `}
                    >
                      <div>
                        <h4
                          className="
                            font-medium
                            text-white
                          "
                        >
                          {
                            collection.name
                          }
                        </h4>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-zinc-500
                          "
                        >
                          {
                            collection.postsCount
                          }{" "}
                          posts
                        </p>
                      </div>

                      {selected && (
                        <Check
                          size={
                            18
                          }
                        />
                      )}
                    </button>
                  );
                }
              )
            )}
          </div>

          {/* Footer */}
          <div
            className="
              flex
              justify-end
              gap-3
              pt-2
            "
          >
            <button
              type="button"
              onClick={
                onClose
              }
              className="
                rounded-xl
                border
                border-zinc-700

                px-4
                py-2

                text-zinc-300

                hover:bg-zinc-800
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={
                !selectedCollectionId ||
                saving
              }
              onClick={
                handleSave
              }
              className="
                rounded-xl
                bg-white

                px-4
                py-2

                font-medium
                text-black

                disabled:opacity-50
              "
            >
              {saving
                ? "Saving..."
                : "Save"}
            </button>
          </div>
        </div>
      </Modal>

      <CreateCollectionModal
        isOpen={
          createModalOpen
        }
        onClose={() =>
          setCreateModalOpen(
            false
          )
        }
      />
    </>
  );
}
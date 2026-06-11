"use client";

import {
  useState,
} from "react";

interface CollectionFormProps {
  initialValues?: {
    name: string;

    description?: string;

    isPrivate: boolean;
  };

  loading?: boolean;

  submitLabel?: string;

  onSubmit: (
    values: {
      name: string;

      description: string;

      isPrivate: boolean;
    }
  ) => Promise<void> | void;
}

export default function CollectionForm({
  initialValues,

  loading = false,

  submitLabel = "Save",

  onSubmit,
}: CollectionFormProps) {
  const [name, setName] =
    useState(
      initialValues?.name || ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    initialValues?.description ||
      ""
  );

  const [
    isPrivate,
    setIsPrivate,
  ] = useState(
    initialValues?.isPrivate ??
      true
  );

  const handleSubmit =
    async (
      event: React.FormEvent
    ) => {
      event.preventDefault();

      if (!name.trim()) {
        return;
      }

      await onSubmit({
        name: name.trim(),

        description:
          description.trim(),

        isPrivate,
      });
    };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="
        space-y-5
      "
    >
      {/* Name */}
      <div>
        <label
          className="
            mb-2
            block

            text-sm
            font-medium
            text-zinc-300
          "
        >
          Collection Name
        </label>

        <input
          type="text"
          value={name}
          maxLength={50}
          onChange={(event) =>
            setName(
              event.target.value
            )
          }
          placeholder="Favorites"
          className="
            w-full

            rounded-xl
            border
            border-zinc-700

            bg-zinc-900

            px-4
            py-3

            text-white

            outline-none

            transition-all

            focus:border-white
          "
        />
      </div>

      {/* Description */}
      <div>
        <label
          className="
            mb-2
            block

            text-sm
            font-medium
            text-zinc-300
          "
        >
          Description
        </label>

        <textarea
          value={description}
          maxLength={200}
          rows={4}
          onChange={(event) =>
            setDescription(
              event.target.value
            )
          }
          placeholder="Describe this collection..."
          className="
            w-full

            rounded-xl
            border
            border-zinc-700

            bg-zinc-900

            px-4
            py-3

            text-white

            outline-none

            transition-all

            focus:border-white
          "
        />
      </div>

      {/* Privacy */}
      <div
        className="
          rounded-xl
          border
          border-zinc-800

          p-4
        "
      >
        <label
          className="
            flex
            cursor-pointer
            items-center
            justify-between
          "
        >
          <div>
            <h4
              className="
                font-medium
                text-white
              "
            >
              Private Collection
            </h4>

            <p
              className="
                mt-1
                text-sm
                text-zinc-500
              "
            >
              Only you can see
              this collection.
            </p>
          </div>

          <input
            type="checkbox"
            checked={
              isPrivate
            }
            onChange={(
              event
            ) =>
              setIsPrivate(
                event.target.checked
              )
            }
            className="
              h-5
              w-5
            "
          />
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={
          !name.trim() ||
          loading
        }
        className="
          w-full

          rounded-xl
          bg-white

          py-3

          font-medium
          text-black

          transition-all

          hover:opacity-90

          disabled:opacity-50
        "
      >
        {loading
          ? "Saving..."
          : submitLabel}
      </button>
    </form>
  );
}
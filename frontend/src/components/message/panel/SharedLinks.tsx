// src/components/message/panel/SharedLinks.tsx

"use client";

import {
  Link2,
  ExternalLink,
} from "lucide-react";

interface SharedLink {
  _id: string;

  url: string;

  title?: string;

  domain?: string;
}

interface SharedLinksProps {
  links?: SharedLink[];

  onOpen?: (
    link: SharedLink
  ) => void;
}

export default function SharedLinks({
  links = [],

  onOpen,
}: SharedLinksProps) {
  return (
    <div
      className="
        border-b
        border-zinc-800

        p-4
      "
    >
      {/* Header */}

      <div
        className="
          mb-4

          flex
          items-center
          gap-2
        "
      >
        <Link2
          size={16}
          className="
            text-zinc-400
          "
        />

        <h3
          className="
            text-sm
            font-semibold
            text-white
          "
        >
          Shared Links
        </h3>
      </div>

      {/* Empty State */}

      {links.length ===
        0 && (
        <div
          className="
            rounded-xl

            border
            border-dashed
            border-zinc-800

            p-6

            text-center
          "
        >
          <Link2
            size={28}
            className="
              mx-auto
              mb-2

              text-zinc-700
            "
          />

          <p
            className="
              text-xs
              text-zinc-500
            "
          >
            No shared links
          </p>
        </div>
      )}

      {/* Links */}

      {links.length >
        0 && (
        <div
          className="
            space-y-2
          "
        >
          {links
            .slice(0, 8)
            .map(
              (
                link
              ) => (
                <button
                  key={
                    link._id
                  }
                  type="button"
                  onClick={() =>
                    onOpen?.(
                      link
                    )
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-3

                    rounded-xl

                    border
                    border-zinc-800

                    p-3

                    text-left

                    transition-colors

                    hover:bg-zinc-900
                  "
                >
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0

                      items-center
                      justify-center

                      rounded-xl

                      bg-zinc-900
                    "
                  >
                    <Link2
                      size={16}
                      className="
                        text-zinc-400
                      "
                    />
                  </div>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        truncate

                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {link.title ||
                        link.url}
                    </p>

                    <p
                      className="
                        truncate

                        text-xs
                        text-zinc-500
                      "
                    >
                      {link.domain ||
                        link.url}
                    </p>
                  </div>

                  <ExternalLink
                    size={14}
                    className="
                      shrink-0

                      text-zinc-500
                    "
                  />
                </button>
              )
            )}
        </div>
      )}
    </div>
  );
}
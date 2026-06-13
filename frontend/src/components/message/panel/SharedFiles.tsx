// src/components/message/panel/SharedFiles.tsx

"use client";

import {
  FileText,
  FileSpreadsheet,
  FileArchive,
  Download,
} from "lucide-react";

interface SharedFile {
  _id: string;

  filename: string;

  size?: number;

  url?: string;

  extension?: string;
}

interface SharedFilesProps {
  files?: SharedFile[];

  onFileClick?: (
    file: SharedFile
  ) => void;
}

export default function SharedFiles({
  files = [],

  onFileClick,
}: SharedFilesProps) {
  const getIcon = (
    extension?: string
  ) => {
    const ext =
      extension?.toLowerCase();

    if (
      [
        "xlsx",
        "xls",
        "csv",
      ].includes(
        ext || ""
      )
    ) {
      return (
        <FileSpreadsheet
          size={16}
        />
      );
    }

    if (
      [
        "zip",
        "rar",
        "7z",
      ].includes(
        ext || ""
      )
    ) {
      return (
        <FileArchive
          size={16}
        />
      );
    }

    return (
      <FileText
        size={16}
      />
    );
  };

  const formatSize = (
    size?: number
  ) => {
    if (!size) {
      return "-";
    }

    const kb =
      size / 1024;

    if (
      kb < 1024
    ) {
      return `${kb.toFixed(
        1
      )} KB`;
    }

    return `${(
      kb / 1024
    ).toFixed(1)} MB`;
  };

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
        <FileText
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
          Shared Files
        </h3>
      </div>

      {/* Empty */}

      {files.length ===
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
          <FileText
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
            No shared files
          </p>
        </div>
      )}

      {/* Files */}

      {files.length >
        0 && (
        <div
          className="
            space-y-2
          "
        >
          {files
            .slice(0, 8)
            .map(
              (
                file
              ) => (
                <button
                  key={
                    file._id
                  }
                  type="button"
                  onClick={() =>
                    onFileClick?.(
                      file
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

                      text-zinc-400
                    "
                  >
                    {getIcon(
                      file.extension
                    )}
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
                      {
                        file.filename
                      }
                    </p>

                    <p
                      className="
                        text-xs
                        text-zinc-500
                      "
                    >
                      {formatSize(
                        file.size
                      )}
                    </p>
                  </div>

                  <Download
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
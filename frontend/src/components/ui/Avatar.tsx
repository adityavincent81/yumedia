"use client";

import Image from "next/image";

interface AvatarProps {
  src?: string | null;

  alt?: string;

  size?: "sm" | "md" | "lg" | "xl";

  online?: boolean;

  className?: string;
}

export default function Avatar({
  src,
  alt = "User",
  size = "md",
  online = false,
  className = "",
}: AvatarProps) {
  const sizes = {
    sm: 32,
    md: 40,
    lg: 56,
    xl: 96,
  };

  const dimension = sizes[size];

  const initials = alt
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={`relative inline-flex ${className}`}
      style={{
        width: dimension,
        height: dimension,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={dimension}
          height={dimension}
          className="
            rounded-full
            object-cover
            border
            border-zinc-800
          "
        />
      ) : (
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            rounded-full
            border
            border-zinc-800
            bg-zinc-900
            font-semibold
            text-zinc-300
          "
        >
          {initials}
        </div>
      )}

      {online && (
        <span
          className="
            absolute
            bottom-0
            right-0
            h-3
            w-3
            rounded-full
            border-2
            border-zinc-950
            bg-green-500
          "
        />
      )}
    </div>
  );
}
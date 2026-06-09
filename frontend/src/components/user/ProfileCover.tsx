import Image from "next/image";

interface ProfileCoverProps {
  coverUrl?: string | null;

  className?: string;

  height?: number;
}

export default function ProfileCover({
  coverUrl,
  className = "",
  height = 240,
}: ProfileCoverProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-muted ${className}`}
      style={{
        height,
      }}
    >
      {coverUrl ? (
        <Image
          src={coverUrl}
          alt="Profile Cover"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-sm text-muted-foreground">
            No Cover Image
          </span>
        </div>
      )}
    </div>
  );
}
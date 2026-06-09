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
      className={`relative w-full overflow-hidden ${className}`}
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
        <div
          className="
            h-full
            w-full

            bg-gradient-to-br
            from-cyan-600/30
            via-slate-900
            to-orange-600/30
          "
        >
          {/* Glow kiri */}
          <div
            className="
              absolute
              -left-20
              -top-20

              h-60
              w-60

              rounded-full
              bg-cyan-500/20

              blur-3xl
            "
          />

          {/* Glow kanan */}
          <div
            className="
              absolute
              -bottom-20
              -right-20

              h-60
              w-60

              rounded-full
              bg-orange-500/20

              blur-3xl
            "
          />
        </div>
      )}
    </div>
  );
}
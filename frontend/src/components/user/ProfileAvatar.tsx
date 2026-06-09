import Image from "next/image";

interface ProfileAvatarProps {
  avatarUrl?: string | null;

  fullName: string;

  size?: number;

  className?: string;
}

export default function ProfileAvatar({
  avatarUrl,
  fullName,
  size = 120,
  className = "",
}: ProfileAvatarProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-full border bg-muted ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={fullName}
          fill
          className="object-cover"
          sizes={`${size}px`}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold">
          {fullName.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
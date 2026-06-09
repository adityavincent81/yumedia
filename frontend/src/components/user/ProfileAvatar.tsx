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
  const imageSrc =
    avatarUrl &&
    avatarUrl.trim() !== ""
      ? avatarUrl
      : "/assets/logo/avatar.png";

  return (
    <div
      className={`relative overflow-hidden rounded-full border bg-muted ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <Image
        src={imageSrc}
        alt={fullName}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  );
}
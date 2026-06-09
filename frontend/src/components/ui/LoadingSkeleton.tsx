interface SkeletonProps {
  className?: string;
}

function Skeleton({
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse
        rounded-lg
        bg-zinc-800
        ${className}
      `}
    />
  );
}

export function SkeletonAvatar({
  className = "",
}: SkeletonProps) {
  return (
    <Skeleton
      className={`
        h-10
        w-10
        rounded-full
        ${className}
      `}
    />
  );
}

export function SkeletonText({
  className = "",
}: SkeletonProps) {
  return (
    <Skeleton
      className={`
        h-4
        w-full
        ${className}
      `}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />

        <div className="flex-1 space-y-2">
          <SkeletonText className="w-32" />

          <SkeletonText className="w-24" />
        </div>
      </div>

      <SkeletonText />

      <SkeletonText className="w-5/6" />

      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-2xl" />

      <div className="px-4">
        <SkeletonAvatar className="h-24 w-24" />

        <div className="mt-4 space-y-2">
          <SkeletonText className="w-48" />

          <SkeletonText className="w-32" />

          <SkeletonText className="w-full" />

          <SkeletonText className="w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
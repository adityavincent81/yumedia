import { ReactNode } from "react";

interface EmptyStateProps {
  title: string;

  description?: string;

  icon?: ReactNode;

  action?: ReactNode;

  className?: string;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900
        px-6
        py-12
        text-center
        ${className}
      `}
    >
      {icon && (
        <div
          className="
            mb-4
            text-zinc-400
          "
        >
          {icon}
        </div>
      )}

      <h3
        className="
          text-lg
          font-semibold
          text-white
        "
      >
        {title}
      </h3>

      {description && (
        <p
          className="
            mt-2
            max-w-md
            text-sm
            text-zinc-400
          "
        >
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
interface BadgeProps {
  children: React.ReactNode;

  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";

  size?: "sm" | "md";

  className?: string;
}

export default function Badge({
  children,
  variant = "primary",
  size = "md",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    primary:
      "bg-blue-500/15 text-blue-400 border border-blue-500/20",

    secondary:
      "bg-zinc-800 text-zinc-300 border border-zinc-700",

    success:
      "bg-green-500/15 text-green-400 border border-green-500/20",

    warning:
      "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",

    danger:
      "bg-red-500/15 text-red-400 border border-red-500/20",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",

    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-medium
        whitespace-nowrap
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
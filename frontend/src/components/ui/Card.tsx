import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;

  className?: string;

  hover?: boolean;

  variant?: "default" | "bordered" | "ghost";

  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  className = "",
  hover = false,
  variant = "default",
  padding = "md",
}: CardProps) {
  const variantClasses = {
    default:
      "bg-zinc-900 border border-zinc-800",

    bordered:
      "bg-zinc-950 border border-zinc-700",

    ghost:
      "bg-transparent border border-transparent",
  };

  const paddingClasses = {
    none: "",

    sm: "p-3",

    md: "p-4",

    lg: "p-6",
  };

  return (
    <div
      className={`
        rounded-2xl
        transition-all
        duration-200
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${
          hover
            ? "hover:border-zinc-700 hover:bg-zinc-800/50"
            : ""
        }
        ${className}
      `}
    >
      {children}
    </div>
  );
}
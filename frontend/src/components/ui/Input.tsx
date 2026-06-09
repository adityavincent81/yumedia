import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;

  error?: string;

  helperText?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,
      error,
      helperText,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="block text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}

        <input
          ref={ref}
          className={`
            w-full
            rounded-xl
            border
            bg-zinc-900
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition-all
            duration-200

            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-zinc-700 focus:border-blue-500"
            }

            placeholder:text-zinc-500

            ${className}
          `}
          {...props}
        />

        {error ? (
          <p className="text-sm text-red-400">
            {error}
          </p>
        ) : helperText ? (
          <p className="text-sm text-zinc-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
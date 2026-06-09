/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { useLogin } from "@/features/auth/hooks/useLogin";

const loginSchema = z.object({
  nim: z
    .string()
    .min(1, "NIM is required"),

  password: z
    .string()
    .min(1, "Password is required"),
});

type LoginFormValues =
  z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();

  const { mutateAsync, isPending } =
    useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    values: LoginFormValues
  ) => {
    try {
      await mutateAsync(values);

      toast.success(
        "Login successful"
      );

      router.push("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-white">
          Sign In
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Welcome back to Yumedia.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* NIM */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            NIM
          </label>

          <input
            type="text"
            placeholder="Enter your NIM"
            {...register("nim")}
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
            "
          />

          {errors.nim && (
            <p className="mt-1 text-sm text-red-400">
              {errors.nim.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            className="
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-3
              text-white
              outline-none
              transition
              focus:border-cyan-500
            "
          />

          {errors.password && (
            <p className="mt-1 text-sm text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="
              text-sm
              text-cyan-400
              transition
              hover:text-cyan-300
            "
          >
            Forgot Password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-orange-500
            py-3
            font-semibold
            text-white
            transition
            hover:opacity-90
            disabled:opacity-50
          "
        >
          {isPending
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="
            font-medium
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
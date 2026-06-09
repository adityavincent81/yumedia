/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Button } from "@/components/ui";
import { Input } from "@/components/ui";

import Image from "next/image";
import { useState } from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";

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

  const [showPassword, setShowPassword] =
  useState(false);

  return (
    <div className="space-y-8">
      {/* Logo */}
      <div className="flex justify-center">
  <Image
    src="/assets/logo/UYP-Logo.png"
    alt="Universitas Yudharta Pasuruan"
    width={72}
    height={72}
    className="object-contain"
  />
</div>

      {/* Header */}
      <div className="text-center">
        <h1
          className="
            text-3xl
            font-bold
            text-white
          "
        >
          Welcome Back
        </h1>

        <p
  className="
    mt-2
    text-sm
    text-zinc-400
  "
>
  Access your account and
  continue your campus journey.
</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="NIM"
          placeholder="Enter your NIM"
          error={errors.nim?.message}
          {...register("nim")}
        />

        <div>
  <label
    className="
      mb-2
      block
      text-sm
      font-medium
      text-zinc-300
    "
  >
    Password
  </label>

  <div className="relative">
    <input
      type={
        showPassword
          ? "text"
          : "password"
      }
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
        pr-12

        text-white

        outline-none

        transition

        focus:border-cyan-500
      "
    />

    <button
      type="button"
      onClick={() =>
        setShowPassword(
          !showPassword
        )
      }
      className="
        absolute
        right-3
        top-1/2

        -translate-y-1/2

        text-zinc-400

        transition

        hover:text-white
      "
    >
      {showPassword ? (
        <EyeOff size={18} />
      ) : (
        <Eye size={18} />
      )}
    </button>
  </div>

  <div className="mt-1 flex justify-between">
    <span
      className="
        text-xs
        text-zinc-500
      "
    >
      Enter your account password
    </span>

    {errors.password && (
      <span
        className="
          text-xs
          text-red-400
        "
      >
        {
          errors.password
            .message
        }
      </span>
    )}
  </div>
</div>

        <div className="flex justify-end">
          <button
            type="button"
            className="
              text-sm
              text-cyan-400
              transition-all
              duration-200
              hover:text-cyan-300
            "
          >
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          loading={isPending}
          fullWidth
          size="lg"
        >
          {isPending
            ? "Signing In..."
            : "Sign In"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-800" />
        </div>

        <div className="relative flex justify-center">
          <span
            className="
              bg-[#0b1120]
              px-4
              text-xs
              uppercase
              tracking-wider
              text-zinc-500
            "
          >
            Campus Access
          </span>
        </div>
      </div>

      {/* Footer */}
      <div
        className="
          text-center
          text-sm
          text-zinc-400
        "
      >
        Don't have an account?{" "}
        <Link
          href="/register"
          className="
            font-medium
            text-cyan-400
            transition-colors
            hover:text-cyan-300
          "
        >
          Create Account
        </Link>
      </div>
    </div>
  );
}
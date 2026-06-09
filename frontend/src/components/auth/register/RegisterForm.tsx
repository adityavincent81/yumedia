"use client";

import Image from "next/image";
import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import {
  Button,
  Input,
} from "@/components/ui";

import { useRegister } from "@/features/auth/hooks/useRegister";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(
      3,
      "Full name must be at least 3 characters"
    ),

  nim: z
    .string()
    .min(5, "NIM is invalid"),

  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must be at least 8 characters"
    ),
});

type RegisterFormValues =
  z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const { mutateAsync, isPending } =
    useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(
      registerSchema
    ),
  });

  const onSubmit = async (
    values: RegisterFormValues
  ) => {
    try {
      await mutateAsync(values);

      toast.success(
        "Account created successfully."
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
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
          Join Yumedia
        </h1>

        <p
          className="
            mt-2
            text-sm
            text-zinc-400
          "
        >
          Create your account and
          start connecting with the
          campus community.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-5"
      >
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          error={
            errors.fullName?.message
          }
          {...register("fullName")}
        />

        <Input
          label="NIM"
          placeholder="Enter your NIM"
          error={errors.nim?.message}
          {...register("nim")}
        />

        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          error={
            errors.email?.message
          }
          {...register("email")}
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
      placeholder="Create a password"
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
      Minimum 8 characters
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

        <Button
          type="submit"
          loading={isPending}
          fullWidth
          size="lg"
        >
          {isPending
            ? "Creating Account..."
            : "Create Account"}
        </Button>
      </form>

      {/* Terms */}
      <p
        className="
          text-center
          text-xs
          leading-relaxed
          text-zinc-500
        "
      >
        By creating an account,
        you agree to our Terms of
        Service and Privacy Policy.
      </p>

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
            Student Registration
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
        Already have an account?{" "}
        <Link
          href="/login"
          className="
            font-medium
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
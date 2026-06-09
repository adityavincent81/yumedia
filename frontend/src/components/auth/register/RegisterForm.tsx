"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { useRegister } from "@/features/auth/hooks/useRegister";

const registerSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

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
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (
    values: RegisterFormValues
  ) => {
    try {
      await mutateAsync(values);

      toast.success(
        "Account created successfully. Please sifn in."
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">
          Create Account
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Join Yumedia and connect
          with your campus community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
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

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">
              {errors.fullName.message}
            </p>
          )}
        </div>

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

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
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

          {errors.email && (
            <p className="mt-1 text-sm text-red-400">
              {errors.email.message}
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
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400">
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
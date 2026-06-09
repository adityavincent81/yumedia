"use client";

import { GraduationCap } from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ClassInfoCard() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-4
        backdrop-blur-md
      "
    >
      <div className="flex items-center gap-2">
        <GraduationCap
          size={18}
          className="text-zinc-300"
        />

        <h2 className="font-semibold text-zinc-100">
          Informasi Akademik
        </h2>
      </div>

      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="text-zinc-500">
            Jurusan
          </p>

          <p className="font-medium text-zinc-200">
            {(
              user as {
                major?: string;
              }
            )?.major ??
              "-"}
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Kelas
          </p>

          <p className="font-medium text-zinc-200">
            {(
              user as {
                className?: string;
              }
            )?.className ??
              "-"}
          </p>
        </div>

        <div>
          <p className="text-zinc-500">
            Semester
          </p>

          <p className="font-medium text-zinc-200">
            {(
              user as {
                semester?: string;
              }
            )?.semester ??
              "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
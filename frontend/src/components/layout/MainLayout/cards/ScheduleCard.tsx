"use client";

import { CalendarDays } from "lucide-react";

export default function ScheduleCard() {
  const schedules = [
    {
      id: 1,
      title: "Pemrograman Web",
      time: "Hari ini • 13:00",
    },
    {
      id: 2,
      title: "Basis Data",
      time: "Besok • 09:00",
    },
    {
      id: 3,
      title: "Deadline Tugas UI/UX",
      time: "Jumat • 23:59",
    },
  ];

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
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <CalendarDays
          size={18}
          className="text-zinc-300"
        />

        <h2 className="font-semibold text-zinc-100">
          Upcoming Schedule
        </h2>
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-3">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="
              rounded-xl
              border
              border-zinc-800
              bg-zinc-800/30
              p-3
            "
          >
            <p className="text-sm font-medium text-white">
              {schedule.title}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              {schedule.time}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <button
        className="
          mt-4
          w-full
          rounded-xl
          border
          border-zinc-700
          py-2
          text-sm
          text-zinc-300
          transition
          hover:bg-zinc-800
          hover:text-white
        "
      >
        View All Schedule
      </button>
    </div>
  );
}
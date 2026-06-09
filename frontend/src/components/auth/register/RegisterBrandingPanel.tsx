"use client";

import Image from "next/image";

import YudhartaTyping from "@/components/shared/YudhartaTyping";

export default function RegisterBrandingPanel() {
  return (
    <div
      className="
        relative
        flex
        min-h-[950px]
        w-full
        flex-col
        text-white
      "
    >
      {/* Top Right */}
      <div className="absolute right-0 top-0 text-right">
        <YudhartaTyping />

        <div className="mt-6 flex items-center justify-end gap-4">
          <div>
            <h2
              className="
                text-xl
                font-bold
                tracking-tight
              "
            >
              Yumedia
            </h2>

            <p
              className="
                text-sm
                text-zinc-500
              "
            >
              Campus Social Network
            </p>
          </div>

          <Image
            src="/assets/logo/UYP-Logo.png"
            alt="Universitas Yudharta Pasuruan"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </div>

      {/* Center Content */}
      <div
        className="
          flex
          flex-1
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        <h1
          className="
            max-w-2xl

            text-6xl
            font-bold
            leading-tight
            tracking-tight
          "
        >
          Join The
          <span
            className="
              bg-gradient-to-r
              from-cyan-400
              to-orange-400

              bg-clip-text
              text-transparent
            "
          >
            {" "}
            Community
          </span>
        </h1>

        <h2
          className="
            mt-2
            text-4xl
            font-semibold
            text-zinc-300
          "
        >
          Start Your Academic Journey
        </h2>

        <p
          className="
            mt-8
            max-w-xl

            text-lg
            leading-relaxed

            text-zinc-500
          "
        >
          Create your identity,
          connect with classmates,
          discover communities,
          and become part of a growing
          digital campus ecosystem.
        </p>
      </div>

      {/* Bottom */}
      <div
        className="
          mt-12

          flex
          justify-end
          items-center
          gap-8

          text-sm
          text-zinc-500
        "
      >
        <span>Students</span>

        <span className="h-1 w-1 rounded-full bg-zinc-600" />

        <span>Organizations</span>

        <span className="h-1 w-1 rounded-full bg-zinc-600" />

        <span>Communities</span>
      </div>
    </div>
  );
}
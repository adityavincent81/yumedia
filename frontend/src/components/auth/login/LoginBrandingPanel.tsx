"use client";

import Image from "next/image";
import YudhartaTyping from "@/components/shared/YudhartaTyping";

export default function LoginBrandingPanel() {
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
      {/* Top Left */}
<div className="absolute left-0 top-0">
  <YudhartaTyping />

  <div className="mt-6 flex items-center gap-4">
    <Image
      src="/assets/logo/UYP-Logo.png"
      alt="Universitas Yudharta Pasuruan"
      width={56}
      height={56}
      className="object-contain"
    />

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
    Built For
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
      Students
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
    Designed For Community
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
    Connect with classmates,
    organizations, academic groups,
    and campus activities through
    one modern social platform.
  </p>
</div>
<div
  className="
    mt-12

    flex
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
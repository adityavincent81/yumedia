"use client";

interface AuthContainerProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
}

export default function AuthContainer({
  leftPanel,
  rightPanel,
}: AuthContainerProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712]">
      {/* Background Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),
          linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:40px_40px]
        "
      />

      {/* Orange Glow */}
      <div
        className="
          absolute
          -top-32
          -left-32
          h-[500px]
          w-[500px]
          rounded-full
          bg-orange-500/20
          blur-[120px]
        "
      />

      {/* Cyan Glow */}
      <div
        className="
          absolute
          bottom-0
          right-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/20
          blur-[120px]
        "
      />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side */}
        <section
          className="
            hidden
            lg:flex
            lg:w-1/2
            items-center
            justify-center
            px-12
          "
        >
          <div className="w-full max-w-xl">
            {leftPanel}
          </div>
        </section>

        {/* Right Side */}
        <section
          className="
            flex
            w-full
            lg:w-1/2
            items-center
            justify-center
            px-6
            py-10
          "
        >
          <div
            className="
              w-full
              max-w-md

              rounded-3xl
              border
              border-white/10

              bg-white/5
              backdrop-blur-xl

              p-8
              shadow-2xl
            "
          >
            {rightPanel}
          </div>
        </section>
      </div>
    </main>
  );
}
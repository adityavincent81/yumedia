"use client";

interface AuthContainerProps {
  variant?: "login" | "register";
  formPanel: React.ReactNode;
  brandingPanel: React.ReactNode;
}

export default function AuthContainer({
  variant = "login",
  formPanel,
  brandingPanel,
}: AuthContainerProps) {
  const isLogin = variant === "login";

  const FormSection = (
    <section className="w-full lg:w-1/2">
      <div
        className="
          mx-auto
          w-full
          max-w-md

          rounded-3xl
          border
          border-white/10

          bg-white/5
          p-8

          backdrop-blur-xl
          shadow-2xl
        "
      >
        {formPanel}
      </div>
    </section>
  );

  const BrandingSection = (
    <section
      className="
        hidden
        lg:flex
        lg:w-1/2
        items-center
      "
    >
      {brandingPanel}
    </section>
  );

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

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-screen
          max-w-full
          items-center
          px-6
          lg:px-10
        "
      >
        <div
          className="
            flex
            w-full
            flex-col
            items-center
            gap-16
            lg:flex-row
          "
        >
          {isLogin ? (
            <>
              {/* LOGIN */}
              {BrandingSection}
              {FormSection}
            </>
          ) : (
            <>
              {/* REGISTER */}
              {FormSection}
              {BrandingSection}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
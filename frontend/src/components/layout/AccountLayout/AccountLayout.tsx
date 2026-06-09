"use client";

import AccountSidebar from "./AccountSidebar";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({
  children,
}: AccountLayoutProps) {
  return (
    <div
      className="
        min-h-screen

        bg-black
        text-white
      "
    >
      <div
        className="
          mx-auto
          flex
          max-w-8xl
        "
      >
        <AccountSidebar />

        <main
          className="
            min-h-screen
            flex-1

            px-8
            py-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
"use client";

import Sidebar from "@/components/layout/MainLayout/Sidebar";
import MobileNavbar from "@/components/layout/MainLayout/MobileNavbar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Sidebar />

      <div className="lg:pl-16">
        <main
          className="
            mx-auto
            min-h-screen
            max-w-6xl

            px-4
            py-4

            md:px-6
            lg:px-8

            pb-24
            lg:pb-8
          "
        >
          {children}
        </main>
      </div>

      <MobileNavbar />
    </div>
  );
}
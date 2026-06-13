"use client";

import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="lg:pl-16">
        <div className="mx-auto min-h-screen max-w-[1800px]">
          <main
            className="
              min-w-0
              px-4
              py-4
              pb-24
              md:px-6
              lg:px-8
              lg:pb-8
            "
          >
            {children}
          </main>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <MobileNavbar />
    </div>
  );
}
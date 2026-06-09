"use client";

import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";
import MobileNavbar from "./MobileNavbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* DESKTOP SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="lg:pl-16">
        <div className="mx-auto flex min-h-screen max-w-[1800px]">
          
          {/* FEED AREA */}
          <main
            className="
              flex-1
              min-w-0
              border-zinc-800
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

          {/* RIGHT SIDEBAR */}
          <RightSidebar />
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <MobileNavbar />
    </div>
  );
}
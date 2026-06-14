"use client";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { Info } from "lucide-react";

import SidebarItem from "./SidebarItem";

import SidebarUser from "./sidebar/SidebarUser";
import SidebarSection from "./sidebar/SidebarSection";
import SidebarMoreButton from "./sidebar/SidebarMoreButton";

import {
  navigationItems,
  utilityItems,
} from "./sidebar/sidebar.data";

import { useAuthStore } from "@/features/auth/store/auth.store";

import CreatePostModal from "@/components/post/CreatePostModal";

import { usePostStore } from "@/features/post/store/post.store";

export default function Sidebar() {
  const pathname = usePathname();

  const [isMoreOpen, setIsMoreOpen] =
    useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const openCreatePost =
    usePostStore(
      (state) =>
        state.openCreatePost
    );

  return (
    <>
      <CreatePostModal />

      {/* Global Overlay */}
      {isMoreOpen && (
        <button
          type="button"
          onClick={() =>
            setIsMoreOpen(false)
          }
          className="
            fixed
            inset-0
            z-40
          "
        />
      )}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen

          border-r
          border-zinc-800

          bg-zinc-950/90

          backdrop-blur-md

          lg:block
        "
      >
        <div
          className={`
            group

            h-full

            overflow-y-auto
            overflow-x-hidden

            transition-[width]
            duration-300

            ${
              isMoreOpen
                ? "w-64"
                : "w-16 hover:w-64"
            }
          `}
        >
          <div className="flex min-h-full flex-col">
            <SidebarUser
              fullName={
                user?.fullName
              }
              username={
                user?.username
              }
              avatarUrl={
                user?.avatar?.url ??
                null
              }
            />

            <div className="p-2">
              <SidebarSection
                title="Navigation"
                items={
                  navigationItems
                }
                pathname={
                  pathname
                }
              />
            </div>

            <div
              className="
                border-t
                border-zinc-800

                p-2
              "
            >
              <SidebarSection
                title="Utility"
                items={
                  utilityItems
                }
                pathname={
                  pathname
                }
              />
            </div>

            <div
              className="
                mt-auto

                border-t
                border-zinc-800

                p-2
              "
            >
              <div className="space-y-1">
                <div
                  className="
                    px-3
                    py-2

                    opacity-0

                    transition-opacity
                    duration-200

                    group-hover:opacity-100
                  "
                >
                  <p
                    className="
                      text-[10px]
                      font-semibold
                      uppercase

                      tracking-[0.2em]

                      text-zinc-500
                    "
                  >
                    MORE
                  </p>
                </div>

                <SidebarMoreButton
                  open={isMoreOpen}
                  onOpen={() =>
                    setIsMoreOpen(
                      true
                    )
                  }
                  onClose={() =>
                    setIsMoreOpen(
                      false
                    )
                  }
                />

                <SidebarItem
                  pathname={pathname}
                  item={{
                    href: "/about",
                    label: "Info",
                    icon: Info,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
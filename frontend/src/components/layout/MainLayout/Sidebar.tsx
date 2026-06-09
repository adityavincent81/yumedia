"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Home,
  Compass,
  Bell,
  MessageCircle,
  SquarePen,
  Bookmark,
  User,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import { useLogout } from "@/features/auth/hooks/useLogout";

import SidebarItem from "./SidebarItem";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/explore",
    label: "Explore",
    icon: Compass,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/messages",
    label: "Messages",
    icon: MessageCircle,
  },
  {
    href: "/create",
    label: "Create Post",
    icon: SquarePen,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: Bookmark,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const logout =
    useLogout();

  const handleLogout =
    async () => {
      try {
        await logout.mutateAsync();

        clearUser();

        router.replace("/login");
      } catch (error) {
        console.error(
          "Logout failed",
          error
        );
      }
    };

  return (
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
        className="
          group
          h-full
          w-16
          overflow-hidden
          transition-[width]
          duration-300
          hover:w-64
        "
      >
        <div className="flex h-full flex-col">
          {/* USER */}
          <div className="border-b border-zinc-800 p-3">
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-zinc-800
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {user?.fullName?.charAt(0) ??
                  "U"}
              </div>

              <div
                className="
                  min-w-0
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                <p className="truncate text-sm font-medium text-white">
                  {user?.fullName ??
                    "User"}
                </p>

                <p className="truncate text-xs text-zinc-400">
                  @
                  {user?.username ??
                    "username"}
                </p>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 space-y-1 p-2">
            {navItems.map(
              ({
                href,
                label,
                icon,
              }) => (
                <SidebarItem
                  key={href}
                  href={href}
                  label={label}
                  icon={icon}
                  active={
                    pathname === href
                  }
                />
              )
            )}
          </nav>

          {/* BOTTOM */}
          <div className="border-t border-zinc-800 p-2">
            <SidebarItem
              href="/profile"
              label="Profile"
              icon={User}
              active={pathname.startsWith(
                "/profile"
              )}
            />

            <button
              onClick={handleLogout}
              disabled={
                logout.isPending
              }
              className="
                mt-1
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-3
                text-zinc-400
                transition-all
                hover:bg-red-500/10
                hover:text-red-400
              "
            >
              <LogOut
                size={20}
                className="shrink-0"
              />

              <span
                className="
                  whitespace-nowrap
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
              >
                {logout.isPending
                  ? "Logging out..."
                  : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
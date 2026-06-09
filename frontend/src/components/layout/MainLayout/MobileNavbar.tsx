"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Compass,
  SquarePen,
  MessageCircle,
  User,
} from "lucide-react";

const navItems = [
  {
    href: "/",
    icon: Home,
    label: "Home",
  },
  {
    href: "/explore",
    icon: Compass,
    label: "Explore",
  },
  {
    href: "/create",
    icon: SquarePen,
    label: "Create",
  },
  {
    href: "/messages",
    icon: MessageCircle,
    label: "Messages",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profile",
  },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-zinc-800
        bg-zinc-950/95
        backdrop-blur-md
        lg:hidden
      "
    >
      <div
        className="
          flex
          items-center
          justify-around
          px-2
          py-2
        "
      >
        {navItems.map(
          ({
            href,
            icon: Icon,
            label,
          }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(
                    href
                  );

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-1
                  rounded-lg
                  px-3
                  py-2
                  transition-colors

                  ${
                    active
                      ? "text-white"
                      : "text-zinc-500"
                  }
                `}
              >
                <Icon size={22} />

                <span
                  className="
                    text-[10px]
                    font-medium
                  "
                >
                  {label}
                </span>
              </Link>
            );
          }
        )}
      </div>
    </nav>
  );
}
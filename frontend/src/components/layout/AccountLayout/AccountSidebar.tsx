"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { Search } from "lucide-react";

import { accountMenuSections } from "./account-menu.data";

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="
        fixed
        top-0

        h-screen
        w-[320px]

        shrink-0

        border-r
        border-white/10

        bg-black
      "
    >
      <div
        className="
          flex
          h-full
          flex-col
        "
      >
        {/* Header */}
        <div className="px-4 pt-8">
          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Settings
          </h1>
        </div>

        {/* Search */}
        <div className="px-4 pt-6">
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-zinc-500
              "
            />

            <input
              type="text"
              placeholder="Search"
              className="
                h-14
                w-full

                rounded-2xl

                border
                border-white/5

                bg-white/5

                pl-12
                pr-4

                text-white
                placeholder:text-zinc-500

                outline-none

                transition-all

                focus:border-cyan-500/50
                focus:bg-white/[0.07]
              "
            />
          </div>
        </div>

        {/* Scrollable Menu */}
        <div
          className="
            mt-6
            flex-1

            overflow-y-auto

            px-4
            pb-8
          "
        >
          <div className="space-y-8">
            {accountMenuSections.map(
              (section) => (
                <div
                  key={section.title}
                >
                  <h2
                    className="
                      mb-3

                      text-xs
                      font-semibold
                      uppercase

                      tracking-[0.15em]

                      text-zinc-500
                    "
                  >
                    {section.title}
                  </h2>

                  <div className="space-y-1">
                    {section.items.map(
                      ({
                        href,
                        label,
                        icon: Icon,
                      }) => {
                        const active =
                          pathname ===
                          href;

                        return (
                          <Link
                            key={href}
                            href={href}
                            className={`
                              flex
                              items-center
                              gap-3

                              rounded-2xl

                              px-4
                              py-3

                              transition-all
                              duration-200

                              ${
                                active
                                  ? `
                                    bg-white/10
                                    text-white
                                  `
                                  : `
                                    text-zinc-400
                                    hover:bg-white/5
                                    hover:text-white
                                  `
                              }
                            `}
                          >
                            <Icon
                              size={20}
                              className="shrink-0"
                            />

                            <span className="font-medium">
                              {label}
                            </span>
                          </Link>
                        );
                      }
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
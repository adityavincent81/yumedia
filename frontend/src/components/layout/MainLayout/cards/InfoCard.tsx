"use client";

import Link from "next/link";

export default function InfoCard() {
  const links = [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Privacy",
      href: "/privacy",
    },
    {
      label: "Terms",
      href: "/terms",
    },
    {
      label: "Help",
      href: "/help",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];

  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-4
        backdrop-blur-md
      "
    >
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {links.map((link, index) => (
          <div
            key={link.href}
            className="flex items-center"
          >
            <Link
              href={link.href}
              className="
                text-xs
                text-zinc-500
                transition-colors
                hover:text-zinc-300
              "
            >
              {link.label}
            </Link>

            {index <
              links.length - 1 && (
              <span className="mx-2 text-zinc-700">
                •
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 border-t border-zinc-800 pt-3">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()}{" "}
          Vincentery. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
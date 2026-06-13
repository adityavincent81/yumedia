import type { LucideIcon } from "lucide-react";

import {
  Home,
  PlaySquare,
  Compass,
  SquarePen,
  Bell,
  Bookmark,
  MessageCircle,
  Users,
  User,
  MoreHorizontal,
  Info,
  Settings,
  Activity,
  Palette,
  Flag,
  RefreshCcw,
  LogOut,
} from "lucide-react";

export interface SidebarMenuItem {
  label: string;

  icon: LucideIcon;

  href?: string;

  action?: string;
}

export interface SidebarMoreMenuItem {
  label: string;

  icon: LucideIcon;

  href?: string;

  action?: string;

  danger?: boolean;
}

export const navigationItems: SidebarMenuItem[] =
  [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },

    {
      href: "/videos",
      label: "Videos",
      icon: PlaySquare,
    },

    {
      href: "/explore",
      label: "Explore",
      icon: Compass,
    },

    {
      label: "Create",
      icon: SquarePen,
      action: "create-post",
    },

    {
      href: "/notifications",
      label: "Notifications",
      icon: Bell,
    },

    {
      href: "/collections",
      label: "Collections",
      icon: Bookmark,
    },
  ];

export const utilityItems: SidebarMenuItem[] =
  [
    {
      href: "/messages",
      label: "Messages",
      icon: MessageCircle,
    },

    {
      href: "/communities",
      label: "Communities",
      icon: Users,
    },

    {
      action: "profile",
      label: "Profile",
      icon: User,
    },
  ];

/**
 * Sidebar Item
 */
export const moreItems: SidebarMenuItem[] =
  [
    {
      action: "more",
      label: "More",
      icon: MoreHorizontal,
    },

    {
      href: "/about",
      label: "Info",
      icon: Info,
    },
  ];

/**
 * More Modal Content
 */
export const moreModalSections = [
  {
    title: "Account",

    items: [
      {
        label: "Settings",
        icon: Settings,
        href: "/accounts/edit",
      },

      {
        label: "Your Activity",
        icon: Activity,
        href: "/activity",
      },

      {
        label:
          "Switch Appearance",
        icon: Palette,
        action: "appearance",
      },

      {
        label:
          "Report a Problem",
        icon: Flag,
        href: "/report",
      },
    ],
  },

  {
    title: "Switch",

    items: [
      {
        label:
          "Switch Accounts",
        icon: RefreshCcw,
        action:
          "switch-account",
      },
    ],
  },

  {
    title: "Account",

    items: [
      {
        label: "Logout",
        icon: LogOut,
        action: "logout",
        danger: true,
      },
    ],
  },
] satisfies {
  title: string;
  items: SidebarMoreMenuItem[];
}[];
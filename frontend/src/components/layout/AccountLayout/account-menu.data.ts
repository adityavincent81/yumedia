import {
  User,
  Bell,
  Shield,
  Ban,
  MapPin,
  MessageCircle,
  AtSign,
  MessageSquare,
  VolumeX,
  SlidersHorizontal,
  Heart,
  Archive,
  Accessibility,
  Languages,
  Globe,
  LifeBuoy,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

export const accountMenuSections = [
  {
    title: "Account",
    items: [
      {
        href: "/accounts/edit",
        label: "Edit Profile",
        icon: User,
      },
      {
        href: "/accounts/notifications",
        label: "Notifications",
        icon: Bell,
      },
    ],
  },

  {
    title: "Privacy",
    items: [
      {
        href: "/accounts/privacy",
        label: "Account Privacy",
        icon: Shield,
      },
      {
        href: "/accounts/blocked",
        label: "Blocked",
        icon: Ban,
      },
      {
        href: "/accounts/story-location",
        label: "Story & Location",
        icon: MapPin,
      },
      {
        href: "/accounts/messages-replies",
        label: "Messages & Story Replies",
        icon: MessageCircle,
      },
      {
        href: "/accounts/tags-mentions",
        label: "Tags & Mentions",
        icon: AtSign,
      },
      {
        href: "/accounts/comments",
        label: "Comments",
        icon: MessageSquare,
      },
      {
        href: "/accounts/muted",
        label: "Muted Accounts",
        icon: VolumeX,
      },
    ],
  },

  {
    title: "Content & Activity",
    items: [
      {
        href: "/accounts/content-preferences",
        label: "Content Preferences",
        icon: SlidersHorizontal,
      },
      {
        href: "/accounts/like-share-counts",
        label: "Like & Share Counts",
        icon: Heart,
      },
      {
        href: "/accounts/archive-download",
        label: "Archiving & Downloading",
        icon: Archive,
      },
    ],
  },

  {
    title: "Accessibility & Language",
    items: [
      {
        href: "/accounts/accessibility",
        label: "Accessibility",
        icon: Accessibility,
      },
      {
        href: "/accounts/language",
        label: "Language",
        icon: Languages,
      },
      {
        href: "/accounts/website-permissions",
        label: "Website Permissions",
        icon: Globe,
      },
    ],
  },

  {
    title: "Support",
    items: [
      {
        href: "/accounts/help",
        label: "Help",
        icon: LifeBuoy,
      },
      {
        href: "/accounts/privacy-center",
        label: "Privacy Center",
        icon: Shield,
      },
      {
        href: "/accounts/account-status",
        label: "Account Status",
        icon: BadgeCheck,
      },
      {
        href: "/accounts/report",
        label: "Report a Problem",
        icon: AlertTriangle,
      },
    ],
  },
];
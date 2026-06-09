export type ProfileTab =
  | "posts"
  | "media"
  | "likes"
  | "collections"
  | "about";

export interface ProfileTabItem {
  id: ProfileTab;

  label: string;
}

export const PROFILE_TABS: ProfileTabItem[] =
  [
    {
      id: "posts",
      label: "Posts",
    },

    {
      id: "media",
      label: "Media",
    },

    {
      id: "likes",
      label: "Likes",
    },

    {
      id: "collections",
      label: "Collections",
    },

    {
      id: "about",
      label: "About",
    },
  ];
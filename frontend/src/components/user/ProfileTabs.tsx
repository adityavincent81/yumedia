"use client";

import {
  PROFILE_TABS,
  type ProfileTab,
} from "@/features/user/constants/profile-tabs";

interface ProfileTabsProps {
  activeTab: ProfileTab;

  onTabChange: (
    tab: ProfileTab
  ) => void;
}

export default function ProfileTabs({
  activeTab,
  onTabChange,
}: ProfileTabsProps) {
  return (
    <div className="border-b">
      <div className="flex items-center overflow-x-auto">
        {PROFILE_TABS.map(
          (tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() =>
                onTabChange(tab.id)
              }
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab ===
                tab.id
                  ? "border-b-2"
                  : ""
              }`}
            >
              {tab.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}
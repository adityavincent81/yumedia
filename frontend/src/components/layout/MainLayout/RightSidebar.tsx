"use client";

import ClassInfoCard from "./cards/ClassInfoCard";
import AccountAndFriendsCard from "./cards/AccountAndFriendsCard";
import ScheduleCard from "./cards/ScheduleCard";
import InfoCard from "./cards/InfoCard";

export default function RightSidebar() {
  return (
    <aside
      className="
        hidden
        xl:block
        w-80
        shrink-0
      "
    >
      <div className="sticky top-4 space-y-4 p-4">
        <ClassInfoCard />

        <AccountAndFriendsCard />

        <ScheduleCard />

        <InfoCard />
      </div>
    </aside>
  );
}
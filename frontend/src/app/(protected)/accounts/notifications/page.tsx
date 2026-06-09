import { Bell } from "lucide-react";

import ComingSoon from "@/components/shared/ComingSoon";

export default function NotificationsPage() {
  return (
    <ComingSoon
      title="Notifications"
      description="this page on a progress,  commingsoon"
      icon={<Bell />}
      phase="Phase 2"
    />
  );
}
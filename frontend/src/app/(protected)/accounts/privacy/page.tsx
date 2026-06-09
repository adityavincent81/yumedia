import { Bell } from "lucide-react";

import ComingSoon from "@/components/shared/ComingSoon";

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="privacy"
      description="this page on a progress,  commingsoon"
      icon={<Bell />}
      phase="Phase 2"
    />
  );
}
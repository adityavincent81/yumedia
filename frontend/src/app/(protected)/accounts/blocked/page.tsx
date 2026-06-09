import { Bell } from "lucide-react";

import ComingSoon from "@/components/shared/ComingSoon";

export default function BlockesPage() {
  return (
    <ComingSoon
      title="CommingSoon"
      description="this page on a progress"
      icon={<Bell />}
      phase="Phase 2"
    />
  );
}
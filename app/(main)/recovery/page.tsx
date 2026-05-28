"use client";

import { PageHeader } from "@/components/PageHeader";
import { RecoveryFlow } from "@/components/recovery/RecoveryFlow";

export default function RecoveryPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Recovery"
        subtitle="Collaborative replanning with Nova"
        backHref="/home"
      />
      <RecoveryFlow />
    </div>
  );
}

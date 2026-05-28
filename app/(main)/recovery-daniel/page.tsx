"use client";

import { PageHeader } from "@/components/PageHeader";
import { DanielRecoveryFlow } from "@/components/recovery-daniel/DanielRecoveryFlow";

export default function RecoveryDanielPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Recovery"
        subtitle="Daniel · shift change replanning"
        backHref="/home"
      />
      <DanielRecoveryFlow />
    </div>
  );
}


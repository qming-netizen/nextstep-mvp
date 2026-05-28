"use client";

import { PageHeader } from "@/components/PageHeader";
import { IllnessRecoveryFlow } from "@/components/recovery-illness/IllnessRecoveryFlow";

export default function RecoveryIllnessPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Recovery"
        subtitle="Illness · 48-hour plan"
        backHref="/home"
      />
      <IllnessRecoveryFlow />
    </div>
  );
}


"use client";

import { PageHeader } from "@/components/PageHeader";
import { ReplanFlow } from "@/components/replan/ReplanFlow";

export default function ReplanPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Rebalance plan"
        subtitle="Your week changed — let's adjust"
        backHref="/home"
      />
      <ReplanFlow />
    </div>
  );
}

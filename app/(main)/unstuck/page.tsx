"use client";

import { PageHeader } from "@/components/PageHeader";
import { UnstuckFlow } from "@/components/unstuck/UnstuckFlow";

export default function UnstuckPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader
        title="Get unstuck"
        subtitle="Nova helps you take the next small step"
        backHref="/home"
      />
      <UnstuckFlow />
    </div>
  );
}

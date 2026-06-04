"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy route — redirects to replan flow */
export default function RecoveryTriggerPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/replan");
  }, [router]);
  return (
    <div className="flex min-h-0 flex-1 items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
    </div>
  );
}

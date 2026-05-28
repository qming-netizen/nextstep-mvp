"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function RootPage() {
  const router = useRouter();
  const { onboardingComplete, demo } = useApp();

  useEffect(() => {
    if (!onboardingComplete) {
      router.replace("/onboarding");
      return;
    }
    if (!demo.canvasSynced) {
      router.replace("/canvas-sync");
      return;
    }
    router.replace("/home");
  }, [onboardingComplete, demo.canvasSynced, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6FC]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
    </div>
  );
}

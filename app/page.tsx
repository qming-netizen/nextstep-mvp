"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";

export default function RootPage() {
  const router = useRouter();
  const { onboardingComplete } = useApp();

  useEffect(() => {
    router.replace(onboardingComplete ? "/home" : "/onboarding");
  }, [onboardingComplete, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F6FC]">
      <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
    </div>
  );
}

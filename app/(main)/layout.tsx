"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/context/AppContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { onboardingComplete, demo } = useApp();
  const showFlowHint = useMemo(
    () => !pathname.startsWith("/recovery"),
    [pathname]
  );

  useEffect(() => {
    if (!onboardingComplete) {
      router.replace("/onboarding");
      return;
    }
    if (!demo.canvasSynced && !pathname.startsWith("/canvas-sync")) {
      router.replace("/canvas-sync");
    }
  }, [onboardingComplete, demo.canvasSynced, pathname, router]);

  if (!onboardingComplete || !demo.canvasSynced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6FC]">
        <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
      </div>
    );
  }

  return <AppShell showFlowHint={showFlowHint}>{children}</AppShell>;
}

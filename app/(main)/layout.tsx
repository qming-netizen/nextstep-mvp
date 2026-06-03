"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useMemo } from "react";
import { AppShell } from "@/components/AppShell";
import { DeviceShell } from "@/components/DeviceShell";
import { useApp } from "@/context/AppContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { onboardingComplete, demo } = useApp();
  const isFocusMode = pathname.startsWith("/focus-mode");
  const hideNav =
    isFocusMode ||
    pathname.startsWith("/recovery-trigger") ||
    pathname.startsWith("/recharge") ||
    pathname.startsWith("/focus-session");
  const isDarkScreen = isFocusMode;

  const showFlowHint = useMemo(
    () =>
      pathname !== "/home" &&
      pathname !== "/calendar" &&
      !pathname.startsWith("/recovery") &&
      !pathname.startsWith("/recovery-trigger"),
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
      <div className="fixed inset-0 grid place-items-center bg-[#1c1c1e]">
        <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
      </div>
    );
  }

  return (
    <DeviceShell variant={isDarkScreen ? "dark" : "light"}>
      <AppShell showNav={!hideNav} showFlowHint={showFlowHint}>
        {children}
      </AppShell>
    </DeviceShell>
  );
}

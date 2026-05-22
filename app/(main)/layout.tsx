"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/context/AppContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onboardingComplete } = useApp();

  useEffect(() => {
    if (!onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [onboardingComplete, router]);

  if (!onboardingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6FC]">
        <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}

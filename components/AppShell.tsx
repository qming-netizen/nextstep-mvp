"use client";

import { BottomNav } from "./BottomNav";
import { FlowHint } from "./FlowHint";

interface AppShellProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFlowHint?: boolean;
  className?: string;
}

export function AppShell({
  children,
  showNav = true,
  showFlowHint = true,
  className = "",
}: AppShellProps) {
  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col bg-[#F8F6FC]">
      <div
        className={`flex min-h-0 flex-1 flex-col overflow-hidden ${className}`}
      >
        {children}
      </div>
      {showFlowHint && showNav && <FlowHint />}
      {showNav && <div className="h-[72px] shrink-0" aria-hidden />}
      {showNav && <BottomNav />}
    </div>
  );
}

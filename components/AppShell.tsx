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
    <div className={`flex min-h-0 flex-1 flex-col overflow-hidden ${className}`}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
      {showFlowHint && showNav && <FlowHint />}
      {showNav && <div className="h-[60px] shrink-0" aria-hidden />}
      {showNav && <BottomNav />}
    </div>
  );
}

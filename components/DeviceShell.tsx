"use client";

import type { ReactNode } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";

interface DeviceShellProps {
  children: ReactNode;
  variant?: "light" | "dark";
}

/** Wraps all in-app screens in the shared iPhone 16 Pro frame */
export function DeviceShell({ children, variant = "light" }: DeviceShellProps) {
  return (
    <PhoneFrame variant={variant}>
      <div className="ios-root flex min-h-0 flex-1 flex-col overflow-hidden bg-[var(--ios-bg)]">
        {children}
      </div>
    </PhoneFrame>
  );
}

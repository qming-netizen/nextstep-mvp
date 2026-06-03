"use client";

import { IOSFloatingButton } from "./IOSFloatingButton";

export function IOSOnboardingFooter({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{
        paddingLeft: "var(--ios-content-x)",
        paddingRight: "var(--ios-content-x)",
        paddingBottom: 10,
        paddingTop: 8,
      }}
    >
      {/* Soft fade above button — native sheet feel */}
      <div
        className="pointer-events-none absolute -top-10 left-0 right-0 h-10 bg-gradient-to-t from-[var(--ios-bg)] to-transparent"
        aria-hidden
      />
      <IOSFloatingButton onClick={onClick} disabled={disabled}>
        {children}
      </IOSFloatingButton>
    </div>
  );
}

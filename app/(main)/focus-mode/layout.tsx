"use client";

import { AppShell } from "@/components/AppShell";

export default function FocusModeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell showNav={false}>{children}</AppShell>;
}

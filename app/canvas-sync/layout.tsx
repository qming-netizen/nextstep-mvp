"use client";

import { DeviceShell } from "@/components/DeviceShell";

export default function CanvasSyncLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DeviceShell>{children}</DeviceShell>;
}

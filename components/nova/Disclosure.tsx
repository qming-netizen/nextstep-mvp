"use client";

import { ChevronDown } from "lucide-react";

export function Disclosure({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-2xl border border-violet-100/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-[#1a1625]">
          {title}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-violet-600 transition-transform group-open:rotate-180"
        />
      </summary>
      <div className="mt-3 text-[13px] leading-relaxed text-[#6b6578]">
        {children}
      </div>
    </details>
  );
}


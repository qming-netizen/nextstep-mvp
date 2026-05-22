"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  backHref,
  action,
}: PageHeaderProps) {
  return (
    <header className="sticky top-0 z-10 shrink-0 bg-[#F8F6FC]/95 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-2">
          {backHref && (
            <Link
              href={backHref}
              className="-ml-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm"
              aria-label="Go back"
            >
              <ChevronLeft size={20} className="text-violet-600" />
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-[22px] font-semibold tracking-tight text-[#1a1625]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-0.5 text-[13px] text-[#6b6578]">{subtitle}</p>
            )}
          </div>
        </div>
        {action}
      </div>
    </header>
  );
}

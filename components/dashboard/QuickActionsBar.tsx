"use client";

import Link from "next/link";
import { Coffee, RefreshCw, Target, LifeBuoy } from "lucide-react";

const actions = [
  { icon: Coffee, label: "Recharge Me", href: "/recharge", sub: "Take a breather" },
  { icon: Target, label: "Start Focus Session", href: "/focus-session", sub: "One step at a time" },
  { icon: RefreshCw, label: "My Week Changed", href: "/recovery-trigger", sub: "Nova can replan" },
  { icon: LifeBuoy, label: "Nova, I'm Stuck", href: "/recovery", sub: "Let's recover together" },
];

export function QuickActionsBar() {
  return (
    <section>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
        Quick actions
      </p>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="flex flex-col items-start gap-1 rounded-2xl border border-violet-100 bg-white p-3.5 shadow-sm active:bg-violet-50"
          >
            <a.icon size={20} className="text-violet-500" />
            <span className="text-[14px] font-medium text-[#1a1625]">{a.label}</span>
            <span className="text-[12px] text-[#9b95a8]">{a.sub}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

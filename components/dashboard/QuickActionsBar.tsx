"use client";

import Link from "next/link";
import { Coffee, LifeBuoy, RefreshCw, Target } from "lucide-react";

const actions = [
  {
    icon: Coffee,
    label: "Recharge Me",
    sub: "Take a breather",
    href: "/recharge",
  },
  {
    icon: Target,
    label: "Focus Session",
    sub: "Start work now",
    href: "/focus-session",
  },
  {
    icon: RefreshCw,
    label: "My Week Changed",
    sub: "Rebalance my plan",
    href: "/replan",
  },
  {
    icon: LifeBuoy,
    label: "Nova, I'm Stuck",
    sub: "Help me get started",
    href: "/unstuck",
  },
];

export function QuickActionsBar() {
  return (
    <section>
      <h2 className="dashboard-heading mb-2 text-[17px] text-[#1a1625]">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className="flex flex-col items-start gap-0.5 rounded-2xl border border-violet-100 bg-white p-3 shadow-sm active:bg-violet-50/80"
          >
            <a.icon size={18} className="text-violet-500" />
            <span className="dashboard-subheading mt-1 text-[13px] text-[#1a1625]">
              {a.label}
            </span>
            <span className="dashboard-label text-[11px] text-[#9b95a8]">
              {a.sub}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

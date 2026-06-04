"use client";

import Link from "next/link";
import { Calendar, CheckSquare, Home } from "lucide-react";

export function FlowSuccessNav() {
  const links = [
    { href: "/home", icon: Home, label: "Dashboard" },
    { href: "/tasks", icon: CheckSquare, label: "Tasks" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-violet-100 bg-white py-3 shadow-sm active:bg-violet-50"
        >
          <Icon size={18} className="text-violet-600" />
          <span className="text-[12px] font-medium text-[#1a1625]">{label}</span>
        </Link>
      ))}
    </div>
  );
}

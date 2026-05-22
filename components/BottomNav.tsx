"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListTodo, TrendingUp, Settings } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/tasks", label: "Tasks", icon: ListTodo },
  { href: "/progress", label: "Progress", icon: TrendingUp },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-violet-100/60 bg-white/90 px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-2 backdrop-blur-xl"
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-around">
        {tabs.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex min-w-[64px] flex-col items-center gap-0.5 px-3 py-1.5"
            >
              {active && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-violet-50"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={22}
                className={`relative z-10 ${active ? "text-violet-600" : "text-[#9b95a8]"}`}
                strokeWidth={active ? 2.25 : 1.75}
              />
              <span
                className={`relative z-10 text-[10px] font-medium ${active ? "text-violet-600" : "text-[#9b95a8]"}`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

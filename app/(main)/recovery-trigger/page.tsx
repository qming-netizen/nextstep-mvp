"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { ScrollArea } from "@/components/ScrollArea";

const changes = [
  "Work shift moved",
  "Biology exam tomorrow",
  "History paper due Friday",
  "3 unfinished tasks",
];

export default function RecoveryTriggerPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header
        className="shrink-0 px-5 pt-2"
        style={{ paddingTop: "max(0.5rem, env(safe-area-inset-top))" }}
      >
        <p className="text-[13px] font-medium text-[var(--ios-label-secondary)]">
          Good Evening, Emily
        </p>
        <p className="text-[12px] text-[var(--ios-label-tertiary)]">
          Tuesday, 8:42 PM
        </p>
      </header>

      <ScrollArea withNavPadding={false} className="pb-28">
        <div className="px-5 pt-4">
          <div className="text-center">
            <NovaCharacter state="overwhelmed" size={88} />
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-[24px] font-bold tracking-tight text-[#1a1625]"
            >
              It looks like this week got heavy.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="mx-auto mt-3 max-w-[300px] text-[15px] leading-relaxed text-[var(--ios-label-secondary)]"
            >
              You missed some deadlines — that happens. We can recover without
              the guilt spiral.
            </motion.p>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 rounded-2xl bg-[var(--ios-bg-elevated)] p-4 shadow-sm"
          >
            <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[var(--ios-label-secondary)]">
              What shifted
            </h2>
            <ul className="mt-3 space-y-3">
              {changes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100">
                    <Check size={14} className="text-violet-600" strokeWidth={2.5} />
                  </span>
                  <span className="text-[15px] font-medium text-[#1a1625]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 rounded-2xl bg-violet-50 px-5 py-6 text-center"
          >
            <p className="text-[16px] font-semibold text-[#1a1625]">
              You&apos;re not behind.
            </p>
            <p className="mt-2 text-[15px] text-[var(--ios-label-secondary)]">
              Your schedule changed. One next step is enough.
            </p>
          </motion.section>
        </div>
      </ScrollArea>

      <div
        className="shrink-0 px-5 py-3"
        style={{
          paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
        }}
      >
        <Link
          href="/recovery"
          className="flex h-[52px] items-center justify-center gap-2 rounded-[var(--ios-radius-button)] bg-[var(--ios-tint)] text-[16px] font-semibold text-white shadow-[var(--ios-shadow-button)]"
        >
          Review My Recovery Plan
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

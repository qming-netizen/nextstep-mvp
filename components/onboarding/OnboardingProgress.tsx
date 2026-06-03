"use client";

import { motion } from "framer-motion";

export function OnboardingProgress({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label?: string;
}) {
  const pct = ((step + 1) / total) * 100;
  const left = total - (step + 1);

  return (
    <div className="shrink-0 px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <p className="text-[12px] font-medium text-[#9b95a8]">
        {label ??
          `Step ${step + 1} of ${total}${left > 0 ? ` · ${left} question${left === 1 ? "" : "s"} left` : ""}`}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-violet-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.35 }}
        />
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { DashboardAssignment } from "@/lib/assignments-dashboard";

export function TaskStackReview({
  assignment,
  onClose,
}: {
  assignment: DashboardAssignment;
  onClose: () => void;
}) {
  const steps = assignment.microSteps;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF9B7A]">
            Your path
          </p>
          <h3 className="mt-0.5 text-[17px] font-bold text-[#1a1625]">
            {assignment.emoji} {assignment.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full border border-[#FFB89A]/60 bg-[#FFF8F5] px-3 py-1.5 text-[13px] font-medium text-[#FF8A65]"
        >
          Done
        </button>
      </div>

      <div className="max-h-[340px] space-y-2.5 overflow-y-auto pr-0.5">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-3xl border-2 border-[#FFB89A]/50 bg-[#FFF8F5] p-4"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF9B7A]">
              Step {index + 1} of {steps.length}
            </p>
            <p className="mt-1 flex items-start gap-2 text-[16px] font-bold leading-snug text-[#1a1625]">
              <span className="shrink-0">{step.emoji}</span>
              <span>{step.title}</span>
            </p>
            <p className="mt-1 text-[13px] text-[#6b6578]">{step.duration}</p>
            <ul className="mt-2 space-y-1">
              {step.bullets.map((b) => (
                <li
                  key={b}
                  className="flex gap-2 text-[13px] leading-relaxed text-[#6b6578]"
                >
                  <span className="shrink-0 text-[#FF9B7A]">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <p className="text-center text-[13px] leading-relaxed text-[#9b95a8]">
        {assignment.novaNote}
      </p>
    </motion.div>
  );
}

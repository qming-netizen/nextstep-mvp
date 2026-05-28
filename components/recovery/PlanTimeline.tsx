"use client";

import { motion } from "framer-motion";

type TimelineBlock = {
  id: string;
  when: string;
  title: string;
  detail: string;
  hours: number;
};

export function PlanTimeline({
  plan,
}: {
  plan: { totalHours: number; blocks: TimelineBlock[] };
}) {
  return (
    <div className="space-y-2">
      {plan.blocks.map((block, i) => (
        <motion.div
          key={block.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-violet-100/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[12px] font-semibold text-violet-600">
                {block.when}
              </p>
              <p className="mt-0.5 text-[15px] font-medium text-[#1a1625]">
                {block.title}
              </p>
              <p className="mt-1 text-[13px] leading-snug text-[#6b6578]">
                {block.detail}
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700">
              {block.hours}h
            </span>
          </div>
        </motion.div>
      ))}
      <div className="flex items-center justify-between rounded-xl bg-[#f3f0fa] px-3 py-2.5">
        <span className="text-[12px] text-[#6b6578]">Total estimated</span>
        <span className="text-[13px] font-semibold text-[#1a1625]">
          {plan.totalHours} hours
        </span>
      </div>
    </div>
  );
}

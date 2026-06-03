"use client";

import { motion } from "framer-motion";
import type { DashboardAssignment } from "@/lib/assignments-dashboard";
import { getAssignmentProgress } from "@/lib/assignment-progress";

export function AssignmentProgressCard({
  assignment,
  completedMicroSteps,
  index,
}: {
  assignment: DashboardAssignment;
  completedMicroSteps: string[];
  index: number;
}) {
  const { completed, total, percent } = getAssignmentProgress(
    assignment,
    completedMicroSteps
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-3xl border border-violet-100 bg-white p-5 shadow-sm"
    >
      <div
        className={`mb-3 h-1 w-12 rounded-full bg-gradient-to-r ${assignment.accent}`}
      />
      <div className="flex items-start gap-3">
        <span className="text-[22px]">{assignment.emoji}</span>
        <div className="min-w-0 flex-1">
          <h2 className="text-[17px] font-semibold leading-snug text-[#1a1625]">
            {assignment.title}
          </h2>
          <p className="mt-0.5 text-[13px] text-[#6b6578]">
            {assignment.dueLabel}
          </p>
          <p className="mt-0.5 text-[12px] text-[#9b95a8]">
            {assignment.effortLabel} estimated
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[12px]">
          <span className="font-medium text-[#6b6578]">
            {completed} of {total} micro-steps
          </span>
          <span className="font-semibold text-violet-600">{percent}%</span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-violet-100">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${assignment.accent}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </motion.article>
  );
}

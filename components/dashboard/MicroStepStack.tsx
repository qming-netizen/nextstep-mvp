"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { DashboardAssignment } from "@/lib/assignments-dashboard";
import {
  getAssignmentProgress,
  getCurrentMicroStep,
} from "@/lib/assignment-progress";
import { useApp } from "@/context/AppContext";
import { NovaDialogueStrip } from "./NovaDialogueStrip";

export function MicroStepStack({
  assignment,
  onReview,
}: {
  assignment: DashboardAssignment;
  onReview: () => void;
}) {
  const router = useRouter();
  const { completedMicroSteps, completeMicroStep } = useApp();
  const steps = assignment.microSteps;
  const step = getCurrentMicroStep(assignment, completedMicroSteps);
  const { completed, total } = getAssignmentProgress(
    assignment,
    completedMicroSteps
  );
  const stepIndex = steps.findIndex((s) => s.id === step.id);
  const allDone = completed >= total;

  const handleStartNow = () => {
    if (!completedMicroSteps.includes(step.id)) {
      completeMicroStep(step.id);
    }
    router.push(`/focus-session?step=${step.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="space-y-4"
    >
      <div className="rounded-3xl border border-[#FFB89A]/40 bg-[#FFF8F5]/90 px-4 py-3.5">
        <p className="text-[14px] font-semibold text-[#1a1625]">
          {assignment.emoji} {assignment.title}
        </p>
        <p className="mt-0.5 text-[13px] text-[#6b6578]">{assignment.dueLabel}</p>
        <p className="mt-1 text-[13px] text-[#FF9B7A]">
          Estimated effort · {assignment.effortLabel}
        </p>
        <div className="mt-3">
          <div className="mb-1 flex justify-between text-[11px] text-[#9b95a8]">
            <span>
              {completed}/{total} steps done
            </span>
            <span>{Math.round((completed / total) * 100)}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-[#FFE8DC]">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${assignment.accent}`}
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative pt-2">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-0 h-[calc(100%-6px)] rounded-3xl border border-[#FFB89A]/25 bg-[#FFF0EA]/70"
          style={{ transform: "translateY(-7px) scale(0.97)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-2 top-0 h-[calc(100%-3px)] rounded-3xl border border-[#FFB89A]/35 bg-[#FFF5F0]/85"
          style={{ transform: "translateY(-3px) scale(0.985)" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, type: "spring", stiffness: 360, damping: 28 }}
          className="relative rounded-3xl border-2 border-[#FFB89A]/80 bg-[#FFF8F5] px-5 py-5 shadow-md"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#FF9B7A]">
            {allDone
              ? "All steps complete"
              : `Step ${stepIndex + 1} of ${steps.length}`}
          </p>
          <p className="mt-2 flex items-start gap-2 text-[20px] font-bold leading-snug text-[#1a1625]">
            <span className="shrink-0">{step.emoji}</span>
            <span>{step.title}</span>
          </p>
          <p className="mt-1.5 text-[14px] text-[#6b6578]">{step.duration}</p>
          <ul className="mt-4 space-y-2">
            {step.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-2 text-[14px] leading-relaxed text-[#6b6578]"
              >
                <span className="shrink-0 text-[#FF9B7A]">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <p className="text-center text-[12px] text-[#9b95a8]">
        {steps.length} steps · {assignment.effortLabel} total
      </p>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onReview}
          className="flex h-14 items-center justify-center rounded-2xl border border-violet-100 bg-white text-[14px] font-medium text-[#6b6578] shadow-sm active:scale-[0.98]"
        >
          Review
        </button>
        <button
          type="button"
          onClick={handleStartNow}
          disabled={allDone}
          className="flex h-14 items-center justify-center rounded-2xl border-2 border-[#FFB89A] bg-white text-[14px] font-semibold text-[#FF8A65] shadow-sm active:scale-[0.98] disabled:opacity-50"
        >
          {allDone ? "Done ✓" : "Start Now"}
        </button>
      </div>

      <NovaDialogueStrip message={assignment.novaNote} character="happy" />
    </motion.div>
  );
}

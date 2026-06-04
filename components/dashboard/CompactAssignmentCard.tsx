"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { useApp } from "@/context/AppContext";
import type { DashboardAssignment } from "@/lib/assignments-dashboard";
import { getStepMeta } from "@/lib/assignment-step-schedule";
import { formatDueShort } from "@/lib/dashboard-home";

const spring = { type: "spring" as const, stiffness: 400, damping: 34 };
const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

function MicroStepStackCard({
  stepIndex,
  total,
  title,
  suggestedDay,
  durationShort,
  action,
  completed,
  onSubmit,
}: {
  stepIndex: number;
  total: number;
  title: string;
  suggestedDay: string;
  durationShort: string;
  action: "start" | "submit";
  completed: boolean;
  onSubmit: () => void;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: spring },
      }}
      className={`rounded-xl border px-3 py-2.5 ${
        completed
          ? "border-violet-100/80 bg-violet-50/40 opacity-70"
          : "border-violet-100 bg-white shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-violet-600">
            Step {stepIndex} of {total}
          </p>
          <p
            className={`mt-0.5 text-[14px] font-semibold ${
              completed ? "text-[#9b95a8] line-through" : "text-[#1a1625]"
            }`}
          >
            {title}
          </p>
          <p className="mt-0.5 text-[12px] text-[#6b6578]">
            {suggestedDay} · {durationShort}
          </p>
        </div>
        {completed ? (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100">
            <Check size={14} className="text-emerald-600" strokeWidth={2.5} />
          </span>
        ) : action === "submit" ? (
          <button
            type="button"
            onClick={onSubmit}
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white active:scale-95"
          >
            Submit
          </button>
        ) : (
          <Link
            href="/focus-session"
            className="shrink-0 rounded-lg bg-violet-600 px-3 py-1.5 text-[12px] font-semibold text-white active:scale-95"
          >
            Start
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function CompactAssignmentCard({
  assignment,
  isExpanded,
  onToggle,
}: {
  assignment: DashboardAssignment;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { completedMicroSteps, completeMicroStep } = useApp();
  const [phase, setPhase] = useState<"collapsed" | "thinking" | "steps">(
    "collapsed"
  );
  const stepCount = assignment.microSteps.length;

  useEffect(() => {
    if (isExpanded) {
      setPhase("thinking");
      const t = window.setTimeout(() => setPhase("steps"), 1000);
      return () => clearTimeout(t);
    }
    setPhase("collapsed");
  }, [isExpanded]);

  const showExpanded = isExpanded && phase !== "collapsed";

  return (
    <motion.article
      layout
      transition={spring}
      animate={{
        scale: isExpanded ? 1.012 : 1,
        boxShadow: isExpanded
          ? "0 14px 36px rgba(124, 92, 252, 0.14)"
          : "0 1px 3px rgba(124, 92, 252, 0.06)",
      }}
      className={`overflow-hidden rounded-2xl border bg-white ${
        isExpanded ? "border-violet-200" : "border-violet-100"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3.5 py-3 text-left"
        style={{ minHeight: 80 }}
      >
        <span className="text-xl leading-none">{assignment.emoji}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold text-[#1a1625]">
            {assignment.title}
          </p>
          <p className="text-[12px] text-[#6b6578]">
            {formatDueShort(assignment.dueLabel)} · {assignment.effortLabel}{" "}
            estimated
          </p>
          {!showExpanded && (
            <motion.p
              layout
              className="mt-0.5 text-[11px] font-medium text-violet-600"
            >
              ▼ Break into {stepCount} steps
            </motion.p>
          )}
        </div>
        <motion.div
          animate={{ rotate: showExpanded ? 180 : 0 }}
          transition={spring}
          className="shrink-0 text-violet-600"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {showExpanded && (
          <motion.div
            key="expanded-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden border-t border-violet-50"
          >
            <div className="px-3.5 pb-3.5 pt-2">
              <AnimatePresence mode="wait">
                {phase === "thinking" && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-xl bg-violet-50/90 px-3 py-3"
                  >
                    <NovaCharacter
                      state="focus"
                      size={40}
                      float
                      glow={false}
                      className="mx-0 shrink-0"
                    />
                    <p className="text-[13px] font-medium text-violet-800">
                      Breaking this into smaller steps...
                    </p>
                  </motion.div>
                )}

                {phase === "steps" && (
                  <motion.div
                    key="steps"
                    initial="hidden"
                    animate="show"
                    variants={listVariants}
                    className="space-y-2"
                  >
                    {assignment.microSteps.map((step, i) => {
                      const meta = getStepMeta(step.id, step.duration);
                      const completed = completedMicroSteps.includes(step.id);
                      return (
                        <MicroStepStackCard
                          key={step.id}
                          stepIndex={i + 1}
                          total={stepCount}
                          title={step.title}
                          suggestedDay={meta.suggestedDay}
                          durationShort={meta.durationShort}
                          action={meta.action}
                          completed={completed}
                          onSubmit={() => completeMicroStep(step.id)}
                        />
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

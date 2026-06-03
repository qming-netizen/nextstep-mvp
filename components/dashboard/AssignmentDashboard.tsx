"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  dashboardIntro,
  weeklyAssignments,
  type DashboardAssignment,
} from "@/lib/assignments-dashboard";
import { NovaDialogueStrip } from "./NovaDialogueStrip";
import { BreakdownDissolve } from "./BreakdownDissolve";
import { MicroStepStack } from "./MicroStepStack";
import { TaskStackReview } from "./TaskStackReview";
import { QuickActionsBar } from "./QuickActionsBar";
import { WorkLifeBalanceSection } from "./WorkLifeBalanceSection";
import { NotificationsSection } from "./NotificationsSection";

type AssignmentPhase = "list" | "dissolving" | "stack" | "review";

function AssignmentListCard({
  assignment,
  index,
  onBreakdown,
  hideButton = false,
}: {
  assignment: DashboardAssignment;
  index: number;
  onBreakdown: () => void;
  hideButton?: boolean;
}) {
  return (
    <>
      <div
        className={`mb-3 h-1 w-12 rounded-full bg-gradient-to-r ${assignment.accent}`}
      />
      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
        Priority #{index + 1}
      </p>
      <h3 className="mt-1 flex items-center gap-2 text-[18px] font-semibold text-[#1a1625]">
        <span>{assignment.emoji}</span>
        {assignment.title}
      </h3>
      <p className="mt-1 text-[13px] text-[#6b6578]">{assignment.dueLabel}</p>
      <p className="mt-2 text-[14px] text-[#6b6578]">
        Estimated Effort: {assignment.effortLabel}
      </p>
      {!hideButton && (
        <button
          type="button"
          onClick={onBreakdown}
          className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl bg-violet-600 text-[16px] font-bold text-white shadow-md active:scale-[0.98]"
        >
          Help Me Break It Down
        </button>
      )}
    </>
  );
}

export function AssignmentDashboard() {
  const [phases, setPhases] = useState<Record<string, AssignmentPhase>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const setPhase = (id: string, phase: AssignmentPhase) => {
    setPhases((p) => ({ ...p, [id]: phase }));
    if (phase !== "list") setExpandedId(id);
    if (phase === "list") setExpandedId(null);
  };

  const getPhase = (id: string): AssignmentPhase => phases[id] ?? "list";

  const handleBreakdown = (id: string) => {
    setExpandedId(id);
    setPhase(id, "dissolving");
  };

  return (
    <div className="space-y-5">
      <NovaDialogueStrip message={dashboardIntro} character="happy" />

      <div className="space-y-3">
        {weeklyAssignments.map((assignment, index) => {
          const phase = getPhase(assignment.id);
          const isExpanded = expandedId === assignment.id;

          return (
            <motion.article
              key={assignment.id}
              layout
              className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm"
            >
              <div className="p-5">
                <AnimatePresence mode="wait">
                  {(!isExpanded || phase === "list") && (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AssignmentListCard
                        assignment={assignment}
                        index={index}
                        onBreakdown={() => handleBreakdown(assignment.id)}
                      />
                    </motion.div>
                  )}

                  {isExpanded && phase === "dissolving" && (
                    <motion.div key="dissolve">
                      <BreakdownDissolve
                        onComplete={() => setPhase(assignment.id, "stack")}
                      >
                        <AssignmentListCard
                          assignment={assignment}
                          index={index}
                          onBreakdown={() => {}}
                          hideButton
                        />
                      </BreakdownDissolve>
                    </motion.div>
                  )}

                  {isExpanded && phase === "stack" && (
                    <motion.div
                      key="stack"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <MicroStepStack
                        assignment={assignment}
                        onReview={() => setPhase(assignment.id, "review")}
                      />
                    </motion.div>
                  )}

                  {isExpanded && phase === "review" && (
                    <motion.div key="review">
                      <TaskStackReview
                        assignment={assignment}
                        onClose={() => setPhase(assignment.id, "stack")}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>

      <QuickActionsBar />
      <WorkLifeBalanceSection />
      <NotificationsSection />
    </div>
  );
}

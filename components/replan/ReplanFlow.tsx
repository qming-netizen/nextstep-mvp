"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { NovaBubble } from "@/components/recovery/NovaBubble";
import { FlowOptionButton } from "@/components/flows/FlowOptionButton";
import { FlowSuccessNav } from "@/components/flows/FlowSuccessNav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { NovaCharacter } from "@/components/NovaCharacter";
import {
  replanAfterNotes,
  replanAfterPlan,
  replanBeforePlan,
  replanChangeOptions,
  replanRationale,
  replanThinkingSteps,
  type ReplanChangeId,
} from "@/lib/replan-flow";

type Phase = "intro" | "thinking" | "compare" | "success";

function PlanColumn({
  title,
  blocks,
  variant,
}: {
  title: string;
  blocks: typeof replanBeforePlan;
  variant: "before" | "after";
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        variant === "before"
          ? "border-[#e8e4ef] bg-[#faf9fc]"
          : "border-violet-200 bg-violet-50/50"
      }`}
    >
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
        {title}
      </p>
      <ul className="space-y-2.5">
        {blocks.map((block) => (
          <li key={`${block.course}-${block.when}`} className="text-[13px]">
            <span className="font-semibold text-violet-700">{block.course}</span>
            <span className="text-[#1a1625]"> · {block.task}</span>
            <p className="text-[12px] text-[#6b6578]">{block.when}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReplanFlow() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedChange, setSelectedChange] = useState<ReplanChangeId | null>(
    null
  );
  const [thinkingIndex, setThinkingIndex] = useState(0);

  useEffect(() => {
    if (phase !== "thinking") return;
    setThinkingIndex(0);
    const timers = replanThinkingSteps.map((_, i) =>
      window.setTimeout(() => setThinkingIndex(i), i * 1100)
    );
    const done = window.setTimeout(
      () => setPhase("compare"),
      replanThinkingSteps.length * 1100 + 400
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [phase]);

  const startReplan = () => {
    if (!selectedChange) return;
    setPhase("thinking");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-4">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <div className="flex justify-center pt-2">
                <NovaCharacter
                  artwork="calendar"
                  state="happy"
                  size={72}
                  float={false}
                  glow
                  className="mx-0"
                />
              </div>
              <NovaBubble
                character="focus"
                message="Looks like your week changed. Let's rebalance your plan without making it heavier."
              />
              <p className="text-[13px] font-semibold text-[#1a1625]">
                What changed?
              </p>
              <div className="space-y-2">
                {replanChangeOptions.map((opt, i) => (
                  <FlowOptionButton
                    key={opt.id}
                    label={opt.label}
                    selected={selectedChange === opt.id}
                    delay={i * 0.04}
                    onClick={() => setSelectedChange(opt.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "thinking" && (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-12"
            >
              <NovaCharacter
                artwork="calendar"
                state="focus"
                size={80}
                float
                glow
                className="mx-0"
              />
              <div className="mt-8 space-y-3 text-center">
                {replanThinkingSteps.map((step, i) => (
                  <motion.p
                    key={step}
                    initial={{ opacity: 0.3 }}
                    animate={{
                      opacity: i <= thinkingIndex ? 1 : 0.3,
                      scale: i === thinkingIndex ? 1.02 : 1,
                    }}
                    className={`text-[15px] ${
                      i === thinkingIndex
                        ? "font-semibold text-violet-700"
                        : "text-[#6b6578]"
                    }`}
                  >
                    {step}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "compare" && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-violet-600" />
                <p className="text-[15px] font-semibold text-[#1a1625]">
                  Before / After
                </p>
              </div>
              <PlanColumn title="Before" blocks={replanBeforePlan} variant="before" />
              <PlanColumn title="After" blocks={replanAfterPlan} variant="after" />
              <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                <p className="text-[14px] leading-relaxed text-[#1a1625]">
                  {replanRationale}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {replanAfterNotes.map((note) => (
                    <li
                      key={note}
                      className="text-[12px] leading-relaxed text-[#6b6578]"
                    >
                      · {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {phase === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5 py-4 text-center"
            >
              <NovaCharacter
                state="success"
                size={96}
                float={false}
                glow
                className="mx-0"
              />
              <NovaBubble
                character="success"
                message="Plan updated. You still have a path."
              />
              <FlowSuccessNav />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {phase !== "success" && phase !== "thinking" && (
        <div
          className="shrink-0 space-y-2 border-t border-violet-100/80 bg-[#F8F6FC]/95 px-5 py-3 backdrop-blur-md"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          {phase === "intro" && (
            <PrimaryButton disabled={!selectedChange} onClick={startReplan}>
              Rebalance my week
              <ArrowRight size={18} className="ml-1 inline" />
            </PrimaryButton>
          )}
          {phase === "compare" && (
            <>
              <PrimaryButton onClick={() => setPhase("success")}>
                Apply Updated Plan
              </PrimaryButton>
              <PrimaryButton variant="soft" href="/calendar">
                Adjust Manually
              </PrimaryButton>
            </>
          )}
        </div>
      )}

      {phase === "success" && (
        <div
          className="shrink-0 px-5 py-3"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <PrimaryButton href="/home">Back to dashboard</PrimaryButton>
        </div>
      )}
    </div>
  );
}

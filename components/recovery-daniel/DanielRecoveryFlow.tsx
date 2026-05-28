"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Lock, Sparkles } from "lucide-react";
import { NovaBubble } from "@/components/recovery/NovaBubble";
import { PlanTimeline } from "@/components/recovery/PlanTimeline";
import { RecoveryStickyFooter } from "@/components/recovery/RecoveryStickyFooter";
import { PrimaryButton } from "@/components/PrimaryButton";
import { NovaReasoningCard } from "@/components/nova/NovaReasoningCard";
import { NovaMemoryCard } from "@/components/nova/NovaMemoryCard";
import {
  danielContext,
  danielCopy,
  danielOptions,
  type DanielOptionId,
} from "@/lib/daniel-recovery";
import { memoryNudge } from "@/lib/nova-persona";
import { useApp } from "@/context/AppContext";

type Phase = "report" | "detect" | "options" | "approved";

const phaseProgress: Record<Phase, number> = {
  report: 1,
  detect: 2,
  options: 3,
  approved: 4,
};

function riskColor(risk: "Low" | "Medium" | "High") {
  if (risk === "Low") return "bg-emerald-50 text-emerald-700";
  if (risk === "Medium") return "bg-amber-50 text-amber-800";
  return "bg-rose-50 text-rose-700";
}

export function DanielRecoveryFlow() {
  const { novaMode } = useApp();
  const [phase, setPhase] = useState<Phase>("report");
  const [selected, setSelected] = useState<DanielOptionId | null>(null);
  const [locked, setLocked] = useState(false);

  const progress = (phaseProgress[phase] / 4) * 100;
  const selectedOption = useMemo(
    () => danielOptions.find((o) => o.id === selected) ?? null,
    [selected]
  );

  const timelineForSelected = useMemo(() => {
    if (!selectedOption) return null;
    return {
      variant: selectedOption.id,
      label: selectedOption.title,
      totalHours: selectedOption.workloadHours,
      blocks: selectedOption.blocks.map((b) => ({
        id: b.id,
        when: b.when,
        title: b.title,
        detail: b.detail,
        hours: b.hours,
      })),
      workloadNote: selectedOption.timeNote,
      whyItWorks: selectedOption.reasoning,
      tradeoff: selectedOption.tradeoff,
      bufferNote:
        "Optional buffer: leave a 30-minute slot Friday afternoon unscheduled. Only if that reduces pressure for you.",
    };
  }, [selectedOption]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 px-5 pb-2 pt-1">
        <div className="h-1 overflow-hidden rounded-full bg-violet-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <p className="mt-2 text-[11px] font-medium text-[#9b95a8]">
          Recovery · Daniel · Café shift change
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-5 pb-4">
        <AnimatePresence mode="wait">
          {phase === "report" && (
            <motion.div
              key="report"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={danielCopy.intro} />
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/50 to-white p-4">
                <p className="text-[13px] font-medium text-[#1a1625]">
                  Reported change
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                  Manager extended tomorrow&apos;s café shift from{" "}
                  <span className="font-medium text-[#1a1625]">
                    {danielContext.shiftOriginal}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-[#1a1625]">
                    {danielContext.shiftNew}
                  </span>
                  .
                </p>
              </div>
              <NovaBubble
                message="I'll check what block this deletes, which deadlines it touches, and what the downstream risk is — then we choose a plan together."
                subtitle="No pressure. Just clarity."
              />
            </motion.div>
          )}

          {phase === "detect" && (
            <motion.div
              key="detect"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={danielCopy.conflictExplain} />

              <NovaReasoningCard
                title="What Nova used"
                model={{
                  whyNow: [
                    "A shift extension deletes a planned study block",
                    "Friday becomes riskier if writing collapses into one morning",
                    "The goal is a realistic plan, not a perfect one",
                  ],
                  whatChanged: `Shift extended: ${danielContext.shiftOriginal} → ${danielContext.shiftNew}`,
                  sources: ["workShifts", "calendar", "canvas", "completionPatterns"],
                  estimatedEffort: "~4–5 hours total",
                  confidence: "Medium",
                  tradeoff:
                    "Protecting deep work often means giving up an evening block or accepting a tighter deadline window.",
                  approval: { primary: "Apply a plan", secondary: "Adjust first" },
                }}
              />

              <section className="rounded-2xl border border-violet-100/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-2 text-violet-600">
                  <Sparkles size={18} />
                  <span className="text-[13px] font-semibold">
                    Detected conflict
                  </span>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[#1a1625]">
                  Lost block:{" "}
                  <span className="font-semibold">{danielContext.lostBlock}</span>
                </p>
                <p className="mt-1 text-[13px] text-[#6b6578]">
                  Originally planned: {danielContext.lostBlockWhat}
                </p>
              </section>

              <NovaBubble message={danielCopy.riskExplain} />

              <div className="space-y-2">
                {danielContext.atRisk.map((r) => (
                  <div
                    key={r.item}
                    className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4"
                  >
                    <p className="text-[14px] font-medium text-[#1a1625]">
                      {r.item}
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-amber-900">
                      Due {r.due}
                    </p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                      {r.why}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="text-[12px] font-semibold text-amber-900">
                    Tradeoff transparency
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                    {danielCopy.tradeoff}
                  </p>
                </div>
              </div>

              <NovaMemoryCard text={memoryNudge({ mode: novaMode, context: "recovery" })} />
            </motion.div>
          )}

          {phase === "options" && (
            <motion.div
              key="options"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={danielCopy.optionsIntro} />

              <div className="space-y-2.5">
                {danielOptions.map((opt) => {
                  const isSelected = selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelected(opt.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-violet-300 bg-violet-50/90 shadow-sm"
                          : "border-violet-100/80 bg-white/90"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-medium text-[#1a1625]">{opt.title}</p>
                        {isSelected && (
                          <Check size={18} className="shrink-0 text-violet-600" />
                        )}
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                        {opt.tone}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                          ~{opt.workloadHours}h
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskColor(
                            opt.riskLevel
                          )}`}
                        >
                          Risk: {opt.riskLevel}
                        </span>
                        <span className="rounded-full bg-[#f3f0fa] px-2.5 py-1 text-[11px] font-semibold text-[#6b6578]">
                          {opt.timeNote}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {timelineForSelected && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <PlanTimeline plan={timelineForSelected} />
                  <div className="mt-4 rounded-2xl border border-violet-100/80 bg-white/80 p-4 backdrop-blur-sm">
                    <p className="text-[12px] font-semibold uppercase tracking-wide text-violet-600">
                      Reasoning
                    </p>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#1a1625]">
                      {timelineForSelected.whyItWorks}
                    </p>
                    <p className="mt-3 text-[13px] leading-relaxed text-[#6b6578]">
                      <span className="font-medium text-[#1a1625]">
                        Tradeoff:
                      </span>{" "}
                      {timelineForSelected.tradeoff}
                    </p>
                  </div>
                </motion.div>
              )}

              <NovaBubble message={danielCopy.approvalAsk} />
            </motion.div>
          )}

          {phase === "approved" && locked && timelineForSelected && (
            <motion.div
              key="approved"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3">
                <Lock size={18} className="text-emerald-600" />
                <p className="text-[14px] font-semibold text-emerald-800">
                  Plan updated
                </p>
              </div>
              <NovaBubble message={danielCopy.applyConfirm} />
              <PlanTimeline plan={timelineForSelected} />
              <NovaBubble message={danielCopy.reinforce} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RecoveryStickyFooter>
        {phase === "report" && (
          <PrimaryButton onClick={() => setPhase("detect")}>
            Detect the conflict
          </PrimaryButton>
        )}

        {phase === "detect" && (
          <PrimaryButton onClick={() => setPhase("options")}>
            See recovery options
          </PrimaryButton>
        )}

        {phase === "options" && (
          <div className="space-y-2.5">
            <PrimaryButton
              onClick={() => {
                if (!selected) return;
                setLocked(true);
                setPhase("approved");
              }}
              disabled={!selected}
            >
              <span className="flex items-center justify-center gap-2">
                <Lock size={18} />
                Apply selected plan
              </span>
            </PrimaryButton>
            <PrimaryButton
              variant="soft"
              onClick={() => setSelected(null)}
              disabled={!selected}
            >
              Adjust something
            </PrimaryButton>
          </div>
        )}

        {phase === "approved" && (
          <div className="space-y-2.5">
            <PrimaryButton href="/home">Back to dashboard</PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setPhase("report");
                setSelected(null);
                setLocked(false);
              }}
              className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Run Daniel scenario again
            </button>
          </div>
        )}
      </RecoveryStickyFooter>
    </div>
  );
}


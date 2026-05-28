"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, Thermometer, AlertCircle } from "lucide-react";
import { NovaBubble } from "@/components/recovery/NovaBubble";
import { RecoveryStickyFooter } from "@/components/recovery/RecoveryStickyFooter";
import { PrimaryButton } from "@/components/PrimaryButton";
import { NovaReasoningCard } from "@/components/nova/NovaReasoningCard";
import { NovaMemoryCard } from "@/components/nova/NovaMemoryCard";
import { Disclosure } from "@/components/nova/Disclosure";
import { memoryNudge } from "@/lib/nova-persona";
import { PlanCards, type PlanCardBlock } from "@/components/recovery/PlanCards";
import {
  illnessCopy,
  illnessDefaults,
  illnessPlans,
  type IllnessInputs,
  type IllnessOptionId,
} from "@/lib/illness-recovery";
import { useApp } from "@/context/AppContext";

type Phase = "intro" | "clarify" | "choose" | "locked";

const phaseProgress: Record<Phase, number> = {
  intro: 1,
  clarify: 2,
  choose: 3,
  locked: 4,
};

function riskPill(risk: "Low" | "Medium" | "High") {
  if (risk === "Low") return "bg-emerald-50 text-emerald-700";
  if (risk === "Medium") return "bg-amber-50 text-amber-800";
  return "bg-rose-50 text-rose-700";
}

export function IllnessRecoveryFlow() {
  const { novaMode } = useApp();
  const [phase, setPhase] = useState<Phase>("intro");
  const [inputs, setInputs] = useState<IllnessInputs>({
    whatHappened: "",
    energy: "low",
    mustDo: "",
    canWait: "",
    next48h: "",
  });
  const [selected, setSelected] = useState<IllnessOptionId | null>(null);
  const [locked, setLocked] = useState(false);
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  const progress = (phaseProgress[phase] / 4) * 100;
  const selectedPlan = useMemo(
    () => illnessPlans.find((p) => p.id === selected) ?? null,
    [selected]
  );

  const blocks: PlanCardBlock[] = useMemo(() => {
    return (selectedPlan?.blocks ?? []).map((b) => ({
      id: b.id,
      when: b.when,
      title: b.title,
      detail: b.detail,
      hours: b.hours,
    }));
  }, [selectedPlan]);

  const canBuild =
    inputs.whatHappened.trim() &&
    inputs.mustDo.trim() &&
    inputs.canWait.trim() &&
    inputs.next48h.trim();

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
          Recovery · Illness · 48-hour rebuild
        </p>
      </div>

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
              <NovaBubble message={illnessCopy.intro} />
              <div className="flex items-start gap-3 rounded-2xl border border-violet-100 bg-white/80 p-4 shadow-sm backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Thermometer size={18} />
                </div>
                <div>
                  <p className="text-[13px] font-medium text-[#1a1625]">
                    Goal
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                    Triage priorities, reduce scope, and build a realistic 48‑hour plan with an approval step.
                  </p>
                </div>
              </div>
              <NovaMemoryCard text={memoryNudge({ mode: novaMode, context: "recovery" })} />
            </motion.div>
          )}

          {phase === "clarify" && (
            <motion.div
              key="clarify"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={illnessCopy.clarify} />

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1a1625]">
                  {illnessCopy.questions.whatHappened}
                </label>
                <input
                  value={inputs.whatHappened}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, whatHappened: e.target.value }))
                  }
                  placeholder="e.g. I’m sick and today collapsed"
                  className="h-[48px] w-full rounded-xl border border-violet-100 bg-white/90 px-4 text-[16px] text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <p className="mb-2 text-[13px] font-medium text-[#1a1625]">
                  {illnessCopy.questions.energy}
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "low", label: "Low" },
                    { id: "medium", label: "Medium" },
                    { id: "okay", label: "Okay" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() =>
                        setInputs((p) => ({
                          ...p,
                          energy: opt.id as IllnessInputs["energy"],
                        }))
                      }
                      className={`rounded-xl py-2.5 text-[13px] font-semibold ${
                        inputs.energy === opt.id
                          ? "bg-violet-600 text-white"
                          : "bg-white/90 text-violet-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1a1625]">
                  {illnessCopy.questions.mustDo}
                </label>
                <input
                  value={inputs.mustDo}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, mustDo: e.target.value }))
                  }
                  placeholder="e.g. Discussion post + quiz review"
                  className="h-[48px] w-full rounded-xl border border-violet-100 bg-white/90 px-4 text-[16px] text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1a1625]">
                  {illnessCopy.questions.canWait}
                </label>
                <input
                  value={inputs.canWait}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, canWait: e.target.value }))
                  }
                  placeholder="e.g. Optional readings"
                  className="h-[48px] w-full rounded-xl border border-violet-100 bg-white/90 px-4 text-[16px] text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#1a1625]">
                  {illnessCopy.questions.next48h}
                </label>
                <input
                  value={inputs.next48h}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, next48h: e.target.value }))
                  }
                  placeholder="e.g. Tomorrow 10–12, next day 9–11"
                  className="h-[48px] w-full rounded-xl border border-violet-100 bg-white/90 px-4 text-[16px] text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                />
              </div>

              <button
                type="button"
                onClick={() => setInputs(illnessDefaults)}
                className="text-[13px] font-medium text-violet-600"
              >
                Autofill example answers
              </button>
            </motion.div>
          )}

          {phase === "choose" && (
            <motion.div
              key="choose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={illnessCopy.planIntro} />

              <NovaReasoningCard
                title="Triage logic"
                model={{
                  whyNow: [
                    "Low energy changes what’s realistic",
                    "Must‑do items get protected; optional work gets deprioritized",
                    "A 48‑hour plan reduces pressure and keeps options open",
                  ],
                  whatChanged: `Energy: ${inputs.energy}. New constraint: illness.`,
                  sources: ["preferences", "completionPatterns", "calendar"],
                  estimatedEffort: "2.5–3.5 hours across short blocks",
                  confidence: "Medium",
                  tradeoff:
                    "We lower scope to protect recovery. The risk is less buffer for perfection — the benefit is follow-through.",
                  approval: { primary: "Apply plan", secondary: "Adjust inputs" },
                }}
              />

              <div className="space-y-2.5">
                {illnessPlans.map((plan) => {
                  const isSelected = selected === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelected(plan.id)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        isSelected
                          ? "border-violet-300 bg-violet-50/90 shadow-sm"
                          : "border-violet-100/80 bg-white/90"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-[#1a1625]">
                          {plan.title}
                        </p>
                        {isSelected && (
                          <Check size={18} className="shrink-0 text-violet-600" />
                        )}
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-700">
                          ~{plan.totalHours}h
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${riskPill(
                            plan.risk
                          )}`}
                        >
                          Risk: {plan.risk}
                        </span>
                      </div>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
                        {plan.why}
                      </p>
                      <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
                        <span className="font-medium text-[#1a1625]">
                          Tradeoff:
                        </span>{" "}
                        {plan.tradeoff}
                      </p>
                    </button>
                  );
                })}
              </div>

              {selectedPlan && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <PlanCards
                    blocks={blocks}
                    acceptedIds={accepted}
                    onAccept={(id) =>
                      setAccepted((prev) => new Set([...Array.from(prev), id]))
                    }
                    onSkip={(id) =>
                      setAccepted((prev) => new Set([...Array.from(prev), id]))
                    }
                  />
                  <div className="mt-3 space-y-2.5">
                    <Disclosure title="Why Nova suggests this">
                      {selectedPlan.why}
                    </Disclosure>
                    <Disclosure title="View tradeoff">
                      {selectedPlan.tradeoff}
                    </Disclosure>
                    <Disclosure title="Recovery note" defaultOpen>
                      <div className="flex gap-2.5">
                        <AlertCircle size={18} className="mt-0.5 shrink-0 text-amber-600" />
                        <span>
                          If symptoms worsen, downshift to the rest‑first plan. No guilt.
                        </span>
                      </div>
                    </Disclosure>
                  </div>
                </motion.div>
              )}

              <NovaBubble message={illnessCopy.approvalAsk} />
            </motion.div>
          )}

          {phase === "locked" && locked && selectedPlan && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3">
                <Lock size={18} className="text-emerald-600" />
                <p className="text-[14px] font-semibold text-emerald-800">
                  Recovery plan applied
                </p>
              </div>
              <PlanCards
                blocks={blocks}
                acceptedIds={accepted.size ? accepted : new Set(blocks.map((b) => b.id))}
                onAccept={(id) =>
                  setAccepted((prev) => new Set([...Array.from(prev), id]))
                }
                onSkip={(id) =>
                  setAccepted((prev) => new Set([...Array.from(prev), id]))
                }
              />
              <NovaBubble message={illnessCopy.reinforce} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RecoveryStickyFooter>
        {phase === "intro" && (
          <PrimaryButton onClick={() => setPhase("clarify")}>
            Rebuild the next 48 hours
          </PrimaryButton>
        )}

        {phase === "clarify" && (
          <PrimaryButton
            onClick={() => setPhase("choose")}
            disabled={!canBuild}
          >
            Generate recovery options
          </PrimaryButton>
        )}

        {phase === "choose" && (
          <div className="space-y-2.5">
            <PrimaryButton
              onClick={() => {
                if (!selected) return;
                setLocked(true);
                setPhase("locked");
              }}
              disabled={!selected}
            >
              <span className="flex items-center justify-center gap-2">
                <Lock size={18} />
                Apply selected plan
              </span>
            </PrimaryButton>
            <PrimaryButton variant="soft" onClick={() => setPhase("clarify")}>
              Adjust something
            </PrimaryButton>
          </div>
        )}

        {phase === "locked" && (
          <div className="space-y-2.5">
            <PrimaryButton href="/home">Back to dashboard</PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setPhase("intro");
                setInputs({
                  whatHappened: "",
                  energy: "low",
                  mustDo: "",
                  canWait: "",
                  next48h: "",
                });
                setSelected(null);
                setLocked(false);
              }}
              className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Run illness scenario again
            </button>
          </div>
        )}
      </RecoveryStickyFooter>
    </div>
  );
}


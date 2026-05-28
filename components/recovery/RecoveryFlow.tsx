"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Check, Lock, Pencil } from "lucide-react";
import { NovaBubble } from "./NovaBubble";
import { PlanTimeline } from "./PlanTimeline";
import { RecoveryStickyFooter } from "./RecoveryStickyFooter";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  buildRecoveryPlan,
  defaultRecoveryInputs,
  planOptions,
  recoveryCopy,
  type PlanVariant,
  type RecoveryInputs,
} from "@/lib/recovery-plan";
import { useApp } from "@/context/AppContext";

type Phase =
  | "intro"
  | "clarify"
  | "approval"
  | "adjust"
  | "choose"
  | "locked";

const phaseProgress: Record<Phase, number> = {
  intro: 1,
  clarify: 2,
  approval: 3,
  adjust: 4,
  choose: 5,
  locked: 6,
};

export function RecoveryFlow() {
  const { applyRecovery } = useApp();
  const [phase, setPhase] = useState<Phase>("intro");
  const [inputs, setInputs] = useState<RecoveryInputs>({
    shift: "",
    progress: "",
    freeBlocks: "",
  });
  const [adjustment, setAdjustment] = useState("");
  const [selectedVariant, setSelectedVariant] = useState<PlanVariant | null>(
    null
  );
  const [lockedPlan, setLockedPlan] = useState<ReturnType<
    typeof buildRecoveryPlan
  > | null>(null);

  const initialPlan = buildRecoveryPlan("thu-fri");
  const progress = (phaseProgress[phase] / 6) * 100;

  const canContinueClarify =
    inputs.shift.trim() && inputs.progress.trim() && inputs.freeBlocks.trim();

  const fillDemoInputs = () => setInputs(defaultRecoveryInputs);

  const handleLockPlan = (variant: PlanVariant) => {
    const plan = buildRecoveryPlan(variant);
    setLockedPlan(plan);
    setSelectedVariant(variant);
    applyRecovery();
    setPhase("locked");
  };

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
          Recovery · History paper
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
              <NovaBubble message={recoveryCopy.intro} />
              <NovaBubble
                message={recoveryCopy.introFollowUp}
                delay={0.1}
              />
              <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50/50 to-white p-4">
                <p className="text-[13px] font-medium text-[#1a1625]">
                  Scenario
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                  Your work shift moved to Wednesday afternoon. A history paper
                  is due Friday and you&apos;re not sure where to start.
                </p>
              </div>
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
              <NovaBubble
                message={recoveryCopy.clarifyIntro}
                subtitle="I'll only plan after I understand this."
              />
              {recoveryCopy.questions.map((q) => (
                <div key={q.id}>
                  <label
                    htmlFor={q.id}
                    className="mb-1.5 block text-[13px] font-medium text-[#1a1625]"
                  >
                    {q.label}
                  </label>
                  <input
                    id={q.id}
                    type="text"
                    value={inputs[q.id]}
                    onChange={(e) =>
                      setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                    }
                    placeholder={q.placeholder}
                    className="h-[48px] w-full rounded-xl border border-violet-100 bg-white/90 px-4 text-[16px] text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={fillDemoInputs}
                className="text-[13px] font-medium text-violet-600"
              >
                Fill Emily&apos;s answers (demo)
              </button>
            </motion.div>
          )}

          {phase === "approval" && (
            <motion.div
              key="approval"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={recoveryCopy.planReady} />
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                    Proposed plan
                  </h2>
                  <span className="text-[11px] font-medium text-violet-600">
                    {initialPlan.workloadNote}
                  </span>
                </div>
                <PlanTimeline plan={initialPlan} />
              </section>
              <div className="rounded-2xl border border-violet-100/80 bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-[12px] font-semibold uppercase tracking-wide text-violet-600">
                  Why this works
                </p>
                <p className="mt-2 text-[14px] leading-relaxed text-[#1a1625]">
                  {initialPlan.whyItWorks}
                </p>
              </div>
              <div className="flex gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-600"
                />
                <div>
                  <p className="text-[12px] font-semibold text-amber-900">
                    Honest tradeoff
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                    {initialPlan.tradeoff}
                  </p>
                </div>
              </div>
              <NovaBubble message={recoveryCopy.approvalAsk} />
            </motion.div>
          )}

          {phase === "adjust" && (
            <motion.div
              key="adjust"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble message={recoveryCopy.adjustPrompt} />
              <div>
                <label
                  htmlFor="adjustment"
                  className="mb-1.5 block text-[13px] font-medium text-[#1a1625]"
                >
                  What changed?
                </label>
                <textarea
                  id="adjustment"
                  rows={3}
                  value={adjustment}
                  onChange={(e) => setAdjustment(e.target.value)}
                  placeholder="Tell Nova what's different…"
                  className="w-full resize-none rounded-xl border border-violet-100 bg-white/90 p-4 text-[16px] leading-relaxed text-[#1a1625] outline-none backdrop-blur-sm focus:ring-2 focus:ring-violet-300"
                />
              </div>
              <button
                type="button"
                onClick={() =>
                  setAdjustment(recoveryCopy.studyGroupNote)
                }
                className="text-[13px] font-medium text-violet-600"
              >
                Use: &ldquo;Study group Wednesday morning&rdquo;
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
              <NovaBubble
                message={recoveryCopy.rebuildIntro}
                subtitle={`Noted: "${adjustment || recoveryCopy.studyGroupNote}"`}
              />
              <NovaBubble message={recoveryCopy.chooseAsk} />
              <div className="space-y-2.5">
                {planOptions.map((opt) => {
                  const plan = buildRecoveryPlan(opt.variant);
                  const selected = selectedVariant === opt.variant;
                  return (
                    <button
                      key={opt.variant}
                      type="button"
                      onClick={() => setSelectedVariant(opt.variant)}
                      className={`w-full rounded-2xl border p-4 text-left transition-all ${
                        selected
                          ? "border-violet-300 bg-violet-50/90 shadow-sm"
                          : "border-violet-100/80 bg-white/90"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-[#1a1625]">
                          {opt.title}
                        </p>
                        {selected && (
                          <Check
                            size={18}
                            className="shrink-0 text-violet-600"
                          />
                        )}
                      </div>
                      <p className="mt-1 text-[13px] text-[#6b6578]">
                        {opt.description}
                      </p>
                      <p className="mt-2 text-[12px] font-medium text-violet-600">
                        {plan.totalHours}h · {plan.blocks.length} blocks
                      </p>
                    </button>
                  );
                })}
              </div>
              {selectedVariant && phase === "choose" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <PlanTimeline plan={buildRecoveryPlan(selectedVariant)} />
                  <p className="mt-3 text-[12px] leading-relaxed text-[#6b6578]">
                    {buildRecoveryPlan(selectedVariant).bufferNote}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === "locked" && lockedPlan && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3">
                <Lock size={18} className="text-emerald-600" />
                <p className="text-[14px] font-semibold text-emerald-800">
                  Plan locked
                </p>
              </div>
              <NovaBubble message={recoveryCopy.locked} />
              <PlanTimeline plan={lockedPlan} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <RecoveryStickyFooter>
        {phase === "intro" && (
          <PrimaryButton onClick={() => setPhase("clarify")}>
            Share what changed
          </PrimaryButton>
        )}

        {phase === "clarify" && (
          <PrimaryButton
            onClick={() => setPhase("approval")}
            disabled={!canContinueClarify}
          >
            Build my plan
          </PrimaryButton>
        )}

        {phase === "approval" && (
          <div className="space-y-2.5">
            <PrimaryButton onClick={() => handleLockPlan("thu-fri")}>
              <span className="flex items-center justify-center gap-2">
                <Lock size={18} />
                Lock plan
              </span>
            </PrimaryButton>
            <PrimaryButton
              variant="soft"
              onClick={() => {
                setPhase("adjust");
                setAdjustment("");
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Pencil size={18} />
                Adjust something
              </span>
            </PrimaryButton>
          </div>
        )}

        {phase === "adjust" && (
          <PrimaryButton
            onClick={() => setPhase("choose")}
            disabled={!adjustment.trim()}
          >
            Rebuild plan
          </PrimaryButton>
        )}

        {phase === "choose" && (
          <PrimaryButton
            onClick={() =>
              selectedVariant && handleLockPlan(selectedVariant)
            }
            disabled={!selectedVariant}
          >
            Lock this plan
          </PrimaryButton>
        )}

        {phase === "locked" && (
          <div className="space-y-2.5">
            <PrimaryButton href="/home">
              Back to dashboard
            </PrimaryButton>
            <button
              type="button"
              onClick={() => {
                setPhase("intro");
                setInputs({ shift: "", progress: "", freeBlocks: "" });
                setAdjustment("");
                setSelectedVariant(null);
                setLockedPlan(null);
              }}
              className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Run recovery demo again
            </button>
          </div>
        )}
      </RecoveryStickyFooter>
    </div>
  );
}

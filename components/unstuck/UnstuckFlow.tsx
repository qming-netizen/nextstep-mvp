"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NovaBubble } from "@/components/recovery/NovaBubble";
import { FlowOptionButton } from "@/components/flows/FlowOptionButton";
import { FlowSuccessNav } from "@/components/flows/FlowSuccessNav";
import { PrimaryButton } from "@/components/PrimaryButton";
import { NovaCharacter } from "@/components/NovaCharacter";
import {
  breakDurationOptions,
  unstuckOptions,
  unstuckResponses,
  type UnstuckBarrierId,
} from "@/lib/unstuck-flow";

type Phase = "intro" | "response" | "break-pick";

export function UnstuckFlow() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("intro");
  const [barrier, setBarrier] = useState<UnstuckBarrierId | null>(null);
  const [breakMinutes, setBreakMinutes] = useState<number | null>(null);

  const response = barrier ? unstuckResponses[barrier] : null;

  const selectBarrier = (id: UnstuckBarrierId) => {
    setBarrier(id);
    if (id === "need-break") {
      setPhase("break-pick");
    } else {
      setPhase("response");
    }
  };

  const startBreak = () => {
    if (breakMinutes) {
      router.push("/recharge");
    }
  };

  const goToCta = () => {
    if (!response) return;
    router.push(response.href);
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
                  state="overwhelmed"
                  size={72}
                  float={false}
                  glow
                  className="mx-0"
                />
              </div>
              <NovaBubble
                character="overwhelmed"
                message="Okay. Let's make this smaller. What's getting in the way?"
              />
              <p className="text-[13px] font-semibold text-[#1a1625]">
                What feels hardest right now?
              </p>
              <div className="space-y-2">
                {unstuckOptions.map((opt, i) => (
                  <FlowOptionButton
                    key={opt.id}
                    label={opt.label}
                    delay={i * 0.04}
                    onClick={() => selectBarrier(opt.id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "break-pick" && response && (
            <motion.div
              key="break-pick"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <NovaCharacter
                state="break"
                size={80}
                float={false}
                glow
                className="mx-0"
              />
              <NovaBubble character="break" message={response.novaMessage} />
              <p className="text-[13px] font-semibold text-[#1a1625]">
                How long?
              </p>
              <div className="space-y-2">
                {breakDurationOptions.map((opt) => (
                  <FlowOptionButton
                    key={opt.minutes}
                    label={opt.label}
                    selected={breakMinutes === opt.minutes}
                    onClick={() => setBreakMinutes(opt.minutes)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {phase === "response" && response && (
            <motion.div
              key="response"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 py-2"
            >
              <NovaBubble
                character={response.character}
                message={response.novaMessage}
              />

              {response.steps && (
                <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                  <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                    Smallest moves
                  </p>
                  <ol className="space-y-2">
                    {response.steps.map((step, i) => (
                      <li
                        key={step}
                        className="flex gap-2 text-[14px] text-[#1a1625]"
                      >
                        <span className="font-semibold text-violet-600">
                          {i + 1}.
                        </span>
                        {step.replace(/^Step \d+: /, "")}
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {response.microSteps && (
                <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                  <p className="mb-1 text-[12px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                    History Essay → smaller
                  </p>
                  <ul className="mt-2 space-y-2">
                    {response.microSteps.map((step, i) => (
                      <li
                        key={step}
                        className="flex items-center gap-2 rounded-xl bg-violet-50/80 px-3 py-2.5 text-[14px] text-[#1a1625]"
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-bold text-white">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {response.cards && (
                <div className="space-y-2">
                  {response.cards.map((card) => (
                    <div
                      key={card.text}
                      className="flex items-center gap-3 rounded-2xl border border-violet-100 bg-white px-4 py-3 shadow-sm"
                    >
                      <span className="text-lg">{card.emoji}</span>
                      <span className="text-[14px] font-medium text-[#1a1625]">
                        {card.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <FlowSuccessNav />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(phase === "response" || phase === "break-pick") && response && (
        <div
          className="shrink-0 space-y-2 border-t border-violet-100/80 bg-[#F8F6FC]/95 px-5 py-3 backdrop-blur-md"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          {phase === "break-pick" ? (
            <PrimaryButton disabled={!breakMinutes} onClick={startBreak}>
              {response.cta}
              <ArrowRight size={18} className="ml-1 inline" />
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={goToCta}>
              {response.cta}
              <ArrowRight size={18} className="ml-1 inline" />
            </PrimaryButton>
          )}
          <PrimaryButton variant="soft" href="/home">
            Back to dashboard
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}

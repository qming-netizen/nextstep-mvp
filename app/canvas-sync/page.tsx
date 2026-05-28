"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, GraduationCap } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { DeadlineCluster } from "@/components/DeadlineCluster";
import { useApp } from "@/context/AppContext";
import { nova } from "@/lib/nova-copy";
import { canvasDeadlines } from "@/lib/mock-data";

type SyncPhase = "connecting" | "scanning" | "ready";

export default function CanvasSyncPage() {
  const router = useRouter();
  const { onboardingComplete, demo, completeCanvasSync } = useApp();
  const [phase, setPhase] = useState<SyncPhase>("connecting");

  useEffect(() => {
    if (!onboardingComplete) {
      router.replace("/onboarding");
      return;
    }
    if (demo.canvasSynced) {
      router.replace("/home");
    }
  }, [onboardingComplete, demo.canvasSynced, router]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("scanning"), 1200);
    const t2 = setTimeout(() => setPhase("ready"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleContinue = () => {
    completeCanvasSync();
    router.replace("/home");
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col bg-[#F8F6FC]">
      <header className="shrink-0 px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
            <GraduationCap size={20} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-violet-600">Canvas LMS</p>
            <h1 className="text-[22px] font-semibold tracking-tight text-[#1a1625]">
              Syncing your week
            </h1>
          </div>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
        <NovaCard message={nova.canvasSyncIntro} compact />

        <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
          <AnimatePresence mode="wait">
            {phase === "connecting" && (
              <motion.div
                key="connect"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6"
              >
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-200 border-t-violet-600" />
                <p className="mt-4 text-[14px] font-medium text-[#1a1625]">
                  Connecting to Canvas…
                </p>
                <p className="mt-1 text-[12px] text-[#6b6578]">
                  State University · Spring 2025
                </p>
              </motion.div>
            )}
            {phase === "scanning" && (
              <motion.div
                key="scan"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <p className="text-[13px] font-medium text-[#1a1625]">
                  Scanning courses…
                </p>
                {["BIOL 204", "MATH 152", "HIST 110"].map((c, i) => (
                  <motion.div
                    key={c}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-center justify-between rounded-xl bg-violet-50/50 px-3 py-2.5"
                  >
                    <span className="text-[13px] text-[#1a1625]">{c}</span>
                    <span className="text-[11px] text-violet-600">Reading…</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {phase === "ready" && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-600">
                  <Check size={18} strokeWidth={2.5} />
                  <span className="text-[14px] font-semibold">
                    {canvasDeadlines.length} deadlines found
                  </span>
                </div>
                <p className="text-[13px] leading-relaxed text-[#6b6578]">
                  {nova.canvasSyncDone}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {phase === "ready" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4"
          >
            <DeadlineCluster />
          </motion.div>
        )}
      </div>

      <div className="shrink-0 border-t border-violet-100/60 bg-white/80 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <PrimaryButton
          onClick={handleContinue}
          disabled={phase !== "ready"}
        >
          Continue to tonight&apos;s plan
        </PrimaryButton>
      </div>
    </div>
  );
}

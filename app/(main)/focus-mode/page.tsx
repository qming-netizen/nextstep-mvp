"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X, Check } from "lucide-react";
import { NovaAvatar } from "@/components/NovaAvatar";
import { PrimaryButton } from "@/components/PrimaryButton";
import { nova } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";

const DEMO_FOCUS_SECONDS = 90;
const CURRENT_STEP = "Draft methods section";

export default function FocusModePage() {
  const router = useRouter();
  const { demo, acceptPlan, completeFocusSession } = useApp();
  const [secondsLeft, setSecondsLeft] = useState(DEMO_FOCUS_SECONDS);
  const [running, setRunning] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (!demo.planAccepted) {
      router.replace("/focus");
    }
  }, [demo.planAccepted, router]);

  useEffect(() => {
    if (!running || completed) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setCompleted(true);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, completed]);

  const handleComplete = () => {
    completeFocusSession();
    router.push("/progress");
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress =
    ((DEMO_FOCUS_SECONDS - secondsLeft) / DEMO_FOCUS_SECONDS) * 100;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white">
      <header className="flex shrink-0 items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
          aria-label="Exit focus"
        >
          <X size={20} />
        </button>
        <span className="text-[13px] font-medium text-white/60">
          Biology · Step 2
        </span>
        <div className="w-10" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto overscroll-contain px-8 py-4">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-[300px] flex-col items-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                <Check size={40} className="text-emerald-400" strokeWidth={2} />
              </div>
              <h2 className="mt-6 text-[24px] font-semibold">Methods drafted</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/60">
                {nova.focusComplete}
              </p>
              <div className="mt-8 w-full">
                <PrimaryButton onClick={handleComplete}>
                  See your progress
                </PrimaryButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col items-center"
            >
              <NovaAvatar size="md" animate={running} />
              <p className="mt-6 max-w-[280px] text-center text-[14px] leading-relaxed text-white/50">
                {nova.focusModeStart}
              </p>
              <h2 className="mt-4 max-w-[280px] text-center text-[20px] font-medium leading-snug">
                {CURRENT_STEP}
              </h2>

              <div className="relative mt-10">
                <svg className="h-44 w-44 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#focusGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.64} 264`}
                  />
                  <defs>
                    <linearGradient
                      id="focusGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[42px] font-light tabular-nums tracking-tight">
                    {mins}:{secs.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!completed && (
        <div className="shrink-0 space-y-2 px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-white/10 text-[16px] font-semibold backdrop-blur-sm"
          >
            {running ? (
              <>
                <Pause size={20} />
                Pause
              </>
            ) : (
              <>
                <Play size={20} fill="currentColor" />
                Resume
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setCompleted(true);
              setRunning(false);
              if (!demo.planAccepted) acceptPlan();
            }}
            className="w-full py-2 text-center text-[13px] font-medium text-white/40"
          >
            Complete session (demo)
          </button>
        </div>
      )}
    </div>
  );
}

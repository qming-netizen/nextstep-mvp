"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X, Check } from "lucide-react";
import { NovaAvatar } from "@/components/NovaAvatar";

const FOCUS_MINUTES = 25;
const CURRENT_STEP = "Draft methods section";

export default function FocusModePage() {
  const [secondsLeft, setSecondsLeft] = useState(FOCUS_MINUTES * 60);
  const [running, setRunning] = useState(true);
  const [completed, setCompleted] = useState(false);

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

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress =
    ((FOCUS_MINUTES * 60 - secondsLeft) / (FOCUS_MINUTES * 60)) * 100;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white">
      <header className="flex shrink-0 items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <Link
          href="/home"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
          aria-label="Exit focus"
        >
          <X size={20} />
        </Link>
        <span className="text-[13px] font-medium text-white/60">Focus mode</span>
        <div className="w-10" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                <Check size={40} className="text-emerald-400" strokeWidth={2} />
              </div>
              <h2 className="mt-6 text-[24px] font-semibold">Step complete</h2>
              <p className="mt-2 text-[15px] text-white/60">
                Nice work on {CURRENT_STEP}. Take a breath.
              </p>
              <Link
                href="/tasks/bio-lab"
                className="mt-8 flex h-[52px] w-full max-w-[280px] items-center justify-center rounded-2xl bg-white text-[16px] font-semibold text-[#1a1625]"
              >
                Continue to next step
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col items-center"
            >
              <NovaAvatar size="md" animate={running} />
              <p className="mt-6 text-[13px] font-medium text-violet-300">
                Biology · Step 2 of 5
              </p>
              <h2 className="mt-2 max-w-[280px] text-center text-[20px] font-medium leading-snug">
                {CURRENT_STEP}
              </h2>

              <div className="relative mt-12">
                <svg className="h-48 w-48 -rotate-90" viewBox="0 0 100 100">
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
                    stroke="url(#grad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.64} 264`}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[48px] font-light tabular-nums tracking-tight">
                    {mins}:{secs.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>

              <p className="mt-8 text-center text-[14px] text-white/50">
                Notifications paused. You&apos;ve got this.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!completed && (
        <div className="shrink-0 px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-white/10 text-[16px] font-semibold backdrop-blur-sm"
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
        </div>
      )}
    </div>
  );
}

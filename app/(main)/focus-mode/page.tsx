"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, X, Check, Coffee } from "lucide-react";
import { NovaCharacter, NovaCompanion } from "@/components/NovaCharacter";
import { BreakModal } from "@/components/focus/BreakModal";
import { IOSFloatingButton } from "@/components/ios/IOSFloatingButton";
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
  const [showBreak, setShowBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState(0);

  useEffect(() => {
    if (!demo.planAccepted) router.replace("/focus");
  }, [demo.planAccepted, router]);

  useEffect(() => {
    if (!running || completed || breakSeconds > 0) return;
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
  }, [running, completed, breakSeconds]);

  useEffect(() => {
    if (breakSeconds <= 0) return;
    const t = setTimeout(() => setBreakSeconds((b) => b - 1), 1000);
    return () => clearTimeout(t);
  }, [breakSeconds]);

  const handleComplete = () => {
    completeFocusSession();
    router.push("/calendar");
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const progress =
    ((DEMO_FOCUS_SECONDS - secondsLeft) / DEMO_FOCUS_SECONDS) * 100;

  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white">
      <header className="flex shrink-0 items-center justify-between px-5 pt-2">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
          aria-label="Exit focus"
        >
          <X size={20} />
        </button>
        <span className="text-[13px] font-medium text-white/60">Focus mode</span>
        <div className="w-10" />
      </header>

      <div className="shrink-0 px-5 pt-2">
        <NovaCompanion
          state="focus"
          message="I'm here while you work. One step at a time."
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-2">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-[300px] flex-col items-center text-center"
            >
              <NovaCharacter state="success" size={100} />
              <h2 className="mt-4 text-[24px] font-semibold">Nice work.</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-white/60">
                {nova.focusComplete}
              </p>
              <div className="mt-8 w-full">
                <IOSFloatingButton onClick={handleComplete}>
                  See your progress
                </IOSFloatingButton>
              </div>
            </motion.div>
          ) : breakSeconds > 0 ? (
            <motion.div
              key="break"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-center"
            >
              <NovaCharacter state="break" size={96} />
              <p className="mt-4 text-[20px] font-semibold">Break time</p>
              <p className="mt-2 text-[36px] font-light tabular-nums">
                {Math.floor(breakSeconds / 60)}:
                {(breakSeconds % 60).toString().padStart(2, "0")}
              </p>
              <p className="mt-2 text-[14px] text-white/50">
                You&apos;ve worked for 25 minutes. Recharge.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="focus"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex w-full flex-col items-center"
            >
              <p className="max-w-[280px] text-center text-[14px] text-white/50">
                {nova.focusModeStart}
              </p>
              <h2 className="mt-4 max-w-[280px] text-center text-[20px] font-medium">
                {CURRENT_STEP}
              </h2>

              <div className="relative mt-8">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100">
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
                    <linearGradient id="focusGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[40px] font-light tabular-nums">
                  {mins}:{secs.toString().padStart(2, "0")}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!completed && breakSeconds === 0 && (
        <div className="shrink-0 space-y-2 px-5 pb-4">
          <button
            type="button"
            onClick={() => setShowBreak(true)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 text-[15px] font-medium"
          >
            <Coffee size={18} />
            Take a break
          </button>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white/10 text-[15px] font-semibold"
          >
            {running ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            {running ? "Pause" : "Resume"}
          </button>
        </div>
      )}

      <BreakModal
        open={showBreak}
        minutes={5}
        onClose={() => setShowBreak(false)}
        onStart={() => {
          setShowBreak(false);
          setBreakSeconds(5 * 60);
          setRunning(false);
        }}
      />
    </div>
  );
}

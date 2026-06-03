"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Pause, Play, X, Check, Minus, Plus } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { useApp } from "@/context/AppContext";

const DEFAULT_MINUTES = 45;
const MIN_MINUTES = 5;
const MAX_MINUTES = 120;
const PRESETS = [25, 45, 60, 90];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function FocusSessionPage() {
  const router = useRouter();
  const { completeFocusSession } = useApp();
  const [durationMinutes, setDurationMinutes] = useState(DEFAULT_MINUTES);
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_MINUTES * 60);
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_MINUTES * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const progress =
    totalSeconds > 0
      ? ((totalSeconds - secondsLeft) / totalSeconds) * 100
      : 0;

  const adjustMinutes = useCallback((delta: number) => {
    setDurationMinutes((m) =>
      Math.min(MAX_MINUTES, Math.max(MIN_MINUTES, m + delta))
    );
  }, []);

  useEffect(() => {
    if (!started) {
      const secs = durationMinutes * 60;
      setTotalSeconds(secs);
      setSecondsLeft(secs);
    }
  }, [durationMinutes, started]);

  useEffect(() => {
    if (!running || finished) return;
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setFinished(true);
          setRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, finished]);

  const beginFocus = useCallback(() => {
    const secs = durationMinutes * 60;
    setTotalSeconds(secs);
    setSecondsLeft(secs);
    setStarted(true);
    setRunning(true);
  }, [durationMinutes]);

  const handleComplete = () => {
    completeFocusSession();
    router.push("/home");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#F5F3FF] via-[#FAF9FC] to-[#F8F6FC]">
      <header className="flex shrink-0 items-center justify-between px-5 pt-2">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#6b6578] shadow-sm"
          aria-label="Leave focus session"
        >
          <X size={20} />
        </button>
        <span className="text-[13px] font-medium text-[#9b95a8]">
          Focus session
        </span>
        <div className="w-10" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-6 py-4">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex w-full max-w-[320px] flex-col items-center text-center"
            >
              <NovaCharacter state="focus" size={120} float glow />
              <h1 className="mt-4 text-[24px] font-bold text-[#1a1625]">
                Start Focus Session
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
                One step at a time. Notifications off — just you and this
                block.
              </p>

              <div className="mt-8 w-full rounded-3xl border border-violet-100 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                  Session length
                </p>
                <div className="mt-3 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => adjustMinutes(-5)}
                    disabled={durationMinutes <= MIN_MINUTES}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-100 bg-[#FAF9FC] text-violet-600 disabled:opacity-40"
                    aria-label="Decrease by 5 minutes"
                  >
                    <Minus size={18} />
                  </button>
                  <div>
                    <p className="text-[40px] font-light tabular-nums text-[#1a1625]">
                      {durationMinutes}
                    </p>
                    <p className="text-[13px] text-[#9b95a8]">minutes</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => adjustMinutes(5)}
                    disabled={durationMinutes >= MAX_MINUTES}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-100 bg-[#FAF9FC] text-violet-600 disabled:opacity-40"
                    aria-label="Increase by 5 minutes"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {PRESETS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDurationMinutes(m)}
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
                        durationMinutes === m
                          ? "bg-violet-600 text-white"
                          : "bg-violet-50 text-violet-700"
                      }`}
                    >
                      {m} min
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={beginFocus}
                className="mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-[15px] font-bold text-white shadow-md active:scale-[0.98]"
              >
                <Target size={18} />
                Begin {durationMinutes}-min focus
              </button>
            </motion.div>
          ) : finished ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-[320px] flex-col items-center text-center"
            >
              <NovaCharacter state="happy" size={88} />
              <h2 className="mt-4 text-[22px] font-bold text-[#1a1625]">
                Nice work.
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
                You showed up and focused. That counts — even if the timer
                didn&apos;t finish.
              </p>
              <button
                type="button"
                onClick={handleComplete}
                className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 text-[15px] font-bold text-white shadow-md active:scale-[0.98]"
              >
                <Check size={18} />
                Back to dashboard
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex w-full max-w-[320px] flex-col items-center text-center"
            >
              <p className="text-[13px] font-semibold uppercase tracking-wider text-violet-500">
                Deep focus
              </p>
              <p className="mt-2 text-[40px] font-light tabular-nums text-[#1a1625]">
                {formatTime(secondsLeft)}
              </p>
              <p className="mt-2 text-[14px] text-[#6b6578]">
                {running
                  ? "Just this block. Nova's here with you."
                  : "Paused — resume when you're ready."}
              </p>

              <div className="relative mt-8">
                <svg className="h-40 w-40 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(124, 92, 252, 0.15)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.64} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <NovaCharacter state="focus" size={72} float={false} glow />
                </div>
              </div>

              <motion.p
                animate={{ opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="mt-4 text-[13px] text-[#9b95a8]"
              >
                One step at a time ✦
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {started && !finished && (
        <div className="shrink-0 space-y-2 px-5 pb-4">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white text-[15px] font-semibold text-violet-700 shadow-sm"
          >
            {running ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
            {running ? "Pause" : "Resume"}
          </button>
          <button
            type="button"
            onClick={() => {
              setFinished(true);
              setRunning(false);
            }}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-violet-600 text-[15px] font-bold text-white shadow-md"
          >
            End session
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Pause, Play, X, Check } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";

const RECHARGE_SECONDS = 15 * 60;

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function CoffeeSteam() {
  return (
    <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute h-8 w-8 rounded-full bg-[#FF9B7A]/25"
          style={{ top: 4 + i * 2, left: 28 + i * 10 }}
          animate={{
            y: [-4, -22],
            opacity: [0.5, 0],
            scale: [0.6, 1.1],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.45,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#FFB89A]/60 bg-[#FFF8F5] shadow-md">
        <Coffee size={32} className="text-[#FF8A65]" strokeWidth={1.75} />
      </div>
    </div>
  );
}

export default function RechargePage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(RECHARGE_SECONDS);
  const [running, setRunning] = useState(true);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const progress =
    ((RECHARGE_SECONDS - secondsLeft) / RECHARGE_SECONDS) * 100;

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

  const beginRecharge = useCallback(() => {
    setStarted(true);
    setRunning(true);
  }, []);

  const handleDone = () => router.push("/home");

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#FFF8F5] via-[#FFF5F0] to-[#FAF9FC]">
      <header className="flex shrink-0 items-center justify-between px-5 pt-2">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-[#6b6578] shadow-sm"
          aria-label="Leave recharge"
        >
          <X size={20} />
        </button>
        <span className="text-[13px] font-medium text-[#9b95a8]">
          Recharge
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
              <CoffeeSteam />
              <NovaCharacter state="break" size={72} float className="mt-4" />
              <h1 className="mt-5 text-[24px] font-bold text-[#1a1625]">
                Recharge Me
              </h1>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
                Take 15 minutes just for you. No tasks, no guilt — sip,
                breathe, refresher yourself.
              </p>
              <button
                type="button"
                onClick={beginRecharge}
                className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-[#FFB89A] bg-white text-[15px] font-semibold text-[#FF8A65] shadow-sm active:scale-[0.98]"
              >
                <Coffee size={18} />
                Start 15-min break
              </button>
            </motion.div>
          ) : finished ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex w-full max-w-[320px] flex-col items-center text-center"
            >
              <NovaCharacter state="success" size={88} />
              <h2 className="mt-4 text-[22px] font-bold text-[#1a1625]">
                Feeling refreshed?
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
                Nice reset. When you&apos;re ready, we can pick up where you
                left off — one step at a time.
              </p>
              <button
                type="button"
                onClick={handleDone}
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
              <CoffeeSteam />
              <p className="mt-6 text-[13px] font-semibold uppercase tracking-wider text-[#FF9B7A]">
                Your refresher
              </p>
              <p className="mt-2 text-[36px] font-light tabular-nums text-[#1a1625]">
                {formatTime(secondsLeft)}
              </p>
              <p className="mt-2 text-[14px] text-[#6b6578]">
                {running
                  ? "Rest freely. Nova's got the week covered."
                  : "Paused — take your time."}
              </p>

              <div className="relative mt-8">
                <svg className="h-36 w-36 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255, 155, 122, 0.2)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#FF9B7A"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.64} 264`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <NovaCharacter state="break" size={56} float={false} />
                </div>
              </div>

              <motion.p
                animate={{ opacity: [0.4, 0.85, 0.4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mt-4 text-[13px] text-[#9b95a8]"
              >
                Breathe in… breathe out ☕
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
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#FFB89A]/50 bg-white text-[15px] font-semibold text-[#FF8A65] shadow-sm"
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
            I&apos;m ready — end break
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { Check, ChevronRight, Coffee, SkipForward } from "lucide-react";
import type { FocusStackItem } from "@/lib/focus-stack";
import { BreakModal } from "./BreakModal";
import { NovaAvatar } from "@/components/NovaAvatar";

function confidencePill(confidence: FocusStackItem["confidence"]) {
  if (confidence === "High") return "bg-emerald-50 text-emerald-700";
  if (confidence === "Medium") return "bg-amber-50 text-amber-800";
  return "bg-[#f3f0fa] text-[#6b6578]";
}

export function FocusCardStack({
  items,
  onCompleteAll,
}: {
  items: FocusStackItem[];
  onCompleteAll: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [showBreak, setShowBreak] = useState(false);
  const [breakSeconds, setBreakSeconds] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const current = items[index] ?? null;
  const progress = useMemo(() => {
    return items.length === 0 ? 0 : Math.round((index / items.length) * 100);
  }, [index, items.length]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1600);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (breakSeconds === null) return;
    if (breakSeconds <= 0) return;
    const t = setTimeout(() => setBreakSeconds((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [breakSeconds]);

  const advance = (message?: string) => {
    if (message) setToast(message);
    const next = index + 1;
    if (next >= items.length) {
      onCompleteAll();
      return;
    }
    setIndex(next);
  };

  const startBreak = (minutes: 5 | 10) => {
    setShowBreak(false);
    setBreakSeconds(minutes * 60);
    setToast("Break started. I’ll keep your place.");
  };

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-140, 0, 140], [-6, 0, 6]);
  const opacity = useTransform(x, [-220, 0, 220], [0.4, 1, 0.4]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <div className="shrink-0 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-medium text-white/60">
            Focus stack · {index + 1}/{items.length}
          </p>
          <p className="text-[12px] font-medium text-white/60">{progress}%</p>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="relative mt-6 flex min-h-0 flex-1 items-center justify-center">
        {items[index + 1] && (
          <div className="absolute inset-0 mx-auto flex max-w-[360px] items-center justify-center">
            <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur-sm">
              <div className="h-3 w-28 rounded-full bg-white/10" />
              <div className="mt-4 h-4 w-52 rounded-full bg-white/10" />
              <div className="mt-3 h-4 w-40 rounded-full bg-white/10" />
              <div className="mt-8 h-12 rounded-2xl bg-white/10" />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {current && (
            <motion.div
              key={current.id}
              style={{ x, rotate, opacity }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={(_, info) => {
                if (info.offset.x > 110) {
                  advance("Skipped. Keeping momentum.");
                } else if (info.offset.x < -110) {
                  advance("Completed. Nice work.");
                }
              }}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
              className="mx-auto w-full max-w-[360px] rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <NovaAvatar size="sm" animate={false} />
                  <div>
                    <p className="text-[12px] font-semibold text-violet-200">
                      Nova suggests
                    </p>
                    <p className="mt-1 text-[18px] font-semibold leading-snug text-white">
                      {current.title}
                    </p>
                  </div>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${confidencePill(
                    current.confidence
                  )}`}
                >
                  {current.confidence}
                </span>
              </div>

              <div className="mt-4 rounded-2xl bg-white/10 p-4">
                <p className="text-[12px] font-medium text-white/60">Estimated</p>
                <p className="mt-1 text-[16px] font-semibold text-white">
                  {current.minutes} minutes
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/70">
                  Why now: {current.whyNow}
                </p>
              </div>

              {breakSeconds !== null && (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-[12px] font-medium text-white/60">Break</p>
                  <p className="mt-1 text-[15px] font-semibold text-white">
                    {Math.floor(breakSeconds / 60)}:
                    {(breakSeconds % 60).toString().padStart(2, "0")} remaining
                  </p>
                  <button
                    type="button"
                    onClick={() => setBreakSeconds(null)}
                    className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-violet-200"
                  >
                    Resume now <ChevronRight size={16} />
                  </button>
                </div>
              )}

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowBreak(true)}
                  className="flex h-[48px] items-center justify-center gap-2 rounded-2xl bg-white/10 text-[13px] font-semibold text-white"
                >
                  <Coffee size={16} />
                  Break
                </button>
                <button
                  type="button"
                  onClick={() => advance("Skipped. Keeping the plan light.")}
                  className="flex h-[48px] items-center justify-center gap-2 rounded-2xl bg-white/10 text-[13px] font-semibold text-white"
                >
                  <SkipForward size={16} />
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => advance("Completed. Calm progress.")}
                  className="flex h-[48px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-[13px] font-semibold text-white"
                >
                  <Check size={16} />
                  Done
                </button>
              </div>

              <p className="mt-4 text-center text-[11px] text-white/40">
                Swipe left to complete · swipe right to skip
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            className="pointer-events-none absolute left-1/2 top-16 w-[92%] max-w-[430px] -translate-x-1/2 rounded-2xl bg-white/10 px-4 py-3 text-center text-[13px] font-medium text-white backdrop-blur-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <BreakModal
        open={showBreak}
        onClose={() => setShowBreak(false)}
        onStartBreak={startBreak}
      />
    </div>
  );
}


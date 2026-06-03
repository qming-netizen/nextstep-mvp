"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";
import type { MicroStepCard } from "@/lib/assignments-dashboard";
import { NovaDialogueStrip } from "./NovaDialogueStrip";

const SWIPE = 90;

function SwipeCard({
  step,
  simplified,
  onDragEnd,
  x,
  expanded,
  onToggleExpand,
}: {
  step: MicroStepCard;
  simplified: boolean;
  onDragEnd: (_: unknown, info: { offset: { x: number } }) => void;
  x: ReturnType<typeof useMotionValue<number>>;
  expanded: boolean;
  onToggleExpand: () => void;
}) {
  const rotate = useTransform(x, [-120, 0, 120], [-8, 0, 8]);
  const acceptOpacity = useTransform(x, [40, 110], [0, 1]);
  const passOpacity = useTransform(x, [-110, -40], [1, 0]);
  const title = simplified ? step.simplifiedTitle : step.title;

  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-end rounded-3xl bg-emerald-500/15 pr-5"
        style={{ opacity: acceptOpacity }}
      >
        <span className="text-[14px] font-semibold text-emerald-700">✅ I&apos;ll do it</span>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-start rounded-3xl bg-amber-100/90 pl-5"
        style={{ opacity: passOpacity }}
      >
        <span className="text-[14px] font-semibold text-amber-800">😵 Too much</span>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        style={{ x, rotate }}
        onDragEnd={onDragEnd}
        className="relative z-10 rounded-3xl border-2 border-violet-100 bg-white p-5 shadow-lg"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-600">
          Nova task card
        </p>
        <p className="mt-2 flex items-center gap-2 text-[20px] font-bold text-[#1a1625]">
          <span>{step.emoji}</span>
          {title}
        </p>
        <p className="mt-1 text-[13px] text-[#6b6578]">{step.duration}</p>
        <ul className="mt-3 space-y-1">
          {step.bullets.map((b) => (
            <li key={b} className="text-[14px] text-[#6b6578]">
              · {b}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onToggleExpand}
          className="mt-3 text-[13px] font-medium text-violet-600"
        >
          💬 Break it down more
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-xl bg-violet-50 px-3 py-2">
                {step.bullets.map((b, i) => (
                  <p key={b} className="text-[12px] text-violet-800">
                    {i + 1}. {b}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-4 flex justify-between text-[12px] font-medium text-[#9b95a8]">
          <span>← too much</span>
          <span>I&apos;ll do it →</span>
        </div>
      </motion.div>
    </div>
  );
}

export function NovaTaskSwipeDeck({
  steps,
  assignmentTitle,
  onComplete,
}: {
  steps: MicroStepCard[];
  assignmentTitle: string;
  onComplete: () => void;
}) {
  const [queue, setQueue] = useState(steps);
  const [simplified, setSimplified] = useState<Record<string, boolean>>({});
  const [expanded, setExpanded] = useState(false);
  const [novaMsg, setNovaMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const x = useMotionValue(0);

  const current = queue[0];

  const advance = useCallback(
    (action: "accept" | "simplify") => {
      if (!current) return;
      if (action === "accept") {
        setNovaMsg("Nice. One step at a time.");
        setTimeout(() => {
          setQueue((q) => {
            const next = q.filter((t) => t.id !== current.id);
            if (next.length === 0) setDone(true);
            return next;
          });
          x.set(0);
          setNovaMsg(null);
        }, 700);
        return;
      }
      setSimplified((s) => ({ ...s, [current.id]: true }));
      setNovaMsg("Let's make this easier.");
      x.set(0);
      setTimeout(() => setNovaMsg(null), 2200);
    },
    [current, x]
  );

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > SWIPE) advance("accept");
    else if (info.offset.x < -SWIPE) advance("simplify");
    else x.set(0);
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-md"
      >
        <NovaCharacter state="success" size={80} />
        <p className="mt-4 text-[22px] font-bold text-[#1a1625]">You&apos;re all set!</p>
        <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
          Great work on {assignmentTitle}. Nova saved your progress.
        </p>
        <button
          type="button"
          onClick={onComplete}
          className="mt-6 h-12 rounded-2xl bg-gradient-to-r from-[#FF9B7A] to-[#FF8A65] px-8 text-[16px] font-bold text-white"
        >
          Back to dashboard
        </button>
      </motion.div>
    );
  }

  if (!current) return null;

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {novaMsg && (
          <motion.div
            key={novaMsg}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <NovaDialogueStrip
              message={novaMsg}
              character={novaMsg.includes("easier") ? "overwhelmed" : "success"}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id + (simplified[current.id] ? "-s" : "")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <SwipeCard
            step={current}
            simplified={!!simplified[current.id]}
            onDragEnd={handleDragEnd}
            x={x}
            expanded={expanded}
            onToggleExpand={() => setExpanded((e) => !e)}
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => advance("simplify")}
          className="flex h-11 items-center justify-center rounded-2xl border border-violet-100 bg-white text-[14px] font-medium text-[#6b6578]"
        >
          😵 Too much
        </button>
        <button
          type="button"
          onClick={() => advance("accept")}
          className="flex h-11 items-center justify-center rounded-2xl bg-emerald-500 text-[14px] font-bold text-white"
        >
          ✅ I&apos;ll do it
        </button>
      </div>

      <Link
        href={current.href ?? "/focus-mode"}
        className="flex h-11 items-center justify-center rounded-2xl bg-violet-600 text-[15px] font-semibold text-white"
      >
        {current.buttonLabel}
      </Link>

      <p className="text-center text-[13px] text-[#9b95a8]">
        {queue.length} step{queue.length !== 1 ? "s" : ""} left
      </p>
    </div>
  );
}

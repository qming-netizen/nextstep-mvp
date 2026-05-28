"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Check, Play, SkipForward } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { tasks } from "@/lib/mock-data";

function SwipeTaskCard({
  title,
  subtitle,
  href,
  onComplete,
  onSkip,
}: {
  title: string;
  subtitle: string;
  href: string;
  onComplete: () => void;
  onSkip: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-140, 0, 140], [-3, 0, 3]);
  const opacity = useTransform(x, [-240, 0, 240], [0.5, 1, 0.5]);
  const bg = useTransform(
    x,
    [-160, 0, 160],
    ["rgba(16,185,129,0.12)", "rgba(255,255,255,1)", "rgba(245,158,11,0.10)"]
  );

  return (
    <motion.div
      layout
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (info.offset.x < -120) onComplete();
        if (info.offset.x > 120) onSkip();
      }}
      className="relative"
    >
      <motion.div
        style={{ backgroundColor: bg }}
        className="absolute inset-0 rounded-2xl"
      />
      <Link
        href={href}
        className="relative block rounded-2xl border border-violet-100/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium text-[#1a1625]">
              {title}
            </p>
            <p className="mt-1 text-[12px] text-[#6b6578]">{subtitle}</p>
          </div>
          <ArrowRight size={18} className="shrink-0 text-[#c4bfd0]" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-full bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700">
            Swipe
          </span>
          <span className="text-[11px] text-[#9b95a8]">
            Left = complete · right = skip
          </span>
        </div>
      </Link>

      <div className="mt-2 grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onSkip();
          }}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white text-[12px] font-semibold text-[#6b6578] shadow-sm"
        >
          <SkipForward size={14} />
          Skip
        </button>
        <Link
          href={href}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-50 text-[12px] font-semibold text-violet-700"
        >
          <Play size={14} />
          Open
        </Link>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onComplete();
          }}
          className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-[12px] font-semibold text-emerald-700"
        >
          <Check size={14} />
          Done
        </button>
      </div>
    </motion.div>
  );
}

export default function TasksPage() {
  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);

  const visible = useMemo(() => {
    const hidden = new Set([...doneIds, ...skippedIds]);
    return tasks.filter((t) => !hidden.has(t.id));
  }, [doneIds, skippedIds]);

  return (
    <>
      <PageHeader title="Tasks" subtitle="Broken into calm micro-steps" />
      <ScrollArea>
        <div className="space-y-3 px-5 pb-4">
          <AnimatePresence>
            {visible.map((task) => {
            const doneSteps = task.steps.filter((s) => s.status === "done").length;
            const progress = Math.round((doneSteps / task.steps.length) * 100);
            return (
              <motion.div key={task.id} layout exit={{ opacity: 0, y: -10 }}>
              <SwipeTaskCard
                key={task.id}
                href={`/tasks/${task.id}`}
                title={task.title}
                subtitle={`${task.dueLabel} · ${progress}% · ~${task.estimatedMinutes} min`}
                onSkip={() => setSkippedIds((p) => [...p, task.id])}
                onComplete={() => setDoneIds((p) => [...p, task.id])}
              />
              </motion.div>
            );
            })}
          </AnimatePresence>

          {(doneIds.length > 0 || skippedIds.length > 0) && (
            <button
              type="button"
              onClick={() => {
                setDoneIds([]);
                setSkippedIds([]);
              }}
              className="w-full py-3 text-center text-[14px] font-medium text-[#9b95a8]"
            >
              Reset task stack
            </button>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Calendar, Check, Clock } from "lucide-react";

const SWIPE_THRESHOLD = 80;

export interface SwipeTaskItem {
  id: string;
  title: string;
  subject: string;
  dueLabel: string;
  estimatedMinutes: number;
  priority?: "high" | "medium" | "low";
}

interface SwipeTaskCardProps {
  task: SwipeTaskItem;
  onComplete?: (id: string) => void;
  onReschedule?: (id: string) => void;
}

export function SwipeTaskCard({
  task,
  onComplete,
  onReschedule,
}: SwipeTaskCardProps) {
  const x = useMotionValue(0);
  const completeOpacity = useTransform(x, [40, 120], [0, 1]);
  const rescheduleOpacity = useTransform(x, [-120, -40], [1, 0]);
  const [exiting, setExiting] = useState<"complete" | "reschedule" | null>(null);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      setExiting("complete");
      onComplete?.(task.id);
      return;
    }
    if (info.offset.x < -SWIPE_THRESHOLD) {
      setExiting("reschedule");
      onReschedule?.(task.id);
    }
  };

  if (exiting) {
    return (
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: 0,
          x: exiting === "complete" ? 120 : -120,
          scale: 0.92,
        }}
        transition={{ duration: 0.35, ease: "easeIn" }}
        className="h-[108px]"
      />
    );
  }

  const inner = (
    <>
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 flex w-24 items-center justify-center rounded-2xl bg-emerald-500/90"
        style={{ opacity: completeOpacity }}
      >
        <Check size={28} className="text-white" strokeWidth={2.5} />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-y-0 right-0 flex w-24 items-center justify-center rounded-2xl bg-amber-400/90"
        style={{ opacity: rescheduleOpacity }}
      >
        <Calendar size={24} className="text-white" />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative z-10 cursor-grab rounded-2xl bg-white p-4 shadow-md active:cursor-grabbing"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[13px] font-bold text-violet-600">
            {task.subject.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[#1a1625]">{task.title}</p>
            <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#6b6578]">
              <Clock size={12} />
              {task.dueLabel} · ~{task.estimatedMinutes} min
            </p>
          </div>
        </div>
        <div className="mt-3 flex justify-between text-[11px] font-medium text-[#9b95a8]">
          <span className="text-emerald-600">→ Complete</span>
          <span className="text-amber-600">← Reschedule</span>
        </div>
      </motion.div>
    </>
  );

  return <div className="relative overflow-hidden rounded-2xl">{inner}</div>;
}

export function SwipeTaskStack({
  tasks: initialTasks,
  onComplete,
  onReschedule,
}: {
  tasks: SwipeTaskItem[];
  onComplete?: (id: string) => void;
  onReschedule?: (id: string) => void;
}) {
  const [tasks, setTasks] = useState(initialTasks);

  const remove = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl bg-emerald-50 px-4 py-6 text-center"
      >
        <p className="text-[15px] font-semibold text-emerald-800">All caught up for now</p>
        <p className="mt-1 text-[13px] text-emerald-700/80">Nova saved your reschedules.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task, i) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <SwipeTaskCard
            task={task}
            onComplete={(id) => {
              onComplete?.(id);
              remove(id);
            }}
            onReschedule={(id) => {
              onReschedule?.(id);
              remove(id);
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

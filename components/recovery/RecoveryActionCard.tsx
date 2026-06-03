"use client";

import { motion } from "framer-motion";
import { Clock, Flag, Sparkles } from "lucide-react";
import { PrimaryButton } from "@/components/PrimaryButton";

interface RecoveryActionCardProps {
  title: string;
  estimatedTime: string;
  priority: "High" | "Medium" | "Low";
  detail?: string;
  actionLabel: string;
  onAction: () => void;
  delay?: number;
}

const priorityColors = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-violet-50 text-violet-700",
};

export function RecoveryActionCard({
  title,
  estimatedTime,
  priority,
  detail,
  actionLabel,
  onAction,
  delay = 0,
}: RecoveryActionCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="rounded-2xl border border-violet-100/80 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[16px] font-semibold text-[#1a1625]">{title}</h3>
        <span
          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${priorityColors[priority]}`}
        >
          {priority}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-3">
        <span className="flex items-center gap-1.5 text-[13px] text-[#6b6578]">
          <Clock size={14} className="text-violet-500" />
          {estimatedTime}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] text-[#6b6578]">
          <Flag size={14} className="text-violet-500" />
          Recovery step
        </span>
      </div>

      {detail && (
        <p className="mt-3 text-[14px] leading-snug text-[var(--ios-label-secondary)]">
          {detail}
        </p>
      )}

      <PrimaryButton className="mt-4 !h-11" onClick={onAction}>
        <span className="flex items-center justify-center gap-2">
          <Sparkles size={16} />
          {actionLabel}
        </span>
      </PrimaryButton>
    </motion.article>
  );
}

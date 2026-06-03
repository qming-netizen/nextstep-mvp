"use client";

import { motion } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";
import type { NovaCharacterState } from "@/lib/nova-character";

interface NovaBubbleProps {
  message: string;
  subtitle?: string;
  delay?: number;
  character?: NovaCharacterState;
}

export function NovaBubble({
  message,
  subtitle,
  delay = 0,
  character = "overwhelmed",
}: NovaBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex gap-3 rounded-2xl border border-violet-100/50 bg-[var(--ios-bg-elevated)] p-3.5 shadow-sm"
    >
      <NovaCharacter state={character} size={48} float={false} className="mx-0" />
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-[12px] font-semibold text-violet-600">Nova</p>
        <p className="mt-1 text-[15px] leading-relaxed text-[#1a1625]">{message}</p>
        {subtitle && (
          <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--ios-label-secondary)]">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );
}

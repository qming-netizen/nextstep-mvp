"use client";

import { motion } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";
import type { NovaCharacterState } from "@/lib/nova-character";

interface NovaCardProps {
  message: string;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
  character?: NovaCharacterState;
}

export function NovaCard({
  message,
  subtitle,
  children,
  compact = false,
  character = "happy",
}: NovaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-violet-100/60 bg-[var(--ios-bg-elevated)] shadow-sm ${
        compact ? "p-4" : "p-4"
      }`}
    >
      <div className="flex gap-3">
        <NovaCharacter
          state={character}
          size={compact ? 52 : 64}
          float={false}
          className="mx-0"
        />
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-[13px] font-semibold text-violet-600">Nova</p>
          <p className="mt-1 text-[15px] leading-snug text-[#1a1625]">{message}</p>
          {subtitle && (
            <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ios-label-secondary)]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children && <div className="mt-3">{children}</div>}
    </motion.div>
  );
}

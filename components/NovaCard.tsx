"use client";

import { motion } from "framer-motion";
import { NovaAvatar } from "./NovaAvatar";

interface NovaCardProps {
  message: string;
  subtitle?: string;
  children?: React.ReactNode;
  compact?: boolean;
}

export function NovaCard({
  message,
  subtitle,
  children,
  compact = false,
}: NovaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-violet-100/80 bg-gradient-to-br from-white to-violet-50/50 p-4 shadow-sm shadow-violet-500/5 ${compact ? "" : "p-5"}`}
    >
      <div className="flex gap-3">
        <NovaAvatar size={compact ? "sm" : "md"} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-violet-600">Nova</p>
          <p className="mt-1 text-[15px] leading-snug text-[#1a1625]">
            {message}
          </p>
          {subtitle && (
            <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}

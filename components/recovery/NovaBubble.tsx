"use client";

import { motion } from "framer-motion";
import { NovaAvatar } from "@/components/NovaAvatar";

interface NovaBubbleProps {
  message: string;
  subtitle?: string;
  delay?: number;
}

export function NovaBubble({ message, subtitle, delay = 0 }: NovaBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm shadow-violet-500/5 backdrop-blur-md"
    >
      <div className="flex gap-3">
        <NovaAvatar size="sm" animate={false} />
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium text-violet-600">Nova</p>
          <p className="mt-1 text-[15px] leading-relaxed text-[#1a1625]">
            {message}
          </p>
          {subtitle && (
            <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

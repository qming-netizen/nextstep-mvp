"use client";

import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export function NovaMemoryCard({
  text,
}: {
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 rounded-2xl border border-violet-100/70 bg-white/80 p-4 shadow-sm backdrop-blur-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        <Brain size={18} />
      </div>
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
          Memory
        </p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#1a1625]">{text}</p>
      </div>
    </motion.div>
  );
}


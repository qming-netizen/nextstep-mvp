"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function FlowOptionButton({
  label,
  selected,
  onClick,
  delay = 0,
}: {
  label: string;
  selected?: boolean;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors ${
        selected
          ? "border-violet-400 bg-violet-50 shadow-sm"
          : "border-violet-100 bg-white shadow-sm active:bg-violet-50/50"
      }`}
    >
      <span className="text-[15px] font-medium text-[#1a1625]">{label}</span>
      <ChevronRight size={18} className="shrink-0 text-[#c4bfd0]" />
    </motion.button>
  );
}

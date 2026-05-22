"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

interface SelectCardProps {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  selected: boolean;
  onToggle: (id: string) => void;
  multi?: boolean;
}

export function SelectCard({
  id,
  label,
  description,
  icon: Icon,
  selected,
  onToggle,
}: SelectCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(id)}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-violet-300 bg-violet-50/80 shadow-sm"
          : "border-violet-100/80 bg-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          selected ? "bg-violet-500 text-white" : "bg-violet-50 text-violet-600"
        }`}
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium text-[#1a1625]">{label}</p>
        {description && (
          <p className="mt-0.5 text-[13px] leading-snug text-[#6b6578]">
            {description}
          </p>
        )}
      </div>
      {selected && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      )}
    </motion.button>
  );
}

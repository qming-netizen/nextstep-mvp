"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { novaRecommendation } from "@/lib/dashboard-home";

export function NovaRecommendationCard() {
  const lines = novaRecommendation.message.split("\n");

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-[#faf8ff] p-4 shadow-sm"
    >
      <div className="flex gap-3">
        <NovaCharacter state="happy" size={56} float={false} glow className="mx-0 shrink-0" />
        <div className="min-w-0 flex-1 pt-1">
          <p className="text-[12px] font-medium text-violet-600">Nova recommends</p>
          {lines.map((line) => (
            <p
              key={line}
              className="mt-0.5 text-[15px] font-medium leading-snug text-[#1a1625]"
            >
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-violet-100 bg-white/90 px-3.5 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-[#9b95a8]">
          {novaRecommendation.priorityLabel}
        </p>
        <p className="mt-0.5 text-[16px] font-semibold text-[#1a1625]">
          {novaRecommendation.emoji} {novaRecommendation.title}
        </p>
        <p className="text-[13px] text-[#6b6578]">{novaRecommendation.dueLabel}</p>
      </div>

      <Link
        href={novaRecommendation.href}
        className="mt-3 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-violet-600 text-[14px] font-semibold text-white shadow-sm active:scale-[0.98]"
      >
        Start First Step
        <ArrowRight size={16} />
      </Link>
    </motion.section>
  );
}

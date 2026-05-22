"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Sparkles } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollArea } from "@/components/ScrollArea";
import { focusPlanBlocks, focusRecommendation } from "@/lib/mock-data";

export default function FocusPlanPage() {
  return (
    <>
      <PageHeader
        title="AI Focus Plan"
        subtitle="Tonight's calm sequence"
        backHref="/home"
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <NovaCard
            message="I built tonight around your evening energy and tomorrow's Biology deadline."
            subtitle="One deep block, then a lighter warm-up. No marathon sessions."
          />

          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-violet-600">
              <Sparkles size={18} />
              <span className="text-[13px] font-semibold">Priority focus</span>
            </div>
            <h3 className="mt-2 text-[18px] font-semibold text-[#1a1625]">
              {focusRecommendation.subject} lab report
            </h3>
            <p className="mt-1 text-[13px] text-[#6b6578]">
              {focusRecommendation.reasoning}
            </p>
            <div className="mt-3 flex gap-4">
              <div className="flex items-center gap-1.5 text-[12px] text-[#6b6578]">
                <Clock size={14} />
                {focusRecommendation.workloadEstimate}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Tonight&apos;s blocks
            </h2>
            <div className="space-y-2">
              {focusPlanBlocks.map((block, i) => (
                <motion.div
                  key={block.time}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex gap-3 rounded-2xl p-4 ${
                    block.active
                      ? "border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50/50"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${block.active ? "bg-violet-500" : "bg-violet-200"}`}
                    />
                    {i < focusPlanBlocks.length - 1 && (
                      <div className="mt-1 w-0.5 flex-1 bg-violet-100" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="text-[12px] font-medium text-violet-600">
                      {block.time}
                    </p>
                    <p className="text-[15px] font-medium text-[#1a1625]">
                      {block.title}
                    </p>
                    <p className="text-[12px] text-[#6b6578]">{block.duration}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="space-y-2.5 pt-2">
            <PrimaryButton href="/focus-mode">Start focus session</PrimaryButton>
            <PrimaryButton href="/tasks/bio-lab" variant="soft">
              View task breakdown
            </PrimaryButton>
            <Link
              href="/recovery"
              className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Plan feels heavy? Lighten it
            </Link>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

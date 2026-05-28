"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Clock, Sparkles } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollArea } from "@/components/ScrollArea";
import { focusPlanBlocks, focusRecommendation } from "@/lib/mock-data";
import { nova } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";

export default function FocusPlanPage() {
  const router = useRouter();
  const { demo, acceptPlan } = useApp();

  const handleAccept = () => {
    acceptPlan();
    router.push("/tasks/bio-lab");
  };

  return (
    <>
      <PageHeader
        title="Tonight's plan"
        subtitle="Nova's proposed sequence"
        backHref="/home"
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-6">
          <NovaCard
            message={nova.focusPlanExplain}
            subtitle={nova.focusPlanAccept}
          />

          <section className="rounded-2xl border border-violet-100/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-violet-600">
              <Sparkles size={18} />
              <span className="text-[13px] font-semibold">Why Biology first</span>
            </div>
            <h3 className="mt-2 text-[18px] font-semibold text-[#1a1625]">
              {focusRecommendation.subject} lab report
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
              {focusRecommendation.reasoning}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[12px] text-[#6b6578]">
              <Clock size={14} />
              {focusRecommendation.workloadEstimate}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Sequence
            </h2>
            <div className="space-y-2">
              {focusPlanBlocks.map((block, i) => (
                <motion.div
                  key={block.time}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-2xl p-4 ${
                    block.active
                      ? "border border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50/50"
                      : "bg-white/90 shadow-sm backdrop-blur-sm"
                  }`}
                >
                  <p className="text-[12px] font-medium text-violet-600">
                    {block.time}
                  </p>
                  <p className="text-[15px] font-medium text-[#1a1625]">
                    {block.title}
                  </p>
                  <p className="text-[12px] text-[#6b6578]">{block.duration}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="space-y-2.5 pt-2">
            {demo.planAccepted ? (
              <>
                <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-50 py-3 text-[14px] font-semibold text-emerald-700">
                  <Check size={18} />
                  Plan accepted
                </div>
                <PrimaryButton href="/tasks/bio-lab">
                  View micro-steps
                </PrimaryButton>
                <PrimaryButton href="/focus-mode" variant="soft">
                  Start focus session
                </PrimaryButton>
              </>
            ) : (
              <>
                <PrimaryButton onClick={handleAccept}>
                  Accept tonight&apos;s plan
                </PrimaryButton>
                <PrimaryButton href="/tasks/bio-lab" variant="soft">
                  Preview micro-steps
                </PrimaryButton>
              </>
            )}
            <Link
              href="/recovery"
              className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Schedule changed? Open recovery
            </Link>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

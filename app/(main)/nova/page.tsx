"use client";

import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { NovaCard } from "@/components/NovaCard";
import { NovaSources } from "@/components/nova/NovaSources";
import { novaBoundaries, novaHowItWorks } from "@/lib/nova-persona";
import { Check } from "lucide-react";

export default function NovaPage() {
  return (
    <>
      <PageHeader
        title="Meet Nova"
        subtitle="How planning stays calm and honest"
        backHref="/settings"
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-6">
          <NovaCard
            message="I'm Nova — a planning partner for when school and life collide."
            subtitle="I help you pick a first step, rebuild plans after disruptions, and stay honest about tradeoffs. You stay in control."
            compact
          />

          <section className="rounded-2xl border border-violet-100/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
              What Nova does
            </p>
            <ul className="mt-3 space-y-2">
              {novaHowItWorks.does.map((item) => (
                <li key={item} className="flex gap-2 text-[13px] text-[#1a1625]">
                  <Check size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-amber-900">
              What Nova does not do
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
              {novaHowItWorks.doesNot.join(" · ")}
            </p>
          </section>

          <section className="rounded-2xl border border-violet-100/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
              Why I ask before changing plans
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#1a1625]">
              {novaHowItWorks.whyAskFirst}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-[#6b6578]">
              You&apos;ll always see: what changed, why now, tradeoffs, confidence, and an approval choice.
            </p>
          </section>

          <section className="rounded-2xl border border-violet-100/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
              Data → action (calmly)
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#1a1625]">
              {novaHowItWorks.dataToAction}
            </p>
            <div className="mt-3">
              <NovaSources
                sources={[
                  "canvas",
                  "calendar",
                  "workShifts",
                  "preferences",
                  "completionPatterns",
                  "syllabus",
                ]}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-violet-100/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
              Recovery without guilt
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-[#1a1625]">
              {novaHowItWorks.recovery}
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-[#6b6578]">
              Nova won&apos;t pressure you into catch-up marathons. The goal is a plan you can actually follow.
            </p>
          </section>

          <section className="rounded-2xl border border-violet-100/80 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
              Boundaries
            </p>
            <ul className="mt-3 space-y-2">
              {novaBoundaries.map((b) => (
                <li key={b} className="text-[13px] leading-relaxed text-[#1a1625]">
                  {b}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}


"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Shield,
  Sparkles,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { NovaCharacter } from "@/components/NovaCharacter";
import {
  boundaryCards,
  deviceStorageNotes,
  explainabilityCards,
  novaDataPipeline,
  riskCards,
  transparencyDemo,
} from "@/lib/privacy-content";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
      {children}
    </p>
  );
}

function PipelineColumn({
  label,
  items,
  accent,
}: {
  label: string;
  items: readonly { title: string; description: string; emoji: string }[];
  accent: "violet" | "purple" | "emerald";
}) {
  const border =
    accent === "violet"
      ? "border-violet-200 bg-violet-50/40"
      : accent === "purple"
        ? "border-purple-200 bg-purple-50/40"
        : "border-emerald-200 bg-emerald-50/40";

  return (
    <div className={`rounded-3xl border p-4 ${border}`}>
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-wider text-violet-700">
        {label}
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-2xl bg-white/90 p-3 shadow-sm"
          >
            <span className="text-lg leading-none" aria-hidden>
              {item.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-[#1a1625]">
                {item.title}
              </p>
              <p className="text-[12px] leading-relaxed text-[#6b6578]">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PrivacyPage() {
  const [expandedReasoning, setExpandedReasoning] = useState(false);

  return (
    <>
      <PageHeader
        title="Data & privacy"
        subtitle="Transparent by design — you're always in control"
        backHref="/settings"
      />
      <ScrollArea>
        <div className="space-y-6 px-5 pb-8">
          <div className="flex gap-3 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
            <NovaCharacter size={52} float={false} glow className="shrink-0" />
            <div className="min-w-0 pt-1">
              <p className="text-[14px] leading-relaxed text-[#1a1625]">
                Nova reads only what you connect, explains every suggestion, and
                never acts without your approval.
              </p>
            </div>
          </div>

          <section>
            <SectionLabel>{novaDataPipeline.title}</SectionLabel>
            <p className="mb-3 text-[13px] text-[#6b6578]">
              {novaDataPipeline.subtitle}
            </p>
            <div className="space-y-3">
              {novaDataPipeline.columns.map((column) => (
                <PipelineColumn
                  key={column.id}
                  label={column.label}
                  items={column.items}
                  accent={column.accent}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#9b95a8]">
              <ArrowRight size={12} className="rotate-90 text-violet-400" />
              <span>Data flows left to right — sources → brain → action</span>
            </div>
          </section>

          <section>
            <SectionLabel>Explainability & transparency</SectionLabel>
            <p className="mb-3 text-[13px] text-[#6b6578]">
              Nova shows its reasoning every time it makes a suggestion — no
              black-box nudges.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {explainabilityCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-violet-600"
                    />
                    <p className="text-[14px] font-medium text-[#1a1625]">
                      {card.title}
                    </p>
                  </div>
                  <p className="text-[12px] leading-relaxed text-[#6b6578]">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-3xl border border-amber-200/80 bg-gradient-to-b from-amber-50/80 to-white p-4">
              <div className="mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-600" />
                <p className="text-[14px] font-semibold text-[#1a1625]">
                  Full transparency
                </p>
              </div>
              <p className="mb-3 text-[12px] text-[#6b6578]">
                Nova always shows why it&apos;s making a suggestion
              </p>
              <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600 text-[13px] font-bold text-white">
                    N
                  </div>
                  <p className="font-semibold text-[#1a1625]">Nova</p>
                </div>
                <p className="text-[13px] leading-relaxed text-[#1a1625]">
                  {transparencyDemo.message}
                </p>
                <button
                  type="button"
                  onClick={() => setExpandedReasoning((v) => !v)}
                  className="mt-2 flex items-center gap-1 text-[12px] font-medium text-violet-600"
                >
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      expandedReasoning ? "rotate-180" : ""
                    }`}
                  />
                  {transparencyDemo.reasoningLink}
                </button>
                {expandedReasoning && (
                  <div className="mt-2 rounded-xl bg-violet-50 p-3 text-[12px] leading-relaxed text-[#6b6578]">
                    Essay due in 10 hours · you usually need ~4 hours · open
                    window at 3pm today · no steps started yet.
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-violet-600 py-2.5 text-[13px] font-medium text-white"
                  >
                    {transparencyDemo.accept}
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-xl bg-[#f3f0f8] py-2.5 text-[13px] font-medium text-[#6b6578]"
                  >
                    {transparencyDemo.dismiss}
                  </button>
                </div>
              </div>
              <p className="mt-3 text-center text-[11px] text-[#9b95a8]">
                You&apos;re always in control
              </p>
            </div>
          </section>

          <section>
            <SectionLabel>Boundaries & constraints</SectionLabel>
            <div className="space-y-2">
              {boundaryCards.map((card) => {
                const highlighted = "highlight" in card && card.highlight;
                return (
                <div
                  key={card.title}
                  className={`rounded-2xl border p-4 ${
                    highlighted
                      ? "border-violet-300 bg-violet-50/60"
                      : "border-amber-200/70 bg-white"
                  } shadow-sm`}
                >
                  <p
                    className={`text-[14px] font-semibold ${
                      highlighted ? "text-violet-800" : "text-amber-800"
                    }`}
                  >
                    {card.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#6b6578]">
                    {card.body}
                  </p>
                </div>
              );
              })}
            </div>
          </section>

          <section>
            <SectionLabel>Risks & open questions</SectionLabel>
            <p className="mb-3 text-[13px] text-[#6b6578]">
              We design openly about what could go wrong — and how we mitigate it.
            </p>
            <div className="space-y-2">
              {riskCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm"
                >
                  <p className="text-[14px] font-semibold text-[#1a1625]">
                    {card.title}
                  </p>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#6b6578]">
                    {card.description}
                  </p>
                  {"mitigation" in card && card.mitigation && (
                    <p className="mt-2 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] leading-relaxed text-emerald-800">
                      <span className="font-medium">Mitigation: </span>
                      {card.mitigation}
                    </p>
                  )}
                  {"openQuestion" in card && card.openQuestion && (
                    <p className="mt-2 rounded-xl bg-violet-50 px-3 py-2 text-[12px] leading-relaxed text-violet-800">
                      <span className="font-medium">Open question: </span>
                      {card.openQuestion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionLabel>On this device</SectionLabel>
            <div className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Shield size={18} className="text-violet-600" />
                <p className="font-medium text-[#1a1625]">
                  What&apos;s stored locally
                </p>
              </div>
              <ul className="space-y-2">
                {deviceStorageNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-2 text-[12px] leading-relaxed text-[#6b6578]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}

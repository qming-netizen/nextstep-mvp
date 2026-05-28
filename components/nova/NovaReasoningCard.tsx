"use client";

import { AlertCircle, CheckCircle2, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import { NovaSources } from "./NovaSources";
import type { NovaReasoningModel } from "@/lib/nova-persona";

function confidenceStyle(confidence: NovaReasoningModel["confidence"]) {
  if (confidence === "High") return { label: "High", cls: "bg-emerald-50 text-emerald-700", Icon: CheckCircle2 };
  if (confidence === "Medium") return { label: "Medium", cls: "bg-amber-50 text-amber-800", Icon: AlertCircle };
  return { label: "Low", cls: "bg-[#f3f0fa] text-[#6b6578]", Icon: HelpCircle };
}

export function NovaReasoningCard({
  title = "Nova's reasoning",
  model,
}: {
  title?: string;
  model: NovaReasoningModel;
}) {
  const conf = confidenceStyle(model.confidence);
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-violet-100/80 bg-white/85 p-4 shadow-sm backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-violet-600">
            {title}
          </p>
          <p className="mt-1 text-[12px] text-[#6b6578]">
            Nova proposes. You approve.
          </p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${conf.cls}`}>
          <conf.Icon size={14} />
          Confidence: {conf.label}
        </span>
      </div>

      {model.whatChanged && (
        <div className="mt-3 rounded-xl bg-violet-50/70 px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700">
            What changed
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#1a1625]">
            {model.whatChanged}
          </p>
        </div>
      )}

      <div className="mt-3">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9b95a8]">
          Why this now
        </p>
        <ul className="mt-2 space-y-1.5">
          {model.whyNow.map((r) => (
            <li key={r} className="flex gap-2 text-[13px] leading-relaxed text-[#1a1625]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-[#f8f6fc] px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9b95a8]">
            Estimated effort
          </p>
          <p className="mt-1 text-[13px] font-medium text-[#1a1625]">
            {model.estimatedEffort}
          </p>
        </div>
        <div className="rounded-xl bg-[#f8f6fc] px-3 py-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9b95a8]">
            Tradeoff
          </p>
          <p className="mt-1 text-[13px] leading-snug text-[#1a1625]">
            {model.tradeoff}
          </p>
        </div>
      </div>

      <div className="mt-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#9b95a8]">
          Data used
        </p>
        <NovaSources sources={model.sources} />
      </div>
    </motion.section>
  );
}


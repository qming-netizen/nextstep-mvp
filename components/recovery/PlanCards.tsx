"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Pencil, SkipForward } from "lucide-react";

export type PlanCardBlock = {
  id: string;
  when: string;
  title: string;
  detail: string;
  hours: number;
};

export function PlanCards({
  blocks,
  acceptedIds,
  onAccept,
  onSkip,
}: {
  blocks: PlanCardBlock[];
  acceptedIds: Set<string>;
  onAccept: (id: string) => void;
  onSkip: (id: string) => void;
}) {
  const visible = blocks.filter((b) => !acceptedIds.has(b.id));
  const accepted = blocks.filter((b) => acceptedIds.has(b.id));

  return (
    <div className="space-y-3">
      {accepted.length > 0 && (
        <section className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-700">
            Today&apos;s locked plan
          </p>
          <div className="mt-3 space-y-2">
            {accepted.map((b) => (
              <div
                key={b.id}
                className="rounded-2xl bg-white/90 p-3 shadow-sm"
              >
                <p className="text-[12px] font-semibold text-emerald-700">
                  {b.when}
                </p>
                <p className="mt-0.5 text-[14px] font-medium text-[#1a1625]">
                  {b.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-[#9b95a8]">
          Plan cards
        </p>
        <AnimatePresence>
          {visible.map((b) => (
            <motion.div
              key={b.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-3xl border border-violet-100/70 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-violet-600">
                    {b.when}
                  </p>
                  <p className="mt-1 text-[16px] font-semibold text-[#1a1625]">
                    {b.title}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
                    {b.detail}
                  </p>
                </div>
                <span className="shrink-0 rounded-xl bg-violet-50 px-2 py-1 text-[11px] font-semibold text-violet-700">
                  {b.hours}h
                </span>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => onAccept(b.id)}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-50 text-[12px] font-semibold text-emerald-700"
                >
                  <Check size={14} />
                  Accept
                </button>
                <button
                  type="button"
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-violet-50 text-[12px] font-semibold text-violet-700"
                >
                  <Pencil size={14} />
                  Adjust
                </button>
                <button
                  type="button"
                  onClick={() => onSkip(b.id)}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-white text-[12px] font-semibold text-[#6b6578] shadow-sm"
                >
                  <SkipForward size={14} />
                  Skip
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}


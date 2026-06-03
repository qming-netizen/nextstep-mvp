"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lifeBalanceCategories } from "@/lib/assignments-dashboard";

export function WorkLifeBalanceSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [scheduled, setScheduled] = useState<string | null>(null);

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
      <h2 className="text-[18px] font-semibold text-[#1a1625]">Work & Life Balance</h2>
      <p className="mt-1 text-[14px] text-[#6b6578]">
        Plan life around your workload — not the other way around.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {lifeBalanceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelected(cat.id)}
            className={`rounded-full border px-3.5 py-2 text-[14px] font-medium ${
              selected === cat.id
                ? "border-violet-500 bg-violet-50 text-violet-800"
                : "border-violet-100 bg-[#faf9fc] text-[#1a1625]"
            }`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 overflow-hidden rounded-2xl bg-violet-50/80 p-4"
          >
            <p className="text-[15px] font-medium text-[#1a1625]">
              Schedule{" "}
              {lifeBalanceCategories.find((c) => c.id === selected)?.label}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() =>
                  setScheduled(
                    lifeBalanceCategories.find((c) => c.id === selected)?.label ??
                      "Activity"
                  )
                }
                className="rounded-xl bg-white py-2.5 text-[14px] font-semibold text-violet-700 shadow-sm"
              >
                Pick a time
              </button>
              <button
                type="button"
                className="rounded-xl border border-violet-200 bg-white py-2.5 text-[14px] font-medium text-[#6b6578]"
              >
                Google Calendar
              </button>
            </div>
            {scheduled && (
              <p className="mt-3 text-[13px] text-emerald-700">
                Nova saved {scheduled} — we&apos;ll work around your deadlines.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

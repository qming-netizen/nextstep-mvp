"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lifeBalanceCategories } from "@/lib/assignments-dashboard";

export function WorkLifeBalanceSection() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const schedule = () => {
    router.push("/calendar");
  };

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
      <h2 className="dashboard-heading text-[17px] text-[#1a1625]">
        Work-Life Balance
      </h2>
      <p className="dashboard-body mt-0.5 text-[13px] text-[#6b6578]">
        Life matters too.
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {lifeBalanceCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelected(cat.id)}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
              selected === cat.id
                ? "border-violet-400 bg-violet-50 text-violet-800"
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
            className="overflow-hidden"
          >
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={schedule}
                className="flex-1 rounded-xl bg-violet-600 py-2.5 text-[13px] font-semibold text-white"
              >
                Schedule on calendar
              </button>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl border border-violet-100 px-3 text-[13px] text-[#6b6578]"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

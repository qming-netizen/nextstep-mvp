"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Feather,
  Shield,
  Sunrise,
  Check,
} from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollArea } from "@/components/ScrollArea";
import { recoveryOptions, updatedRecoveryPlan } from "@/lib/mock-data";

const icons = {
  feather: Feather,
  calendar: Calendar,
  shield: Shield,
  sunrise: Sunrise,
};

export default function RecoveryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const handleApply = () => {
    if (selected) setApplied(true);
  };

  return (
    <>
      <PageHeader
        title="Recovery Mode"
        subtitle="No guilt — just a gentler plan"
        backHref="/home"
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <NovaCard message="Looks like today became overwhelming. Let's rebuild your plan gently." />

          <AnimatePresence mode="wait">
            {!applied ? (
              <motion.div
                key="options"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2.5"
              >
                <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                  Choose what helps
                </h2>
                {recoveryOptions.map((opt) => {
                  const Icon = icons[opt.icon];
                  const isSelected = selected === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelected(opt.id)}
                      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-violet-300 bg-violet-50/80"
                          : "border-violet-100/80 bg-white"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          isSelected
                            ? "bg-violet-500 text-white"
                            : "bg-violet-50 text-violet-600"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-[#1a1625]">{opt.title}</p>
                        <p className="mt-0.5 text-[13px] text-[#6b6578]">
                          {opt.description}
                        </p>
                      </div>
                      {isSelected && (
                        <Check size={20} className="shrink-0 text-violet-600" />
                      )}
                    </button>
                  );
                })}
                <div className="pt-2">
                  <PrimaryButton
                    onClick={handleApply}
                    disabled={!selected}
                  >
                    Apply recovery
                  </PrimaryButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="plan"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <NovaCard
                  message="Here's your updated plan. One focus block tonight — the rest can wait without stress."
                  compact
                />
                <section>
                  <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                    Updated plan
                  </h2>
                  <div className="space-y-2">
                    {updatedRecoveryPlan.map((item) => (
                      <div
                        key={item.task}
                        className="rounded-2xl bg-white p-4 shadow-sm"
                      >
                        <p className="text-[12px] font-medium text-violet-600">
                          {item.time}
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-[#1a1625]">
                          {item.task}
                        </p>
                        <p className="text-[12px] text-[#6b6578]">
                          {item.duration}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
                <PrimaryButton href="/home">Back to dashboard</PrimaryButton>
                <Link
                  href="/focus"
                  className="flex h-11 w-full items-center justify-center text-[14px] font-medium text-violet-600"
                >
                  View focus plan
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </>
  );
}

"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  Check,
  Circle,
  Pencil,
  Play,
  Feather,
} from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollArea } from "@/components/ScrollArea";
import { NovaReasoningCard } from "@/components/nova/NovaReasoningCard";
import { NovaMemoryCard } from "@/components/nova/NovaMemoryCard";
import { tasks } from "@/lib/mock-data";
import { nova } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";
import { memoryNudge } from "@/lib/nova-persona";
import { notFound } from "next/navigation";

export default function TaskBreakdownPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { demo, novaMode } = useApp();
  const task = tasks.find((t) => t.id === id);
  if (!task) notFound();

  const doneSteps = task.steps.filter((s) => s.status === "done").length;
  const progress = Math.round((doneSteps / task.steps.length) * 100);

  return (
    <>
      <PageHeader
        title={task.subject}
        subtitle={task.title}
        backHref="/tasks"
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#6b6578]">Progress</span>
              <span className="text-[13px] font-semibold text-violet-600">
                {progress}%
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-[12px] text-[#6b6578]">
              ~{task.estimatedMinutes} min total · {task.dueLabel}
            </p>
          </div>

          <NovaCard message={nova.taskBreakdown} compact />

          {!demo.planAccepted && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
              Accept tonight&apos;s plan on the focus screen before starting.
            </p>
          )}

          <NovaReasoningCard
            title="Why these steps"
            model={{
              whyNow: [
                "Micro-steps reduce overwhelm and make starting easier",
                "Methods first keeps you from drafting without structure",
                "Each step stays under ~15 minutes to protect momentum",
              ],
              sources: ["canvas", "preferences", "completionPatterns"],
              estimatedEffort: `~${task.estimatedMinutes} min · 5 steps`,
              confidence: "Medium",
              tradeoff:
                "Breaking it down adds a little overhead, but it prevents avoidance and last-minute panic.",
              approval: {
                primary: demo.planAccepted ? "Start focus" : "Accept plan first",
                secondary: "Adjust steps",
              },
            }}
          />

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Micro-steps
            </h2>
            <div className="space-y-2">
              {task.steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-2xl p-4 ${
                    step.status === "done"
                      ? "bg-emerald-50/50"
                      : "bg-white shadow-sm"
                  }`}
                >
                  <div className="mt-0.5">
                    {step.status === "done" ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </div>
                    ) : (
                      <Circle size={24} className="text-violet-200" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-[15px] font-medium ${
                        step.status === "done"
                          ? "text-[#6b6578] line-through"
                          : "text-[#1a1625]"
                      }`}
                    >
                      {i + 1}. {step.title}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#9b95a8]">
                      ~{step.estimatedMinutes} min
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-2.5">
            <PrimaryButton
              href={demo.planAccepted ? "/focus-mode" : "/focus"}
            >
              <span className="flex items-center gap-2">
                <Play size={18} fill="currentColor" />
                {demo.planAccepted ? "Start focus" : "Accept plan first"}
              </span>
            </PrimaryButton>
            <PrimaryButton href="/recovery" variant="soft">
              <span className="flex items-center gap-2">
                <Feather size={18} />
                Schedule changed?
              </span>
            </PrimaryButton>
            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 text-[14px] font-medium text-violet-600"
            >
              <Pencil size={16} />
              Edit steps
            </button>
          </div>

          <NovaMemoryCard text={memoryNudge({ mode: novaMode, context: "task" })} />
        </div>
      </ScrollArea>
    </>
  );
}

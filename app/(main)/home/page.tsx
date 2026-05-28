"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  CalendarClock,
  Sparkles,
  Target,
} from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { ScrollArea } from "@/components/ScrollArea";
import { DeadlineCluster } from "@/components/DeadlineCluster";
import { NovaReasoningCard } from "@/components/nova/NovaReasoningCard";
import { NovaMemoryCard } from "@/components/nova/NovaMemoryCard";
import {
  focusRecommendation,
  tasks,
  todayStatsInitial,
  todayStatsAfterFocus,
} from "@/lib/mock-data";
import { demoDateLabel, demoTimeLabel, nova } from "@/lib/nova-copy";
import { memoryNudge } from "@/lib/nova-persona";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user, demo, novaMode } = useApp();
  const stats = demo.focusCompleted ? todayStatsAfterFocus : todayStatsInitial;
  const pendingTasks = tasks.filter((t) => t.status !== "done");

  return (
    <>
      <header className="shrink-0 px-5 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[13px] font-medium text-[#6b6578]">
          {demoDateLabel} · {demoTimeLabel}
        </p>
        <h1 className="mt-0.5 text-[26px] font-semibold tracking-tight text-[#1a1625]">
          Hey, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-[14px] text-[#6b6578]">{nova.homeSunday}</p>
      </header>

      <ScrollArea className="pb-8">
        <div className="space-y-4 px-5">
          <Link
            href="/recovery"
            className="flex items-center gap-3 rounded-2xl border border-violet-200/80 bg-gradient-to-r from-violet-50/90 to-white p-4 shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
              <CalendarClock size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-[#1a1625]">
                Shift changed? History paper due Friday
              </p>
              <p className="text-[12px] text-[#6b6578]">
                Nova can replan with you — no guilt, just clarity
              </p>
            </div>
            <ArrowRight size={18} className="shrink-0 text-violet-600" />
          </Link>

          {!demo.recoveryTriggered && <DeadlineCluster />}

          <NovaCard
            message={`Nova recommends ${focusRecommendation.subject} first tonight.`}
            subtitle={nova.homeBiologyPriority}
          >
            {focusRecommendation.whyFirst && (
              <ul className="mt-3 space-y-2 rounded-xl bg-white/80 p-3">
                {focusRecommendation.whyFirst.map((reason) => (
                  <li
                    key={reason}
                    className="flex gap-2 text-[12px] leading-snug text-[#6b6578]"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                    {reason}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-3 space-y-2 rounded-xl bg-white/80 p-3">
              <div className="flex justify-between text-[12px]">
                <span className="text-[#6b6578]">Workload</span>
                <span className="font-medium text-[#1a1625]">
                  {focusRecommendation.workloadEstimate}
                </span>
              </div>
              <div className="flex justify-between text-[12px]">
                <span className="text-[#6b6578]">Focus window</span>
                <span className="font-medium text-violet-600">
                  {focusRecommendation.focusWindow}
                </span>
              </div>
            </div>
            <Link
              href="/focus"
              className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-violet-600 text-[14px] font-semibold text-white"
            >
              {demo.planAccepted ? "View accepted plan" : "Review focus plan"}
              <ArrowRight size={16} />
            </Link>
          </NovaCard>

          <NovaReasoningCard
            title="Why this recommendation"
            model={{
              whyNow: [
                "Closest deadline in your Canvas cluster",
                "A small win tonight prevents a Friday scramble later",
                "Step 1 is already done, so you have momentum",
              ],
              sources: ["canvas", "preferences", "completionPatterns"],
              estimatedEffort: focusRecommendation.workloadEstimate,
              confidence: "Medium",
              tradeoff: "Focusing Biology first means Calculus stays a light warm-up tonight.",
              approval: {
                primary: "Accept tonight’s plan",
                secondary: "Adjust the plan",
              },
            }}
          />

          <NovaMemoryCard text={memoryNudge({ mode: novaMode, context: "home" })} />

          {demo.planAccepted && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5"
            >
              <CheckCircle2 size={16} className="text-emerald-600" />
              <p className="text-[13px] font-medium text-emerald-800">
                Tonight&apos;s plan accepted
              </p>
            </motion.div>
          )}

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              This week
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  label: "Momentum",
                  value: `${stats.momentum}%`,
                  icon: Sparkles,
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
                {
                  label: "Done",
                  value: `${stats.completed}/${stats.total}`,
                  icon: CheckCircle2,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Streak",
                  value: `${stats.streak}d`,
                  icon: Target,
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-3 shadow-sm"
                >
                  <div
                    className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}
                  >
                    <stat.icon size={16} className={stat.color} />
                  </div>
                  <p className="text-[18px] font-semibold text-[#1a1625]">
                    {stat.value}
                  </p>
                  <p className="text-[11px] text-[#6b6578]">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                From Canvas
              </h2>
              <Link href="/tasks" className="text-[13px] font-medium text-violet-600">
                All tasks
              </Link>
            </div>
            <div className="space-y-2">
              {pendingTasks.map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className={`flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ${
                    task.id === "bio-lab" ? "ring-1 ring-violet-200" : ""
                  }`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-[13px] font-bold text-violet-600">
                    {task.subject.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium text-[#1a1625]">
                      {task.title}
                    </p>
                    <p className="text-[12px] text-[#6b6578]">
                      {task.dueLabel} · ~{task.estimatedMinutes} min
                    </p>
                  </div>
                  {task.id === "bio-lab" && (
                    <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                      First
                    </span>
                  )}
                  <ArrowRight size={18} className="shrink-0 text-[#c4bfd0]" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}

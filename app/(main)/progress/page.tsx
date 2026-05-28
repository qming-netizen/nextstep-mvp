"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Calendar, TrendingUp } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { NovaMemoryCard } from "@/components/nova/NovaMemoryCard";
import {
  todayStatsInitial,
  todayStatsAfterFocus,
  weeklyProgressInitial,
  weeklyProgressAfterFocus,
  tasks,
} from "@/lib/mock-data";
import { nova } from "@/lib/nova-copy";
import { memoryNudge } from "@/lib/nova-persona";
import { useApp } from "@/context/AppContext";

export default function ProgressPage() {
  const { user, demo, novaMode } = useApp();
  const stats = demo.focusCompleted ? todayStatsAfterFocus : todayStatsInitial;
  const weekly = demo.focusCompleted
    ? weeklyProgressAfterFocus
    : weeklyProgressInitial;
  const maxVal = Math.max(...weekly.map((d) => d.value));

  return (
    <>
      <PageHeader title="Progress" subtitle="Momentum, not perfection" />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-6">
          <NovaCard
            message={
              demo.focusCompleted
                ? nova.progressReinforce
                : `When you're ready, ${user.name.split(" ")[0]}, we'll track momentum here — without turning it into a scoreboard.`
            }
            compact
          />

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                icon: TrendingUp,
                label: "Momentum",
                value: `${stats.momentum}%`,
                color: "violet",
              },
              {
                icon: Award,
                label: "Steps done",
                value: `${stats.completed}/${stats.total}`,
                color: "emerald",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-violet-100/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm"
              >
                <stat.icon
                  size={20}
                  className={
                    stat.color === "violet"
                      ? "text-violet-600"
                      : "text-emerald-600"
                  }
                />
                <p className="mt-3 text-[22px] font-semibold text-[#1a1625]">
                  {stat.value}
                </p>
                <p className="text-[12px] text-[#6b6578]">{stat.label}</p>
              </div>
            ))}
          </div>

          <section className="rounded-2xl border border-violet-100/60 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[#1a1625]">
                This week
              </h2>
              <span className="text-[13px] font-medium text-violet-600">
                Sunday {demo.focusCompleted ? "↑" : "—"}
              </span>
            </div>
            <div className="mt-4 flex h-32 items-end justify-between gap-1.5">
              {weekly.map((day, i) => (
                <div
                  key={day.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                >
                  <motion.div
                    className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-violet-500 to-purple-400"
                    initial={{ height: 0 }}
                    animate={{
                      height: `${Math.max(12, (day.value / maxVal) * 100)}%`,
                    }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  />
                  <span className="text-[10px] font-medium text-[#9b95a8]">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <NovaMemoryCard text={memoryNudge({ mode: novaMode, context: "progress" })} />

          {demo.focusCompleted && (
            <section>
              <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                Recent wins
              </h2>
              <div className="space-y-2">
                {tasks
                  .filter((t) => t.steps.some((s) => s.status === "done"))
                  .map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-sm"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#1a1625]">
                          {task.title}
                        </p>
                        <p className="text-[12px] text-[#6b6578]">
                          {task.steps.filter((s) => s.status === "done").length}{" "}
                          steps completed
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          <Link
            href="/recovery"
            className="flex h-12 items-center justify-center rounded-2xl border border-violet-200 bg-violet-50/50 text-[14px] font-medium text-violet-700"
          >
            Try recovery flow (history paper)
          </Link>
        </div>
      </ScrollArea>
    </>
  );
}

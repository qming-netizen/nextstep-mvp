"use client";

import { motion } from "framer-motion";
import { Award, Calendar, TrendingUp } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { todayStats, weeklyProgress, tasks } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export default function ProgressPage() {
  const { user } = useApp();
  const maxVal = Math.max(...weeklyProgress.map((d) => d.value));

  return (
    <>
      <PageHeader title="Progress" subtitle="Momentum, not perfection" />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <NovaCard
            message={`You're building steady momentum, ${user.name.split(" ")[0]}. Four days in a row — that's real consistency.`}
            compact
          />

          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                icon: TrendingUp,
                label: "Weekly focus",
                value: "4.2 hrs",
                color: "violet",
              },
              {
                icon: Award,
                label: "Tasks completed",
                value: "12",
                color: "emerald",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white p-4 shadow-sm"
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

          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-[#1a1625]">
                This week
              </h2>
              <span className="text-[13px] font-medium text-violet-600">
                {todayStats.momentum}% momentum
              </span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-1.5 h-32">
              {weeklyProgress.map((day, i) => (
                <div
                  key={day.day}
                  className="flex flex-1 flex-col items-center gap-1"
                >
                  <motion.div
                    className="w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-violet-500 to-purple-400"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.value / maxVal) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    style={{ minHeight: 8 }}
                  />
                  <span className="text-[10px] font-medium text-[#9b95a8]">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </section>

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
                    className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
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
        </div>
      </ScrollArea>
    </>
  );
}

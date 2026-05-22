"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Focus,
  Heart,
  Sparkles,
  Wind,
} from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { ScrollArea } from "@/components/ScrollArea";
import { focusRecommendation, tasks, todayStats } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user } = useApp();
  const pendingTasks = tasks.filter((t) => t.status !== "done");
  const missedTask = tasks.find((t) => t.status === "missed");

  return (
    <>
      <header className="shrink-0 px-5 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[13px] font-medium text-[#6b6578]">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-0.5 text-[26px] font-semibold tracking-tight text-[#1a1625]">
          Hey, {user.name.split(" ")[0]}
        </h1>
      </header>

      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <NovaCard
            message={`Nova thinks ${focusRecommendation.subject} should come first tonight.`}
            subtitle={focusRecommendation.reasoning}
          >
            <div className="space-y-2 rounded-xl bg-white/80 p-3">
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
              View focus plan
              <ArrowRight size={16} />
            </Link>
          </NovaCard>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Today
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  label: "Momentum",
                  value: `${todayStats.momentum}%`,
                  icon: Sparkles,
                  color: "text-violet-600",
                  bg: "bg-violet-50",
                },
                {
                  label: "Done",
                  value: `${todayStats.completed}/${todayStats.total}`,
                  icon: CheckCircle2,
                  color: "text-emerald-600",
                  bg: "bg-emerald-50",
                },
                {
                  label: "Streak",
                  value: `${todayStats.streak}d`,
                  icon: Heart,
                  color: "text-rose-500",
                  bg: "bg-rose-50",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileTap={{ scale: 0.98 }}
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
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                Up next
              </h2>
              <Link href="/tasks" className="text-[13px] font-medium text-violet-600">
                See all
              </Link>
            </div>
            <div className="space-y-2">
              {pendingTasks.slice(0, 3).map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold ${
                      task.status === "missed"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
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
                  <ArrowRight size={18} className="shrink-0 text-[#c4bfd0]" />
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Quick actions
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/focus-mode"
                className="flex flex-col gap-2 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-4 text-white shadow-lg shadow-violet-500/20"
              >
                <Focus size={22} />
                <span className="text-[14px] font-semibold">Start focus</span>
              </Link>
              <Link
                href="/tasks/bio-lab"
                className="flex flex-col gap-2 rounded-2xl bg-white p-4 shadow-sm"
              >
                <Wind size={22} className="text-violet-600" />
                <span className="text-[14px] font-semibold text-[#1a1625]">
                  Break down task
                </span>
              </Link>
              {missedTask && (
                <Link
                  href="/recovery"
                  className="col-span-2 flex items-center gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 p-4"
                >
                  <Heart size={20} className="text-amber-600" />
                  <div className="flex-1">
                    <p className="text-[14px] font-medium text-[#1a1625]">
                      Recovery mode
                    </p>
                    <p className="text-[12px] text-[#6b6578]">
                      Rebuild your plan gently
                    </p>
                  </div>
                  <ArrowRight size={18} className="text-amber-600" />
                </Link>
              )}
            </div>
          </section>
        </div>
      </ScrollArea>
    </>
  );
}

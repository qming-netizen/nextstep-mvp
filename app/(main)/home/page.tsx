"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { NovaCharacter } from "@/components/NovaCharacter";
import { ScrollArea } from "@/components/ScrollArea";
import { DeadlineCluster } from "@/components/DeadlineCluster";
import {
  focusRecommendation,
  tasks,
  todayStatsInitial,
  todayStatsAfterFocus,
} from "@/lib/mock-data";
import { demoDateLabel, demoTimeLabel, nova } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user, demo, userPlan } = useApp();
  const stats = demo.focusCompleted ? todayStatsAfterFocus : todayStatsInitial;
  const pendingTasks = tasks.filter((t) => t.status !== "done");
  const hero = userPlan?.tasks.find((t) => t.id === userPlan.heroTaskId);

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
            href="/recovery-trigger"
            className="flex items-center gap-3 rounded-3xl border border-violet-200/60 bg-gradient-to-r from-violet-100/80 to-white p-4 shadow-md"
          >
            <NovaCharacter
              state="overwhelmed"
              size={44}
              float={false}
              className="mx-0 shrink-0"
            />
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

          {!demo.recoveryTriggered && !userPlan && <DeadlineCluster />}

          {hero ? (
            <NovaCard
              character="focus"
              message={userPlan?.novaIntro ?? "Here's your plan for today."}
              subtitle={`${hero.minutes} min on ${hero.subject} first.`}
            >
              <Link
                href={`/tasks/${hero.id}`}
                className="mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF9B7A] to-[#FF8A65] text-[15px] font-bold text-white shadow-lg"
              >
                Start: {hero.title.slice(0, 28)}
                {hero.title.length > 28 ? "…" : ""} →
              </Link>
            </NovaCard>
          ) : (
            <NovaCard
              character="focus"
              message={`Let's tackle ${focusRecommendation.subject} first.`}
              subtitle={nova.homeBiologyPriority}
            >
              <Link
                href="/focus"
                className="mt-4 flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-[15px] font-semibold text-white shadow-lg"
              >
                See tonight&apos;s plan
                <ArrowRight size={16} />
              </Link>
            </NovaCard>
          )}

          {userPlan && userPlan.tasks.length > 1 && (
            <section>
              <h2 className="mb-2 text-[15px] font-semibold text-[#1a1625]">
                Then
              </h2>
              <div className="space-y-2">
                {userPlan.tasks
                  .filter((t) => t.id !== hero?.id)
                  .map((t) => (
                    <Link
                      key={t.id}
                      href={`/tasks/${t.id}`}
                      className="block rounded-3xl bg-white/90 p-3 shadow-sm"
                    >
                      <p className="text-[14px] font-medium text-[#1a1625]">
                        {t.emoji} {t.title}
                      </p>
                      <p className="text-[12px] text-[#9b95a8]">{t.minutes} min</p>
                    </Link>
                  ))}
              </div>
            </section>
          )}

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

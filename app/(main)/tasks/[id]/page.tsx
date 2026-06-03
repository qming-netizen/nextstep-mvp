"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Circle, Coffee, Play, Target } from "lucide-react";
import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollArea } from "@/components/ScrollArea";
import { tasks } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { notFound } from "next/navigation";

export default function TaskBreakdownPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { demo, userPlan, acceptPlan } = useApp();

  const planTask = userPlan?.tasks.find((t) => t.id === id);
  const mockTask = tasks.find((t) => t.id === id);
  const task = planTask
    ? {
        subject: planTask.subject,
        title: planTask.title,
        dueLabel: planTask.dueLabel,
        estimatedMinutes: planTask.minutes,
        steps: planTask.steps.map((s) => ({
          ...s,
          status: s.status as "pending" | "done",
        })),
        reason: planTask.reason,
        emoji: planTask.emoji,
        order: planTask.order,
      }
    : mockTask
      ? {
          subject: mockTask.subject,
          title: mockTask.title,
          dueLabel: mockTask.dueLabel,
          estimatedMinutes: mockTask.estimatedMinutes,
          steps: mockTask.steps,
          reason: null as string | null,
          emoji: null as string | null,
          order: 1,
        }
      : null;

  if (!task) notFound();

  const doneSteps = task.steps.filter((s) => s.status === "done").length;
  const progress = Math.round((doneSteps / task.steps.length) * 100);
  const isHero = userPlan?.heroTaskId === id;
  const otherTasks =
    userPlan?.tasks.filter((t) => t.id !== id).sort((a, b) => a.order - b.order) ??
    [];

  return (
    <>
      <PageHeader
        title={isHero ? "Your plan" : task.subject}
        subtitle={task.title}
        backHref={userPlan ? "/home" : "/tasks"}
      />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-6">
          <NovaCard
            character="focus"
            message={
              isHero
                ? "Let's tackle this first — most realistic next step."
                : "Small bites only. You've got this."
            }
            compact
          />

          {isHero && (
            <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50/80 p-5 text-center">
              <span className="text-3xl">🚀</span>
              <p className="mt-2 text-[17px] font-bold text-[#1a1625]">
                Starting: {task.title}
              </p>
              <p className="mt-1 text-[14px] text-emerald-700">
                {task.estimatedMinutes} min · You&apos;ve got this
              </p>
            </div>
          )}

          {task.reason && (
            <p className="rounded-2xl bg-violet-50/80 px-4 py-3 text-[14px] leading-relaxed text-[#6b6578]">
              {task.reason}
            </p>
          )}

          <div className="rounded-3xl bg-white/90 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#6b6578]">Progress</span>
              <span className="text-[14px] font-semibold text-violet-600">
                {progress}%
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-violet-100">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-[13px] text-[#6b6578]">
              ~{task.estimatedMinutes} min · {task.dueLabel}
            </p>
          </div>

          <section>
            <h2 className="mb-3 text-[15px] font-semibold text-[#1a1625]">
              Break it down
            </h2>
            <div className="space-y-2">
              {task.steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 rounded-3xl p-4 ${
                    step.status === "done"
                      ? "bg-emerald-50/60"
                      : "bg-white/90 shadow-sm"
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

          {otherTasks.length > 0 && (
            <section>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
                Then
              </p>
              {otherTasks.map((t) => (
                <Link
                  key={t.id}
                  href={`/tasks/${t.id}`}
                  className="mb-2 block rounded-3xl bg-white/90 p-4 shadow-sm"
                >
                  <p className="text-[11px] font-semibold text-[#9b95a8]">
                    THEN #{t.order}
                  </p>
                  <p className="text-[15px] font-semibold text-[#1a1625]">
                    {t.title}
                  </p>
                  <p className="text-[13px] text-[#9b95a8]">{t.minutes} min</p>
                </Link>
              ))}
              <p className="text-center text-[13px] text-[#9b95a8]">
                Start with #1 and don&apos;t think about the rest yet.
              </p>
            </section>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex flex-col items-center gap-1 rounded-3xl border border-rose-100 bg-white py-4 text-[13px] font-medium text-rose-600"
            >
              <Coffee size={20} />
              Coffee break first
            </button>
            <PrimaryButton
              href="/focus-mode"
              variant="soft"
              className="!h-auto flex-col gap-1 py-4"
            >
              <Target size={20} />
              Focus mode
            </PrimaryButton>
          </div>

          <PrimaryButton
            onClick={() => {
              if (!demo.planAccepted) acceptPlan();
              router.push("/focus-mode");
            }}
          >
            <span className="flex items-center gap-2">
              <Play size={18} fill="currentColor" />
              {demo.planAccepted ? "Start focus" : "Lock in & start"}
            </span>
          </PrimaryButton>
        </div>
      </ScrollArea>
    </>
  );
}

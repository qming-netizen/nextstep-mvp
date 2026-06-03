"use client";

import Link from "next/link";
import type { UserPlan } from "@/lib/types";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

export function TodayPlanPreview({ plan }: { plan: UserPlan }) {
  const hero = plan.tasks.find((t) => t.id === plan.heroTaskId) ?? plan.tasks[0];
  const rest = plan.tasks.filter((t) => t.id !== hero?.id);

  if (!hero) return null;

  return (
    <div className="space-y-4 py-2">
      <NovaOnboardingBubble message={plan.novaIntro} />

      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
          Your #1 next step
        </p>
        <div
          className={`rounded-3xl border-l-[5px] bg-white p-4 shadow-md ${hero.accentClass}`}
        >
          <p className="text-[18px] font-bold text-[#1a1625]">{hero.title}</p>
          <p className="mt-1 text-[13px] text-[#6b6578]">
            {hero.minutes} min · {hero.dueLabel}
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6b6578]">
            {hero.reason}
          </p>
          <div className="mt-4 flex justify-between text-[12px] text-[#9b95a8]">
            <span>← skip</span>
            <span className="font-medium text-emerald-600">swipe to start →</span>
          </div>
        </div>
      </div>

      <Link
        href={`/tasks/${hero.id}`}
        className="flex h-14 w-full items-center justify-center rounded-full bg-[#FF9B7A] text-[16px] font-bold text-white shadow-lg shadow-orange-300/30"
      >
        I&apos;m starting {hero.subject} now →
      </Link>

      {rest.map((task) => (
        <div
          key={task.id}
          className="rounded-3xl bg-white/90 p-4 shadow-sm backdrop-blur-sm"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
            Then #{task.order}
          </p>
          <p className="mt-1 text-[16px] font-semibold text-[#1a1625]">
            {task.title}
          </p>
          <p className="text-[13px] text-[#9b95a8]">{task.minutes} min</p>
          {task.order === 2 && (
            <p className="mt-2 text-[13px] leading-relaxed text-[#6b6578]">
              Good practice — your deadline is coming and you&apos;ve got some
              runway before it hits.
            </p>
          )}
        </div>
      ))}

      <p className="text-center text-[13px] text-[#9b95a8]">
        That&apos;s it. Start with #1 and don&apos;t think about the rest yet.
      </p>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-3xl border border-violet-100 bg-white p-4 text-center shadow-sm">
          <span className="text-2xl">☕</span>
          <p className="mt-1 text-[13px] font-medium text-[#1a1625]">
            Coffee break first
          </p>
        </div>
        <Link
          href="/focus-mode"
          className="rounded-3xl border border-violet-100 bg-white p-4 text-center shadow-sm"
        >
          <span className="text-2xl">🎯</span>
          <p className="mt-1 text-[13px] font-medium text-[#1a1625]">Focus mode</p>
        </Link>
      </div>
    </div>
  );
}

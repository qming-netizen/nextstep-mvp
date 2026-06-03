"use client";

import Link from "next/link";
import { NovaCharacter } from "@/components/NovaCharacter";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { AssignmentProgressCard } from "@/components/tasks/AssignmentProgressCard";
import { weeklyAssignments } from "@/lib/assignments-dashboard";
import { demoWeekRangeLabel } from "@/lib/assignment-progress";
import { useApp } from "@/context/AppContext";

export default function TasksPage() {
  const { completedMicroSteps } = useApp();

  return (
    <>
      <PageHeader title="Tasks" />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-6">
          <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              This week
            </p>
            <p className="mt-0.5 text-[16px] font-semibold text-[#1a1625]">
              {demoWeekRangeLabel}
            </p>
          </div>

          <div className="space-y-3">
            {weeklyAssignments.map((assignment, index) => (
              <AssignmentProgressCard
                key={assignment.id}
                assignment={assignment}
                completedMicroSteps={completedMicroSteps}
                index={index}
              />
            ))}
          </div>

          <Link
            href="/home"
            className="flex items-start gap-3 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm active:bg-violet-50/50"
          >
            <NovaCharacter
              state="focus"
              size={52}
              float={false}
              glow
              className="mx-0 shrink-0"
            />
            <div className="min-w-0 pt-1">
              <p className="text-[14px] leading-relaxed text-[#1a1625]">
                Not sure where to start? Go back to dashboard — see your micro
                step for each assignment.
              </p>
              <span className="mt-2 inline-block text-[13px] font-semibold text-violet-600">
                Back to dashboard →
              </span>
            </div>
          </Link>
        </div>
      </ScrollArea>
    </>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { tasks } from "@/lib/mock-data";

export default function TasksPage() {
  return (
    <>
      <PageHeader title="Tasks" subtitle="Broken into calm micro-steps" />
      <ScrollArea>
        <div className="space-y-3 px-5 pb-4">
          {tasks.map((task) => {
            const doneSteps = task.steps.filter((s) => s.status === "done").length;
            const progress = Math.round((doneSteps / task.steps.length) * 100);
            return (
              <Link
                key={task.id}
                href={`/tasks/${task.id}`}
                className="block rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold ${
                      task.status === "missed"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {task.subject.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-[#1a1625]">{task.title}</p>
                      <ArrowRight size={18} className="shrink-0 text-[#c4bfd0]" />
                    </div>
                    <p className="mt-0.5 text-[12px] text-[#6b6578]">
                      {task.dueLabel} · 5 steps · ~{task.estimatedMinutes} min
                    </p>
                    {task.status === "missed" && (
                      <div className="mt-2 flex items-center gap-1 text-[12px] text-amber-600">
                        <AlertCircle size={14} />
                        Missed — tap for recovery
                      </div>
                    )}
                    <div className="mt-3">
                      <div className="h-1.5 overflow-hidden rounded-full bg-violet-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] text-[#9b95a8]">
                        {doneSteps} of 5 steps done
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}

"use client";

import { NovaCard } from "@/components/NovaCard";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { SwipeTaskStack } from "@/components/SwipeTaskCard";
import { tasks } from "@/lib/mock-data";

export default function TasksPage() {
  const swipeTasks = tasks
    .filter((t) => t.status !== "done")
    .map((t) => ({
      id: t.id,
      title: t.title,
      subject: t.subject,
      dueLabel: t.dueLabel,
      estimatedMinutes: t.estimatedMinutes,
    }));

  return (
    <>
      <PageHeader title="Tasks" subtitle="Swipe to move forward" />
      <ScrollArea>
        <div className="space-y-4 px-5 pb-4">
          <NovaCard
            character="focus"
            message="Let's tackle Biology first."
            subtitle="Swipe right to complete · left to reschedule"
            compact
          />
          <SwipeTaskStack tasks={swipeTasks} />
        </div>
      </ScrollArea>
    </>
  );
}

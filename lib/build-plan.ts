import type { DueWhen } from "./onboarding-content";
import { subjectOptions } from "./onboarding-content";

export interface PlateEntry {
  subjectId: string;
  dueWhen: DueWhen;
  customTitle?: string;
}

export interface SharedAssignmentInput {
  id: string;
  subjectId: string;
  title: string;
  dueWhen: DueWhen;
  source: "canvas" | "google" | "upload" | "voice";
}

export interface PlanStep {
  id: string;
  title: string;
  estimatedMinutes: number;
  status: "pending" | "done";
}

export interface PlanTaskItem {
  id: string;
  order: number;
  subjectId: string;
  subject: string;
  emoji: string;
  title: string;
  minutes: number;
  dueLabel: string;
  reason: string;
  accentClass: string;
  steps: PlanStep[];
}

export interface BuiltPlan {
  tasks: PlanTaskItem[];
  heroTaskId: string;
  totalMinutes: number;
  novaIntro: string;
  novaConfirm: string;
}

const dueUrgency: Record<DueWhen, number> = {
  today: 0,
  tomorrow: 1,
  "this-week": 2,
  "next-week": 3,
  "not-sure": 4,
};

const dueLabels: Record<DueWhen, string> = {
  today: "Due today",
  tomorrow: "Due tomorrow",
  "this-week": "Due this week",
  "next-week": "Due next week",
  "not-sure": "Due date TBD",
};

const accentBySubject: Record<string, string> = {
  maths: "border-l-[#7CB9FF]",
  science: "border-l-[#FF9B7A]",
  english: "border-l-[#7DD3A8]",
  history: "border-l-[#C4A1FF]",
  art: "border-l-[#FFB4D9]",
  computing: "border-l-[#8BD4FF]",
  bio: "border-l-[#FF9B7A]",
  default: "border-l-violet-400",
};

function subjectMeta(subjectId: string) {
  const found = subjectOptions.find((s) => s.id === subjectId);
  return found ?? { id: subjectId, label: "Assignment", emoji: "📝" };
}

function defaultTitle(subjectId: string): string {
  const titles: Record<string, string> = {
    maths: "Chapter review & practice",
    science: "Lab / chapter work",
    english: "Essay or reading response",
    history: "Reading + short write-up",
    art: "Project milestone",
    computing: "Problem set or project",
    bio: "Lab report — enzyme kinetics",
    calc: "Quiz prep — derivatives",
    hist: "Discussion post",
  };
  return titles[subjectId] ?? "Assignment block";
}

function breakIntoSteps(title: string, totalMin: number): PlanStep[] {
  const chunk = Math.max(8, Math.min(15, Math.round(totalMin / 4)));
  const templates = [
    `Skim the brief for "${title.slice(0, 28)}…"`,
    "Gather notes & materials",
    "Do the core work (draft / problems)",
    "Quick check & tidy up",
  ];
  let remaining = totalMin;
  return templates.map((t, i) => {
    const mins = i === templates.length - 1 ? remaining : Math.min(chunk, remaining);
    remaining -= mins;
    return {
      id: `step-${i}`,
      title: t,
      estimatedMinutes: Math.max(5, mins),
      status: i === 0 ? "done" : "pending",
    };
  });
}

function buildReason(
  dueWhen: DueWhen,
  subjectLabel: string,
  mood?: string,
  nerveWracking?: boolean
): string {
  if (dueWhen === "today" || dueWhen === "tomorrow") {
    return nerveWracking
      ? `I'm starting here because the deadline is closest and you flagged ${subjectLabel} as the most nerve-wracking.`
      : `Closest deadline — let's get ${subjectLabel} off your chest first.`;
  }
  if (dueWhen === "this-week") {
    return `Good runway, but doing a slice now stops the Sunday panic spiral.`;
  }
  return `Lighter slot today — saves your future self from a cram session.`;
}

export function buildPlanFromOnboarding(input: {
  plate: PlateEntry[];
  assignments: SharedAssignmentInput[];
  weeklyHours: number;
  moodId?: string;
  nerveSubjectId?: string;
}): BuiltPlan {
  const merged: {
    subjectId: string;
    title: string;
    dueWhen: DueWhen;
  }[] = [];

  for (const a of input.assignments) {
    merged.push({
      subjectId: a.subjectId,
      title: a.title,
      dueWhen: a.dueWhen,
    });
  }

  for (const p of input.plate) {
    if (merged.some((m) => m.subjectId === p.subjectId)) continue;
    const meta = subjectMeta(p.subjectId);
    merged.push({
      subjectId: p.subjectId,
      title: p.customTitle ?? `${meta.label} — ${defaultTitle(p.subjectId)}`,
      dueWhen: p.dueWhen,
    });
  }

  if (merged.length === 0) {
    merged.push(
      {
        subjectId: "science",
        title: "Biology — Chapter 4 Review",
        dueWhen: "tomorrow",
      },
      {
        subjectId: "maths",
        title: "Maths — Practice questions",
        dueWhen: "this-week",
      },
      {
        subjectId: "english",
        title: "English essay outline",
        dueWhen: "this-week",
      }
    );
  }

  merged.sort((a, b) => dueUrgency[a.dueWhen] - dueUrgency[b.dueWhen]);

  const totalBudgetMin = Math.round(input.weeklyHours * 60);
  const perTask = Math.max(
    15,
    Math.floor(totalBudgetMin / Math.min(merged.length, 3))
  );

  const tasks: PlanTaskItem[] = merged.slice(0, 3).map((item, index) => {
    const meta = subjectMeta(item.subjectId);
    const minutes =
      index === 0
        ? Math.min(perTask + 5, Math.max(20, Math.round(totalBudgetMin * 0.4)))
        : Math.min(perTask, Math.max(15, Math.round(totalBudgetMin * 0.3)));

    return {
      id: `plan-${item.subjectId}-${index}`,
      order: index + 1,
      subjectId: item.subjectId,
      subject: meta.label,
      emoji: meta.emoji,
      title: item.title,
      minutes,
      dueLabel: dueLabels[item.dueWhen],
      reason: buildReason(
        item.dueWhen,
        meta.label,
        input.moodId,
        input.nerveSubjectId === item.subjectId
      ),
      accentClass: accentBySubject[item.subjectId] ?? accentBySubject.default,
      steps: breakIntoSteps(item.title, minutes),
    };
  });

  const hero = tasks[0];

  return {
    tasks,
    heroTaskId: hero.id,
    totalMinutes: tasks.reduce((s, t) => s + t.minutes, 0),
    novaIntro: "Here's your plan for today. I kept it calm and clear.",
    novaConfirm:
      input.moodId === "overwhelmed"
        ? "Perfect. One step at a time — that's genuinely enough."
        : "Perfect. That's exactly what I needed.",
  };
}

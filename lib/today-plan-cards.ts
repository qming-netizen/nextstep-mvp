import type { UserPlan, UserPlanTask } from "./types";
import { focusRecommendation, tasks } from "./mock-data";

export interface TodayPlanCard {
  id: string;
  order: number;
  title: string;
  subject: string;
  emoji: string;
  minutes: number;
  dueLabel: string;
  scheduleHint: string;
  whyNow: string;
  accentClass: string;
  href: string;
}

function scheduleHintFromDue(dueLabel: string, order: number): string {
  if (dueLabel.toLowerCase().includes("today")) return "Tonight · first slot";
  if (dueLabel.toLowerCase().includes("tomorrow")) return "Exam in 2 days";
  if (order === 1) return "Tonight at 8pm";
  if (order === 2) return "Right after this";
  return "When you have a free slot";
}

function cardFromPlanTask(t: UserPlanTask): TodayPlanCard {
  return {
    id: t.id,
    order: t.order,
    title: t.title,
    subject: t.subject,
    emoji: t.emoji,
    minutes: t.minutes,
    dueLabel: t.dueLabel,
    scheduleHint: scheduleHintFromDue(t.dueLabel, t.order),
    whyNow: t.reason,
    accentClass: t.accentClass,
    href: `/tasks/${t.id}`,
  };
}

/** Default Emily demo — matches onboarding example + Canvas tasks */
export const defaultTodayPlanCards: TodayPlanCard[] = [
  {
    id: "bio-lab",
    order: 1,
    title: "Lab report — enzyme kinetics",
    subject: "Biology",
    emoji: "🔬",
    minutes: 45,
    dueLabel: "Due Mon, 11:59 PM",
    scheduleHint: "Due in 27 hours",
    whyNow:
      "I'm starting here because your deadline is closest and finishing methods tonight unlocks results tomorrow.",
    accentClass: "border-l-[#FF9B7A]",
    href: "/tasks/bio-lab",
  },
  {
    id: "calc-hw",
    order: 2,
    title: "Quiz 3 prep — derivatives",
    subject: "Calculus",
    emoji: "📐",
    minutes: 60,
    dueLabel: "Due Tue, 5:00 PM",
    scheduleHint: "Tomorrow afternoon",
    whyNow:
      "Good practice — your test is coming up and you've got some runway before it hits.",
    accentClass: "border-l-[#7CB9FF]",
    href: "/tasks/calc-hw",
  },
  {
    id: "hist-reading",
    order: 3,
    title: "Discussion post — Ch. 12",
    subject: "History",
    emoji: "📖",
    minutes: 35,
    dueLabel: "Due Wed, 9:00 AM",
    scheduleHint: "Wednesday morning",
    whyNow:
      "A short slice now means you're not drafting from zero on Tuesday night.",
    accentClass: "border-l-[#7DD3A8]",
    href: "/tasks/hist-reading",
  },
];

export function getTodayPlanCards(plan: UserPlan | null): TodayPlanCard[] {
  if (plan?.tasks?.length) {
    return [...plan.tasks]
      .sort((a, b) => a.order - b.order)
      .map(cardFromPlanTask);
  }

  return defaultTodayPlanCards.map((c) => ({
    ...c,
    whyNow:
      c.id === "bio-lab"
        ? focusRecommendation.reasoning.slice(0, 120) + "…"
        : c.whyNow,
    minutes:
      tasks.find((t) => t.id === c.id)?.estimatedMinutes ?? c.minutes,
  }));
}

export function novaPlanIntro(plan: UserPlan | null): string {
  return plan?.novaIntro ?? "Here's your plan for today. I kept it calm and clear.";
}

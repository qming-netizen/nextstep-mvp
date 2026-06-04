import { weeklyAssignments } from "./assignments-dashboard";

export const novaRecommendation = {
  message:
    "CS101 needs attention tonight.\nStarting now will save you stress later.",
  priorityLabel: "Priority #1",
  title: "CS101 Group Project",
  emoji: "💻",
  dueLabel: "Due Thursday 12:00 PM",
  assignmentId: "cs101",
  firstStepId: "cs1",
  href: "/focus-session",
} as const;

export const activeAssignmentCount = weeklyAssignments.length;

export function formatDueShort(dueLabel: string) {
  return dueLabel.replace(/^Due /i, "");
}

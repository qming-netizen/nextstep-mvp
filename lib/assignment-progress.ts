import {
  weeklyAssignments,
  type DashboardAssignment,
} from "./assignments-dashboard";

/** Demo week range shown on Tasks tab */
export const demoWeekRangeLabel = "Week · 3.9–3.15";

export function getAssignmentProgress(
  assignment: DashboardAssignment,
  completedMicroSteps: string[]
) {
  const total = assignment.microSteps.length;
  const completed = assignment.microSteps.filter((s) =>
    completedMicroSteps.includes(s.id)
  ).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

export function getCurrentMicroStep(
  assignment: DashboardAssignment,
  completedMicroSteps: string[]
) {
  return (
    assignment.microSteps.find((s) => !completedMicroSteps.includes(s.id)) ??
    assignment.microSteps[assignment.microSteps.length - 1]
  );
}

export function getAssignmentById(id: string) {
  return weeklyAssignments.find((a) => a.id === id);
}

export function getMicroStepById(stepId: string) {
  for (const assignment of weeklyAssignments) {
    const step = assignment.microSteps.find((s) => s.id === stepId);
    if (step) return { assignment, step };
  }
  return null;
}

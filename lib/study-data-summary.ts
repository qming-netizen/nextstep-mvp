import { weeklyAssignments } from "@/lib/assignments-dashboard";
import { getAssignmentProgress } from "@/lib/assignment-progress";
import type { DemoPersistedState } from "@/lib/demo-flow";
import type { UserProfile } from "@/lib/types";

export const STUDY_DATA_PROMPT = "Learn about my study data";

export function buildStudyDataSummary(
  completedMicroSteps: string[],
  demo: DemoPersistedState,
  user: UserProfile
): string {
  const lines: string[] = [
    "Here's what I've learned from your week (Mar 9–15):",
    "",
  ];

  const progressLines = weeklyAssignments.map((assignment) => {
    const { completed, total, percent } = getAssignmentProgress(
      assignment,
      completedMicroSteps
    );
    return `• ${assignment.course}: ${completed} of ${total} steps (${percent}%) — ${assignment.dueLabel}`;
  });

  lines.push("Progress", ...progressLines, "");

  const totalSteps = weeklyAssignments.reduce(
    (sum, a) => sum + a.microSteps.length,
    0
  );
  const totalCompleted = completedMicroSteps.filter((id) =>
    weeklyAssignments.some((a) => a.microSteps.some((s) => s.id === id))
  ).length;

  lines.push(
    "Patterns",
    `• ${totalCompleted} of ${totalSteps} micro-steps completed this week`,
    `• You study best in the ${user.energyPattern || "evening"} — I've been protecting that window`,
    `• ${user.pacing === "gentle" ? "Gentle pacing" : "Steady pacing"} fits how you like to work`
  );

  if (demo.focusCompleted) {
    lines.push("• You finished at least one focus session — nice momentum");
  }
  if (demo.planAccepted) {
    lines.push("• Your weekly plan was accepted — I'm building around it");
  }

  const heaviest = [...weeklyAssignments].sort(
    (a, b) => b.effortHours - a.effortHours
  )[0];
  lines.push(
    "",
    "Workload",
    `• ${heaviest.course} is your biggest lift (~${heaviest.effortHours} hrs) — ${heaviest.title}`,
    "",
    "All of this stays on your device. I use it only to suggest timing and breaks — never to judge."
  );

  return lines.join("\n");
}

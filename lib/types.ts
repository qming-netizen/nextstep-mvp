export type TaskStatus = "pending" | "in_progress" | "done" | "missed";

export interface MicroStep {
  id: string;
  title: string;
  estimatedMinutes: number;
  status: TaskStatus;
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueLabel: string;
  priority: number;
  estimatedMinutes: number;
  status: TaskStatus;
  steps: MicroStep[];
}

export interface FocusRecommendation {
  subject: string;
  reasoning: string;
  workloadEstimate: string;
  focusWindow: string;
  whyFirst?: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  hardest: string[];
  studyStyle: string[];
  pacing: string;
  energyPattern: string;
  /** Playful onboarding */
  moodId?: string;
  timeAvailableMin?: number;
  energyLevel?: string;
  todayWin?: string;
  todayWinCustom?: string;
}

export interface OnboardingPlateItem {
  subjectId: string;
  dueWhen: string;
  customTitle?: string;
}

export interface OnboardingAssignment {
  id: string;
  subjectId: string;
  title: string;
  dueWhen: string;
  source: "canvas" | "google" | "upload" | "voice";
  fileName?: string;
}

export interface UserPlanStep {
  id: string;
  title: string;
  estimatedMinutes: number;
  status: "pending" | "done";
}

export interface UserPlanTask {
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
  steps: UserPlanStep[];
}

export interface UserPlan {
  tasks: UserPlanTask[];
  heroTaskId: string;
  totalMinutes: number;
  weeklyHours: number;
  novaIntro: string;
  novaConfirm: string;
}

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
}

export interface UserProfile {
  name: string;
  email: string;
  hardest: string[];
  studyStyle: string[];
  pacing: string;
  energyPattern: string;
}

export interface OnboardingState {
  step: number;
  hardest: string[];
  studyStyle: string[];
  pacing: string;
  energyPattern: string;
  name: string;
  email: string;
}

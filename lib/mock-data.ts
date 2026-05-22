import type { FocusRecommendation, Task } from "./types";

export const focusRecommendation: FocusRecommendation = {
  subject: "Biology",
  reasoning:
    "Your lab report is due tomorrow and you've made the most progress here this week.",
  workloadEstimate: "~45 min · 5 micro-steps",
  focusWindow: "7:30 – 8:15 PM",
};

export const tasks: Task[] = [
  {
    id: "bio-lab",
    title: "Finish Biology lab report",
    subject: "Biology",
    dueLabel: "Due tomorrow",
    priority: 1,
    estimatedMinutes: 45,
    status: "pending",
    steps: [
      { id: "s1", title: "Review lab notes & rubric", estimatedMinutes: 8, status: "done" },
      { id: "s2", title: "Draft methods section", estimatedMinutes: 12, status: "pending" },
      { id: "s3", title: "Write results paragraph", estimatedMinutes: 10, status: "pending" },
      { id: "s4", title: "Add figures & captions", estimatedMinutes: 10, status: "pending" },
      { id: "s5", title: "Proofread & export PDF", estimatedMinutes: 5, status: "pending" },
    ],
  },
  {
    id: "calc-hw",
    title: "Calculus problem set 7",
    subject: "Calculus",
    dueLabel: "Due Friday",
    priority: 2,
    estimatedMinutes: 60,
    status: "pending",
    steps: [
      { id: "c1", title: "Skim chapter 4 summary", estimatedMinutes: 10, status: "pending" },
      { id: "c2", title: "Problems 1–5 (derivatives)", estimatedMinutes: 15, status: "pending" },
      { id: "c3", title: "Problems 6–10 (chain rule)", estimatedMinutes: 20, status: "pending" },
      { id: "c4", title: "Check odd answers", estimatedMinutes: 10, status: "pending" },
      { id: "c5", title: "Flag questions for office hours", estimatedMinutes: 5, status: "pending" },
    ],
  },
  {
    id: "hist-reading",
    title: "History reading — Ch. 12",
    subject: "History",
    dueLabel: "Flexible",
    priority: 3,
    estimatedMinutes: 35,
    status: "missed",
    steps: [
      { id: "h1", title: "Preview section headings", estimatedMinutes: 5, status: "pending" },
      { id: "h2", title: "Read pp. 240–255", estimatedMinutes: 20, status: "pending" },
      { id: "h3", title: "Note 3 key themes", estimatedMinutes: 5, status: "pending" },
      { id: "h4", title: "Write discussion question", estimatedMinutes: 3, status: "pending" },
      { id: "h5", title: "Save highlights to Notion", estimatedMinutes: 2, status: "pending" },
    ],
  },
];

export const todayStats = {
  completed: 2,
  total: 5,
  momentum: 68,
  streak: 4,
};

export const weeklyProgress = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 58 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 40 },
  { day: "Sat", value: 20 },
  { day: "Sun", value: 68 },
];

export const focusPlanBlocks = [
  { time: "7:30 PM", title: "Biology lab report", duration: "45 min", active: true },
  { time: "8:20 PM", title: "Short break", duration: "10 min", active: false },
  { time: "8:30 PM", title: "Calculus — warm-up only", duration: "20 min", active: false },
];

export const recoveryOptions = [
  {
    id: "lighten",
    title: "Lighten tonight",
    description: "Keep one focus block. Move the rest to flexible slots.",
    icon: "feather" as const,
  },
  {
    id: "move",
    title: "Move flexible tasks",
    description: "Shift History reading to tomorrow morning.",
    icon: "calendar" as const,
  },
  {
    id: "protect",
    title: "Protect focus time",
    description: "Block 45 min with no notifications for Biology.",
    icon: "shield" as const,
  },
  {
    id: "rebuild",
    title: "Rebuild tomorrow",
    description: "Start fresh with a lighter, realistic plan.",
    icon: "sunrise" as const,
  },
];

export const updatedRecoveryPlan = [
  { time: "Tonight", task: "Biology lab report (lightened)", duration: "30 min" },
  { time: "Tomorrow 9 AM", task: "History reading — Ch. 12", duration: "35 min" },
  { time: "Tomorrow 4 PM", task: "Calculus problem set (partial)", duration: "25 min" },
];

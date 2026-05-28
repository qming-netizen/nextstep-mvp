import type { FocusRecommendation, Task } from "./types";

export const canvasDeadlines = [
  {
    id: "bio",
    course: "BIOL 204",
    title: "Lab report — enzyme kinetics",
    due: "Mon, 11:59 PM",
    urgent: true,
  },
  {
    id: "calc",
    course: "MATH 152",
    title: "Quiz 3 prep — derivatives",
    due: "Tue, 5:00 PM",
    urgent: false,
  },
  {
    id: "hist",
    course: "HIST 110",
    title: "Discussion post — Ch. 12",
    due: "Wed, 9:00 AM",
    urgent: false,
  },
];

export const focusRecommendation: FocusRecommendation = {
  subject: "Biology",
  reasoning:
    "Due in 27 hours, rubric already reviewed, and it's the anchor of this week's deadline cluster. Finishing methods tonight unlocks results tomorrow without a late-night scramble.",
  workloadEstimate: "~45 min · 5 micro-steps",
  focusWindow: "7:30 – 8:15 PM",
  whyFirst: [
    "Closest deadline in your Canvas cluster",
    "You already completed step 1 (rubric review)",
    "Partial credit risk is highest if this slips",
  ],
};

export const tasks: Task[] = [
  {
    id: "bio-lab",
    title: "Lab report — enzyme kinetics",
    subject: "Biology",
    dueLabel: "Due Mon, 11:59 PM",
    priority: 1,
    estimatedMinutes: 45,
    status: "pending",
    steps: [
      { id: "s1", title: "Review lab notes & rubric", estimatedMinutes: 8, status: "done" },
      { id: "s2", title: "Draft methods section", estimatedMinutes: 12, status: "pending" },
      { id: "s3", title: "Write results paragraph", estimatedMinutes: 10, status: "pending" },
      { id: "s4", title: "Add figures & captions", estimatedMinutes: 10, status: "pending" },
      { id: "s5", title: "Proofread & submit to Canvas", estimatedMinutes: 5, status: "pending" },
    ],
  },
  {
    id: "calc-hw",
    title: "Quiz 3 prep — derivatives",
    subject: "Calculus",
    dueLabel: "Due Tue, 5:00 PM",
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
    title: "Discussion post — Ch. 12",
    subject: "History",
    dueLabel: "Due Wed, 9:00 AM",
    priority: 3,
    estimatedMinutes: 35,
    status: "pending",
    steps: [
      { id: "h1", title: "Preview section headings", estimatedMinutes: 5, status: "pending" },
      { id: "h2", title: "Read pp. 240–255", estimatedMinutes: 20, status: "pending" },
      { id: "h3", title: "Note 3 key themes", estimatedMinutes: 5, status: "pending" },
      { id: "h4", title: "Draft discussion response", estimatedMinutes: 3, status: "pending" },
      { id: "h5", title: "Post to Canvas discussion", estimatedMinutes: 2, status: "pending" },
    ],
  },
];

export const todayStatsInitial = {
  completed: 1,
  total: 5,
  momentum: 42,
  streak: 3,
};

export const todayStatsAfterFocus = {
  completed: 2,
  total: 5,
  momentum: 61,
  streak: 4,
};

export const weeklyProgressInitial = [
  { day: "Mon", value: 55 },
  { day: "Tue", value: 48 },
  { day: "Wed", value: 62 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 35 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 42 },
];

export const weeklyProgressAfterFocus = [
  { day: "Mon", value: 55 },
  { day: "Tue", value: 48 },
  { day: "Wed", value: 62 },
  { day: "Thu", value: 40 },
  { day: "Fri", value: 35 },
  { day: "Sat", value: 25 },
  { day: "Sun", value: 68 },
];

export const focusPlanBlocks = [
  { time: "7:30 PM", title: "Biology — draft methods", duration: "45 min", active: true },
  { time: "8:20 PM", title: "Rest & water", duration: "10 min", active: false },
  { time: "8:30 PM", title: "Calculus — 4 warm-up problems", duration: "20 min", active: false },
];

export const recoveryOptions = [
  {
    id: "lighten",
    title: "Lighten tonight",
    description: "One 30-minute Biology block. Pause Calculus until Tuesday.",
    icon: "feather" as const,
  },
  {
    id: "move",
    title: "Move flexible tasks",
    description: "Shift History discussion draft to Monday morning.",
    icon: "calendar" as const,
  },
  {
    id: "protect",
    title: "Protect recovery time",
    description: "Block 30 min for Biology only — no guilt about the rest.",
    icon: "shield" as const,
  },
  {
    id: "rebuild",
    title: "Rebuild Monday calmly",
    description: "Spread the cluster across Mon–Wed with lighter evenings.",
    icon: "sunrise" as const,
  },
];

export const updatedRecoveryPlan = [
  { time: "Tonight (optional)", task: "Biology methods — shortened", duration: "30 min" },
  { time: "Mon, 9:00 AM", task: "History discussion draft", duration: "35 min" },
  { time: "Mon, 4:00 PM", task: "Calculus quiz prep — partial", duration: "25 min" },
  { time: "Tue evening", task: "Biology results & figures", duration: "40 min" },
];

export type UnstuckBarrierId =
  | "dont-know-start"
  | "too-big"
  | "overwhelmed"
  | "distracted"
  | "lost-motivation"
  | "need-break";

export const unstuckOptions: { id: UnstuckBarrierId; label: string }[] = [
  { id: "dont-know-start", label: "I don't know where to start" },
  { id: "too-big", label: "The task feels too big" },
  { id: "overwhelmed", label: "I'm overwhelmed" },
  { id: "distracted", label: "I'm distracted" },
  { id: "lost-motivation", label: "I lost motivation" },
  { id: "need-break", label: "I need a break first" },
];

export interface UnstuckResponse {
  novaMessage: string;
  character: "overwhelmed" | "focus" | "break" | "happy";
  steps?: string[];
  microSteps?: string[];
  cards?: { emoji: string; text: string }[];
  cta: string;
  href: string;
  secondary?: { label: string; href: string };
}

export const unstuckResponses: Record<UnstuckBarrierId, UnstuckResponse> = {
  "dont-know-start": {
    novaMessage: "Let's pick the smallest possible first move.",
    character: "overwhelmed",
    steps: [
      "Step 1: Open the assignment",
      "Step 2: Read the prompt",
      "Step 3: Write one messy sentence",
    ],
    cta: "Start 5-minute step",
    href: "/focus-session",
  },
  "too-big": {
    novaMessage: "Let's shrink it.",
    character: "overwhelmed",
    microSteps: [
      "Open Google Docs",
      "Write the title",
      "Add three bullet points",
      "Find one source",
    ],
    cta: "Start smaller version",
    href: "/home",
  },
  overwhelmed: {
    novaMessage: "You don't need to solve the whole week right now.",
    character: "overwhelmed",
    cards: [
      { emoji: "☕", text: "Take a 10-minute reset" },
      { emoji: "🎯", text: "Then start one 15-minute task" },
    ],
    cta: "Take a break first",
    href: "/recharge",
  },
  distracted: {
    novaMessage: "Let's make focus easier.",
    character: "focus",
    cards: [
      { emoji: "⏱️", text: "25-minute focus timer" },
      { emoji: "👀", text: "Hide other tasks" },
      { emoji: "📌", text: "One card only" },
    ],
    cta: "Start Focus Mode",
    href: "/focus-session",
  },
  "lost-motivation": {
    novaMessage: "Let's reconnect this to a small win.",
    character: "happy",
    cards: [
      { emoji: "✓", text: "Finish one easy step" },
      { emoji: "🎉", text: "Celebrate progress" },
      { emoji: "↩️", text: "Return to plan" },
    ],
    cta: "Find quick win",
    href: "/tasks",
  },
  "need-break": {
    novaMessage: "Breaks count too. I'll keep your place.",
    character: "break",
    cta: "Start Break",
    href: "/recharge",
  },
};

export const breakDurationOptions = [
  { minutes: 5, label: "5-minute break" },
  { minutes: 10, label: "10-minute break" },
  { minutes: 15, label: "15-minute break" },
] as const;

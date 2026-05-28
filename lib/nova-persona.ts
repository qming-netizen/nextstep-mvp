export type NovaMode = "gentle" | "direct";

export type NovaSourceId =
  | "canvas"
  | "calendar"
  | "workShifts"
  | "syllabus"
  | "preferences"
  | "completionPatterns";

export interface NovaReasoningModel {
  whyNow: string[];
  whatChanged?: string;
  sources: NovaSourceId[];
  estimatedEffort: string;
  confidence: "Low" | "Medium" | "High";
  tradeoff: string;
  approval: { primary: string; secondary: string };
}

export const novaIdentity = {
  name: "Nova",
  tagline: "Your calm AI planning partner",
};

export const novaHowItWorks = {
  does: [
    "Helps you decide what to do first when everything feels urgent",
    "Turns heavy tasks into small, realistic steps",
    "Adapts plans when life changes — without guilt",
    "Explains tradeoffs honestly so you stay in control",
  ],
  doesNot: [
    "Write assignments for you",
    "Change your plan without approval",
    "Diagnose stress, anxiety, or health conditions",
    "Spam notifications to force productivity",
  ],
  whyAskFirst:
    "Because constraints matter. Nova asks before planning so the plan matches your real time, energy, and deadlines — not an ideal schedule.",
  recovery:
    "Recovery is built in. Missed sessions are treated as signal, not failure. Nova rebuilds around what’s still possible.",
  dataToAction:
    "Nova reads your deadlines and availability, proposes a plan, shows reasoning + tradeoffs, then waits for your approval before applying changes.",
};

export const sourceLabels: Record<NovaSourceId, string> = {
  canvas: "Canvas deadlines",
  calendar: "Calendar availability",
  workShifts: "Work shifts",
  syllabus: "Syllabus uploads",
  preferences: "Your preferences",
  completionPatterns: "Completion patterns",
};

export const novaBoundaries = [
  "Nova proposes — you decide.",
  "No plan changes without approval.",
  "Nova won’t write or fabricate academic work.",
  "Nova won’t diagnose mental or physical health.",
  "Nova avoids over-notifying; autonomy beats dependency.",
];

export function memoryNudge({
  mode,
  context,
}: {
  mode: NovaMode;
  context: "home" | "task" | "recovery" | "progress";
}) {
  if (context === "recovery") {
    return mode === "direct"
      ? "Pattern I've noticed: plans break most often after long shifts. I'm keeping this rebuild lighter on purpose."
      : "I’m noticing a pattern: plans tend to break after long shifts. I’m keeping this rebuild lighter on purpose.";
  }
  if (context === "task") {
    return mode === "direct"
      ? "I'm still learning your pace, so this estimate may shift."
      : "I’m still learning your pace, so this estimate may shift.";
  }
  if (context === "progress") {
    return mode === "direct"
      ? "Last time, shorter morning sessions worked better. I'm leaning into that."
      : "Last time, shorter morning sessions worked better. I’m leaning into that.";
  }
  return mode === "direct"
    ? "I'm learning what your weeks actually look like — this gets more accurate over time."
    : "I’m learning what your weeks actually look like — this gets more accurate over time.";
}


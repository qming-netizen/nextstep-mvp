export type DanielOptionId = "option-a" | "option-b";

export interface DanielContext {
  personaName: string;
  personaSubtitle: string;
  shiftOriginal: string;
  shiftNew: string;
  lostBlock: string;
  lostBlockWhat: string;
  atRisk: { item: string; due: string; why: string }[];
}

export const danielContext: DanielContext = {
  personaName: "Daniel Nguyen",
  personaSubtitle: "22 · Communications · Café shifts change weekly",
  shiftOriginal: "Thu, 2:00 – 6:00 PM",
  shiftNew: "Thu, 2:00 – 10:00 PM",
  lostBlock: "Thu, 7:00 – 9:30 PM",
  lostBlockWhat: "Sociology paper writing session",
  atRisk: [
    {
      item: "Sociology paper (draft + citations)",
      due: "Fri, 5:00 PM",
      why: "Your only deep work window before Friday was Thursday night.",
    },
    {
      item: "Quiz review (short block)",
      due: "Fri morning",
      why: "If writing expands, quiz time tends to disappear first.",
    },
  ],
};

export const danielCopy = {
  intro:
    "Got it. An extended shift like that can wipe out the exact block you were counting on — that's stressful.",
  conflictExplain:
    "Your shift now overlaps your Thursday evening study window. That means the Sociology writing block we planned for Thursday night is gone.",
  riskExplain:
    "If the sociology paper moves out of Thursday night, your remaining writing time becomes Friday morning only. That is still possible, but tighter.",
  tradeoff:
    "The tradeoff is buffer. A tight plan can work, but it leaves less room for fatigue or something running long.",
  optionsIntro:
    "Here are two honest recovery strategies. Neither is perfect — I'll show the risk so you can choose.",
  approvalAsk:
    "Do you want me to apply one of these plans, or adjust something first?",
  applyConfirm:
    "Applied. This keeps the plan realistic without pretending your shift doesn't exist.",
  reinforce:
    "You didn't \"fall behind\" — you adapted. That matters more than a perfect schedule.",
};

export interface DanielPlanBlock {
  id: string;
  when: string;
  title: string;
  detail: string;
  hours: number;
}

export interface DanielRecoveryOption {
  id: DanielOptionId;
  title: string;
  tone: string;
  workloadHours: number;
  riskLevel: "Low" | "Medium" | "High";
  timeNote: string;
  blocks: DanielPlanBlock[];
  reasoning: string;
  tradeoff: string;
}

export const danielOptions: DanielRecoveryOption[] = [
  {
    id: "option-a",
    title: "Option A — keep the shift, redistribute into smaller sessions",
    tone: "Steady, less confrontational. More fragments, more context switching.",
    workloadHours: 4.5,
    riskLevel: "Medium",
    timeNote: "Spread across Thu late + Fri morning",
    blocks: [
      {
        id: "thu-late",
        when: "Thu, 10:30 – 11:30 PM",
        title: "Paper setup + outline refresh",
        detail: "Open doc, headings, thesis angle, sources list — stop early",
        hours: 1,
      },
      {
        id: "fri-am-1",
        when: "Fri, 8:30 – 10:30 AM",
        title: "Draft writing",
        detail: "Write body paragraphs from outline. No editing pass yet.",
        hours: 2,
      },
      {
        id: "fri-am-2",
        when: "Fri, 10:45 – 12:15 PM",
        title: "Citations + edit",
        detail: "Citations, clarity pass, and one full read-through.",
        hours: 1.5,
      },
    ],
    reasoning:
      "We keep Thursday's work light because you're coming off a long shift. Friday morning becomes the deep work anchor.",
    tradeoff:
      "Late-night outlining is lower-quality thinking. If you're exhausted, Friday has to carry more weight.",
  },
  {
    id: "option-b",
    title: "Option B — protect deep work by changing the constraint",
    tone: "More direct. Protects a single deep block. Requires a boundary.",
    workloadHours: 4.5,
    riskLevel: "Low",
    timeNote: "Preserve Fri morning as deep work; add a contingency",
    blocks: [
      {
        id: "thu-message",
        when: "Thu, 12:30 PM",
        title: "Message manager (optional)",
        detail:
          "Ask if you can leave at 8 PM or swap the last 2 hours. If not possible, keep plan A.",
        hours: 0.1,
      },
      {
        id: "fri-am-1",
        when: "Fri, 8:00 – 11:00 AM",
        title: "Deep draft writing",
        detail: "One uninterrupted block. Draft first, citations later.",
        hours: 3,
      },
      {
        id: "fri-mid",
        when: "Fri, 11:15 AM – 12:45 PM",
        title: "Editing + citations",
        detail: "Citations, formatting, and final quality pass.",
        hours: 1.5,
      },
    ],
    reasoning:
      "We protect the one block where writing quality is highest: Friday morning. Then we keep the rest minimal and finish cleanly.",
    tradeoff:
      "If Friday morning gets disrupted, the plan loses its safety. The contingency is falling back to a smaller draft + simpler citations.",
  },
];


export type IllnessOptionId = "rest-first" | "minimum-viable";

export interface IllnessInputs {
  whatHappened: string;
  energy: "low" | "medium" | "okay";
  mustDo: string;
  canWait: string;
  next48h: string;
}

export const illnessCopy = {
  intro:
    "I’m sorry — being sick is disruptive. I can’t diagnose anything, but I can help you triage the next 48 hours without guilt.",
  clarify:
    "Before I rebuild the plan, I want your constraints — not an ideal schedule.",
  questions: {
    whatHappened: "What happened (one sentence)?",
    energy: "How’s your energy right now?",
    mustDo: "What absolutely must happen in the next 48 hours?",
    canWait: "What can wait without real consequences?",
    next48h: "What blocks do you realistically have in the next 48 hours?",
  },
  planIntro:
    "Here are two honest options. Both protect recovery — the difference is how much buffer we keep.",
  approvalAsk: "Which plan should I apply?",
  reinforce:
    "This isn’t falling behind — it’s adapting. The goal is a plan you can actually complete while recovering.",
};

export const illnessDefaults: IllnessInputs = {
  whatHappened: "I’m coming down with something and today collapsed.",
  energy: "low",
  mustDo: "One discussion post + one quiz review block",
  canWait: "Optional readings and extra practice problems",
  next48h: "Tomorrow 10–12, tomorrow 6–7, next day 9–11",
};

export interface IllnessPlanBlock {
  id: string;
  when: string;
  title: string;
  detail: string;
  hours: number;
}

export interface IllnessPlan {
  id: IllnessOptionId;
  title: string;
  risk: "Low" | "Medium" | "High";
  totalHours: number;
  blocks: IllnessPlanBlock[];
  why: string;
  tradeoff: string;
  sourcesNote: string[];
}

export const illnessPlans: IllnessPlan[] = [
  {
    id: "rest-first",
    title: "Rest-first (lowest pressure)",
    risk: "Low",
    totalHours: 2.5,
    blocks: [
      {
        id: "tom-10",
        when: "Tomorrow, 10:30 – 11:30 AM",
        title: "Discussion post (minimum viable)",
        detail: "1 key point + 1 quote + 3–5 sentences. Submit and stop.",
        hours: 1,
      },
      {
        id: "tom-6",
        when: "Tomorrow, 6:15 – 6:45 PM",
        title: "Quiz review (light pass)",
        detail: "Review mistakes + 8 flashcards. No full practice set.",
        hours: 0.5,
      },
      {
        id: "next-9",
        when: "Next day, 9:00 – 10:00 AM",
        title: "Buffer + catch-up",
        detail: "Only if you feel better. Otherwise, protect rest.",
        hours: 1,
      },
    ],
    why:
      "This plan assumes low energy. It protects recovery by reducing scope and keeping one buffer block you can skip if needed.",
    tradeoff:
      "You’ll do less “extra” work. The benefit is avoiding a spiral where illness turns into a week-long crash.",
    sourcesNote: ["Your energy level", "Next 48h availability", "Upcoming deadlines"],
  },
  {
    id: "minimum-viable",
    title: "Minimum-viable academics (still realistic)",
    risk: "Medium",
    totalHours: 3.5,
    blocks: [
      {
        id: "tom-10",
        when: "Tomorrow, 10:00 – 11:30 AM",
        title: "Discussion post + quick edit",
        detail: "Draft, then one clarity pass. Submit.",
        hours: 1.5,
      },
      {
        id: "tom-6",
        when: "Tomorrow, 6:15 – 7:00 PM",
        title: "Quiz review (targeted)",
        detail: "Two weak topics only. Stop when focus fades.",
        hours: 0.75,
      },
      {
        id: "next-9",
        when: "Next day, 9:00 – 10:15 AM",
        title: "Short practice set",
        detail: "6–8 questions. Mark what to ask about later.",
        hours: 1.25,
      },
    ],
    why:
      "This keeps you on track for the immediate deadline while still respecting limited energy. It’s structured so you can stop early without breaking everything.",
    tradeoff:
      "Less buffer. If symptoms worsen, you may need to downshift to the rest-first plan.",
    sourcesNote: ["Your must-do items", "Energy pattern", "Availability"],
  },
];


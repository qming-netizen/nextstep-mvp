export type PlanVariant = "thu-fri" | "with-wed-evening";

export interface PlanBlock {
  id: string;
  when: string;
  title: string;
  detail: string;
  hours: number;
}

export interface RecoveryPlan {
  variant: PlanVariant;
  label: string;
  totalHours: number;
  blocks: PlanBlock[];
  workloadNote: string;
  whyItWorks: string;
  tradeoff: string;
  bufferNote: string;
}

export interface RecoveryInputs {
  shift: string;
  progress: string;
  freeBlocks: string;
}

export const defaultRecoveryInputs: RecoveryInputs = {
  shift: "Wednesday 2:00 – 8:00 PM",
  progress: "Haven't started the history paper yet",
  freeBlocks: "Thursday morning, Friday morning",
};

export const recoveryCopy = {
  intro:
    "Hey, that sounds frustrating — schedule changes like that can throw off an entire plan really fast.",
  introFollowUp:
    "Before I suggest anything, I want to understand your real constraints. I won't guess at what you can handle.",
  clarifyIntro: "Three things will help me build something honest:",
  questions: [
    {
      id: "shift" as const,
      label: "When is your shift now?",
      placeholder: "e.g. Wednesday 2–8 PM",
    },
    {
      id: "progress" as const,
      label: "How far along are you on the paper?",
      placeholder: "e.g. Not started, outline only…",
    },
    {
      id: "freeBlocks" as const,
      label: "What free blocks do you still have?",
      placeholder: "e.g. Thursday AM, Friday AM",
    },
  ],
  generating: "Mapping your blocks against the Friday deadline…",
  planReady:
    "Here's a draft based on what you shared. It's tight, but doable if we protect your mornings.",
  whyItWorks:
    "The outline does the heavy cognitive lifting early — Thursday morning — so Friday isn't a panic draft. You're not writing from zero; you're expanding structure you already chose.",
  tradeoff:
    "This plan has very little buffer if something runs long. A 90-minute research block turning into three hours would push editing into Friday night.",
  approvalAsk: "Does this feel realistic for you?",
  adjustPrompt:
    "What changed? I'll rebuild around it — no need to start over from scratch.",
  studyGroupNote:
    "I forgot I have a study group Wednesday morning.",
  rebuildIntro:
    "Got it — Wednesday morning is gone. I kept the plan calm: here are two honest paths forward.",
  chooseAsk: "Which feels more honest to how you actually work?",
  locked:
    "Plan locked. I'll hold you to this sequence — and you can loosen it anytime if life shifts again.",
  bufferOptional:
    "Optional: leave Friday afternoon unscheduled as recovery buffer. Only if that reduces pressure for you.",
};

function baseBlocks(includeWedEvening: boolean): PlanBlock[] {
  const blocks: PlanBlock[] = [];
  if (includeWedEvening) {
    blocks.push({
      id: "wed-eve",
      when: "Wed, 8:30 – 9:30 PM",
      title: "Light research skim",
      detail: "Sources + thesis angle only — stop before deep reading",
      hours: 1,
    });
  }
  blocks.push(
    {
      id: "thu-am-1",
      when: "Thu, 9:00 – 11:30 AM",
      title: "Research + outline",
      detail: "Sources, thesis, section headings — stop when outline is speakable",
      hours: 2.5,
    },
    {
      id: "fri-am",
      when: "Fri, 9:00 AM – 12:00 PM",
      title: "Draft writing",
      detail: "Follow the outline; don't edit while drafting",
      hours: 3,
    },
    {
      id: "fri-pm",
      when: "Fri, 2:00 – 4:00 PM",
      title: "Editing + citations",
      detail: "Clarity pass, bibliography, final read-through",
      hours: 2,
    }
  );
  return blocks;
}

export function buildRecoveryPlan(variant: PlanVariant): RecoveryPlan {
  const includeWed = variant === "with-wed-evening";
  const blocks = baseBlocks(includeWed);
  const totalHours = blocks.reduce((s, b) => s + b.hours, 0);

  return {
    variant,
    label:
      variant === "thu-fri"
        ? "Thu/Fri mornings only"
        : "Thu/Fri + short Wed evening",
    totalHours,
    blocks,
    workloadNote: `~${totalHours} hours across ${blocks.length} blocks · Due Friday`,
    whyItWorks: recoveryCopy.whyItWorks,
    tradeoff: recoveryCopy.tradeoff,
    bufferNote: recoveryCopy.bufferOptional,
  };
}

export const planOptions: { variant: PlanVariant; title: string; description: string }[] = [
  {
    variant: "thu-fri",
    title: "Keep Thu/Fri only",
    description:
      "Protects your energy after the shift. Wednesday stays fully off — higher Friday pressure.",
  },
  {
    variant: "with-wed-evening",
    title: "Add short Wed evening session",
    description:
      "One hour after your shift ends — skim sources only. Spreads load, but Wednesday is longer.",
  },
];

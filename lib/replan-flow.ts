export type ReplanChangeId =
  | "new-assignment"
  | "work-shift"
  | "class-moved"
  | "sick"
  | "personal-event"
  | "other";

export const replanChangeOptions: {
  id: ReplanChangeId;
  label: string;
}[] = [
  { id: "new-assignment", label: "New assignment" },
  { id: "work-shift", label: "Work shift changed" },
  { id: "class-moved", label: "Class or meeting moved" },
  { id: "sick", label: "I got sick" },
  { id: "personal-event", label: "Personal event came up" },
  { id: "other", label: "Other" },
];

export const replanThinkingSteps = [
  "Checking deadlines…",
  "Finding open time…",
  "Rebalancing your week…",
] as const;

export interface PlanBlock {
  course: string;
  task: string;
  when: string;
}

export const replanBeforePlan: PlanBlock[] = [
  { course: "CS101", task: "Build project structure", when: "Monday 4 PM" },
  { course: "History", task: "Outline", when: "Tuesday 7 PM" },
  { course: "ART104", task: "Research", when: "Wednesday 6 PM" },
];

export const replanAfterPlan: PlanBlock[] = [
  { course: "CS101", task: "Build project structure", when: "Sunday 4 PM" },
  { course: "History", task: "Outline", when: "Wednesday 7 PM" },
  { course: "ART104", task: "Research", when: "Friday 9 AM" },
];

export const replanRationale =
  "CS101 moved up because it has the closest deadline and the largest workload.";

export const replanAfterNotes = [
  "History shifts to Wednesday — you still have a draft window before Friday.",
  "ART104 stays Friday morning when your calendar opens up.",
] as const;

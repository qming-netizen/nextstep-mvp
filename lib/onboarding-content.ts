/** Playful onboarding copy & options — aligned with Figma Nova flow */

export type MoodId =
  | "overwhelmed"
  | "behind"
  | "okay"
  | "motivated";

export interface MoodCard {
  id: MoodId;
  emoji: string;
  title: string;
  subtitle: string;
  novaReply: string;
}

export const moodCards: MoodCard[] = [
  {
    id: "overwhelmed",
    emoji: "😰",
    title: "Overwhelmed",
    subtitle: "Everything at once",
    novaReply:
      "I hear you. That's actually the most honest place to start. We'll take it one tiny step at a time — that's all you ever need.",
  },
  {
    id: "behind",
    emoji: "😅",
    title: "A bit behind",
    subtitle: "Playing catch-up",
    novaReply:
      "Behind isn't failure — it just means the week got loud. We'll find the smallest move that still counts.",
  },
  {
    id: "okay",
    emoji: "🙂",
    title: "Doing okay",
    subtitle: "Could be worse",
    novaReply:
      "Okay is a perfectly fine starting line. Let's make today feel a little clearer, not harder.",
  },
  {
    id: "motivated",
    emoji: "⚡",
    title: "Ready to go",
    subtitle: "Let's use the energy",
    novaReply:
      "Love that — we'll channel it without burning you out by 9pm.",
  },
];

export interface SubjectOption {
  id: string;
  label: string;
  emoji: string;
}

export const subjectOptions: SubjectOption[] = [
  { id: "maths", label: "Maths", emoji: "📐" },
  { id: "science", label: "Science", emoji: "🔬" },
  { id: "english", label: "English", emoji: "📖" },
  { id: "history", label: "History", emoji: "🏛️" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "computing", label: "Computing", emoji: "💻" },
];

export const dueOptions = [
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "this-week", label: "This week" },
  { id: "next-week", label: "Next week" },
  { id: "not-sure", label: "Not sure" },
] as const;

export type DueWhen = (typeof dueOptions)[number]["id"];

export const timeOptions = [
  { id: "15", label: "15 min" },
  { id: "30", label: "30 min" },
  { id: "60", label: "1 hour" },
  { id: "120", label: "2+ hours" },
] as const;

export const energyOptions = [
  { id: "empty", emoji: "🪫", label: "Running on empty" },
  { id: "tired", emoji: "🔋", label: "A bit tired" },
  { id: "okay", emoji: "⚡", label: "Okay" },
  { id: "ready", emoji: "⚡⚡⚡", label: "Ready to go" },
] as const;

export const winOptions = [
  { id: "finish-one", emoji: "✅", label: "Finishing one thing" },
  { id: "less-anxiety", emoji: "😮‍💨", label: "Reducing my anxiety" },
  { id: "progress", emoji: "📈", label: "Making progress" },
  { id: "not-behind", emoji: "🛡️", label: "Not falling further behind" },
  { id: "survive", emoji: "🤍", label: "Just surviving today" },
] as const;

export const hoursBudgetOptions = [
  { value: 0.5, label: "30 min" },
  { value: 1, label: "1 hour" },
  { value: 1.5, label: "1.5 hours" },
  { value: 2, label: "2 hours" },
  { value: 3, label: "3+ hours" },
];

/** Example plan card on Meet Nova screen */
export const examplePlanForMaya = [
  {
    emoji: "🔬",
    accent: "border-l-orange-400",
    title: "Biology — Chapter 4 Review",
    minutes: 25,
  },
  {
    emoji: "📐",
    accent: "border-l-blue-400",
    title: "Maths — Practice questions",
    minutes: 30,
  },
  {
    emoji: "📖",
    accent: "border-l-emerald-400",
    title: "English essay outline",
    minutes: 15,
  },
];

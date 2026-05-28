export interface FocusStackItem {
  id: string;
  title: string;
  minutes: number;
  whyNow: string;
  confidence: "Low" | "Medium" | "High";
}

export const focusStack: FocusStackItem[] = [
  {
    id: "bio-review",
    title: "Draft Biology methods section",
    minutes: 25,
    whyNow:
      "This is the highest-risk deadline in your cluster, and it's easiest to start while the rubric is fresh.",
    confidence: "Medium",
  },
  {
    id: "bio-results",
    title: "Write results paragraph",
    minutes: 20,
    whyNow:
      "Once methods are down, results becomes a straightforward translation of what you already measured.",
    confidence: "Medium",
  },
  {
    id: "calc-warmup",
    title: "Calculus warm‑up (4 problems)",
    minutes: 15,
    whyNow:
      "A short warm‑up keeps momentum without turning tonight into a marathon.",
    confidence: "High",
  },
];


export type DemoStepId =
  | "onboarding"
  | "canvas"
  | "dashboard"
  | "plan"
  | "breakdown"
  | "focus"
  | "progress"
  | "recovery";

export interface DemoStep {
  id: DemoStepId;
  label: string;
}

export const demoSteps: DemoStep[] = [
  { id: "onboarding", label: "Onboard" },
  { id: "canvas", label: "Canvas" },
  { id: "dashboard", label: "Home" },
  { id: "plan", label: "Plan" },
  { id: "breakdown", label: "Steps" },
  { id: "focus", label: "Focus" },
  { id: "progress", label: "Progress" },
];

export interface DemoPersistedState {
  canvasSynced: boolean;
  planAccepted: boolean;
  focusCompleted: boolean;
  recoveryTriggered: boolean;
  recoveryApplied: boolean;
}

export const initialDemoState: DemoPersistedState = {
  canvasSynced: false,
  planAccepted: false,
  focusCompleted: false,
  recoveryTriggered: false,
  recoveryApplied: false,
};

export function getActiveDemoStep(
  pathname: string,
): DemoStepId {
  if (pathname.startsWith("/onboarding")) return "onboarding";
  if (pathname.startsWith("/canvas-sync")) return "canvas";
  if (pathname.startsWith("/recovery")) return "recovery";
  if (pathname.startsWith("/focus-mode")) return "focus";
  if (pathname.startsWith("/progress")) return "progress";
  if (pathname.startsWith("/tasks/")) return "breakdown";
  if (pathname.startsWith("/focus")) return "plan";
  if (pathname.startsWith("/home")) return "dashboard";
  return "dashboard";
}

export function getFlowHint(
  pathname: string,
  state: DemoPersistedState
): { message: string; href: string; cta: string } | null {
  if (state.recoveryTriggered && !state.recoveryApplied) {
    if (!pathname.startsWith("/recovery")) {
      return {
        message: "Nova is ready to rebuild your plan — no guilt, just clarity.",
        href: "/recovery",
        cta: "Open recovery",
      };
    }
    return null;
  }

  if (!state.canvasSynced && !pathname.startsWith("/canvas-sync")) {
    return null;
  }

  if (pathname.startsWith("/canvas-sync")) return null;

  if (!state.canvasSynced) {
    return {
      message: "Connect Canvas so Nova can see your deadline cluster.",
      href: "/canvas-sync",
      cta: "Sync Canvas",
    };
  }

  if (!state.planAccepted) {
    if (pathname === "/home") {
      return {
        message: "Nova analyzed your week. Review why Biology comes first.",
        href: "/focus",
        cta: "See focus plan",
      };
    }
    if (pathname.startsWith("/focus")) {
      return {
        message: "When this plan feels right, accept it to unlock your micro-steps.",
        href: "/focus",
        cta: "Accept below",
      };
    }
    if (pathname.startsWith("/tasks/bio-lab")) {
      return {
        message: "Accept tonight's plan first — then start focus.",
        href: "/focus",
        cta: "Back to plan",
      };
    }
    return null;
  }

  if (!state.focusCompleted) {
    if (pathname === "/home") {
      return {
        message: "Plan accepted. Break down Biology, then start your focus block.",
        href: "/tasks/bio-lab",
        cta: "View micro-steps",
      };
    }
    if (pathname.startsWith("/tasks/bio-lab")) {
      return {
        message: "Five small steps. Start with drafting methods.",
        href: "/focus-mode",
        cta: "Start focus",
      };
    }
    if (pathname.startsWith("/focus-mode")) return null;
    return null;
  }

  if (pathname !== "/progress" && !pathname.startsWith("/recovery")) {
    return {
      message: "Session complete. See how your momentum shifted.",
      href: "/progress",
      cta: "View progress",
    };
  }

  return null;
}

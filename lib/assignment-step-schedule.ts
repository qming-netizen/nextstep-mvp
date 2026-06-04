/** Suggested schedule + action for dashboard micro-step stacks */

export interface StepScheduleMeta {
  suggestedDay: string;
  durationShort: string;
  action: "start" | "submit";
}

export const stepScheduleMeta: Record<string, StepScheduleMeta> = {
  cs1: { suggestedDay: "Monday", durationShort: "2h", action: "start" },
  cs2: { suggestedDay: "Monday", durationShort: "2h", action: "start" },
  cs3: { suggestedDay: "Tuesday", durationShort: "3h", action: "start" },
  cs4: { suggestedDay: "Wednesday", durationShort: "2h", action: "start" },
  cs5: { suggestedDay: "Thursday", durationShort: "1h", action: "submit" },
  h1: { suggestedDay: "Tuesday", durationShort: "1h", action: "start" },
  h2: { suggestedDay: "Tuesday", durationShort: "1.5h", action: "start" },
  h3: { suggestedDay: "Wednesday", durationShort: "2h", action: "start" },
  h4: { suggestedDay: "Friday", durationShort: "30m", action: "submit" },
  a1: { suggestedDay: "Monday", durationShort: "1h", action: "start" },
  a2: { suggestedDay: "Tuesday", durationShort: "2h", action: "start" },
  a3: { suggestedDay: "Wednesday", durationShort: "1.5h", action: "start" },
  a4: { suggestedDay: "Thursday", durationShort: "30m", action: "start" },
  a5: { suggestedDay: "Friday", durationShort: "15m", action: "submit" },
};

export function getStepMeta(stepId: string, fallbackDuration: string): StepScheduleMeta {
  return (
    stepScheduleMeta[stepId] ?? {
      suggestedDay: "This week",
      durationShort: fallbackDuration.replace(/ Hours?/i, "h").replace(/ Minutes/i, "m"),
      action: "start" as const,
    }
  );
}

/** Map onboarding "time available today" to plan hours budget */

export function timeMinToHours(timeMin: string): number {
  const map: Record<string, number> = {
    "15": 0.5,
    "30": 1,
    "60": 1.5,
    "120": 2.5,
  };
  return map[timeMin] ?? 1.5;
}

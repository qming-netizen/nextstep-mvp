export const WEEK_JOURNAL_LABEL = "Mar 9 – Mar 15";

export interface WeekJournalEntry {
  weekLabel: string;
  text: string;
  photoNames: string[];
  savedAt: string;
}

const STORAGE_KEY = "nextstep-week-journal";

export function readWeekJournal(): WeekJournalEntry | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as WeekJournalEntry;
  } catch {
    return null;
  }
}

export function saveWeekJournal(entry: Omit<WeekJournalEntry, "savedAt">) {
  const payload: WeekJournalEntry = {
    ...entry,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  return payload;
}

export const journalPrompts = [
  "A moment you're proud of",
  "Something that felt hard",
  "What you'd tell yourself next week",
] as const;

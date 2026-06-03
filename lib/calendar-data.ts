/** Demo calendar — week of Sunday, March 9 */

export type EventCategory = "study" | "personal" | "assignment";

export interface CalendarEvent {
  id: string;
  dayId: string;
  time: string;
  title: string;
  subtitle: string;
  category: EventCategory;
}

export interface CalendarDay {
  id: string;
  weekdayShort: string;
  dayNum: number;
  monthShort: string;
  fullLabel: string;
  dots: Array<"red" | "purple" | "green">;
}

export interface UpcomingDue {
  id: string;
  dayLabel: string;
  title: string;
  time: string;
}

export const calendarWeekLabel = "Sun Mar 9 — Sat Mar 15";

export const novaCalendarMessage =
  "Your week is still flexible. Let's protect the hardest work early.";

export const novaCalendarSuggestion =
  "CS101 is the biggest workload this week. Starting today keeps Thursday from becoming stressful.";

export const calendarDays: CalendarDay[] = [
  {
    id: "mar-9",
    weekdayShort: "Sun",
    dayNum: 9,
    monthShort: "Mar",
    fullLabel: "Sunday Mar 9",
    dots: ["purple", "green"],
  },
  {
    id: "mar-10",
    weekdayShort: "Mon",
    dayNum: 10,
    monthShort: "Mar",
    fullLabel: "Monday Mar 10",
    dots: ["purple"],
  },
  {
    id: "mar-11",
    weekdayShort: "Tue",
    dayNum: 11,
    monthShort: "Mar",
    fullLabel: "Tuesday Mar 11",
    dots: ["purple"],
  },
  {
    id: "mar-12",
    weekdayShort: "Wed",
    dayNum: 12,
    monthShort: "Mar",
    fullLabel: "Wednesday Mar 12",
    dots: ["purple", "green"],
  },
  {
    id: "mar-13",
    weekdayShort: "Thu",
    dayNum: 13,
    monthShort: "Mar",
    fullLabel: "Thursday Mar 13",
    dots: ["red", "purple"],
  },
  {
    id: "mar-14",
    weekdayShort: "Fri",
    dayNum: 14,
    monthShort: "Mar",
    fullLabel: "Friday Mar 14",
    dots: ["red", "purple"],
  },
  {
    id: "mar-15",
    weekdayShort: "Sat",
    dayNum: 15,
    monthShort: "Mar",
    fullLabel: "Saturday Mar 15",
    dots: ["green"],
  },
];

export const calendarEvents: CalendarEvent[] = [
  {
    id: "e1",
    dayId: "mar-9",
    time: "4:00 PM",
    title: "CS101: Understand requirements",
    subtitle: "Study block · 2h",
    category: "study",
  },
  {
    id: "e2",
    dayId: "mar-9",
    time: "6:00 PM",
    title: "Dinner break",
    subtitle: "Personal · 1h",
    category: "personal",
  },
  {
    id: "e3",
    dayId: "mar-9",
    time: "7:30 PM",
    title: "ART104: Choose presentation topic",
    subtitle: "Study block · 1h",
    category: "study",
  },
  {
    id: "e4",
    dayId: "mar-10",
    time: "5:00 PM",
    title: "History: Understand prompt",
    subtitle: "Study block · 1h",
    category: "study",
  },
  {
    id: "e5",
    dayId: "mar-12",
    time: "6:30 PM",
    title: "Gym",
    subtitle: "Personal · 1h",
    category: "personal",
  },
  {
    id: "e6",
    dayId: "mar-13",
    time: "11:00 AM",
    title: "CS101 Group Project due",
    subtitle: "Assignment · due 12:00 PM",
    category: "assignment",
  },
  {
    id: "e7",
    dayId: "mar-13",
    time: "3:00 PM",
    title: "CS101: Final polish",
    subtitle: "Study block · 2h",
    category: "study",
  },
];

export const upcomingDueDates: UpcomingDue[] = [
  {
    id: "d1",
    dayLabel: "Thu Mar 13",
    title: "CS101 Group Project due",
    time: "12:00 PM",
  },
  {
    id: "d2",
    dayLabel: "Fri Mar 14",
    title: "History Essay due",
    time: "5:59 PM",
  },
  {
    id: "d3",
    dayLabel: "Fri Mar 14",
    title: "ART104 Presentation due",
    time: "11:59 PM",
  },
];

export const lifeBalanceQuickAdd = [
  { id: "gym", emoji: "🏋️", label: "Gym" },
  { id: "dinner", emoji: "🍜", label: "Dinner" },
  { id: "events", emoji: "🎉", label: "Campus Event" },
  { id: "rest", emoji: "🛌", label: "Rest" },
] as const;

export const addSheetOptions = [
  { id: "assignment", label: "Add Assignment", emoji: "📚" },
  { id: "study", label: "Add Study Session", emoji: "🎯" },
  { id: "gym", label: "Add Gym", emoji: "🏋️" },
  { id: "dinner", label: "Add Dinner with Friends", emoji: "🍜" },
  { id: "campus", label: "Add Campus Event", emoji: "🎉" },
  { id: "custom", label: "Add Custom Activity", emoji: "➕" },
] as const;

export const categoryStyles: Record<
  EventCategory,
  { bar: string; bg: string }
> = {
  study: { bar: "bg-violet-500", bg: "bg-violet-50/40" },
  personal: { bar: "bg-emerald-500", bg: "bg-emerald-50/40" },
  assignment: { bar: "bg-red-500", bg: "bg-red-50/40" },
};

export const dotColors = {
  red: "bg-red-500",
  purple: "bg-violet-500",
  green: "bg-emerald-500",
};

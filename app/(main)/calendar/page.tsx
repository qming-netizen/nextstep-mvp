"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { CalendarAddSheet } from "@/components/calendar/CalendarAddSheet";
import { CalendarEventCard } from "@/components/calendar/CalendarEventCard";
import {
  calendarDays,
  calendarEvents,
  calendarWeekLabel,
  dotColors,
  lifeBalanceQuickAdd,
  novaCalendarMessage,
  novaCalendarSuggestion,
  upcomingDueDates,
} from "@/lib/calendar-data";

export default function CalendarPage() {
  const [selectedDayId, setSelectedDayId] = useState("mar-9");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetPrefill, setSheetPrefill] = useState<string | undefined>();

  const selectedDay =
    calendarDays.find((d) => d.id === selectedDayId) ?? calendarDays[0];
  const dayEvents = calendarEvents.filter((e) => e.dayId === selectedDayId);

  const openSheet = (prefill?: string) => {
    setSheetPrefill(prefill);
    setSheetOpen(true);
  };

  return (
    <>
      <PageHeader
        title="Calendar"
        subtitle="Your week, gently organized."
      />
      <ScrollArea className="pb-24">
        <div className="space-y-4 px-5 pb-4">
          <div className="rounded-2xl border border-violet-100 bg-violet-50/60 px-4 py-2.5">
            <p className="text-[13px] font-medium text-violet-700">
              {calendarWeekLabel}
            </p>
          </div>

          <div className="flex gap-3 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
            <NovaCharacter
              artwork="calendar"
              state="happy"
              size={56}
              float={false}
              glow
              className="mx-0 shrink-0"
            />
            <p className="min-w-0 pt-1 text-[14px] leading-relaxed text-[#1a1625]">
              {novaCalendarMessage}
            </p>
          </div>

          <div className="-mx-1 overflow-x-auto px-1 pb-1">
            <div className="flex min-w-max gap-2">
              {calendarDays.map((day) => {
                const selected = day.id === selectedDayId;
                return (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => setSelectedDayId(day.id)}
                    className={`flex w-[52px] flex-col items-center rounded-2xl px-2 py-2.5 transition-colors ${
                      selected
                        ? "bg-violet-600 text-white shadow-md"
                        : "bg-white text-[#1a1625] shadow-sm"
                    }`}
                  >
                    <span
                      className={`text-[11px] font-medium ${selected ? "text-white/90" : "text-[#9b95a8]"}`}
                    >
                      {day.weekdayShort}
                    </span>
                    <span className="mt-0.5 text-[18px] font-semibold tabular-nums">
                      {day.dayNum}
                    </span>
                    <div className="mt-1.5 flex h-2 items-center justify-center gap-0.5">
                      {day.dots.map((dot, i) => (
                        <span
                          key={i}
                          className={`h-1.5 w-1.5 rounded-full ${
                            selected ? "bg-white/90" : dotColors[dot]
                          }`}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <section>
            <h2 className="text-[15px] font-semibold text-[#1a1625]">
              {selectedDay.fullLabel}
            </h2>
            <div className="mt-3 space-y-2.5">
              {dayEvents.length > 0 ? (
                dayEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <CalendarEventCard event={event} />
                  </motion.div>
                ))
              ) : (
                <p className="rounded-2xl border border-dashed border-violet-200 bg-violet-50/30 px-4 py-8 text-center text-[14px] text-[#9b95a8]">
                  Nothing scheduled yet — tap + to add something gentle.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm">
            <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Upcoming due dates
            </h2>
            <p className="mt-0.5 text-[12px] text-[#9b95a8]">This week</p>
            <ul className="mt-3 space-y-3">
              {upcomingDueDates.map((due) => (
                <li key={due.id} className="flex gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <div>
                    <p className="text-[12px] font-medium text-[#9b95a8]">
                      {due.dayLabel}
                    </p>
                    <p className="text-[14px] font-semibold text-[#1a1625]">
                      {due.title}
                    </p>
                    <p className="text-[12px] text-[#6b6578]">{due.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-600">
              Nova suggests
            </p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#1a1625]">
              {novaCalendarSuggestion}
            </p>
          </section>

          <section>
            <h2 className="text-[15px] font-semibold text-[#1a1625]">
              Protect time for life
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {lifeBalanceQuickAdd.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openSheet(item.label)}
                  className="flex items-center gap-2 rounded-2xl border border-violet-100 bg-white px-3.5 py-3 text-left shadow-sm active:bg-violet-50/50"
                >
                  <span className="text-[18px]">{item.emoji}</span>
                  <span className="text-[14px] font-medium text-[#1a1625]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>

      <button
        type="button"
        onClick={() => openSheet()}
        aria-label="Add event"
        className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-[max(1.25rem,calc(50%-215px+1.25rem))] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-violet-300/40 active:scale-95"
      >
        <Plus size={26} strokeWidth={2.5} />
      </button>

      <CalendarAddSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        prefill={sheetPrefill}
      />
    </>
  );
}

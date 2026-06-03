"use client";

import type { CalendarEvent } from "@/lib/calendar-data";
import { categoryStyles } from "@/lib/calendar-data";

export function CalendarEventCard({ event }: { event: CalendarEvent }) {
  const style = categoryStyles[event.category];

  return (
    <article
      className={`flex overflow-hidden rounded-2xl border border-violet-100/80 bg-white shadow-sm ${style.bg}`}
    >
      <div className={`w-1 shrink-0 ${style.bar}`} />
      <div className="flex min-w-0 flex-1 gap-3 px-3.5 py-3">
        <p className="w-[62px] shrink-0 pt-0.5 text-[13px] font-medium tabular-nums text-[#6b6578]">
          {event.time}
        </p>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-snug text-[#1a1625]">
            {event.title}
          </p>
          <p className="mt-0.5 text-[12px] text-[#9b95a8]">{event.subtitle}</p>
        </div>
      </div>
    </article>
  );
}

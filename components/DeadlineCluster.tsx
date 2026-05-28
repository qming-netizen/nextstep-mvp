"use client";

import { AlertTriangle } from "lucide-react";
import { canvasDeadlines } from "@/lib/mock-data";
import { nova } from "@/lib/nova-copy";

export function DeadlineCluster() {
  return (
    <section className="rounded-2xl border border-amber-100/80 bg-gradient-to-br from-amber-50/40 to-white p-4 shadow-sm">
      <div className="flex items-start gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
          <AlertTriangle size={18} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-amber-900">
            Deadline cluster detected
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#6b6578]">
            {nova.homeCluster}
          </p>
        </div>
      </div>
      <ul className="mt-3 space-y-2">
        {canvasDeadlines.map((d) => (
          <li
            key={d.id}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-[12px] ${
              d.urgent ? "bg-violet-50" : "bg-[#f8f6fc]"
            }`}
          >
            <div className="min-w-0">
              <p className="font-medium text-[#1a1625]">{d.course}</p>
              <p className="truncate text-[#6b6578]">{d.title}</p>
            </div>
            <span
              className={`shrink-0 pl-2 font-medium ${
                d.urgent ? "text-violet-600" : "text-[#9b95a8]"
              }`}
            >
              {d.due}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

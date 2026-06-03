"use client";

import { useState } from "react";
import {
  dueOptions,
  subjectOptions,
  type DueWhen,
} from "@/lib/onboarding-content";
import type { OnboardingPlateItem } from "@/lib/types";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

export function PlateStep({
  items,
  onChange,
}: {
  items: OnboardingPlateItem[];
  onChange: (items: OnboardingPlateItem[]) => void;
}) {
  const [activeSubject, setActiveSubject] = useState<string | null>(
    items[0]?.subjectId ?? null
  );

  const activeItem = items.find((i) => i.subjectId === activeSubject);
  const activeMeta = subjectOptions.find((s) => s.id === activeSubject);

  const toggleSubject = (id: string) => {
    if (items.some((i) => i.subjectId === id)) {
      if (activeSubject === id && items.length === 1) return;
      if (activeSubject === id) {
        const next = items.filter((i) => i.subjectId !== id);
        onChange(next);
        setActiveSubject(next[0]?.subjectId ?? null);
        return;
      }
      setActiveSubject(id);
      return;
    }
    const next = [...items, { subjectId: id, dueWhen: "this-week" as DueWhen }];
    onChange(next);
    setActiveSubject(id);
  };

  const setDue = (dueWhen: DueWhen) => {
    if (!activeSubject) return;
    onChange(
      items.map((i) =>
        i.subjectId === activeSubject ? { ...i, dueWhen } : i
      )
    );
  };

  return (
    <div className="space-y-4 py-2">
      <NovaOnboardingBubble
        message="What's on your plate right now? Tell me what's coming up — even if it feels like everything."
        hint="I'll use this to figure out what's most urgent."
      />

      <div className="flex flex-wrap gap-2">
        {subjectOptions.map((s) => {
          const on = items.some((i) => i.subjectId === s.id);
          const isActive = activeSubject === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                if (!on) toggleSubject(s.id);
                else setActiveSubject(s.id);
              }}
              className={`rounded-full border px-3.5 py-2 text-[14px] font-medium transition-all ${
                on
                  ? isActive
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-violet-300 bg-violet-50/60 text-violet-600"
                  : "border-violet-100 bg-white text-[#1a1625]"
              }`}
            >
              {s.emoji} {s.label}
            </button>
          );
        })}
      </div>

      {activeMeta && activeItem && (
        <div className="rounded-3xl bg-white p-4 shadow-md">
          <p className="text-[15px] font-semibold text-[#1a1625]">
            {activeMeta.emoji} {activeMeta.label} — when is this due?
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {dueOptions.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDue(d.id)}
                className={`rounded-full border px-3 py-1.5 text-[13px] font-medium ${
                  activeItem.dueWhen === d.id
                    ? "border-violet-500 text-violet-700"
                    : "border-violet-100 text-[#6b6578]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {items.length > 0 && (
        <p className="text-center text-[13px] text-violet-600">
          {items.length} subject{items.length > 1 ? "s" : ""} added
        </p>
      )}
    </div>
  );
}

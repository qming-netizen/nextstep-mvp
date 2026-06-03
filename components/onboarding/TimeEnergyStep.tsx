"use client";

import {
  energyOptions,
  timeOptions,
} from "@/lib/onboarding-content";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

export function TimeEnergyStep({
  timeMin,
  energy,
  onTime,
  onEnergy,
}: {
  timeMin: string;
  energy: string;
  onTime: (id: string) => void;
  onEnergy: (id: string) => void;
}) {
  return (
    <div className="space-y-5 py-2">
      <NovaOnboardingBubble
        message="How much time and energy do you actually have today? Be honest — I'll make the plan fit you, not the other way around."
        hint="Your plan should fit your real day, not a perfect one."
      />

      <section>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
          Time available today
        </p>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onTime(t.id)}
              className={`rounded-full border px-4 py-2 text-[14px] font-medium ${
                timeMin === t.id
                  ? "border-violet-500 bg-violet-50 text-violet-700"
                  : "border-violet-100 bg-white text-[#1a1625]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
          Energy level
        </p>
        <div className="space-y-2">
          {energyOptions.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => onEnergy(e.id)}
              className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] font-medium ${
                energy === e.id
                  ? "border-violet-500 bg-violet-50 text-violet-800"
                  : "border-violet-100 bg-white text-[#1a1625]"
              }`}
            >
              <span className="text-xl">{e.emoji}</span>
              {e.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

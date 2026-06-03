"use client";

import { winOptions } from "@/lib/onboarding-content";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

export function WinStep({
  win,
  custom,
  onWin,
  onCustom,
  showConfirm,
}: {
  win: string;
  custom: string;
  onWin: (id: string) => void;
  onCustom: (text: string) => void;
  showConfirm: boolean;
}) {
  return (
    <div className="space-y-4 py-2">
      <p className="text-[12px] font-medium text-[#9b95a8]">Last one!</p>
      <NovaOnboardingBubble message="Last one. What would make today feel like a win for you?" />

      <div className="flex flex-wrap gap-2">
        {winOptions.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => onWin(w.id)}
            className={`rounded-full border px-3.5 py-2 text-[14px] font-medium ${
              win === w.id
                ? "border-violet-500 bg-violet-50 text-violet-700"
                : "border-violet-100 bg-white text-[#1a1625]"
            }`}
          >
            {w.emoji} {w.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={custom}
        onChange={(e) => onCustom(e.target.value)}
        placeholder="Tell Nova in your own words → (optional)"
        className="h-[52px] w-full rounded-2xl border border-violet-100 bg-white px-4 text-[16px] text-[#1a1625] outline-none focus:ring-2 focus:ring-violet-300"
      />

      {showConfirm && (
        <NovaOnboardingBubble message="Perfect. That's exactly what I needed." />
      )}
    </div>
  );
}

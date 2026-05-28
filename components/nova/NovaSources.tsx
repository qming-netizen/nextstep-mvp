"use client";

import { sourceLabels, type NovaSourceId } from "@/lib/nova-persona";
import { Calendar, GraduationCap, Briefcase, Upload, Sliders, Activity } from "lucide-react";

const icons: Record<NovaSourceId, React.ComponentType<{ size?: number; className?: string }>> = {
  canvas: GraduationCap,
  calendar: Calendar,
  workShifts: Briefcase,
  syllabus: Upload,
  preferences: Sliders,
  completionPatterns: Activity,
};

export function NovaSources({ sources }: { sources: NovaSourceId[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((s) => {
        const Icon = icons[s];
        return (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-[#6b6578] backdrop-blur-sm"
          >
            <Icon size={14} className="text-violet-600" />
            {sourceLabels[s]}
          </span>
        );
      })}
    </div>
  );
}


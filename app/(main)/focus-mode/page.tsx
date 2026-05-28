"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { focusStack } from "@/lib/focus-stack";
import { FocusCardStack } from "@/components/focus/FocusCardStack";

export default function FocusModePage() {
  const router = useRouter();
  const { demo, acceptPlan, completeFocusSession } = useApp();

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-[#1a1625] via-[#2d2640] to-[#1a1625] text-white">
      <header className="flex shrink-0 items-center justify-between px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
          aria-label="Exit focus"
        >
          <X size={20} />
        </button>
        <span className="text-[13px] font-medium text-white/60">Focus</span>
        <div className="w-10" />
      </header>

      <div className="min-h-0 flex-1">
        <FocusCardStack
          items={focusStack}
          onCompleteAll={() => {
            if (!demo.planAccepted) acceptPlan();
            completeFocusSession();
            router.push("/progress");
          }}
        />
      </div>
    </div>
  );
}

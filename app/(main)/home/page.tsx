"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { AssignmentDashboard } from "@/components/dashboard/AssignmentDashboard";
import { ScrollArea } from "@/components/ScrollArea";
import { demoDateLabel, demoTimeLabel } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user, demo } = useApp();

  return (
    <>
      <header className="shrink-0 px-5 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[13px] font-medium text-[#6b6578]">
          {demoDateLabel} · {demoTimeLabel}
        </p>
        <h1 className="mt-0.5 text-[26px] font-semibold tracking-tight text-[#1a1625]">
          Hey, {user.name.split(" ")[0]}
        </h1>
      </header>

      <ScrollArea className="pb-8">
        <div className="space-y-4 px-5">
          <AssignmentDashboard />

          {demo.planAccepted && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5"
            >
              <CheckCircle2 size={16} className="text-emerald-600" />
              <p className="text-[13px] text-emerald-800">
                Plan saved — Nova has your back this week
              </p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

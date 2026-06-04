"use client";

import { motion } from "framer-motion";
import { NovaDashboard } from "@/components/dashboard/NovaDashboard";
import { ScrollArea } from "@/components/ScrollArea";
import { activeAssignmentCount } from "@/lib/dashboard-home";
import { demoDateLabel, demoTimeLabel } from "@/lib/nova-copy";
import { useApp } from "@/context/AppContext";

export default function HomePage() {
  const { user } = useApp();
  const firstName = user.name.split(" ")[0];

  return (
    <>
      <header className="shrink-0 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="dashboard-label text-[13px] text-[#6b6578]">
          {demoDateLabel} · {demoTimeLabel}
        </p>
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-heading mt-1 text-[24px] tracking-tight text-[#1a1625]"
        >
          Hey {firstName} 👋
        </motion.h1>
        <p className="dashboard-body mt-1 text-[14px] text-[#6b6578]">
          You have {activeAssignmentCount} active assignments this week.
        </p>
      </header>

      <ScrollArea className="pb-6">
        <div className="px-5">
          <NovaDashboard />
        </div>
      </ScrollArea>
    </>
  );
}

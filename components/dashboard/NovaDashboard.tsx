"use client";

import { useState } from "react";
import { weeklyAssignments } from "@/lib/assignments-dashboard";
import { CompactAssignmentCard } from "./CompactAssignmentCard";
import { NovaRecommendationCard } from "./NovaRecommendationCard";
import { QuickActionsBar } from "./QuickActionsBar";
import { WorkLifeBalanceSection } from "./WorkLifeBalanceSection";

export function NovaDashboard() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAssignment = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-5 pb-2">
      <NovaRecommendationCard />

      <section>
        <h2 className="dashboard-heading mb-2 text-[17px] text-[#1a1625]">
          Active Assignments
        </h2>
        <div className="space-y-2">
          {weeklyAssignments.map((assignment) => (
            <CompactAssignmentCard
              key={assignment.id}
              assignment={assignment}
              isExpanded={expandedId === assignment.id}
              onToggle={() => toggleAssignment(assignment.id)}
            />
          ))}
        </div>
      </section>

      <QuickActionsBar />

      <WorkLifeBalanceSection />
    </div>
  );
}

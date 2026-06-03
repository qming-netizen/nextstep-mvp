"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const notificationTypes = [
  "Upcoming deadlines",
  "Missed tasks",
  "Focus sessions",
  "Progress celebrations",
  "Assignment completion reminders",
];

export function NotificationsSection() {
  const [enabled, setEnabled] = useState(false);

  return (
    <section className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-[#1a1625]">
            Enable Nova Notifications
          </h2>
          <p className="mt-0.5 text-[13px] text-[#9b95a8]">
            Gentle nudges, never guilt trips.
          </p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled((v) => !v)}
          className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors ${
            enabled ? "bg-violet-600" : "bg-[#e5e5ea]"
          }`}
        >
          <motion.span
            layout
            className="absolute top-1 h-6 w-6 rounded-full bg-white shadow"
            animate={{ left: enabled ? 24 : 4 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
          />
        </button>
      </div>

      {enabled && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 space-y-2 border-t border-violet-50 pt-3"
        >
          {notificationTypes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[14px] text-[#6b6578]">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              {item}
            </li>
          ))}
        </motion.ul>
      )}
    </section>
  );
}

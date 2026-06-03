"use client";

import { motion } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";

export function NovaOnboardingBubble({
  message,
  hint,
}: {
  message: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex gap-3">
        <NovaCharacter state="happy" size={48} float={false} className="mx-0" />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-0 flex-1 rounded-3xl rounded-tl-lg bg-violet-100/90 px-4 py-3.5"
        >
          <p className="text-[15px] leading-relaxed text-[#1a1625]">{message}</p>
        </motion.div>
      </div>
      {hint && (
        <p className="mt-2 pl-[100px] text-[12px] italic text-[#9b95a8]">{hint}</p>
      )}
    </div>
  );
}

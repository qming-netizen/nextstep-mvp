"use client";

import { motion } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";
import type { NovaCharacterState } from "@/lib/nova-character";

export function NovaDialogueStrip({
  message,
  character = "happy",
}: {
  message: string;
  character?: NovaCharacterState;
}) {
  return (
    <div className="flex gap-3">
      <NovaCharacter
        state={character}
        size={44}
        float={false}
        glow
        className="mx-0 shrink-0"
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-w-0 flex-1 rounded-3xl rounded-tl-lg bg-violet-100/90 px-4 py-3.5"
      >
        <p className="text-[15px] leading-relaxed text-[#1a1625]">{message}</p>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { NovaCharacter } from "@/components/NovaCharacter";

export function BreakModal({
  open,
  minutes,
  onStart,
  onClose,
}: {
  open: boolean;
  minutes: 5 | 10;
  onStart: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-50 flex items-end justify-center bg-black/50 p-5 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 40 }}
        animate={{ y: 0 }}
        className="w-full max-w-[340px] rounded-3xl bg-[#1a1625] p-5 text-white shadow-2xl"
      >
        <div className="flex flex-col items-center text-center">
          <NovaCharacter state="break" size={80} />
          <p className="mt-4 text-[18px] font-semibold">Take a {minutes}-min break</p>
          <p className="mt-2 text-[14px] text-white/60">
            You&apos;ve been focused. Let&apos;s recharge.
          </p>

          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-violet-400/40"
          >
            <motion.div
              animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="h-12 w-12 rounded-full bg-violet-500/30"
            />
          </motion.div>
          <p className="mt-3 text-[12px] text-white/40">Breathe in… breathe out</p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl bg-white/10 text-[14px] font-medium"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={onStart}
            className="h-11 rounded-xl bg-violet-600 text-[14px] font-semibold"
          >
            ☕ Start break
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

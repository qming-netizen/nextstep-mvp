"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Coffee, X } from "lucide-react";

export function BreakModal({
  open,
  onClose,
  onStartBreak,
}: {
  open: boolean;
  onClose: () => void;
  onStartBreak: (minutes: 5 | 10) => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-4"
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="w-full max-w-[430px] rounded-3xl border border-white/50 bg-white/90 p-5 shadow-xl backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                  <Coffee size={18} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-[#1a1625]">
                    Take a short break
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#6b6578]">
                    Breaks count too. I’ll keep your place ready.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm"
                aria-label="Close break"
              >
                <X size={18} className="text-violet-600" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => onStartBreak(5)}
                className="h-[48px] rounded-2xl bg-violet-600 text-[14px] font-semibold text-white"
              >
                5 minutes
              </button>
              <button
                type="button"
                onClick={() => onStartBreak(10)}
                className="h-[48px] rounded-2xl bg-violet-50 text-[14px] font-semibold text-violet-700"
              >
                10 minutes
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-3 flex h-11 w-full items-center justify-center text-[14px] font-medium text-[#6b6578]"
            >
              Resume focus
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


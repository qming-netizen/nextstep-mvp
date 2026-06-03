"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { addSheetOptions } from "@/lib/calendar-data";

export function CalendarAddSheet({
  open,
  onClose,
  prefill,
}: {
  open: boolean;
  onClose: () => void;
  prefill?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto max-w-[430px] rounded-t-3xl bg-white px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-4 shadow-2xl"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-violet-100" />
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#1a1625]">
                Add to calendar
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-50 text-violet-600"
              >
                <X size={18} />
              </button>
            </div>
            {prefill && (
              <p className="mb-3 rounded-xl bg-violet-50 px-3 py-2 text-[13px] text-violet-800">
                Scheduling: {prefill}
              </p>
            )}
            <div className="space-y-2">
              {addSheetOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={onClose}
                  className="flex w-full items-center gap-3 rounded-2xl border border-violet-100 bg-[#faf9fc] px-4 py-3.5 text-left active:bg-violet-50"
                >
                  <span className="text-[20px]">{opt.emoji}</span>
                  <span className="text-[15px] font-medium text-[#1a1625]">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: "deadlines", label: "Reading your deadlines..." },
  { id: "energy", label: "Checking your energy level..." },
  { id: "urgency", label: "Sorting by urgency + vibe..." },
  { id: "path", label: "Finding your clearest path..." },
  { id: "ready", label: "Almost ready..." },
] as const;

export function NovaProcessingStep({ onComplete }: { onComplete: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (activeIndex >= STEPS.length) {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
    const delay = activeIndex === STEPS.length - 1 ? 1400 : 900;
    const t = setTimeout(() => setActiveIndex((i) => i + 1), delay);
    return () => clearTimeout(t);
  }, [activeIndex, onComplete]);

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-6 py-8">
      {/* Starfield */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: 0.2 + (i % 5) * 0.12,
              background:
                i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#6ee7b7" : "#fff",
            }}
          />
        ))}
      </div>

      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex h-[88px] w-[88px] items-center justify-center rounded-full bg-violet-500/90 shadow-[0_0_48px_rgba(139,92,246,0.45)]"
      >
        <span className="text-[28px] font-bold tracking-widest text-white/90">
          ···
        </span>
      </motion.div>

      <ul className="relative mt-12 w-full max-w-[280px] space-y-4">
        {STEPS.map((step, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          if (i > activeIndex) return null;

          return (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-3 text-[15px] ${
                active ? "font-medium text-white" : "text-white/35"
              }`}
            >
              <span className="w-5 shrink-0 text-center text-[14px]">
                {done ? (
                  <span className="text-white/40">✓</span>
                ) : active ? (
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-violet-300"
                  >
                    ···
                  </motion.span>
                ) : null}
              </span>
              {step.label}
            </motion.li>
          );
        })}
      </ul>

      <AnimatePresence>
        {activeIndex >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative mt-14 w-full max-w-[300px] rounded-2xl border border-violet-500/20 bg-[#14182a] px-5 py-4 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-400">
              Nova thinking...
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/90">
              &ldquo;One thing at a time. That&apos;s the whole secret.&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

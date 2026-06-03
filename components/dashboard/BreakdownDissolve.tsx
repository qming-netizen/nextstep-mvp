"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

function makeStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: 8 + Math.random() * 84,
    top: 10 + Math.random() * 75,
    delay: Math.random() * 0.2,
    size: 5 + Math.random() * 9,
    rotate: Math.random() * 360,
    char: i % 3 === 0 ? "✨" : "✦",
  }));
}

export function BreakdownDissolve({
  onComplete,
  children,
}: {
  onComplete: () => void;
  children: React.ReactNode;
}) {
  const stars = useMemo(() => makeStars(16), []);

  useEffect(() => {
    const t = setTimeout(onComplete, 880);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <div className="relative min-h-[200px] overflow-hidden">
      <motion.div
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
      </motion.div>

      {stars.map((s) => (
        <motion.span
          key={s.id}
          aria-hidden
          className="pointer-events-none absolute select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            fontSize: s.size,
          }}
          initial={{ opacity: 0, scale: 0.2, y: 0 }}
          animate={{
            opacity: [0, 1, 0.9, 0],
            scale: [0.2, 1.15, 1, 0.4],
            y: [0, -18, -48],
            rotate: s.rotate,
          }}
          transition={{
            duration: 0.9,
            delay: 0.08 + s.delay,
            ease: "easeOut",
          }}
        >
          {s.char}
        </motion.span>
      ))}

      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-200/30 via-transparent to-amber-100/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0] }}
        transition={{ duration: 0.75, delay: 0.1 }}
      />
    </div>
  );
}

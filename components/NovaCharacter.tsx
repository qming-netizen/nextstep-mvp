"use client";

import { motion } from "framer-motion";
import type { NovaCharacterState } from "@/lib/nova-character";
import {
  NOVA_HAPPY_ASPECT,
  NOVA_HAPPY_SRC,
  novaStateIndex,
} from "@/lib/nova-character";

export interface NovaCharacterProps {
  state?: NovaCharacterState;
  /** Width in px; height follows asset aspect ratio for happy Nova */
  size?: number;
  float?: boolean;
  glow?: boolean;
  /** Larger hero treatment for Meet Nova (sparkles + glow) */
  presentation?: "default" | "hero";
  className?: string;
}

export function NovaCharacter({
  state = "happy",
  size = 96,
  float = true,
  glow = true,
  presentation = "default",
  className = "",
}: NovaCharacterProps) {
  const isHappy = state === "happy";
  const isHero = isHappy && presentation === "hero";
  const column = novaStateIndex[state];
  const positionX = column * 25;
  const width = size;
  const height = isHappy ? Math.round(size * NOVA_HAPPY_ASPECT) : size;

  return (
    <motion.div
      className={`relative mx-auto shrink-0 ${className}`}
      style={{ width, height: isHappy ? height : size }}
      animate={float ? { y: [0, -4, 0] } : undefined}
      transition={
        float
          ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      role="img"
      aria-label={state}
    >
      {glow && (
        <>
          <div
            className={`absolute inset-0 rounded-full bg-violet-400/30 blur-2xl ${
              isHero ? "scale-125" : "scale-110"
            }`}
            aria-hidden
          />
          <div
            className={`absolute inset-[8%] rounded-full bg-purple-500/15 blur-xl ${
              isHero ? "scale-110" : "scale-105"
            }`}
            aria-hidden
          />
          {isHero && (
            <div
              className="absolute inset-[-12%] rounded-full bg-pink-300/20 blur-3xl"
              aria-hidden
            />
          )}
        </>
      )}
      {isHero && (
        <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
          {[
            { top: "8%", left: "18%", delay: 0 },
            { top: "22%", right: "12%", delay: 0.4 },
            { bottom: "28%", left: "8%", delay: 0.8 },
            { top: "42%", right: "22%", delay: 1.2 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-violet-300/80"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                bottom: s.bottom,
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: s.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
      {isHappy ? (
        <img
          src={NOVA_HAPPY_SRC}
          alt="Happy Nova"
          className="relative z-10 h-full w-full object-contain object-center"
          style={{
            filter: isHero
              ? "drop-shadow(0 8px 20px rgba(124, 92, 252, 0.28))"
              : "drop-shadow(0 6px 16px rgba(124, 92, 252, 0.22))",
          }}
          draggable={false}
        />
      ) : (
        <div
          className="relative z-10 h-full w-full bg-no-repeat"
          style={{
            backgroundImage: "url(/nova-characters-sheet.png)",
            backgroundSize: "500% 100%",
            backgroundPosition: `${positionX}% center`,
            filter: "drop-shadow(0 6px 16px rgba(124, 92, 252, 0.22))",
          }}
        />
      )}
    </motion.div>
  );
}

/** Small corner companion for focus mode */
export function NovaCompanion({
  state = "focus",
  message,
}: {
  state?: NovaCharacterState;
  message?: string;
}) {
  return (
    <div className="flex items-end gap-2">
      <NovaCharacter state={state} size={56} float glow className="mx-0" />
      {message && (
        <div className="mb-2 max-w-[200px] rounded-2xl rounded-bl-md bg-white/15 px-3 py-2 backdrop-blur-md">
          <p className="text-[12px] leading-snug text-white/90">{message}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import type { NovaCharacterState } from "@/lib/nova-character";
import {
  NOVA_CALENDAR_ASPECT,
  NOVA_CALENDAR_SRC,
  NOVA_CALENDAR_SRC_2X,
  NOVA_FOCUS_ASPECT,
  NOVA_FOCUS_SRC,
  NOVA_FOCUS_SRC_2X,
  NOVA_HAPPY_ASPECT,
  NOVA_HAPPY_SRC,
  NOVA_HAPPY_SRC_2X,
  NOVA_JOURNAL_ASPECT,
  NOVA_JOURNAL_SRC,
  NOVA_JOURNAL_SRC_2X,
  NOVA_OVERWHELMED_ASPECT,
  NOVA_OVERWHELMED_SRC,
  NOVA_OVERWHELMED_SRC_2X,
  type NovaArtwork,
  novaStateLabels,
} from "@/lib/nova-character";

export interface NovaCharacterProps {
  state?: NovaCharacterState;
  /** Override artwork — use "calendar" on Calendar page, "journal" on Talk with Nova */
  artwork?: NovaArtwork;
  /** Width in px; height follows asset aspect ratio */
  size?: number;
  float?: boolean;
  glow?: boolean;
  /** Larger hero treatment for Meet Nova */
  presentation?: "default" | "hero";
  className?: string;
}

function NovaGlow({
  width,
  height,
  hero,
  variant,
}: {
  width: number;
  height: number;
  hero: boolean;
  variant: "happy" | "focus" | "calendar" | "journal" | "overwhelmed";
}) {
  const glowSize = Math.round(Math.max(width, height) * (hero ? 1.08 : 0.95));
  const focusGradient =
    "radial-gradient(circle at 50% 45%, rgba(196, 181, 253, 0.5) 0%, rgba(167, 139, 250, 0.2) 42%, transparent 72%)";
  const happyGradient =
    "radial-gradient(circle at 50% 45%, rgba(233, 213, 255, 0.45) 0%, rgba(251, 207, 232, 0.18) 40%, transparent 72%)";
  const calendarGradient =
    "radial-gradient(circle at 50% 45%, rgba(221, 214, 254, 0.48) 0%, rgba(251, 207, 232, 0.16) 42%, transparent 72%)";
  const journalGradient =
    "radial-gradient(circle at 50% 45%, rgba(233, 213, 255, 0.5) 0%, rgba(251, 207, 232, 0.2) 42%, transparent 72%)";
  const overwhelmedGradient =
    "radial-gradient(circle at 50% 45%, rgba(251, 207, 232, 0.42) 0%, rgba(221, 214, 254, 0.22) 42%, transparent 72%)";

  const gradient =
    variant === "focus"
      ? focusGradient
      : variant === "calendar"
        ? calendarGradient
        : variant === "journal"
          ? journalGradient
          : variant === "overwhelmed"
            ? overwhelmedGradient
            : happyGradient;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: glowSize, height: glowSize }}
      aria-hidden
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background: gradient,
        }}
      />
    </div>
  );
}

function getNovaAsset(state: NovaCharacterState, artwork: NovaArtwork = "auto") {
  if (artwork === "journal") {
    return {
      src: NOVA_JOURNAL_SRC,
      src2x: NOVA_JOURNAL_SRC_2X,
      aspect: NOVA_JOURNAL_ASPECT,
      variant: "journal" as const,
    };
  }
  if (artwork === "calendar") {
    return {
      src: NOVA_CALENDAR_SRC,
      src2x: NOVA_CALENDAR_SRC_2X,
      aspect: NOVA_CALENDAR_ASPECT,
      variant: "calendar" as const,
    };
  }
  if (state === "focus") {
    return {
      src: NOVA_FOCUS_SRC,
      src2x: NOVA_FOCUS_SRC_2X,
      aspect: NOVA_FOCUS_ASPECT,
      variant: "focus" as const,
    };
  }
  if (state === "overwhelmed") {
    return {
      src: NOVA_OVERWHELMED_SRC,
      src2x: NOVA_OVERWHELMED_SRC_2X,
      aspect: NOVA_OVERWHELMED_ASPECT,
      variant: "overwhelmed" as const,
    };
  }
  return {
    src: NOVA_HAPPY_SRC,
    src2x: NOVA_HAPPY_SRC_2X,
    aspect: NOVA_HAPPY_ASPECT,
    variant: "happy" as const,
  };
}

export function NovaCharacter({
  state = "happy",
  artwork = "auto",
  size = 96,
  float = true,
  glow = true,
  presentation = "default",
  className = "",
}: NovaCharacterProps) {
  const isHero = presentation === "hero";
  const asset = getNovaAsset(state, artwork);
  const width = size;
  const height = Math.round(size * asset.aspect);
  const useCrispShadow = size >= 56;

  return (
    <motion.div
      className={`relative mx-auto shrink-0 bg-transparent ${className}`}
      style={{ width, height }}
      animate={float ? { y: [0, -4, 0] } : undefined}
      transition={
        float
          ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      role="img"
      aria-label={
        artwork === "calendar"
          ? "Nova with calendar"
          : artwork === "journal"
            ? "Nova journaling"
            : novaStateLabels[state]
      }
    >
      {glow && (
        <NovaGlow
          width={width}
          height={height}
          hero={isHero}
          variant={asset.variant}
        />
      )}

      {isHero && asset.variant === "happy" && (
        <div className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
          {[
            { top: "10%", left: "20%", delay: 0 },
            { top: "24%", right: "14%", delay: 0.5 },
            { bottom: "26%", left: "12%", delay: 1 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-violet-300/70"
              style={{
                top: s.top,
                left: s.left,
                right: s.right,
                bottom: s.bottom,
              }}
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: s.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        srcSet={`${asset.src} 1x, ${asset.src2x} 2x`}
        alt={
          artwork === "calendar"
            ? "Nova with calendar"
            : artwork === "journal"
              ? "Nova journaling"
              : novaStateLabels[state]
        }
        width={width}
        height={height}
        decoding="async"
        className="nova-happy-img relative z-10 h-full w-full object-contain object-center"
        style={
          useCrispShadow
            ? {
                filter:
                  asset.variant === "focus"
                    ? "drop-shadow(0 2px 6px rgba(124, 92, 252, 0.1))"
                    : asset.variant === "calendar"
                      ? "drop-shadow(0 2px 5px rgba(124, 92, 252, 0.08))"
                      : asset.variant === "journal"
                        ? "drop-shadow(0 2px 5px rgba(124, 92, 252, 0.08))"
                      : asset.variant === "overwhelmed"
                        ? "drop-shadow(0 2px 5px rgba(124, 92, 252, 0.08))"
                        : isHero
                          ? "drop-shadow(0 3px 10px rgba(124, 92, 252, 0.12))"
                          : "drop-shadow(0 2px 5px rgba(124, 92, 252, 0.08))",
              }
            : undefined
        }
        draggable={false}
      />
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

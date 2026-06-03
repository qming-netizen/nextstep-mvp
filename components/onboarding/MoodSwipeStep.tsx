"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { moodCards, type MoodId } from "@/lib/onboarding-content";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

export function MoodSwipeStep({
  selected,
  onSelect,
}: {
  selected: MoodId | null;
  onSelect: (id: MoodId | null) => void;
}) {
  const [index, setIndex] = useState(0);
  const card = moodCards[index];
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-120, 0, 120], [-8, 0, 8]);

  const pick = (id: MoodId) => {
    onSelect(id);
  };

  const nextCard = () => setIndex((i) => (i + 1) % moodCards.length);
  const prevCard = () =>
    setIndex((i) => (i - 1 + moodCards.length) % moodCards.length);

  if (selected) {
    const mood = moodCards.find((m) => m.id === selected)!;
    return (
      <div className="space-y-4 py-2">
        <NovaOnboardingBubble message="First — how are you feeling about school right now? There's no wrong answer here." />
        <div className="rounded-3xl border-2 border-[#FFB89A] bg-[#FFF5F0] p-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl">{mood.emoji}</span>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="text-[12px] text-[#9b95a8] underline"
            >
              change
            </button>
          </div>
          <p className="mt-2 text-[17px] font-bold text-[#1a1625]">{mood.title}</p>
          <p className="text-[13px] text-[#FF9B7A]">Got it ✓</p>
        </div>
        <NovaOnboardingBubble message={mood.novaReply} />
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <NovaOnboardingBubble
        message="First — how are you feeling about school right now? There's no wrong answer here."
        hint="Swipe right if it fits · swipe left to see the next one"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) pick(card.id);
            else if (info.offset.x < -80) nextCard();
            x.set(0);
          }}
          className="mx-auto w-full max-w-[340px] rounded-3xl border-2 border-[#FFB89A]/80 bg-[#FFF8F5] px-6 py-10 text-center shadow-md"
        >
          <span className="text-5xl">{card.emoji}</span>
          <p className="mt-4 text-[22px] font-bold text-[#1a1625]">{card.title}</p>
          <p className="mt-1 font-mono text-[14px] text-[#FF9B7A]">{card.subtitle}</p>
          <div className="mt-8 flex justify-center gap-2">
            {moodCards.map((m, i) => (
              <span
                key={m.id}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#FF9B7A]" : "w-2 bg-violet-200"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={prevCard}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-violet-100 bg-white text-[14px] font-medium text-[#6b6578] shadow-sm"
        >
          👈 Not quite
        </button>
        <button
          type="button"
          onClick={() => pick(card.id)}
          className="flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-[#FFB89A] bg-white text-[14px] font-semibold text-[#FF8A65] shadow-sm"
        >
          That&apos;s me! 👉
        </button>
      </div>

      <button
        type="button"
        onClick={() => pick("okay")}
        className="mx-auto block text-[13px] text-[#9b95a8] underline"
      >
        Not sure — skip this
      </button>
    </div>
  );
}

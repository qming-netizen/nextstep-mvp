"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import { examplePlanForMaya } from "@/lib/onboarding-content";
import { novaTapComments } from "@/lib/nova-tap-comments";

export function MeetNovaStep({ firstName }: { firstName?: string }) {
  const [commentIndex, setCommentIndex] = useState(0);
  const comment = novaTapComments[commentIndex];

  const nextComment = () => {
    setCommentIndex((i) => (i + 1) % novaTapComments.length);
  };

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <NovaCharacter state="happy" size={132} presentation="hero" />

      <h1 className="mt-5 font-serif text-[32px] font-semibold tracking-tight text-[#1a1625]">
        {firstName ? `Hey ${firstName}, meet Nova` : "Meet Nova"}
      </h1>

      <div className="mt-5 w-full rounded-3xl bg-violet-100/80 px-5 py-4 text-left">
        <p className="text-[15px] leading-relaxed text-[#1a1625]">
          {firstName
            ? `Hey ${firstName}, I'm Nova. Let's figure things out together.`
            : "Hey — I'm Nova. Let's figure things out together."}
        </p>
      </div>

      <button
        type="button"
        onClick={nextComment}
        className="mt-3 flex w-full items-center gap-2 rounded-3xl bg-violet-50/90 px-4 py-3 text-left transition-colors active:bg-violet-100/90"
        aria-label="Show another note from Nova"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 text-violet-500 shadow-sm">
          <MessageCircle size={16} strokeWidth={2} />
        </span>
        <AnimatePresence mode="wait">
          <motion.p
            key={comment.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="flex-1 text-[14px] leading-relaxed text-[#6b6578]"
          >
            <span className="mr-1">{comment.emoji}</span>
            {comment.text}
          </motion.p>
        </AnimatePresence>
        <span className="shrink-0 text-[13px] font-semibold text-violet-600">
          tap →
        </span>
      </button>

      <p className="mt-4 rounded-full bg-white/80 px-4 py-1.5 text-[12px] text-[#6b6578] shadow-sm">
        4 questions · ~3 min · Free · No account needed
      </p>

      <p className="mt-6 text-[12px] text-[#9b95a8]">
        Here&apos;s what I built for another student →{" "}
        <span className="font-mono text-emerald-600">real plan</span>
      </p>

      <div className="mt-2 w-full rounded-3xl bg-white p-4 text-left shadow-md">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-purple-500" />
          <p className="text-[13px] font-semibold text-[#1a1625]">
            Nova&apos;s plan for Maya · Today
          </p>
        </div>
        <ul className="mt-3 space-y-2">
          {examplePlanForMaya.map((item, i) => (
            <li
              key={item.title}
              className={`flex items-center justify-between border-l-4 pl-3 ${item.accent}`}
            >
              <span className="text-[14px] text-[#1a1625]">
                {item.emoji} #{i + 1} {item.title}
              </span>
              <span className="text-[12px] text-[#9b95a8]">{item.minutes} min</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 rounded-2xl bg-emerald-50 px-3 py-2 text-[12px] text-emerald-800">
          👆 Maya swiped right on #1 to commit. You can do that too.
        </p>
      </div>
    </div>
  );
}

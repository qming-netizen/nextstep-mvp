"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Coffee, RefreshCw, Target, LifeBuoy } from "lucide-react";
import { NovaCharacter } from "@/components/NovaCharacter";
import type { TodayPlanCard } from "@/lib/today-plan-cards";
import { useApp } from "@/context/AppContext";

const SWIPE_THRESHOLD = 100;

function HeroTaskCard({
  card,
  stepIndex,
  total,
  onDragEnd,
  x,
}: {
  card: TodayPlanCard;
  stepIndex: number;
  total: number;
  onDragEnd: (_: unknown, info: PanInfo) => void;
  x: ReturnType<typeof useMotionValue<number>>;
}) {
  const rotate = useTransform(x, [-140, 0, 140], [-7, 0, 7]);
  const acceptOpacity = useTransform(x, [40, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -40], [1, 0]);

  return (
    <div className="relative">
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end rounded-3xl bg-emerald-500/20 pr-6"
        style={{ opacity: acceptOpacity }}
      >
        <span className="text-[14px] font-semibold text-emerald-700">Start →</span>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-start rounded-3xl bg-amber-100/80 pl-6"
        style={{ opacity: passOpacity }}
      >
        <span className="text-[14px] font-semibold text-amber-800">Skip</span>
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        style={{ x, rotate }}
        onDragEnd={onDragEnd}
        className={`relative z-10 rounded-3xl border-2 border-[#FFD4C4] bg-gradient-to-br from-[#FFF8F5] to-white p-5 shadow-md ${card.accentClass} border-l-[5px]`}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#FF9B7A]">
          Your #{stepIndex + 1} next step
        </p>

        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto my-4 flex h-16 w-16 items-center justify-center text-4xl"
        >
          {card.emoji}
        </motion.div>

        <h3 className="text-center text-[20px] font-bold leading-snug text-[#1a1625]">
          {card.title}
        </h3>
        <p className="mt-2 text-center text-[14px] text-[#6b6578]">
          {card.minutes} min · {card.scheduleHint}
        </p>

        <motion.div
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.92, 1, 0.92] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-4 rounded-2xl bg-white/70 px-4 py-3"
        >
          <p className="text-[12px] font-semibold text-[#9b95a8]">Why now?</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#1a1625]">
            {card.whyNow}
          </p>
        </motion.div>

        <div className="mt-4 flex justify-between text-[12px] font-medium">
          <span className="text-[#FF9B7A]">← swipe to skip</span>
          <span className="text-emerald-600">swipe to start →</span>
        </div>

        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === stepIndex ? "w-5 bg-[#FF9B7A]" : "w-2 bg-violet-200"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function TodayPlanDeck({
  cards: initialCards,
  novaIntro,
}: {
  cards: TodayPlanCard[];
  novaIntro: string;
}) {
  const router = useRouter();
  const { acceptPlan } = useApp();
  const [queue, setQueue] = useState(initialCards);
  const [completed, setCompleted] = useState<TodayPlanCard[]>([]);
  const [exitDir, setExitDir] = useState<"accept" | "skip" | null>(null);
  const x = useMotionValue(0);

  const current = queue[0];
  const upNext = queue.slice(1);

  const advance = useCallback(
    (action: "accept" | "skip") => {
      if (!current || exitDir) return;
      setExitDir(action);
      if (action === "accept") {
        setCompleted((c) => [...c, current]);
        acceptPlan();
      }
      setTimeout(() => {
        setQueue((q) => q.filter((t) => t.id !== current.id));
        x.set(0);
      }, 360);
    },
    [current, exitDir, acceptPlan, x]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) advance("accept");
    else if (info.offset.x < -SWIPE_THRESHOLD) advance("skip");
    else x.set(0);
  };

  const startTask = () => {
    if (!current) return;
    acceptPlan();
    router.push(current.href);
  };

  if (queue.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-violet-100 bg-white p-8 text-center shadow-md"
      >
        <motion.span
          animate={{ rotate: [0, 12, -12, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
          className="text-5xl"
        >
          🎉
        </motion.span>
        <h3 className="mt-4 text-[22px] font-bold text-[#1a1625]">
          You&apos;re all set!
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#6b6578]">
          {completed.length > 0
            ? `Great — you accepted ${completed.length} suggestion${completed.length > 1 ? "s" : ""}. Let's get you back on track.`
            : "Your plan is clear. Pick any task when you're ready."}
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {initialCards.map((c) => (
            <span
              key={c.id}
              className={`h-2 w-2 rounded-full ${
                completed.some((d) => d.id === c.id)
                  ? "bg-emerald-500"
                  : "bg-violet-200"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() =>
            router.push(completed[0]?.href ?? initialCards[0]?.href ?? "/tasks")
          }
          className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#FF9B7A] to-[#FF8A65] px-8 text-[16px] font-bold text-white shadow-lg"
        >
          Open my first task →
        </button>
      </motion.div>
    );
  }

  if (!current) return null;

  return (
    <section className="space-y-4">
      <div className="flex gap-3">
        <NovaCharacter state="happy" size={44} float={false} className="mx-0 shrink-0" />
        <div className="min-w-0 flex-1 rounded-3xl rounded-tl-lg bg-violet-100/90 px-4 py-3.5">
          <p className="text-[15px] leading-relaxed text-[#1a1625]">{novaIntro}</p>
        </div>
      </div>

      <AnimatePresence
        mode="wait"
        onExitComplete={() => setExitDir(null)}
      >
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            x: exitDir === "accept" ? 160 : exitDir === "skip" ? -160 : 0,
            rotate: exitDir === "accept" ? 12 : exitDir === "skip" ? -12 : 0,
            transition: { duration: 0.34, ease: "easeIn" },
          }}
        >
          <HeroTaskCard
            card={current}
            stepIndex={completed.length}
            total={initialCards.length}
            onDragEnd={handleDragEnd}
            x={x}
          />
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => advance("skip")}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl border border-violet-100 bg-white text-[14px] font-medium text-[#6b6578] shadow-sm active:scale-[0.98]"
        >
          👎 Not now
        </button>
        <button
          type="button"
          onClick={() => advance("accept")}
          className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-[14px] font-bold text-white shadow-md active:scale-[0.98]"
        >
          👍 Let&apos;s do it!
        </button>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={startTask}
        className="flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF9B7A] to-[#FF8A65] text-[16px] font-bold text-white shadow-lg"
      >
        I&apos;m starting {current.subject} now →
      </motion.button>

      {upNext.length > 0 && (
        <section>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
            Then
          </p>
          <div className="space-y-2">
            {upNext.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl border border-violet-100/80 bg-white p-4 shadow-sm ${t.accentClass} border-l-4`}
              >
                <p className="text-[11px] font-semibold text-[#9b95a8]">
                  THEN #{t.order}
                </p>
                <p className="mt-1 text-[15px] font-semibold text-[#1a1625]">
                  {t.emoji} {t.title}
                </p>
                <p className="mt-0.5 text-[13px] text-[#6b6578]">{t.minutes} min</p>
                {t.order === 2 && (
                  <p className="mt-2 text-[13px] leading-snug text-[#6b6578]">
                    {t.whyNow}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
          <p className="mt-3 text-center text-[13px] text-[#9b95a8]">
            Start with #{completed.length + 1} — don&apos;t think about the rest yet.
          </p>
        </section>
      )}

      <section>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-[#9b95a8]">
          Quick actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Coffee, label: "Coffee break", href: "/focus-mode" },
            { icon: Target, label: "Focus mode", href: "/focus-mode" },
            { icon: RefreshCw, label: "Reshuffle plan", href: "/focus" },
            { icon: LifeBuoy, label: "SOS", href: "/unstuck" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-1 rounded-2xl border border-violet-100 bg-white py-3.5 text-[13px] font-medium text-[#1a1625] shadow-sm active:bg-violet-50"
            >
              <action.icon size={20} className="text-violet-500" />
              {action.label}
            </Link>
          ))}
        </div>
      </section>

      <div className="flex justify-center gap-6 pt-1 text-[12px]">
        <button
          type="button"
          onClick={() => acceptPlan()}
          className="font-medium text-violet-600"
        >
          Save my plan
        </button>
        <Link href="/focus" className="font-medium text-violet-600">
          Change something
        </Link>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Clock,
  CloudRain,
  Layers,
  ListChecks,
  Moon,
  Sun,
  Sunrise,
  Sunset,
  Target,
  Timer,
  Zap,
  BookOpen,
  Users,
  Headphones,
  Coffee,
} from "lucide-react";
import { NovaAvatar } from "@/components/NovaAvatar";
import { NovaCard } from "@/components/NovaCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SelectCard } from "@/components/SelectCard";
import { useApp } from "@/context/AppContext";

const TOTAL_STEPS = 7;

const hardestOptions = [
  { id: "prioritize", label: "Knowing what to do first", icon: Target, description: "Too many things feel urgent at once" },
  { id: "overwhelm", label: "Feeling overwhelmed", icon: CloudRain, description: "The list itself feels exhausting" },
  { id: "motivation", label: "Staying motivated", icon: Zap, description: "Hard to start even when I know the plan" },
  { id: "time", label: "Estimating time", icon: Clock, description: "Tasks take longer than I expect" },
  { id: "recovery", label: "Bouncing back after a bad day", icon: Sunrise, description: "One miss throws off the whole week" },
];

const studyOptions = [
  { id: "blocks", label: "Focused time blocks", icon: Timer },
  { id: "pomodoro", label: "Short bursts (Pomodoro)", icon: Coffee },
  { id: "deep", label: "Long deep-work sessions", icon: Brain },
  { id: "flexible", label: "Flexible, task-by-task", icon: Layers },
  { id: "group", label: "Study with others", icon: Users },
  { id: "solo", label: "Quiet solo study", icon: Headphones },
];

const pacingOptions = [
  { id: "steady", label: "Steady & consistent", description: "Same pace every day", icon: ListChecks },
  { id: "sprint", label: "Sprint then rest", description: "Intense days, lighter recovery", icon: Zap },
  { id: "gentle", label: "Gentle ramp-up", description: "Start small, build momentum", icon: Sunrise },
];

const energyOptions = [
  { id: "morning", label: "Morning peak", icon: Sun },
  { id: "afternoon", label: "Afternoon focus", icon: Sunset },
  { id: "evening", label: "Evening energy", icon: Moon },
  { id: "varies", label: "It varies day to day", icon: CloudRain },
];

function toggle(arr: string[], id: string) {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);
  const [hardest, setHardest] = useState<string[]>([]);
  const [studyStyle, setStudyStyle] = useState<string[]>([]);
  const [pacing, setPacing] = useState("");
  const [energyPattern, setEnergyPattern] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  const canContinue = () => {
    if (step === 2) return hardest.length > 0;
    if (step === 3) return studyStyle.length > 0;
    if (step === 4) return pacing !== "";
    if (step === 5) return energyPattern !== "";
    if (step === 6) return name.trim().length > 0;
    return true;
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
      return;
    }
    completeOnboarding({
      name: name.trim(),
      email: email.trim(),
      hardest,
      studyStyle,
      pacing,
      energyPattern,
    });
    router.replace("/home");
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col bg-[#F8F6FC]">
      {step > 0 && (
        <div className="shrink-0 px-5 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="h-1 overflow-hidden rounded-full bg-violet-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="mt-2 text-center text-[11px] font-medium text-[#9b95a8]">
            Step {step + 1} of {TOTAL_STEPS}
          </p>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex min-h-full flex-col items-center justify-center py-8 text-center"
            >
              <NovaAvatar size="lg" />
              <h1 className="mt-6 text-[28px] font-semibold tracking-tight text-[#1a1625]">
                Meet Nova
              </h1>
              <p className="mt-3 max-w-[300px] text-[16px] leading-relaxed text-[#6b6578]">
                Your calm AI companion for when school feels like too much.
                NextStep helps you decide what matters first — gently.
              </p>
              <div className="mt-8 w-full">
                <NovaCard
                  message="I won't overwhelm you with a giant to-do list. We'll build a plan that fits how you actually feel."
                  compact
                />
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="promise"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <div className="flex items-center gap-3">
                <NovaAvatar size="md" />
                <div>
                  <p className="text-[13px] font-medium text-violet-600">Nova</p>
                  <p className="text-[15px] text-[#6b6578]">Here&apos;s how I help</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { icon: Target, title: "Decide what to do first", desc: "One clear focus, not ten competing priorities" },
                  { icon: Brain, title: "Reduce overwhelm", desc: "Big tasks become small, doable steps" },
                  { icon: Sunrise, title: "Recover gently", desc: "Missed a task? We rebuild — no guilt" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a1625]">{title}</p>
                      <p className="mt-0.5 text-[13px] text-[#6b6578]">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="hardest"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <h2 className="text-[22px] font-semibold tracking-tight text-[#1a1625]">
                When school gets overwhelming, what feels hardest?
              </h2>
              <p className="mt-2 text-[14px] text-[#6b6578]">
                Select all that resonate. Nova uses this to personalize your plan.
              </p>
              <div className="mt-5 space-y-2.5">
                {hardestOptions.map((opt) => (
                  <SelectCard
                    key={opt.id}
                    {...opt}
                    selected={hardest.includes(opt.id)}
                    onToggle={(id) => setHardest((h) => toggle(h, id))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="study"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <h2 className="text-[22px] font-semibold tracking-tight text-[#1a1625]">
                How do you like to study?
              </h2>
              <p className="mt-2 text-[14px] text-[#6b6578]">Pick your usual styles</p>
              <div className="mt-5 space-y-2.5">
                {studyOptions.map((opt) => (
                  <SelectCard
                    key={opt.id}
                    {...opt}
                    selected={studyStyle.includes(opt.id)}
                    onToggle={(id) => setStudyStyle((s) => toggle(s, id))}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="pacing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <h2 className="text-[22px] font-semibold tracking-tight text-[#1a1625]">
                What pacing feels most sustainable?
              </h2>
              <p className="mt-2 text-[14px] text-[#6b6578]">Choose one</p>
              <div className="mt-5 space-y-2.5">
                {pacingOptions.map((opt) => (
                  <SelectCard
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    description={opt.description}
                    icon={opt.icon}
                    selected={pacing === opt.id}
                    onToggle={(id) => setPacing(id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="energy"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <h2 className="text-[22px] font-semibold tracking-tight text-[#1a1625]">
                When is your energy usually highest?
              </h2>
              <p className="mt-2 text-[14px] text-[#6b6578]">
                Nova schedules focus blocks around your natural rhythm
              </p>
              <div className="mt-5 space-y-2.5">
                {energyOptions.map((opt) => (
                  <SelectCard
                    key={opt.id}
                    id={opt.id}
                    label={opt.label}
                    icon={opt.icon}
                    selected={energyPattern === opt.id}
                    onToggle={(id) => setEnergyPattern(id)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="py-6"
            >
              <NovaCard
                message="Almost there. What should I call you?"
                compact
              />
              <div className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[13px] font-medium text-[#6b6578]"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex"
                    autoComplete="name"
                    className="h-[52px] w-full rounded-2xl border border-violet-100 bg-white px-4 text-[16px] text-[#1a1625] outline-none ring-violet-400 transition-shadow focus:ring-2"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[13px] font-medium text-[#6b6578]"
                  >
                    School email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@university.edu"
                    autoComplete="email"
                    className="h-[52px] w-full rounded-2xl border border-violet-100 bg-white px-4 text-[16px] text-[#1a1625] outline-none ring-violet-400 transition-shadow focus:ring-2"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-2xl bg-violet-50/80 p-3">
                <BookOpen size={18} className="shrink-0 text-violet-600" />
                <p className="text-[12px] leading-snug text-[#6b6578]">
                  Your answers stay on this device. Connect Canvas & Calendar later in Settings.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="shrink-0 border-t border-violet-100/60 bg-white/80 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-md">
        <PrimaryButton
          onClick={handleContinue}
          disabled={!canContinue()}
        >
          {step === 0 ? "Get started" : step === TOTAL_STEPS - 1 ? "Meet your dashboard" : "Continue"}
        </PrimaryButton>
      </div>
    </div>
  );
}

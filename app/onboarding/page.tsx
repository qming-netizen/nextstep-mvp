"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PhoneFrame } from "@/components/PhoneFrame";
import { IOSOnboardingFooter } from "@/components/ios/IOSOnboardingFooter";
import { OnboardingProgress } from "@/components/onboarding/OnboardingProgress";
import { LoginWelcomeStep } from "@/components/onboarding/LoginWelcomeStep";
import { MeetNovaStep } from "@/components/onboarding/MeetNovaStep";
import { MoodSwipeStep } from "@/components/onboarding/MoodSwipeStep";
import { PlateStep } from "@/components/onboarding/PlateStep";
import { TimeEnergyStep } from "@/components/onboarding/TimeEnergyStep";
import { WinStep } from "@/components/onboarding/WinStep";
import { ShareAssignmentsStep } from "@/components/onboarding/ShareAssignmentsStep";
import { NovaProcessingStep } from "@/components/onboarding/NovaProcessingStep";
import { buildPlanFromOnboarding } from "@/lib/build-plan";
import { timeMinToHours } from "@/lib/time-budget";
import type { MoodId } from "@/lib/onboarding-content";
import type {
  OnboardingAssignment,
  OnboardingPlateItem,
} from "@/lib/types";
import { useApp } from "@/context/AppContext";

const QUESTION_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useApp();
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mood, setMood] = useState<MoodId | null>(null);
  const [plate, setPlate] = useState<OnboardingPlateItem[]>([]);
  const [timeMin, setTimeMin] = useState("30");
  const [energy, setEnergy] = useState("tired");
  const [win, setWin] = useState("not-behind");
  const [winCustom, setWinCustom] = useState("");
  const [assignments, setAssignments] = useState<OnboardingAssignment[]>([]);
  const [nerveSubjectId, setNerveSubjectId] = useState<string | null>(null);

  const isProcessing = step === 7;
  const frameVariant = isProcessing ? "dark" : "light";

  const finishOnboarding = useCallback(() => {
    const weeklyHours = timeMinToHours(timeMin);
    const plan = {
      ...buildPlanFromOnboarding({
        plate: plate.map((p) => ({
          subjectId: p.subjectId,
          dueWhen: p.dueWhen as
            | "today"
            | "tomorrow"
            | "this-week"
            | "next-week"
            | "not-sure",
          customTitle: p.customTitle,
        })),
        assignments: assignments.map((a) => ({
          id: a.id,
          subjectId: a.subjectId,
          title: a.title,
          dueWhen: a.dueWhen as
            | "today"
            | "tomorrow"
            | "this-week"
            | "next-week"
            | "not-sure",
          source: a.source,
        })),
        weeklyHours,
        moodId: mood ?? undefined,
        nerveSubjectId: nerveSubjectId ?? undefined,
      }),
      weeklyHours,
    };

    completeOnboarding({
      name: name.trim() || "Emily",
      profile: {
        name: name.trim() || "Emily",
        email: email.trim(),
        hardest: mood === "overwhelmed" ? ["overwhelm"] : ["prioritize"],
        studyStyle: ["blocks"],
        pacing: "gentle",
        energyPattern:
          energy === "ready"
            ? "evening"
            : energy === "empty"
              ? "varies"
              : "evening",
        moodId: mood ?? undefined,
        timeAvailableMin: parseInt(timeMin, 10),
        energyLevel: energy,
        todayWin: win,
        todayWinCustom: winCustom || undefined,
      },
      plate,
      assignments,
      plan,
    });
    router.replace("/home");
  }, [
    assignments,
    completeOnboarding,
    email,
    energy,
    mood,
    name,
    nerveSubjectId,
    plate,
    router,
    timeMin,
    win,
    winCustom,
  ]);

  const canContinue = () => {
    if (step === 0) return name.trim().length > 0 && email.trim().includes("@");
    if (step === 2) return mood !== null;
    if (step === 3) return plate.length > 0;
    if (step === 4) return timeMin !== "" && energy !== "";
    if (step === 5) return win !== "";
    if (step === 6) return assignments.length > 0 || plate.length > 0;
    return true;
  };

  const handleContinue = () => {
    if (step === 6) {
      setStep(7);
      return;
    }
    if (step < 7) {
      setStep((s) => s + 1);
    }
  };

  const ctaLabel = () => {
    if (step === 0) return "Continue →";
    if (step === 1) return "Let's build mine →";
    if (step === 4) return "One more →";
    if (step === 5) return "Share my assignments →";
    if (step === 6) return "✨ Build my plan →";
    return "Continue →";
  };

  const showQuestionProgress = step >= 2 && step <= 5;
  const showFooter = !isProcessing;

  return (
    <PhoneFrame variant={frameVariant}>
      <div className="flex min-h-0 flex-1 flex-col">
        {showQuestionProgress && (
          <OnboardingProgress step={step - 2} total={QUESTION_STEPS} />
        )}
        {step === 6 && (
          <div className="shrink-0 px-5 pt-2">
            <p className="text-[12px] font-medium text-[#9b95a8]">
              Share your week with Nova
            </p>
          </div>
        )}

        <div
          className={`min-h-0 flex-1 overflow-y-auto overscroll-contain ${
            isProcessing ? "" : "pb-2"
          }`}
          style={
            !isProcessing && step !== 0
              ? {
                  paddingLeft: "var(--ios-content-x)",
                  paddingRight: "var(--ios-content-x)",
                }
              : undefined
          }
        >
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
              >
                <LoginWelcomeStep
                  name={name}
                  email={email}
                  onName={setName}
                  onEmail={setEmail}
                />
              </motion.div>
            )}
            {step === 1 && (
              <motion.div
                key="meet"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
              >
                <MeetNovaStep firstName={name.trim().split(" ")[0]} />
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="mood"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="py-2"
              >
                <MoodSwipeStep selected={mood} onSelect={setMood} />
              </motion.div>
            )}
            {step === 3 && (
              <motion.div
                key="plate"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="py-2"
              >
                <PlateStep items={plate} onChange={setPlate} />
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                key="time"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="py-2"
              >
                <TimeEnergyStep
                  timeMin={timeMin}
                  energy={energy}
                  onTime={setTimeMin}
                  onEnergy={setEnergy}
                />
              </motion.div>
            )}
            {step === 5 && (
              <motion.div
                key="win"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="py-2"
              >
                <WinStep
                  win={win}
                  custom={winCustom}
                  onWin={setWin}
                  onCustom={setWinCustom}
                  showConfirm={!!win}
                />
              </motion.div>
            )}
            {step === 6 && (
              <motion.div
                key="share"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                className="py-2"
              >
                <ShareAssignmentsStep
                  assignments={assignments}
                  onChange={setAssignments}
                  nerveSubjectId={nerveSubjectId}
                  onNerveSubject={setNerveSubjectId}
                />
              </motion.div>
            )}
            {step === 7 && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-full"
              >
                <NovaProcessingStep onComplete={finishOnboarding} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showFooter && (
          <IOSOnboardingFooter
            onClick={handleContinue}
            disabled={!canContinue()}
          >
            {ctaLabel()}
          </IOSOnboardingFooter>
        )}
      </div>
    </PhoneFrame>
  );
}

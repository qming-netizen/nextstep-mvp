"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  initialDemoState,
  type DemoPersistedState,
} from "@/lib/demo-flow";
import { demoPersona } from "@/lib/nova-copy";
import type {
  OnboardingAssignment,
  OnboardingPlateItem,
  UserPlan,
  UserProfile,
} from "@/lib/types";

export interface CompleteOnboardingInput {
  profile: UserProfile;
  plate: OnboardingPlateItem[];
  assignments: OnboardingAssignment[];
  plan: UserPlan;
  name: string;
}

interface AppContextValue {
  onboardingComplete: boolean;
  user: UserProfile;
  demo: DemoPersistedState;
  plate: OnboardingPlateItem[];
  assignments: OnboardingAssignment[];
  userPlan: UserPlan | null;
  completeOnboarding: (input: CompleteOnboardingInput) => void;
  resetOnboarding: () => void;
  completeCanvasSync: () => void;
  acceptPlan: () => void;
  completeFocusSession: () => void;
  completedMicroSteps: string[];
  completeMicroStep: (stepId: string) => void;
  triggerRecoveryDemo: () => void;
  applyRecovery: () => void;
  resetDemoFlow: () => void;
}

const defaultUser: UserProfile = {
  name: demoPersona.name,
  email: demoPersona.email,
  hardest: ["prioritize", "overwhelm"],
  studyStyle: ["blocks", "solo"],
  pacing: "gentle",
  energyPattern: "evening",
};

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "nextstep-app-state";

type StoredState = {
  onboardingComplete: boolean;
  user: UserProfile;
  demo: DemoPersistedState;
  plate?: OnboardingPlateItem[];
  assignments?: OnboardingAssignment[];
  userPlan?: UserPlan | null;
  completedMicroSteps?: string[];
};

function readStoredState(): StoredState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredState;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [demo, setDemo] = useState<DemoPersistedState>(initialDemoState);
  const [plate, setPlate] = useState<OnboardingPlateItem[]>([]);
  const [assignments, setAssignments] = useState<OnboardingAssignment[]>([]);
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [completedMicroSteps, setCompletedMicroSteps] = useState<string[]>([]);

  useEffect(() => {
    const stored = readStoredState();
    if (stored) {
      setOnboardingComplete(stored.onboardingComplete ?? false);
      setUser(stored.user ?? defaultUser);
      setDemo({ ...initialDemoState, ...stored.demo });
      setPlate(stored.plate ?? []);
      setAssignments(stored.assignments ?? []);
      setUserPlan(stored.userPlan ?? null);
      setCompletedMicroSteps(stored.completedMicroSteps ?? []);
    }
    setHydrated(true);
  }, []);

  const persist = useCallback(
    (next: Partial<StoredState>) => {
      const merged = {
        onboardingComplete:
          next.onboardingComplete ?? onboardingComplete,
        user: next.user ?? user,
        demo: next.demo ?? demo,
        plate: next.plate ?? plate,
        assignments: next.assignments ?? assignments,
        userPlan: next.userPlan !== undefined ? next.userPlan : userPlan,
        completedMicroSteps:
          next.completedMicroSteps ?? completedMicroSteps,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    },
    [
      onboardingComplete,
      user,
      demo,
      plate,
      assignments,
      userPlan,
      completedMicroSteps,
    ]
  );

  const completeOnboarding = useCallback((input: CompleteOnboardingInput) => {
    const profile = {
      ...input.profile,
      name: input.name.trim() || demoPersona.name,
    };
    setUser(profile);
    setPlate(input.plate);
    setAssignments(input.assignments);
    setUserPlan(input.plan);
    setOnboardingComplete(true);
    const demoState = { ...initialDemoState, canvasSynced: true };
    setDemo(demoState);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        onboardingComplete: true,
        user: profile,
        demo: demoState,
        plate: input.plate,
        assignments: input.assignments,
        userPlan: input.plan,
      })
    );
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingComplete(false);
    setUser(defaultUser);
    setDemo(initialDemoState);
    setPlate([]);
    setAssignments([]);
    setUserPlan(null);
    setCompletedMicroSteps([]);
  }, []);

  const updateDemo = useCallback(
    (patch: Partial<DemoPersistedState>) => {
      setDemo((prev) => {
        const next = { ...prev, ...patch };
        persist({ demo: next });
        return next;
      });
    },
    [persist]
  );

  const completeCanvasSync = useCallback(
    () => updateDemo({ canvasSynced: true }),
    [updateDemo]
  );

  const acceptPlan = useCallback(
    () => updateDemo({ planAccepted: true }),
    [updateDemo]
  );

  const completeFocusSession = useCallback(
    () => updateDemo({ focusCompleted: true }),
    [updateDemo]
  );

  const completeMicroStep = useCallback(
    (stepId: string) => {
      setCompletedMicroSteps((prev) => {
        if (prev.includes(stepId)) return prev;
        const next = [...prev, stepId];
        persist({ completedMicroSteps: next });
        return next;
      });
    },
    [persist]
  );

  const triggerRecoveryDemo = useCallback(
    () => updateDemo({ recoveryTriggered: true, recoveryApplied: false }),
    [updateDemo]
  );

  const applyRecovery = useCallback(
    () => updateDemo({ recoveryApplied: true }),
    [updateDemo]
  );

  const resetDemoFlow = useCallback(() => {
    setDemo(initialDemoState);
    persist({ demo: initialDemoState });
  }, [persist]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F6FC]">
        <div className="h-8 w-8 animate-pulse rounded-full bg-violet-200" />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        onboardingComplete,
        user,
        demo,
        plate,
        assignments,
        userPlan,
        completeOnboarding,
        resetOnboarding,
        completeCanvasSync,
        acceptPlan,
        completeFocusSession,
        completedMicroSteps,
        completeMicroStep,
        triggerRecoveryDemo,
        applyRecovery,
        resetDemoFlow,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

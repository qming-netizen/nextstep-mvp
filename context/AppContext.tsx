"use client";

import {
  createContext,
  useCallback,
  useContext,
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
  const [hydrated] = useState(() => typeof window !== "undefined");
  const [stored] = useState(() => readStoredState());
  const [onboardingComplete, setOnboardingComplete] = useState(
    () => stored?.onboardingComplete ?? false
  );
  const [user, setUser] = useState<UserProfile>(
    () => stored?.user ?? defaultUser
  );
  const [demo, setDemo] = useState<DemoPersistedState>(() => ({
    ...initialDemoState,
    ...stored?.demo,
  }));
  const [plate, setPlate] = useState<OnboardingPlateItem[]>(
    () => stored?.plate ?? []
  );
  const [assignments, setAssignments] = useState<OnboardingAssignment[]>(
    () => stored?.assignments ?? []
  );
  const [userPlan, setUserPlan] = useState<UserPlan | null>(
    () => stored?.userPlan ?? null
  );

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
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    },
    [onboardingComplete, user, demo, plate, assignments, userPlan]
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
    return null;
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

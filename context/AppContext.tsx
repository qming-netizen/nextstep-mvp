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
import type { UserProfile } from "@/lib/types";

interface AppContextValue {
  onboardingComplete: boolean;
  user: UserProfile;
  demo: DemoPersistedState;
  completeOnboarding: (profile: UserProfile) => void;
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
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [demo, setDemo] = useState<DemoPersistedState>(initialDemoState);
  const [hydrated, setHydrated] = useState(false);

  const persist = useCallback(
    (next: Partial<StoredState>) => {
      const merged = {
        onboardingComplete:
          next.onboardingComplete ?? onboardingComplete,
        user: next.user ?? user,
        demo: next.demo ?? demo,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    },
    [onboardingComplete, user, demo]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as StoredState;
        if (data.onboardingComplete) {
          setOnboardingComplete(true);
          setUser(data.user);
          setDemo({ ...initialDemoState, ...data.demo });
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  const completeOnboarding = useCallback((profile: UserProfile) => {
    setUser(profile);
    setOnboardingComplete(true);
    const demoState = { ...initialDemoState };
    setDemo(demoState);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        onboardingComplete: true,
        user: profile,
        demo: demoState,
      })
    );
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingComplete(false);
    setUser(defaultUser);
    setDemo(initialDemoState);
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

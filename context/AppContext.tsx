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
import type { NovaMode } from "@/lib/nova-persona";
import type { UserProfile } from "@/lib/types";

interface AppContextValue {
  onboardingComplete: boolean;
  user: UserProfile;
  demo: DemoPersistedState;
  novaMode: NovaMode;
  setNovaMode: (m: NovaMode) => void;
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
  novaMode: NovaMode;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const loadStored = (): StoredState | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as StoredState;
    } catch {
      return null;
    }
  };

  const stored = loadStored();

  const [onboardingComplete, setOnboardingComplete] = useState(
    Boolean(stored?.onboardingComplete)
  );
  const [user, setUser] = useState<UserProfile>(stored?.user ?? defaultUser);
  const [demo, setDemo] = useState<DemoPersistedState>(
    stored?.demo ? { ...initialDemoState, ...stored.demo } : initialDemoState
  );
  const [novaMode, setNovaModeState] = useState<NovaMode>(
    stored?.novaMode ?? "gentle"
  );

  const persist = useCallback(
    (next: Partial<StoredState>) => {
      const merged = {
        onboardingComplete:
          next.onboardingComplete ?? onboardingComplete,
        user: next.user ?? user,
        demo: next.demo ?? demo,
        novaMode: next.novaMode ?? novaMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    },
    [onboardingComplete, user, demo, novaMode]
  );

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
        novaMode: "gentle" as NovaMode,
      })
    );
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingComplete(false);
    setUser(defaultUser);
    setDemo(initialDemoState);
    setNovaModeState("gentle");
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

  const setNovaMode = useCallback(
    (m: NovaMode) => {
      setNovaModeState(m);
      persist({ novaMode: m });
    },
    [persist]
  );

  return (
    <AppContext.Provider
      value={{
        onboardingComplete,
        user,
        demo,
        novaMode,
        setNovaMode,
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

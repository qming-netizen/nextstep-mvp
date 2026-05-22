"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserProfile } from "@/lib/types";

interface AppContextValue {
  onboardingComplete: boolean;
  user: UserProfile;
  completeOnboarding: (profile: UserProfile) => void;
  resetOnboarding: () => void;
  showRecovery: boolean;
  setShowRecovery: (v: boolean) => void;
}

const defaultUser: UserProfile = {
  name: "Alex",
  email: "alex@university.edu",
  hardest: [],
  studyStyle: [],
  pacing: "steady",
  energyPattern: "evening",
};

const AppContext = createContext<AppContextValue | null>(null);

const STORAGE_KEY = "nextstep-onboarding";

export function AppProvider({ children }: { children: ReactNode }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [showRecovery, setShowRecovery] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw) as { complete: boolean; user: UserProfile };
        if (data.complete) {
          setOnboardingComplete(true);
          setUser(data.user);
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
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ complete: true, user: profile })
    );
  }, []);

  const resetOnboarding = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setOnboardingComplete(false);
    setUser(defaultUser);
  }, []);

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
        completeOnboarding,
        resetOnboarding,
        showRecovery,
        setShowRecovery,
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

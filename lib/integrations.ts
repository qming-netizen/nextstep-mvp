import type { OnboardingAssignment } from "@/lib/types";
import type { DemoPersistedState } from "@/lib/demo-flow";

const INTEGRATIONS_KEY = "nextstep-integrations";

export type IntegrationId = "canvas" | "google" | "syllabus";

export interface IntegrationStatus {
  canvas: boolean;
  google: boolean;
  syllabus: boolean;
}

export interface StoredIntegrations {
  google?: boolean;
  syllabus?: boolean;
}

export function readStoredIntegrations(): StoredIntegrations {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(INTEGRATIONS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as StoredIntegrations;
  } catch {
    return {};
  }
}

export function writeStoredIntegrations(next: StoredIntegrations) {
  localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(next));
}

export function getIntegrationStatus(
  demo: DemoPersistedState,
  assignments: OnboardingAssignment[],
  extra: StoredIntegrations = {}
): IntegrationStatus {
  return {
    canvas: demo.canvasSynced,
    google:
      assignments.some((a) => a.source === "google") || Boolean(extra.google),
    syllabus:
      assignments.some((a) => a.source === "upload") || Boolean(extra.syllabus),
  };
}

export function markIntegrationConnected(id: "google" | "syllabus") {
  const current = readStoredIntegrations();
  writeStoredIntegrations({ ...current, [id]: true });
}

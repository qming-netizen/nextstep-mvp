"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  GraduationCap,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { useApp } from "@/context/AppContext";

function SettingRow({
  icon: Icon,
  label,
  description,
  connected,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description?: string;
  connected?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-[#1a1625]">{label}</p>
        {description && (
          <p className="text-[12px] text-[#6b6578]">{description}</p>
        )}
      </div>
      {connected !== undefined && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            connected
              ? "bg-emerald-50 text-emerald-600"
              : "bg-violet-50 text-violet-600"
          }`}
        >
          {connected ? "Connected" : "Connect"}
        </span>
      )}
      <ChevronRight size={18} className="shrink-0 text-[#c4bfd0]" />
    </button>
  );
}

function Toggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description?: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm">
      <div>
        <p className="font-medium text-[#1a1625]">{label}</p>
        {description && (
          <p className="text-[12px] text-[#6b6578]">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
          enabled ? "bg-violet-600" : "bg-[#e8e4ef]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, resetOnboarding, resetDemoFlow } = useApp();
  const [notifications, setNotifications] = useState(true);
  const [focusReminders, setFocusReminders] = useState(true);
  const [recoveryNudges, setRecoveryNudges] = useState(true);
  const [novaMode, setNovaMode] = useState<"gentle" | "direct">("gentle");
  const [analytics, setAnalytics] = useState(false);

  return (
    <>
      <PageHeader title="Settings" subtitle="Make NextStep yours" />
      <ScrollArea>
        <div className="space-y-6 px-5 pb-4">
          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Assignment demos
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => router.push("/recovery")}
                className="flex w-full items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 p-4 text-left text-white shadow-lg shadow-violet-500/20"
              >
                <Play size={20} />
                <div>
                  <p className="font-semibold">Recovery flow</p>
                  <p className="text-[12px] text-white/80">
                    History paper · shift change · adaptive replan
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDemoFlow();
                  router.push("/home");
                }}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm"
              >
                <RotateCcw size={20} className="text-violet-600" />
                <div>
                  <p className="font-medium text-[#1a1625]">Happy path</p>
                  <p className="text-[12px] text-[#6b6578]">
                    Canvas sync → Biology focus → progress
                  </p>
                </div>
              </button>
            </div>
          </section>

          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Profile
            </p>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[17px] font-semibold text-[#1a1625]">
                {user.name}
              </p>
              <p className="text-[13px] text-[#6b6578]">
                {user.email || "No email added"}
              </p>
            </div>
          </section>

          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Integrations
            </p>
            <div className="space-y-2">
              <SettingRow
                icon={Calendar}
                label="Google Calendar"
                description="Sync classes & deadlines"
                connected={false}
              />
              <SettingRow
                icon={GraduationCap}
                label="Canvas LMS"
                description="Import assignments automatically"
                connected={false}
              />
              <SettingRow
                icon={Upload}
                label="Upload syllabus"
                description="PDF or image — Nova parses dates"
              />
            </div>
          </section>

          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Notifications
            </p>
            <div className="space-y-2">
              <Toggle
                label="Push notifications"
                enabled={notifications}
                onChange={setNotifications}
              />
              <Toggle
                label="Focus block reminders"
                description="15 min before your window"
                enabled={focusReminders}
                onChange={setFocusReminders}
              />
              <Toggle
                label="Recovery nudges"
                description="Gentle check-ins after missed tasks"
                enabled={recoveryNudges}
                onChange={setRecoveryNudges}
              />
            </div>
          </section>

          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Nova AI
            </p>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-violet-600" />
                <p className="font-medium text-[#1a1625]">Nova tone</p>
              </div>
              <p className="mt-1 text-[12px] text-[#6b6578]">
                How Nova communicates with you
              </p>
              <div className="mt-3 flex gap-2">
                {(["gentle", "direct"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setNovaMode(mode)}
                    className={`flex-1 rounded-xl py-2.5 text-[14px] font-medium capitalize transition-colors ${
                      novaMode === mode
                        ? "bg-violet-600 text-white"
                        : "bg-violet-50 text-violet-700"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <p className="mb-2 text-[13px] font-semibold uppercase tracking-wider text-[#9b95a8]">
              Privacy
            </p>
            <div className="space-y-2">
              <Toggle
                label="Anonymous analytics"
                description="Help improve Nova — no personal data"
                enabled={analytics}
                onChange={setAnalytics}
              />
              <SettingRow
                icon={Lock}
                label="Data & privacy"
                description="What's stored on your device"
              />
              <SettingRow
                icon={BookOpen}
                label="Export study data"
              />
            </div>
          </section>

          <button
            type="button"
            onClick={resetOnboarding}
            className="w-full py-3 text-center text-[14px] font-medium text-[#9b95a8]"
          >
            Replay onboarding
          </button>
        </div>
      </ScrollArea>
    </>
  );
}

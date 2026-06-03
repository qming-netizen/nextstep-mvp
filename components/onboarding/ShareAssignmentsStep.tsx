"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileUp,
  GraduationCap,
  Loader2,
  Mail,
  Mic,
  Sparkles,
} from "lucide-react";
import type { OnboardingAssignment } from "@/lib/types";
import type { DueWhen } from "@/lib/onboarding-content";
import { subjectOptions } from "@/lib/onboarding-content";
import { NovaOnboardingBubble } from "./NovaOnboardingBubble";

const canvasDemoAssignments: Omit<OnboardingAssignment, "id">[] = [
  {
    subjectId: "science",
    title: "Lab report — enzyme kinetics",
    dueWhen: "tomorrow",
    source: "canvas",
  },
  {
    subjectId: "maths",
    title: "Quiz 3 prep — derivatives",
    dueWhen: "this-week",
    source: "canvas",
  },
  {
    subjectId: "english",
    title: "Discussion post — Ch. 12",
    dueWhen: "this-week",
    source: "canvas",
  },
];

export function ShareAssignmentsStep({
  assignments,
  onChange,
  nerveSubjectId,
  onNerveSubject,
}: {
  assignments: OnboardingAssignment[];
  onChange: (a: OnboardingAssignment[]) => void;
  nerveSubjectId: string | null;
  onNerveSubject: (id: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [connecting, setConnecting] = useState<
    "canvas" | "google" | null
  >(null);
  const [voiceOpen, setVoiceOpen] = useState(false);
  const [voiceText, setVoiceText] = useState(
    "I have a history paper due Friday and a bio lab Monday..."
  );

  const addAssignments = (
    items: Omit<OnboardingAssignment, "id">[],
    replace = false
  ) => {
    const mapped = items.map((item, i) => ({
      ...item,
      id: `a-${Date.now()}-${i}`,
    }));
    onChange(replace ? mapped : [...assignments, ...mapped]);
  };

  const connect = async (source: "canvas" | "google") => {
    setConnecting(source);
    await new Promise((r) => setTimeout(r, 1400));
    addAssignments(
      canvasDemoAssignments.map((a) => ({ ...a, source })),
      true
    );
    setConnecting(null);
  };

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    addAssignments([
      {
        subjectId: "english",
        title: file.name.replace(/\.[^.]+$/, "").slice(0, 48),
        dueWhen: "this-week" as DueWhen,
        source: "upload",
        fileName: file.name,
      },
    ]);
  };

  const applyVoice = () => {
    addAssignments(
      [
        {
          subjectId: "history",
          title: "History paper — first draft",
          dueWhen: "this-week" as DueWhen,
          source: "voice",
        },
        {
          subjectId: "science",
          title: "Biology lab follow-up",
          dueWhen: "tomorrow" as DueWhen,
          source: "voice",
        },
      ],
      assignments.length === 0
    );
    setVoiceOpen(false);
  };

  return (
    <div className="space-y-4 py-2">
      <NovaOnboardingBubble message="Now share what you're working on this week. Connect a class, upload a doc, or just tell me out loud — I'll break it into doable pieces." />

      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          disabled={!!connecting}
          onClick={() => connect("canvas")}
          className="flex flex-col items-center gap-2 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm"
        >
          {connecting === "canvas" ? (
            <Loader2 className="animate-spin text-violet-600" size={24} />
          ) : (
            <GraduationCap className="text-violet-600" size={24} />
          )}
          <span className="text-[14px] font-semibold text-[#1a1625]">Canvas</span>
          <span className="text-[11px] text-[#9b95a8]">Pull deadlines</span>
        </button>
        <button
          type="button"
          disabled={!!connecting}
          onClick={() => connect("google")}
          className="flex flex-col items-center gap-2 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm"
        >
          {connecting === "google" ? (
            <Loader2 className="animate-spin text-violet-600" size={24} />
          ) : (
            <Mail className="text-violet-600" size={24} />
          )}
          <span className="text-[14px] font-semibold text-[#1a1625]">Google</span>
          <span className="text-[11px] text-[#9b95a8]">Classroom / Drive</span>
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center gap-2 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm"
        >
          <FileUp className="text-violet-600" size={24} />
          <span className="text-[14px] font-semibold text-[#1a1625]">Upload</span>
          <span className="text-[11px] text-[#9b95a8]">PDF or doc</span>
        </button>
        <button
          type="button"
          onClick={() => setVoiceOpen(true)}
          className="flex flex-col items-center gap-2 rounded-3xl border border-violet-100 bg-white p-4 shadow-sm"
        >
          <Mic className="text-violet-600" size={24} />
          <span className="text-[14px] font-semibold text-[#1a1625]">Talk to Nova</span>
          <span className="text-[11px] text-[#9b95a8]">Describe it</span>
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <AnimatePresence>
        {voiceOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-3xl border border-violet-200 bg-violet-50/80 p-4"
          >
            <p className="text-[13px] font-medium text-violet-800">
              Tell Nova about your assignments
            </p>
            <textarea
              value={voiceText}
              onChange={(e) => setVoiceText(e.target.value)}
              rows={3}
              className="mt-2 w-full resize-none rounded-2xl border border-violet-100 bg-white p-3 text-[15px] outline-none focus:ring-2 focus:ring-violet-300"
            />
            <button
              type="button"
              onClick={applyVoice}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-2.5 text-[14px] font-semibold text-white"
            >
              <Sparkles size={16} />
              Nova, break this down
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {assignments.length > 0 && (
        <div className="space-y-2">
          <p className="text-[13px] font-semibold text-[#1a1625]">
            Your week ({assignments.length})
          </p>
          {assignments.map((a) => {
            const sub = subjectOptions.find((s) => s.id === a.subjectId);
            return (
              <div
                key={a.id}
                className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm"
              >
                <span className="text-xl">{sub?.emoji ?? "📝"}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-[#1a1625]">
                    {a.title}
                  </p>
                  <p className="text-[12px] text-[#9b95a8] capitalize">
                    {a.source} · {a.dueWhen.replace("-", " ")}
                  </p>
                </div>
              </div>
            );
          })}

          <p className="text-[12px] text-[#6b6578]">
            Which one makes you most nervous? (helps Nova prioritize)
          </p>
          <div className="flex flex-wrap gap-2">
            {assignments.map((a) => {
              const sub = subjectOptions.find((s) => s.id === a.subjectId);
              return (
                <button
                  key={`nerve-${a.id}`}
                  type="button"
                  onClick={() =>
                    onNerveSubject(
                      nerveSubjectId === a.subjectId ? null : a.subjectId
                    )
                  }
                  className={`rounded-full border px-3 py-1.5 text-[13px] ${
                    nerveSubjectId === a.subjectId
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-violet-100 bg-white"
                  }`}
                >
                  {sub?.emoji} {sub?.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

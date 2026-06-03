"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, ImagePlus, PenLine, Send, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ScrollArea } from "@/components/ScrollArea";
import { NovaCharacter } from "@/components/NovaCharacter";
import { useApp } from "@/context/AppContext";
import {
  buildStudyDataSummary,
  STUDY_DATA_PROMPT,
} from "@/lib/study-data-summary";
import {
  journalPrompts,
  readWeekJournal,
  saveWeekJournal,
  WEEK_JOURNAL_LABEL,
} from "@/lib/week-journal";

type InputMode = "write" | "photos";

interface PhotoPreview {
  id: string;
  name: string;
  url: string;
}

function NovaBubble({
  message,
  delay = 0,
}: {
  message: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex gap-3"
    >
      <NovaCharacter
        artwork="journal"
        state="happy"
        size={48}
        float={false}
        glow
        className="mx-0 shrink-0"
      />
      <div className="min-w-0 flex-1 rounded-3xl rounded-tl-lg bg-violet-100/90 px-4 py-3.5">
        <p className="text-[15px] leading-relaxed text-[#1a1625]">{message}</p>
      </div>
    </motion.div>
  );
}

function UserBubble({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end"
    >
      <div className="max-w-[85%] rounded-3xl rounded-tr-lg bg-white px-4 py-3.5 shadow-sm ring-1 ring-violet-100">
        <p className="text-[14px] leading-relaxed text-[#1a1625] whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </motion.div>
  );
}

export default function TalkWithNovaPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { completedMicroSteps, demo, user } = useApp();
  const [mode, setMode] = useState<InputMode>("write");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [novaReply, setNovaReply] = useState<string | null>(null);
  const [savedSummary, setSavedSummary] = useState<string | null>(null);
  const [studyDataShown, setStudyDataShown] = useState(false);
  const [studyDataSummary, setStudyDataSummary] = useState<string | null>(
    null
  );

  useEffect(() => {
    const existing = readWeekJournal();
    if (existing) {
      setText(existing.text);
      setSubmitted(true);
      setNovaReply(
        "Thank you for sharing this week with me. I'll keep it close — no judgment, just understanding."
      );
      if (existing.text) {
        setSavedSummary(existing.text);
      }
    }
  }, []);

  const addPhotos = (files: FileList | null) => {
    if (!files?.length) return;
    const next = Array.from(files).slice(0, 4 - photos.length).map((file, i) => ({
      id: `${Date.now()}-${i}`,
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPhotos((prev) => [...prev, ...next].slice(0, 4));
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const canShare = text.trim().length > 0 || photos.length > 0;

  const handleShare = () => {
    if (!canShare || submitted) return;

    saveWeekJournal({
      weekLabel: WEEK_JOURNAL_LABEL,
      text: text.trim(),
      photoNames: photos.map((p) => p.name),
    });

    const summaryParts: string[] = [];
    if (text.trim()) summaryParts.push(text.trim());
    if (photos.length > 0) {
      summaryParts.push(
        photos.length === 1
          ? "Shared 1 photo from this week."
          : `Shared ${photos.length} photos from this week.`
      );
    }
    setSavedSummary(summaryParts.join("\n\n"));
    setSubmitted(true);
    setNovaReply(
      photos.length > 0 && text.trim()
        ? "I love that you wrote and brought photos — that's a full picture of your week. I'm glad you shared it with me."
        : photos.length > 0
          ? "These moments tell a story. Thank you for letting me see your week through your eyes."
          : "Thank you for writing this down. Reflecting like this is how we learn what actually matters to you."
    );
  };

  const handleStudyData = () => {
    if (studyDataShown) return;
    setStudyDataShown(true);
    setStudyDataSummary(
      buildStudyDataSummary(completedMicroSteps, demo, user)
    );
  };

  return (
    <>
      <PageHeader
        title="Talk with Nova"
        subtitle="A gentle weekly check-in"
        backHref="/settings"
      />
      <ScrollArea>
        <div className="space-y-5 px-5 pb-8">
          <div className="flex flex-col items-center pt-2">
            <NovaCharacter
              artwork="journal"
              state="happy"
              size={120}
              float={false}
              glow
              className="mx-0"
            />
            <p className="mt-2 text-[12px] font-medium text-violet-600">
              Week · {WEEK_JOURNAL_LABEL}
            </p>
          </div>

          <div className="space-y-4">
            <NovaBubble message="Do you want to share the journey with me this week?" />

            {!studyDataShown && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleStudyData}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-violet-700 shadow-sm ring-1 ring-violet-100 transition-colors hover:bg-violet-50"
                >
                  <BarChart3 size={14} />
                  {STUDY_DATA_PROMPT}
                </button>
              </div>
            )}

            {studyDataShown && (
              <>
                <UserBubble message={STUDY_DATA_PROMPT} />
                {studyDataSummary && (
                  <NovaBubble message={studyDataSummary} delay={0.1} />
                )}
              </>
            )}

            {savedSummary && <UserBubble message={savedSummary} />}

            <AnimatePresence>
              {novaReply && <NovaBubble message={novaReply} delay={0.15} />}
            </AnimatePresence>
          </div>

          {!submitted && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-3 flex gap-2">
                {(
                  [
                    { id: "write" as const, label: "Write", icon: PenLine },
                    { id: "photos" as const, label: "Photos", icon: ImagePlus },
                  ] as const
                ).map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMode(id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[13px] font-medium transition-colors ${
                      mode === id
                        ? "bg-violet-600 text-white"
                        : "bg-violet-50 text-violet-700"
                    }`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>

              {!studyDataShown && (
                <button
                  type="button"
                  onClick={handleStudyData}
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-200 bg-violet-50/50 py-2.5 text-[13px] font-medium text-violet-700 transition-colors hover:border-violet-300 hover:bg-violet-50"
                >
                  <BarChart3 size={15} />
                  {STUDY_DATA_PROMPT}
                </button>
              )}

              {mode === "write" ? (
                <div>
                  <div className="mb-2 flex flex-wrap gap-1.5">
                    {journalPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() =>
                          setText((prev) =>
                            prev.trim()
                              ? `${prev.trim()}\n\n${prompt}: `
                              : `${prompt}: `
                          )
                        }
                        className="rounded-full bg-[#f8f6fc] px-2.5 py-1 text-[11px] text-[#6b6578] ring-1 ring-violet-100"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="What stood out this week? Wins, hard moments, things you're proud of…"
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-violet-100 bg-[#faf9fc] px-4 py-3 text-[14px] leading-relaxed text-[#1a1625] placeholder:text-[#b8b2c4] focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-100"
                  />
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-[12px] text-[#6b6578]">
                    Add up to 4 photos that capture your week — study sessions,
                    small wins, or quiet moments.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative aspect-square overflow-hidden rounded-2xl bg-violet-50"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
                          aria-label="Remove photo"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {photos.length < 4 && (
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 text-violet-600 transition-colors hover:border-violet-300 hover:bg-violet-50"
                      >
                        <ImagePlus size={22} />
                        <span className="text-[12px] font-medium">Add photo</span>
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      addPhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={handleShare}
                disabled={!canShare}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3.5 text-[15px] font-semibold text-white shadow-md shadow-violet-500/20 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={16} />
                Share with Nova
              </button>
            </motion.div>
          )}

          {submitted && (
            <>
              {!studyDataShown && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleStudyData}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-violet-700 shadow-sm ring-1 ring-violet-100 transition-colors hover:bg-violet-50"
                  >
                    <BarChart3 size={14} />
                    {STUDY_DATA_PROMPT}
                  </button>
                </div>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl bg-violet-50/80 px-4 py-3 text-center text-[13px] text-violet-800"
              >
                Your reflection for this week is saved on this device.
              </motion.div>
            </>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

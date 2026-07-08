"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, CalendarDays, Trophy } from "lucide-react";
import { getAllBtpMcqs, type BtpMcq } from "@/lib/btp-content";
import { Card } from "@/components/ui/card";
import { McqQuiz } from "@/components/btp/mcq-quiz";
import { SiteNav } from "@/components/layout/site-nav";
import { todayIso, useBtpStudyStore } from "@/store/use-btp-study-store";

const QUIZ_SIZE = 10;

/** Small deterministic PRNG so the "daily" quiz is the same set for everyone on a given date, without needing a backend. */
function mulberry32(seed: number) {
  return function rand() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromDate(date: string) {
  let hash = 0;
  for (let i = 0; i < date.length; i++) hash = (hash * 31 + date.charCodeAt(i)) | 0;
  return hash;
}

function dailySelection(all: (BtpMcq & { sectionSlug: string })[], date: string): BtpMcq[] {
  if (all.length === 0) return [];
  const rand = mulberry32(seedFromDate(date));
  const shuffled = [...all];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(QUIZ_SIZE, shuffled.length));
}

export default function BtpDailyQuizPage() {
  const [date, setDate] = useState<string | null>(null);
  const [mcqs, setMcqs] = useState<BtpMcq[]>([]);
  const recordDailyQuizScore = useBtpStudyStore((s) => s.recordDailyQuizScore);
  const dailyQuizScores = useBtpStudyStore((s) => s.dailyQuizScores);

  // Compute client-side only — keeps the date/seed tied to the visitor's local day without an SSR/CSR mismatch.
  useEffect(() => {
    const today = todayIso();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(today);
    setMcqs(dailySelection(getAllBtpMcqs(), today));
  }, []);

  const todayResult = date ? dailyQuizScores[date] : undefined;

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Daily Quiz" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <BrainCircuit size={26} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Daily <span className="text-gradient">Quiz</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              {mcqs.length || QUIZ_SIZE} mixed-topic MCQs, freshly picked for today. Same set for everyone, resets tomorrow.
            </p>
            {date && (
              <p className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-faint">
                <CalendarDays size={12} /> {date}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        {todayResult && (
          <Card className="mb-4 flex items-center gap-2.5 p-3.5" accent="#0e7c72">
            <Trophy size={16} className="text-accent" />
            <p className="text-xs text-foreground">
              Already attempted today — scored <span className="font-semibold">{todayResult.score}/{todayResult.total}</span>.
              Retaking below will overwrite today&rsquo;s score.
            </p>
          </Card>
        )}

        {mcqs.length > 0 ? (
          <McqQuiz key={date} mcqs={mcqs} onFinish={(score, total) => date && recordDailyQuizScore(date, score, total)} />
        ) : (
          <Card className="p-5 text-center text-xs text-muted">Loading today&rsquo;s quiz...</Card>
        )}
      </div>
    </main>
  );
}

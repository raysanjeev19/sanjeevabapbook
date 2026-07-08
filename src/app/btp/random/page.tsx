"use client";

import { useEffect, useState } from "react";
import { Shuffle } from "lucide-react";
import { btpSections, btpStageOrder, getAllBtpQuestions, type BtpQuestion } from "@/lib/btp-content";
import type { Difficulty } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { QuestionCard } from "@/components/btp/question-card";
import { SiteNav } from "@/components/layout/site-nav";

type SectionFilter = "all" | (typeof btpSections)[number]["slug"];
type DifficultyFilter = "all" | Difficulty;

function pickRandom(pool: (BtpQuestion & { sectionSlug: string; sectionTitle: string })[]) {
  if (pool.length === 0) return undefined;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function BtpRandomQuestionPage() {
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all");
  const [current, setCurrent] = useState<(BtpQuestion & { sectionSlug: string; sectionTitle: string }) | undefined>(undefined);
  const [seenCount, setSeenCount] = useState(0);

  const allQuestions = getAllBtpQuestions();
  const pool = allQuestions.filter(
    (q) => (sectionFilter === "all" || q.sectionSlug === sectionFilter) && (difficultyFilter === "all" || q.difficulty === difficultyFilter),
  );

  function next() {
    const picked = pickRandom(pool);
    setCurrent(picked);
    if (picked) setSeenCount((n) => n + 1);
  }

  // Client-only random pick on mount / whenever the filters actually change the pool — avoids SSR hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(pickRandom(pool));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionFilter, difficultyFilter]);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Random Question" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <Shuffle size={26} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Random <span className="text-gradient">Question Generator</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              Pull a random interview question from any section or difficulty — good for quick, unpredictable drilling.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="mb-4 flex flex-wrap items-center gap-2 p-3.5">
          <select
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value as SectionFilter)}
            className="rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-xs font-medium text-foreground outline-none"
          >
            <option value="all">All sections</option>
            {btpSections.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as DifficultyFilter)}
            className="rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-xs font-medium text-foreground outline-none"
          >
            <option value="all">All levels</option>
            {btpStageOrder.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <button
            onClick={next}
            disabled={pool.length === 0}
            className="hover-lift ml-auto flex items-center gap-1.5 rounded-lg bg-gradient-accent px-4 py-2 text-xs font-semibold text-white disabled:opacity-40"
          >
            <Shuffle size={13} /> New Random Question
          </button>
        </Card>

        <p className="mb-3 text-[11px] text-muted">
          {pool.length} question{pool.length === 1 ? "" : "s"} in pool &middot; {seenCount} shown this session
        </p>

        {current ? (
          <QuestionCard key={current.id} index={1} question={current} defaultOpen />
        ) : (
          <Card className="p-5 text-center text-xs text-muted">No questions match this filter yet.</Card>
        )}
      </div>
    </main>
  );
}

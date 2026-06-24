"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Play,
  Search,
  SignalHigh,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Chapter, Difficulty } from "@/lib/types";
import { percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/* Difficulty → semantic color for the inline question meta row. */
function diffColor(difficulty: string): string {
  const n = difficulty.toLowerCase();
  if (n === "beginner") return "var(--success)";
  if (n === "intermediate") return "var(--warning)";
  if (n === "expert") return "var(--error)";
  return "var(--accent)";
}

function chapterDiffClasses(difficulty: Difficulty): string {
  const n = difficulty.toLowerCase();
  if (n === "beginner") return "bg-success-soft text-success";
  if (n === "intermediate") return "bg-warning-soft text-warning";
  if (n === "expert") return "bg-error-soft text-error";
  return "bg-accent-soft text-accent";
}

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const completed = useStudyStore((s) => s.completed);
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const completedInChapter = useMemo(
    () => chapter.questions.filter((q) => completed.includes(q.id)).length,
    [chapter.questions, completed],
  );
  const chapterProgress = percent(completedInChapter, chapter.questions.length);

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return chapter.questions;
    const n = searchQuery.toLowerCase();
    return chapter.questions.filter(
      (q) => q.prompt.toLowerCase().includes(n) || q.difficulty.toLowerCase().includes(n),
    );
  }, [chapter.questions, searchQuery]);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const firstQuestionId = chapter.questions[0]?.id;

  return (
    <main className="min-h-screen bg-background">
      {/* Minimal top nav — brand + theme, matching the chapter design */}
      <nav className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="font-serif text-lg font-bold tracking-tight text-accent">
            CodeGurukul
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6 sm:px-6">
        {/* === Header === */}
        <header className="animate-fade-up">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              Chapter {String(chapter.order).padStart(2, "0")}
            </span>
            <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${chapterDiffClasses(chapter.difficulty)}`}>
              {chapter.difficulty}
            </span>
          </div>
          <h1 className="font-serif text-[1.85rem] font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {chapter.title}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{chapter.description}</p>

          {/* Progress card */}
          <div className="mt-6 rounded-xl border border-border bg-surface p-4 shadow-card">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} className="text-accent" />
                <span className="text-sm font-medium text-foreground">{completedInChapter} / {chapter.questions.length} questions</span>
              </div>
              <span className="text-sm font-medium text-muted">{chapterProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-success-soft">
              <div className="shimmer h-full rounded-full bg-success transition-[width] duration-700" style={{ width: `${chapterProgress}%` }} />
            </div>
          </div>

          {/* Action cluster */}
          <div className="mt-6 space-y-3">
            <Button asChild className="h-13 w-full text-[15px]">
              <Link href={firstQuestionId ? `/questions/${firstQuestionId}` : "#"}>
                <Play size={17} /> Start reading
              </Link>
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="secondary" className="h-12 text-[13px]">
                <Link href={`/interview/${chapter.slug}`}><GraduationCap size={15} /> Mock Interview</Link>
              </Button>
              <Button asChild variant="secondary" className="h-12 text-[13px]">
                <Link href={`/interview/${chapter.slug}`}><ClipboardCheck size={15} /> Quiz Mode</Link>
              </Button>
            </div>
          </div>
        </header>

        {/* === Search === */}
        <div className="animate-fade-up d-1 relative mt-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            aria-label="Search questions in this chapter"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface py-4 pl-12 pr-16 text-[15px] text-foreground outline-none transition-all focus:border-accent"
          />
          <span className="kbd absolute right-4 top-1/2 -translate-y-1/2">⌘K</span>
        </div>

        {/* === Questions list === */}
        <section className="mt-8">
          <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-faint">
            {searchQuery.trim() ? `${filteredQuestions.length} result${filteredQuestions.length === 1 ? "" : "s"}` : "Questions"}
          </h2>

          <div className="space-y-3">
            {filteredQuestions.map((question, index) => {
              const isDone = completed.includes(question.id);
              const color = diffColor(question.difficulty);
              return (
                <Link
                  key={question.id}
                  href={`/questions/${question.id}`}
                  className="hover-lift animate-fade-up group block rounded-xl border border-border bg-surface p-5 shadow-card"
                  style={{ animationDelay: `${Math.min(index * 30, 330)}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-1 w-1 rounded-full bg-border-strong" />
                        <span className="text-[12px] font-semibold text-muted">{question.experienceLevel}</span>
                        {isDone && <Check size={13} className="text-success" />}
                      </div>
                      <h3 className="font-serif text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                        {question.prompt}
                      </h3>
                    </div>
                    <ChevronRight size={20} className="mt-0.5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                  </div>
                  <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                    <span className="flex items-center gap-1 text-[12px] font-semibold" style={{ color }}>
                      <SignalHigh size={14} /> {question.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-semibold text-muted">
                      <Clock size={14} /> 2 min
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="mt-10 text-center text-sm text-muted">No questions match &quot;{searchQuery}&quot;</div>
          )}
        </section>

        {/* === Footer task === */}
        <section className="mt-12 rounded-2xl border border-accent/20 bg-accent-soft p-6 text-center">
          <Sparkles size={32} className="mx-auto mb-3 text-accent" />
          <p className="text-[0.95rem] leading-relaxed text-foreground">
            Complete all questions, then run the AI Interview for follow-ups, traps, and scoring.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/interview/${chapter.slug}`}>Launch Interview</Link>
          </Button>
        </section>
      </div>

      {showScrollTop && (
        <button
          className="animate-fade-in hover-lift fixed bottom-20 right-5 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted shadow-card transition-colors hover:text-foreground sm:bottom-5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </main>
  );
}

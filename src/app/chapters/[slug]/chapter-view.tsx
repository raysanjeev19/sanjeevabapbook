"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Mic,
  Search,
} from "lucide-react";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Chapter } from "@/lib/types";
import { ink, percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { SiteNav } from "@/components/layout/site-nav";

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

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <SiteNav breadcrumb={chapter.title} maxWidth="max-w-4xl" />

      <div className="mx-auto mt-6 max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section
          className="animate-fade-up relative overflow-hidden rounded-2xl bg-surface p-6 shadow-card sm:p-8"
          style={{ backgroundImage: `linear-gradient(160deg, ${chapter.color}1c, transparent 45%)` }}
        >
          <div className="absolute left-0 top-0 h-full w-1.5 rounded-r" style={{ backgroundColor: chapter.color }} />
          {/* Chapter-tinted ambient wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(36rem 16rem at 85% -20%, ${chapter.color}22, transparent 70%)` }}
          />

          <div className="relative">
            {/* Eyebrow: chapter number + difficulty, compact */}
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
              <span className="text-faint">Chapter {String(chapter.order).padStart(2, "0")}</span>
              <span className="h-1 w-1 rounded-full bg-faint" />
              <span style={{ color: ink(chapter.color) }}>{chapter.difficulty}</span>
            </div>

            <h1 className="mt-2 font-serif text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {chapter.title}
            </h1>
            <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-muted sm:line-clamp-none sm:text-[0.95rem]">
              {chapter.description}
            </p>

            {/* Progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted">{completedInChapter} / {chapter.questions.length} questions</span>
                <span className="font-bold" style={{ color: ink(chapter.color) }}>{chapterProgress}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="shimmer h-full rounded-full transition-[width] duration-500"
                  style={{ backgroundColor: chapter.color, width: `${Math.max(chapterProgress, 2)}%` }}
                />
              </div>
            </div>

            {/* Actions: one primary + two compact secondary */}
            <div className="mt-5 space-y-2">
              <Button asChild className="group h-12 w-full text-[15px]">
                <Link href={`/questions/${chapter.questions[0]?.id}`}>
                  <BookOpen size={17} /> Start reading
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" className="h-11 text-[13px]">
                  <Link href={`/interview/${chapter.slug}`}><Mic size={15} /> Mock Interview</Link>
                </Button>
                <Button asChild variant="secondary" className="h-11 text-[13px]">
                  <Link href={`/interview/${chapter.slug}`}><GraduationCap size={15} /> Quiz Mode</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="animate-fade-up d-1 relative mt-6">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            aria-label="Search questions in this chapter"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border py-2.5 pl-10 pr-4 text-sm text-foreground outline-none"
          />
        </div>

        {/* Questions */}
        <section className="mt-4 grid grid-cols-1 gap-2 pb-4">
          {filteredQuestions.map((question, index) => {
            const isDone = completed.includes(question.id);
            return (
              <Link key={question.id} href={`/questions/${question.id}`}>
                <Card
                  className="hover-lift animate-fade-up group cursor-pointer p-3.5 hover:border-border-strong"
                  style={{ animationDelay: `${Math.min(index * 30, 330)}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-transform duration-200 group-hover:scale-110"
                      style={
                        isDone
                          ? { backgroundColor: `${chapter.color}22`, color: ink(chapter.color) }
                          : { backgroundColor: "var(--surface-2)", color: "var(--faint)" }
                      }
                    >
                      {isDone ? <Check size={14} /> : index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-semibold text-foreground">{question.prompt}</h2>
                      <div className="mt-1 flex gap-1">
                        <Badge className="px-1.5 py-0.5 text-[9px]" variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
                        <Badge className="px-1.5 py-0.5 text-[9px]">{question.experienceLevel}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="shrink-0 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" size={14} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </section>

        {filteredQuestions.length === 0 && (
          <div className="mt-10 text-center text-sm text-muted">No questions match &quot;{searchQuery}&quot;</div>
        )}

        {/* Bottom CTA */}
        <section className="mb-4 rounded-xl border border-border bg-surface-2 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} style={{ color: ink(chapter.color) }} />
            <p className="text-xs leading-5 text-muted">
              Complete all questions, then run the AI Interview for follow-ups, traps, and scoring.
            </p>
          </div>
        </section>
      </div>

      {showScrollTop && (
        <button
          className="animate-fade-in hover-lift fixed bottom-5 right-5 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted shadow-card transition-colors hover:text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowLeft size={15} className="rotate-90" />
        </button>
      )}
    </main>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
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
            <Badge variant={difficultyVariant(chapter.difficulty)}>Chapter {chapter.order}</Badge>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {chapter.title}
            </h1>
            <p className="mt-3 max-w-2xl text-[1rem] leading-7 text-muted">{chapter.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              <Badge variant={difficultyVariant(chapter.difficulty)}>{chapter.difficulty}</Badge>
              <Badge>{chapter.questions.length} questions</Badge>
              <Badge>voice interview</Badge>
            </div>

            {/* Progress */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{completedInChapter} / {chapter.questions.length} completed</span>
                <span className="font-bold" style={{ color: ink(chapter.color) }}>{chapterProgress}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="shimmer h-full rounded-full transition-[width] duration-500"
                  style={{ backgroundColor: chapter.color, width: `${Math.max(chapterProgress, 2)}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <Button asChild className="h-auto justify-start p-3.5 text-[13px]">
                <Link href={`/questions/${chapter.questions[0]?.id}`}><Search size={16} /> Start Reading</Link>
              </Button>
              <Button asChild variant="secondary" className="h-auto justify-start p-3.5 text-[13px]">
                <Link href={`/interview/${chapter.slug}`}><Mic size={16} /> Mock Interview</Link>
              </Button>
              <Button asChild variant="secondary" className="h-auto justify-start p-3.5 text-[13px]">
                <Link href={`/interview/${chapter.slug}`}><GraduationCap size={16} /> Quiz Mode</Link>
              </Button>
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

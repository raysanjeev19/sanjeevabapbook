"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Brain,
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
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";

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
    <main className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Nav */}
        <nav className="mb-6 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-1.5 text-sm">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={28} />
              <span className="hidden font-serif font-semibold text-foreground sm:inline">ABAPPrep</span>
            </Link>
            <ChevronRight size={11} className="text-faint" />
            <span className="max-w-[180px] truncate font-semibold text-foreground">{chapter.title}</span>
          </div>
          <div className="flex gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/"><ArrowLeft size={14} /> <span className="hidden sm:inline">Home</span></Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/interview/${chapter.slug}`}><Brain size={14} /> <span className="hidden sm:inline">Interview</span></Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Header */}
        <section className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: chapter.color }} />

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
                className="h-full rounded-full transition-[width] duration-500"
                style={{ backgroundColor: chapter.color, width: `${chapterProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-2 sm:grid-cols-3">
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
        </section>

        {/* Search */}
        <div className="relative mt-6">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border py-2.5 pl-10 pr-4 text-sm text-foreground outline-none"
          />
        </div>

        {/* Questions */}
        <section className="mt-4 grid gap-2">
          {filteredQuestions.map((question, index) => {
            const isDone = completed.includes(question.id);
            return (
              <Link key={question.id} href={`/questions/${question.id}`}>
                <Card className="group p-3.5 hover:border-border-strong hover:bg-surface-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
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
                    <ChevronRight className="shrink-0 text-faint transition-colors group-hover:text-muted" size={14} />
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
        <section className="mt-6 rounded-xl border border-border bg-surface-2 p-4">
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
          className="animate-fade-in fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:text-foreground"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowLeft size={15} className="rotate-90" />
        </button>
      )}
    </main>
  );
}

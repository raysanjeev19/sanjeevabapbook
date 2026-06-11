"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BookmarkX, Check, ChevronRight, Clock, History, Star } from "lucide-react";
import { allQuestions, chapters } from "@/lib/content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ink } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import type { Question } from "@/lib/types";

const questionById = new Map(allQuestions.map((q) => [q.id, q]));
const chapterColorOf = (slug: string) => chapters.find((c) => c.slug === slug)?.color ?? "#0e7c72";

export default function LibraryPage() {
  const bookmarks = useStudyStore((s) => s.bookmarks);
  const recent = useStudyStore((s) => s.recent);
  const completed = useStudyStore((s) => s.completed);

  const bookmarked = useMemo(
    () => bookmarks.map((id) => questionById.get(id)).filter(Boolean) as Question[],
    [bookmarks],
  );
  const continueList = useMemo(
    () => recent.map((id) => questionById.get(id)).filter(Boolean).slice(0, 8) as Question[],
    [recent],
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <SiteNav breadcrumb="Library" maxWidth="max-w-4xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="animate-fade-up mb-8 pb-2">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your <span className="text-gradient">Library</span>
            </h1>
            <p className="mt-1 text-sm text-muted">
              {bookmarked.length} saved · {completed.length} completed · pick up where you left off
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Continue reading */}
        <section className="animate-fade-up d-1 mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <History size={14} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-foreground">Continue reading</h2>
          </div>
          {continueList.length === 0 ? (
            <EmptyState icon={<Clock size={22} />} text="Nothing yet. Open any question and it'll show up here." />
          ) : (
            <div className="grid gap-2">
              {continueList.map((q, i) => (
                <QuestionRow key={q.id} question={q} done={completed.includes(q.id)} index={i} />
              ))}
            </div>
          )}
        </section>

        {/* Bookmarks */}
        <section className="animate-fade-up d-2">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-warning-soft text-warning">
              <Star size={14} />
            </span>
            <h2 className="font-serif text-lg font-semibold text-foreground">Bookmarks</h2>
          </div>
          {bookmarked.length === 0 ? (
            <EmptyState
              icon={<BookmarkX size={22} />}
              text="No bookmarks yet. Press B while reading (or tap the bookmark icon) to save a question."
            />
          ) : (
            <div className="grid gap-2">
              {bookmarked.map((q, i) => (
                <QuestionRow key={q.id} question={q} done={completed.includes(q.id)} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}

function QuestionRow({ question, done, index }: { question: Question; done: boolean; index: number }) {
  const color = chapterColorOf(question.chapterSlug);
  return (
    <Link href={`/questions/${question.id}`}>
      <Card
        accent={color}
        className="hover-lift animate-fade-up group cursor-pointer p-3.5 hover:border-border-strong"
        style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
            style={{ backgroundColor: `${color}1f`, color: ink(color) }}
          >
            {done ? <Check size={13} /> : <Star size={13} />}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold text-foreground">{question.prompt}</h3>
            <div className="mt-1 flex gap-1">
              <Badge className="px-1.5 py-0.5 text-[9px]" variant={difficultyVariant(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <Badge className="px-1.5 py-0.5 text-[9px]">{question.experienceLevel}</Badge>
            </div>
          </div>
          <ChevronRight className="shrink-0 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" size={14} />
        </div>
      </Card>
    </Link>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-faint">{icon}</span>
      <p className="mt-3 max-w-sm text-sm text-muted">{text}</p>
    </div>
  );
}

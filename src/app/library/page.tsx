"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowLeft, BookmarkX, ChevronRight, Clock, History, Star } from "lucide-react";
import { allQuestions, chapters } from "@/lib/content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ink } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";
import { CommandPaletteButton } from "@/components/layout/command-palette";
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
    <main className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Nav */}
        <nav className="mb-6 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={28} />
              <span className="font-serif text-sm font-semibold text-foreground">ABAPPrep</span>
            </Link>
            <ChevronRight size={12} className="text-faint" />
            <span className="text-sm font-semibold text-accent">Library</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CommandPaletteButton />
            <Button asChild variant="ghost" size="sm">
              <Link href="/"><ArrowLeft size={14} /> Back</Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Your Library</h1>
          <p className="mt-1 text-sm text-muted">
            {bookmarked.length} saved · {completed.length} completed · pick up where you left off
          </p>
        </div>

        {/* Continue reading */}
        <section className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <History size={16} className="text-accent" />
            <h2 className="font-serif text-lg font-semibold text-foreground">Continue reading</h2>
          </div>
          {continueList.length === 0 ? (
            <EmptyState icon={<Clock size={22} />} text="Nothing yet. Open any question and it'll show up here." />
          ) : (
            <div className="grid gap-2">
              {continueList.map((q) => (
                <QuestionRow key={q.id} question={q} done={completed.includes(q.id)} />
              ))}
            </div>
          )}
        </section>

        {/* Bookmarks */}
        <section>
          <div className="mb-3 flex items-center gap-2">
            <Star size={16} className="text-accent" />
            <h2 className="font-serif text-lg font-semibold text-foreground">Bookmarks</h2>
          </div>
          {bookmarked.length === 0 ? (
            <EmptyState
              icon={<BookmarkX size={22} />}
              text="No bookmarks yet. Press B while reading (or tap the bookmark icon) to save a question."
            />
          ) : (
            <div className="grid gap-2">
              {bookmarked.map((q) => (
                <QuestionRow key={q.id} question={q} done={completed.includes(q.id)} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function QuestionRow({ question, done }: { question: Question; done: boolean }) {
  const color = chapterColorOf(question.chapterSlug);
  return (
    <Link href={`/questions/${question.id}`}>
      <Card accent={color} className="group p-3.5 hover:border-border-strong hover:bg-surface-2">
        <div className="flex items-center gap-3">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
            style={{ backgroundColor: `${color}1f`, color: ink(color) }}
          >
            {done ? "✓" : <Star size={13} />}
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
          <ChevronRight className="shrink-0 text-faint transition-colors group-hover:text-muted" size={14} />
        </div>
      </Card>
    </Link>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center">
      <span className="text-faint">{icon}</span>
      <p className="mt-3 max-w-sm text-sm text-muted">{text}</p>
    </div>
  );
}

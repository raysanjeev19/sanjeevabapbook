"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Brain, ChevronRight, Mic } from "lucide-react";
import { chapters } from "@/lib/content";
import { ink, percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";

export default function InterviewPickerPage() {
  const completed = useStudyStore((s) => s.completed);

  return (
    <main className="min-h-screen bg-background px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Nav */}
        <nav className="mb-6 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={28} />
              <span className="font-serif text-sm font-semibold text-foreground">ABAPPrep</span>
            </Link>
            <ChevronRight size={12} className="text-faint" />
            <span className="text-sm font-semibold text-accent">AI Interview</span>
          </div>
          <div className="flex gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/"><ArrowLeft size={14} /> Back</Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <Brain size={28} />
          </div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI Mock Interview
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
            Pick a chapter. The AI interviewer will ask questions, follow-ups, traps, and score your answers in real-time.
          </p>
        </div>

        {/* Chapter grid */}
        <div className="grid gap-2 sm:grid-cols-2">
          {chapters.map((chapter) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <Link key={chapter.slug} href={`/interview/${chapter.slug}`}>
                <Card
                  accent={chapter.color}
                  className="group flex items-center gap-3 p-3.5 hover:border-border-strong hover:bg-surface-2"
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${chapter.color}1f`, color: ink(chapter.color) }}
                  >
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13px] font-semibold text-foreground">{chapter.title}</h2>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={difficultyVariant(chapter.difficulty)} className="px-1.5 py-0.5 text-[9px]">{chapter.difficulty}</Badge>
                      <span className="text-[10px] text-muted">{chapter.questions.length} Qs</span>
                      {prog > 0 && <span className="text-[10px] font-semibold text-accent">{prog}% read</span>}
                    </div>
                  </div>
                  <Mic size={13} className="shrink-0 text-faint group-hover:text-muted" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { BookOpen, Brain, Mic } from "lucide-react";
import { chapters } from "@/lib/content";
import { ink, percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";
import { SiteNav } from "@/components/layout/site-nav";

export default function InterviewPickerPage() {
  const completed = useStudyStore((s) => s.completed);

  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <SiteNav breadcrumb="AI Interview" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-accent-contrast shadow-pop">
              <Brain size={28} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              AI <span className="text-gradient">Mock Interview</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              Pick a chapter. The AI interviewer will ask questions, follow-ups, traps, and score your answers in real-time.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Chapter grid */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {chapters.map((chapter, i) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <Link key={chapter.slug} href={`/interview/${chapter.slug}`}>
                <Card
                  accent={chapter.color}
                  className="hover-lift animate-fade-up group flex cursor-pointer items-center gap-3 p-3.5 hover:border-border-strong"
                  style={{ animationDelay: `${Math.min(i * 45, 360)}ms` }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
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
                  <Mic size={13} className="shrink-0 text-faint transition-colors duration-200 group-hover:text-accent" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

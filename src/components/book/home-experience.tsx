"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  ChevronRight,
  Flame,
  GraduationCap,
  Layers,
  Mic,
  Sparkles,
  Star,
  Target,
} from "lucide-react";
import { chapters, getChapter, getQuestion, platformStats } from "@/lib/content";
import { ink, percent } from "@/lib/utils";
import { useStudyStore, getLevel } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";
import { SiteNav } from "@/components/layout/site-nav";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Late-night session — let's make it count.";
  if (hour < 12) return "Good morning. A fresh mind reads best.";
  if (hour < 17) return "Good afternoon. Settle in for a focused read.";
  if (hour < 21) return "Good evening — a calm time to go deep.";
  return "Quiet hours. Perfect for unhurried study.";
}

export function HomeExperience() {
  const completed = useStudyStore((s) => s.completed);
  const streak = useStudyStore((s) => s.streak);
  const recent = useStudyStore((s) => s.recent);
  const bookmarks = useStudyStore((s) => s.bookmarks);
  const progress = percent(completed.length, platformStats.questions);
  const continueId = recent[0] ?? chapters[0].questions[0].id;
  const isResuming = recent.length > 0;
  const { level, title, xp } = getLevel(completed.length);

  /* Resolve the actual next question so the resume card can show its title */
  const nextQuestion = getQuestion(continueId);
  const nextChapter = nextQuestion ? getChapter(nextQuestion.chapterSlug) : undefined;
  const nextColor = nextChapter?.color ?? "var(--accent)";

  /* Greeting depends on client time — set after mount to avoid hydration mismatch */
  const [greeting, setGreeting] = useState("Welcome back. Ready to read?");
  useEffect(() => setGreeting(getGreeting()), []);

  return (
    <main className="min-h-screen bg-background">
      {/* === NAV === */}
      <SiteNav tagline />

      {/* === HERO — centered editorial, soft ambient wash (no grid) === */}
      <section className="relative overflow-hidden">
        <div className="ambient-top pointer-events-none absolute inset-0" />
        <div className="orb absolute -top-10 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2" style={{ background: "var(--accent-soft)" }} />

        <div className="relative mx-auto max-w-3xl px-5 pt-10 text-center sm:px-6 sm:pt-20">
          <p className="animate-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-[11px] font-semibold text-accent shadow-card backdrop-blur-md sm:text-xs">
            <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
            <span className="truncate">{greeting}</span>
          </p>

          <h1 className="animate-fade-up d-1 mx-auto mt-5 max-w-3xl font-serif text-[1.95rem] font-bold leading-[1.1] tracking-tight text-foreground sm:mt-6 sm:text-[3rem] sm:leading-[1.05] lg:text-[4rem]">
            Crack your SAP ABAP <span className="text-gradient">interview</span>, read like a book.
          </h1>

          <p className="animate-fade-up d-2 mx-auto mt-4 max-w-xl text-[1rem] leading-7 text-muted sm:mt-5 sm:text-[1.05rem] sm:leading-8">
            {platformStats.questions}+ curated questions with mentor-style{" "}
            <span className="font-semibold text-foreground">Hinglish</span> explanations, real
            project scenarios and AI mock interviews — laid out calmly so you actually sit down and
            read.
          </p>

          <div className="animate-fade-up d-3 mt-8 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
            <Button asChild className="group h-12 w-full px-6 text-[15px] sm:w-auto">
              <Link href={`/questions/${continueId}`}>
                <BookOpen size={17} /> {isResuming ? "Continue reading" : "Start reading"}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-12 w-full px-6 text-[15px] sm:w-auto">
              <Link href="/questions"><Layers size={17} /> All {platformStats.questions}+ questions</Link>
            </Button>
          </div>

          <div className="animate-fade-up d-4 mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-muted">
            <span className="flex items-center gap-1.5"><BookMarked size={13} className="text-accent" /> {chapters.length} chapters</span>
            <span className="h-3 w-px bg-border-strong" aria-hidden />
            <span className="flex items-center gap-1.5"><Mic size={13} className="text-accent-2" /> Voice AI interviews</span>
            <span className="h-3 w-px bg-border-strong" aria-hidden />
            <span className="flex items-center gap-1.5"><GraduationCap size={13} className="text-accent-3" /> Hinglish + English</span>
          </div>
        </div>

        {/* Continue-reading bar — slim, horizontal, like a reading app */}
        <div className="relative mx-auto mt-12 max-w-2xl px-4 sm:px-6">
          <Link
            href={`/questions/${continueId}`}
            className="hover-lift hover-glow group flex items-center gap-3.5 rounded-2xl border border-border bg-surface/85 p-3.5 shadow-card backdrop-blur-xl sm:gap-4 sm:p-4"
            style={{ "--glow-color": "var(--accent-glow)" } as React.CSSProperties}
          >
            <span className="bg-gradient-accent flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-card">
              <BookOpen size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                {isResuming ? "Continue where you left off" : "Start with the basics"}
                {nextChapter && (
                  <span className="hidden items-center gap-1 text-muted sm:flex">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: nextColor }} aria-hidden />
                    {nextChapter.title}
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate font-serif text-[15px] font-semibold text-foreground">
                {nextQuestion?.prompt ?? "What is SAP ABAP and where is it used?"}
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-accent">
              <span className="hidden sm:inline">{isResuming ? "Resume" : "Read"}</span>
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>

          {/* Readiness strip — slim progress bar + inline stats */}
          <div className="mt-3 rounded-2xl border border-border bg-surface/70 p-4 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="flex min-w-0 items-center gap-1.5 font-semibold text-foreground">
                <Sparkles size={13} className="shrink-0 text-accent" />
                <span className="truncate">Level {level} · {title}</span>
              </span>
              <span className="shrink-0 font-medium text-muted">{completed.length}/{platformStats.questions} · {xp} XP</span>
            </div>
            <div className="shimmer mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="bg-gradient-accent h-full rounded-full transition-[width] duration-700"
                style={{ width: `${Math.max(progress, 2)}%` }}
              />
            </div>
            <div className="mt-3.5 flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-semibold text-foreground"><Target size={13} className="shrink-0 text-accent" /> {platformStats.questions}+ <span className="font-normal text-muted">Qs</span></span>
              <span className="flex items-center gap-1.5 font-semibold text-foreground"><Flame size={13} className="shrink-0 text-warning" /> {streak}d <span className="font-normal text-muted">streak</span></span>
              <span className="flex items-center gap-1.5 font-semibold text-foreground"><Star size={13} className="shrink-0 text-accent-2" /> {bookmarks.length} <span className="font-normal text-muted">saved</span></span>
            </div>

            <Link
              href="/interview"
              className="hover-lift hover-glow group mt-3 flex items-center gap-3 rounded-xl bg-accent-2-soft p-3"
              style={{ "--glow-color": "var(--accent-2-soft)" } as React.CSSProperties}
            >
              <span className="bg-gradient-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white">
                <Brain size={16} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">AI Mock Interview</span>
                <span className="block truncate text-[11px] text-muted">Voice-powered · real follow-ups</span>
              </span>
              <ChevronRight size={16} className="shrink-0 text-faint transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* === CHAPTERS === */}
      <section id="chapters" className="mx-auto max-w-6xl scroll-mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between border-t border-border pt-12">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Chapters</h2>
            <p className="mt-1 text-sm text-muted">{chapters.length} chapters · pick a thread and read it through</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="group">
            <Link href="/questions">View all <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" /></Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter, i) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                <Card
                  className={`tint-card hover-lift hover-glow animate-fade-up d-${(i % 3) + 1} group relative h-full cursor-pointer overflow-hidden border-transparent p-4`}
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${chapter.color}1a, transparent 55%)`,
                    "--glow-color": `${chapter.color}38`,
                  } as React.CSSProperties}
                >
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-surface-2/60">
                    <div className="h-full transition-[width] duration-500" style={{ width: `${prog}%`, backgroundColor: chapter.color }} />
                  </div>

                  <div className="flex items-start gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
                      style={{ backgroundColor: `${chapter.color}1f`, color: ink(chapter.color) }}
                    >
                      <Icon size={18} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1.5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-faint">
                          Chapter {String(chapter.order).padStart(2, "0")}
                        </span>
                        <span className="shrink-0 text-[10px] font-bold" style={{ color: prog > 0 ? ink(chapter.color) : "var(--faint)" }}>
                          {done}/{chapter.questions.length}
                        </span>
                      </div>
                      <h3 className="mt-0.5 truncate text-sm font-semibold text-foreground">{chapter.title}</h3>
                      <p className="mt-1 line-clamp-1 text-[12px] leading-5 text-muted">{chapter.description}</p>
                      <div className="mt-2.5 flex gap-1.5 pb-1">
                        <Badge variant={difficultyVariant(chapter.difficulty)} className="px-1.5 py-0.5 text-[9px]">{chapter.difficulty}</Badge>
                        <Badge className="px-1.5 py-0.5 text-[9px]">{chapter.questions.length} Qs</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* === CTA BANNER === */}
      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 lg:px-8">
        <div className="bg-gradient-accent relative overflow-hidden rounded-2xl p-8 text-center shadow-pop sm:p-12">
          <div className="relative">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to get hired?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/85">
              Read a chapter, run an AI mock interview, and walk into the panel with answers you can actually speak.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <Button asChild variant="secondary" className="group h-11 border-0 px-6">
                <Link href={`/questions/${continueId}`}>
                  <BookOpen size={16} /> Start reading
                  <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild className="h-11 border border-white/30 bg-white/10 px-6 text-white shadow-none hover:bg-white/20 hover:shadow-none">
                <Link href="/interview"><Mic size={16} /> Try AI interview</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16" />
    </main>
  );
}

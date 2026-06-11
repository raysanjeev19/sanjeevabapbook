"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  Brain,
  ChevronRight,
  Compass,
  Flame,
  GraduationCap,
  Layers,
  Mic,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { chapters, platformStats } from "@/lib/content";
import { ink, percent } from "@/lib/utils";
import { useStudyStore, getLevel } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";
import { CommandPaletteButton } from "@/components/layout/command-palette";

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
  const continueQuestion = recent[0] ?? chapters[0].questions[0].id;
  const { level, title, xp } = getLevel(completed.length);

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* === NAV === */}
      <nav className="sticky top-0 z-40 mx-auto w-full max-w-6xl px-4 pt-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface/90 px-4 py-2.5 shadow-card backdrop-blur-md">
          <Link href="/" className="flex items-center gap-2.5">
            <BrandLogo size={30} />
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-tight text-foreground">ABAPPrep</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-faint">Learn · Practice · Prepare</span>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <CommandPaletteButton className="hidden sm:inline-flex" />
            <Button asChild size="sm" variant="ghost">
              <Link href="/questions"><Compass size={15} /> <span className="hidden sm:inline">Explore</span></Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/library"><BookMarked size={15} /> <span className="hidden sm:inline">Saved</span></Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/interview"><Mic size={15} /> <span className="hidden sm:inline">Interview</span></Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="ambient-top mx-auto max-w-6xl rounded-b-3xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16">
          <div className="animate-fade-in">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-accent shadow-card">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {getGreeting()}
            </p>

            <h1 className="mt-5 font-serif text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Your SAP ABAP
              <br />
              <span className="text-accent">interview,</span> read like a book.
            </h1>

            <p className="mt-6 max-w-xl text-[1.05rem] leading-8 text-muted">
              {platformStats.questions}+ curated questions with mentor-style Hinglish explanations,
              real project scenarios, AI mock interviews, and chapter-wise study paths — laid out
              calmly so you actually sit down and read.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <Button asChild size="default" className="h-12 px-6 text-[15px]">
                <Link href={`/questions/${continueQuestion}`}>
                  <BookOpen size={17} /> {recent.length > 0 ? "Continue reading" : "Start reading"}
                </Link>
              </Button>
              <Button asChild variant="secondary" className="h-12 px-6 text-[15px]">
                <Link href="/questions"><Layers size={17} /> All {platformStats.questions}+ questions</Link>
              </Button>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-muted">
              <span className="flex items-center gap-1.5"><BookMarked size={13} className="text-accent" /> {chapters.length} chapters</span>
              <span className="flex items-center gap-1.5"><Mic size={13} className="text-accent" /> Voice AI interviews</span>
              <span className="flex items-center gap-1.5"><GraduationCap size={13} className="text-accent" /> Hinglish + English scripts</span>
            </div>
          </div>

          {/* Progress / level card */}
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-card-hover">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Trophy size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">Level {level}</div>
                <div className="font-serif text-lg font-semibold text-foreground">{title}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-faint">XP</div>
                <div className="text-2xl font-bold text-accent">{xp}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-muted">Overall progress</span>
                <span className="font-bold text-accent">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-faint">
                {completed.length} / {platformStats.questions} questions completed
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-2">
              <StatPill icon={<Target size={15} />} value={`${platformStats.questions}+`} label="Qs" />
              <StatPill icon={<Flame size={15} />} value={`${streak}d`} label="Streak" />
              <StatPill icon={<Star size={15} />} value={`${bookmarks.length}`} label="Saved" />
              <StatPill icon={<GraduationCap size={15} />} value="4" label="Modes" />
            </div>

            <Link
              href="/interview"
              className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3.5 transition-colors hover:border-border-strong"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Brain size={16} />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-foreground">AI Mock Interview</div>
                <div className="text-[11px] text-muted">Voice-powered · Real follow-ups</div>
              </div>
              <ChevronRight size={14} className="text-faint" />
            </Link>
          </div>
        </div>
      </section>

      {/* === CHAPTERS === */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-end justify-between border-t border-border pt-10">
          <div>
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Chapters</h2>
            <p className="mt-1 text-sm text-muted">{chapters.length} chapters · pick a thread and read it through</p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/questions">View all <ArrowRight size={14} /></Link>
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                <Card className="group relative h-full overflow-hidden p-4 hover:border-border-strong hover:shadow-card-hover">
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-surface-2">
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
    </main>
  );
}

function StatPill({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2 p-2.5 text-center">
      <div className="mx-auto mb-1.5 flex h-5 w-5 items-center justify-center text-accent">{icon}</div>
      <div className="text-sm font-bold text-foreground">{value}</div>
      <div className="text-[9px] font-medium uppercase tracking-wider text-faint">{label}</div>
    </div>
  );
}

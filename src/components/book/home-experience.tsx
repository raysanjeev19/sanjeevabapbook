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
import { chapters, platformStats } from "@/lib/content";
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
  const continueQuestion = recent[0] ?? chapters[0].questions[0].id;
  const { level, title, xp } = getLevel(completed.length);

  /* Greeting depends on client time — set after mount to avoid hydration mismatch */
  const [greeting, setGreeting] = useState("Welcome back. Ready to read?");
  useEffect(() => setGreeting(getGreeting()), []);

  return (
    <main className="min-h-screen bg-background">
      {/* === NAV === */}
      <SiteNav tagline />

      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div className="ambient-top absolute inset-0" />
        <div className="bg-grid absolute inset-0" />
        <div className="orb left-[-7rem] top-[-5rem] h-72 w-72" style={{ background: "color-mix(in srgb, var(--accent) 34%, transparent)" }} />
        <div className="orb orb-2 right-[-5rem] top-16 h-80 w-80" style={{ background: "color-mix(in srgb, var(--accent-3) 28%, transparent)" }} />
        <div className="orb orb-2 bottom-[-6rem] left-1/3 hidden h-64 w-64 sm:block" style={{ background: "color-mix(in srgb, var(--accent-2) 22%, transparent)", animationDelay: "-10s" }} />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:py-20">
            {/* Left — message + CTAs */}
            <div className="text-center lg:text-left">
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3.5 py-1.5 text-xs font-medium text-accent shadow-card backdrop-blur-sm">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-success" />
                {greeting}
              </p>

              <h1 className="animate-fade-up d-1 mt-5 font-serif text-[2.35rem] font-bold leading-[1.05] tracking-tight text-foreground sm:text-[3.1rem] lg:text-[3.7rem]">
                Crack your SAP ABAP{" "}
                <span className="text-gradient">interview</span>,
                <br className="hidden sm:block" /> read like a book.
              </h1>

              <p className="animate-fade-up d-2 mx-auto mt-5 max-w-xl text-[1.02rem] leading-8 text-muted lg:mx-0">
                {platformStats.questions}+ curated questions with mentor-style Hinglish explanations,
                real project scenarios, AI mock interviews, and chapter-wise study paths — laid out
                calmly so you actually sit down and read.
              </p>

              <div className="animate-fade-up d-3 mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <Button asChild className="group h-12 w-full px-6 text-[15px] sm:w-auto">
                  <Link href={`/questions/${continueQuestion}`}>
                    <BookOpen size={17} /> {recent.length > 0 ? "Continue reading" : "Start reading"}
                    <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="secondary" className="h-12 w-full px-6 text-[15px] sm:w-auto">
                  <Link href="/questions"><Layers size={17} /> All {platformStats.questions}+ questions</Link>
                </Button>
              </div>

              <div className="animate-fade-up d-4 mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted lg:justify-start">
                <span className="flex items-center gap-1.5"><BookMarked size={13} className="text-accent" /> {chapters.length} chapters</span>
                <span className="flex items-center gap-1.5"><Mic size={13} className="text-accent-2" /> Voice AI interviews</span>
                <span className="flex items-center gap-1.5"><GraduationCap size={13} className="text-accent-3" /> Hinglish + English</span>
              </div>
            </div>

            {/* Right — interview-readiness panel with progress ring */}
            <div className="ring-gradient animate-scale-in d-2 rounded-3xl border border-border bg-surface/90 p-6 shadow-card-hover backdrop-blur-sm sm:p-7">
              <div className="flex items-center gap-4">
                <ProgressRing value={progress} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-faint">
                    <Sparkles size={11} className="text-accent" /> Level {level} · {xp} XP
                  </div>
                  <div className="mt-0.5 truncate font-serif text-xl font-bold text-foreground">{title}</div>
                  <div className="mt-1 text-[13px] text-muted">
                    {completed.length} / {platformStats.questions} questions done
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                <StatPill icon={<Target size={15} />} value={`${platformStats.questions}+`} label="Qs" color="var(--accent)" soft="var(--accent-soft)" />
                <StatPill icon={<Flame size={15} />} value={`${streak}d`} label="Streak" color="var(--warning)" soft="var(--warning-soft)" />
                <StatPill icon={<Star size={15} />} value={`${bookmarks.length}`} label="Saved" color="var(--accent-2)" soft="var(--accent-2-soft)" />
                <StatPill icon={<GraduationCap size={15} />} value="4" label="Modes" color="var(--success)" soft="var(--success-soft)" />
              </div>

              <Link
                href="/interview"
                className="hover-lift hover-glow group mt-6 flex cursor-pointer items-center gap-3 rounded-2xl bg-accent-2-soft p-3.5"
                style={{ "--glow-color": "var(--accent-2-soft)" } as React.CSSProperties}
              >
                <span className="bg-gradient-accent flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white">
                  <Brain size={16} />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">AI Mock Interview</div>
                  <div className="text-[11px] text-muted">Voice-powered · Real follow-ups</div>
                </div>
                <ChevronRight size={14} className="text-faint transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
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
          <div className="bg-grid absolute inset-0 opacity-30" />
          <div className="relative">
            <h2 className="font-serif text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Ready to get hired?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/85">
              Read a chapter, run an AI mock interview, and walk into the panel with answers you can actually speak.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
              <Button asChild variant="secondary" className="group h-11 border-0 px-6">
                <Link href={`/questions/${continueQuestion}`}>
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

/** Animated circular progress ring for the hero readiness panel. */
function ProgressRing({ value }: { value: number }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <div className="relative flex h-[88px] w-[88px] shrink-0 items-center justify-center">
      <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
        <defs>
          <linearGradient id="cg-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="55%" stopColor="var(--accent-2)" />
            <stop offset="100%" stopColor="var(--accent-3)" />
          </linearGradient>
        </defs>
        <circle cx="44" cy="44" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="8" />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="url(#cg-ring)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-gradient text-lg font-bold leading-none">{clamped}%</span>
        <span className="mt-0.5 text-[8px] font-semibold uppercase tracking-wider text-faint">ready</span>
      </div>
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
  color = "var(--accent)",
  soft = "var(--accent-soft)",
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color?: string;
  soft?: string;
}) {
  return (
    <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: soft }}>
      <div className="mx-auto mb-1.5 flex h-6 w-6 items-center justify-center" style={{ color }}>
        {icon}
      </div>
      <div className="text-sm font-bold text-foreground">{value}</div>
      <div className="text-[9px] font-medium uppercase tracking-wider text-muted">{label}</div>
    </div>
  );
}

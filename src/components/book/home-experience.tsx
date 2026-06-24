"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookMarked,
  BookOpen,
  Flame,
  GraduationCap,
  Layers,
  Mic,
  Star,
  Target,
  WandSparkles,
} from "lucide-react";
import { chapters, platformStats } from "@/lib/content";
import { percent } from "@/lib/utils";
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

  /* Greeting depends on client time — set after mount to avoid hydration mismatch */
  const [greeting, setGreeting] = useState("Welcome back. Ready to read?");
  useEffect(() => {
    const id = requestAnimationFrame(() => setGreeting(getGreeting()));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* === NAV === */}
      <SiteNav tagline />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
        {/* === HERO — centered editorial === */}
        <section className="relative overflow-hidden py-12 text-center sm:py-20">
          <div className="ambient-top pointer-events-none absolute inset-0" />

          <div className="relative">
            <p className="animate-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-accent/15 bg-accent-soft px-4 py-1.5 text-[11px] font-semibold text-accent sm:text-xs">
              <span className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              <span className="truncate">{greeting}</span>
            </p>

            <h1 className="animate-fade-up d-1 mx-auto mt-7 max-w-4xl font-serif text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem]">
              Crack your <span className="text-gradient">SAP ABAP interview</span>, read like a book.
            </h1>

            <p className="animate-fade-up d-2 mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {platformStats.questions}+ curated questions with mentor-style{" "}
              <span className="font-semibold text-foreground">Hinglish</span> explanations, real
              project scenarios and AI mock interviews — laid out calmly so you actually sit down and
              read.
            </p>

            <div className="animate-fade-up d-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild className="group h-12 w-full px-8 text-[15px] sm:w-auto">
                <Link href={`/questions/${continueId}`}>
                  <BookOpen size={17} /> {isResuming ? "Continue reading" : "Start reading"}
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="h-12 w-full px-8 text-[15px] sm:w-auto">
                <Link href="/questions"><Layers size={17} /> All {platformStats.questions}+ questions</Link>
              </Button>
            </div>

            <div className="animate-fade-up d-4 mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-border pt-8 text-sm font-medium text-muted">
              <span className="flex items-center gap-2"><BookMarked size={15} className="text-accent" /> {chapters.length} chapters</span>
              <span className="flex items-center gap-2"><Mic size={15} className="text-accent" /> Voice AI interviews</span>
              <span className="flex items-center gap-2"><GraduationCap size={15} className="text-accent" /> Hinglish + English</span>
            </div>
          </div>
        </section>

        {/* === PROGRESS + AI MOCK SPLIT === */}
        <section className="grid grid-cols-1 gap-5 pb-16 lg:grid-cols-12">
          {/* Progress dashboard */}
          <Card className="animate-fade-up p-6 sm:p-7 lg:col-span-8">
            <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-faint">Current Progress</div>
                <h3 className="mt-1 font-serif text-lg font-semibold text-foreground">Level {level} · {title}</h3>
              </div>
              <div className="sm:text-right">
                <span className="font-serif text-xl font-semibold text-accent">{completed.length} / {platformStats.questions}</span>
                <span className="ml-1.5 text-sm text-muted">· {xp} XP</span>
              </div>
            </div>

            <div className="shimmer mb-7 h-3 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-success transition-[width] duration-700"
                style={{ width: `${Math.max(progress, 3)}%`, boxShadow: "0 0 8px rgba(16,185,129,0.4)" }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Stat label="Curated Qs" value={`${platformStats.questions}+`} icon={<Target size={14} />} />
              <Stat label="Streak" value={`${streak}d`} valueClass="text-warning" icon={<Flame size={14} className="text-warning" />} />
              <Stat label="Saved" value={`${bookmarks.length}`} icon={<Star size={14} />} />
            </div>
          </Card>

          {/* AI mock interview card */}
          <Link href="/interview" className="group lg:col-span-4">
            <div className="bg-gradient-accent relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-card sm:p-7">
              <div className="relative z-10">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                  <WandSparkles size={22} />
                </div>
                <h3 className="font-serif text-xl font-semibold">AI Mock Interview</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">
                  Voice-powered experience with realistic follow-up questions to test your depth.
                </p>
              </div>
              <div className="relative z-10 mt-8 flex items-center gap-2 font-semibold transition-all group-hover:gap-3.5">
                Try now <ArrowRight size={17} />
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/10" />
              <div className="pointer-events-none absolute right-4 top-4 h-16 w-16 rounded-full bg-white/10" />
            </div>
          </Link>
        </section>

        {/* === CHAPTERS === */}
        <section id="chapters" className="scroll-mt-20 pb-16">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Chapters</h2>
              <p className="mt-1.5 text-sm text-muted">{chapters.length} chapters · pick a thread and read it through</p>
            </div>
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/questions">View all <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {chapters.map((chapter, i) => {
              const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
              const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;

              return (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                  <Card
                    className={`hover-lift animate-fade-up d-${(i % 3) + 1} group flex h-full cursor-pointer flex-col p-6`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                        Chapter {String(chapter.order).padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-semibold text-faint">{done}/{chapter.questions.length}</span>
                    </div>

                    <div className="mb-4 flex items-start gap-4">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 group-hover:bg-accent group-hover:text-white"
                        style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                      >
                        <Icon size={20} />
                      </span>
                      <h3 className="mt-1 font-serif text-lg font-semibold leading-tight text-foreground">{chapter.title}</h3>
                    </div>

                    <p className="mb-6 line-clamp-2 flex-grow text-sm leading-6 text-muted">{chapter.description}</p>

                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <Badge variant={difficultyVariant(chapter.difficulty)}>{chapter.difficulty}</Badge>
                      <span className="text-sm font-bold text-foreground">{chapter.questions.length} Qs</span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* === CTA BANNER === */}
        <section className="pb-16">
          <div className="bg-gradient-accent relative overflow-hidden rounded-3xl p-10 text-center text-white shadow-pop sm:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-25">
              <div className="absolute right-0 top-0 h-96 w-96 -translate-y-1/2 translate-x-1/2 rounded-full bg-white blur-[120px]" />
              <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#d2bbff] blur-[120px]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">Ready to get hired?</h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/85">
                Read a chapter, run an AI mock interview, and walk into the panel with answers you can actually speak.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="secondary" className="group h-12 border-0 px-8 text-[15px]">
                  <Link href={`/questions/${continueId}`}>
                    <BookOpen size={16} /> Start reading
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild className="h-12 border border-white/25 bg-white/10 px-8 text-[15px] text-white shadow-none hover:bg-white/20 hover:shadow-none">
                  <Link href="/interview"><Mic size={16} /> Try AI interview</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* === FOOTER === */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-16">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 font-serif text-lg font-bold text-accent">
                <BookOpen size={20} /> CodeGurukul
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                Mastering SAP ABAP through digital sophistication. A focused learning environment for modern developers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <FooterCol title="Platform" links={[["Explore", "/questions"], ["Interview", "/interview"], ["Saved", "/library"]]} />
              <FooterCol title="Support" links={[["Help Center", "/"], ["Contact", "/"]]} />
              <FooterCol title="Company" links={[["About Us", "/"], ["Privacy Policy", "/"], ["Terms of Service", "/"]]} />
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-xs text-faint">
            © {new Date().getFullYear()} CodeGurukul. Mastering SAP ABAP through digital sophistication.
          </div>
        </div>
      </footer>

      <div className="h-16 sm:hidden" />
    </main>
  );
}

function Stat({ label, value, valueClass, icon }: { label: string; value: string; valueClass?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-surface-2/60 p-4 text-center">
      <div className="mb-1 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
        <span className="text-faint">{icon}</span> {label}
      </div>
      <div className={`font-serif text-lg font-semibold text-foreground ${valueClass ?? ""}`}>{value}</div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold text-foreground">{title}</h4>
      <ul className="space-y-2.5 text-sm text-muted">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className="transition-colors hover:text-accent">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
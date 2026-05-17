"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  List,
  Mic,
  Rocket,
  Sparkles,
  Star,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { chapters, platformStats } from "@/lib/content";
import { percent } from "@/lib/utils";
import { useStudyStore, getLevel } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return "Burning the midnight oil? Let's make it count.";
  if (hour < 12) return "Good Morning! Fresh mind = best revision time.";
  if (hour < 17) return "Good Afternoon! Keep the momentum going.";
  if (hour < 21) return "Good Evening! Perfect time to deep dive.";
  return "Night owl mode activated. Let's grind.";
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
};

export function HomeExperience() {
  const completed = useStudyStore((s) => s.completed);
  const streak = useStudyStore((s) => s.streak);
  const recent = useStudyStore((s) => s.recent);
  const bookmarks = useStudyStore((s) => s.bookmarks);
  const progress = percent(completed.length, platformStats.questions);
  const continueQuestion = recent[0] ?? chapters[0].questions[0].id;
  const { level, title, xp } = getLevel(completed.length);

  return (
    <main className="aurora relative min-h-screen pb-16 text-slate-50">
      {/* Floating ambient particles */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {[
          { size: 5, top: "10%", left: "12%", color: "cyan", delay: "0s" },
          { size: 3, top: "25%", left: "82%", color: "violet", delay: "1.2s" },
          { size: 4, top: "60%", left: "6%", color: "emerald", delay: "2.4s" },
          { size: 3, top: "40%", left: "90%", color: "amber", delay: "0.6s" },
          { size: 2, top: "75%", left: "55%", color: "pink", delay: "1.8s" },
        ].map((p, i) => (
          <div
            key={i}
            className={`particle animate-float-slow bg-${p.color}-400/20`}
            style={{ width: p.size, height: p.size, top: p.top, left: p.left, animationDelay: p.delay }}
          />
        ))}
      </div>

      {/* === NAV (scrolls with page, NOT sticky) === */}
      <nav className="mx-auto w-full max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-2.5">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="CodeGurukul" width={32} height={32} className="rounded-lg" />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white">CodeGurukul</span>
              <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-cyan-300/60">SAP ABAP Mastery</span>
            </div>
          </Link>
          <div className="flex items-center gap-1.5">
            <Button asChild size="sm" variant="ghost">
              <Link href="/questions"><Compass size={15} /> <span className="hidden sm:inline">Explore</span></Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link href="/interview"><Mic size={15} /> <span className="hidden sm:inline">Interview</span></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* === HERO === */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-14">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={fadeUp} className="flex items-center gap-2 text-sm font-medium text-cyan-300/70">
              <Sparkles size={14} className="text-amber-400" />
              {getGreeting()}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-4 text-[2.5rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4rem]"
            >
              Your SAP ABAP
              <br />
              <span className="text-gradient">Interview Mentor</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-lg text-[15px] leading-7 text-slate-400">
              {platformStats.questions}+ curated questions with mentor-style Hinglish explanations,
              real project scenarios, AI mock interviews, and chapter-wise study paths.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <Button asChild>
                <Link href={`/questions/${continueQuestion}`}>
                  <Rocket size={16} /> {recent.length > 0 ? "Continue Studying" : "Start Learning"}
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/questions"><Layers size={16} /> All {platformStats.questions}+ Questions</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5"><BookMarked size={12} className="text-cyan-400/50" /> {chapters.length} Chapters</span>
              <span className="flex items-center gap-1.5"><Mic size={12} className="text-emerald-400/50" /> Voice AI</span>
              <span className="flex items-center gap-1.5"><Zap size={12} className="text-amber-400/50" /> Hinglish</span>
            </motion.div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            className="noise book-page relative overflow-hidden rounded-2xl border border-white/[0.06] p-5 shadow-[0_40px_100px_rgba(0,0,0,0.4)] sm:p-6"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {/* Level */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_4px_20px_rgba(251,191,36,0.3)]">
                  <Trophy size={20} className="text-white" />
                </div>
                <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-amber-300 ring-2 ring-amber-400/30">
                  {level}
                </div>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200/60">Level {level}</div>
                <div className="text-lg font-bold text-white">{title}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">XP</div>
                <div className="text-2xl font-extrabold text-gradient">{xp}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium text-slate-400">Overall Progress</span>
                <span className="font-bold text-cyan-300">{progress}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-slate-500/80">
                {completed.length} / {platformStats.questions} questions completed
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-4 gap-2">
              <StatPill icon={<Target size={14} />} value={`${platformStats.questions}+`} label="Qs" color="text-cyan-400/60" />
              <StatPill icon={<Flame size={14} />} value={`${streak}d`} label="Streak" color="text-orange-400" glow />
              <StatPill icon={<Star size={14} />} value={`${bookmarks.length}`} label="Saved" color="text-amber-400/60" />
              <StatPill icon={<GraduationCap size={14} />} value="4" label="Modes" color="text-violet-400/60" />
            </div>

            {/* AI Interview CTA */}
            <Link href="/interview" className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.06] p-3.5 transition hover:bg-emerald-400/10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-[0_0_16px_rgba(52,211,153,0.3)]">
                <Brain size={16} />
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">AI Mock Interview</div>
                <div className="text-[11px] text-emerald-300/60">Voice-powered · Real follow-ups</div>
              </div>
              <ChevronRight size={14} className="text-emerald-400/40" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* === CHAPTERS === */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-end justify-between"
        >
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Chapters</h2>
            <p className="mt-1 text-sm text-slate-500">
              {chapters.length} chapters · Color-coded by topic
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/questions">View all <ArrowRight size={14} /></Link>
          </Button>
        </motion.div>

        <motion.div
          className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {chapters.map((chapter) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <motion.div key={chapter.slug} variants={fadeUp}>
                <Link href={`/chapters/${chapter.slug}`}>
                  <Card
                    accent={chapter.color}
                    className="group relative h-full overflow-hidden p-4 transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04] active:scale-[0.985]"
                  >
                    {prog > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.04]">
                        <div className="h-full transition-all" style={{ width: `${prog}%`, backgroundColor: chapter.color }} />
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${chapter.color}10`, color: chapter.color }}
                      >
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1.5">
                          <h3 className="truncate text-[13px] font-semibold text-white">{chapter.title}</h3>
                          {prog > 0 && (
                            <span className="shrink-0 text-[10px] font-bold" style={{ color: chapter.color }}>{prog}%</span>
                          )}
                        </div>
                        <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-slate-500">{chapter.description}</p>
                        <div className="mt-2 flex gap-1">
                          <Badge variant={difficultyVariant(chapter.difficulty)} className="text-[9px] px-1.5 py-0.5">{chapter.difficulty}</Badge>
                          <Badge className="text-[9px] px-1.5 py-0.5">{chapter.questions.length} Qs</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </main>
  );
}

function StatPill({
  icon,
  value,
  label,
  color = "text-cyan-400/60",
  glow = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color?: string;
  glow?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-2.5 text-center">
      <div className={`mx-auto mb-1.5 flex h-5 w-5 items-center justify-center ${color} ${glow ? "animate-streak" : ""}`}>
        {icon}
      </div>
      <div className="text-sm font-bold text-white">{value}</div>
      <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">{label}</div>
    </div>
  );
}

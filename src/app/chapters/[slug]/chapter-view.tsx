"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Mic,
  Search,
  Sparkles,
} from "lucide-react";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Chapter } from "@/lib/types";
import { percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";

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
    <main
      className="aurora min-h-screen px-4 py-4 text-slate-50 sm:px-6 lg:px-8"
      style={{ "--accent": chapter.color, "--accent-glow": `${chapter.color}30` } as React.CSSProperties}
    >
      <div className="mx-auto max-w-5xl">
        {/* Nav */}
        <nav className="glass mb-5 flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CodeGurukul" width={26} height={26} className="rounded-lg" />
              <span className="hidden font-bold text-white sm:inline">CodeGurukul</span>
            </Link>
            <ChevronRight size={11} className="text-slate-600" />
            <span className="max-w-[180px] truncate font-semibold" style={{ color: chapter.color }}>
              {chapter.title}
            </span>
          </div>
          <div className="flex gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/"><ArrowLeft size={14} /> <span className="hidden sm:inline">Home</span></Link>
            </Button>
            <Button asChild size="sm">
              <Link href={`/interview/${chapter.slug}`}><Brain size={14} /> <span className="hidden sm:inline">Interview</span></Link>
            </Button>
          </div>
        </nav>

        {/* Header */}
        <motion.section
          className="noise book-page relative overflow-hidden rounded-2xl border p-5 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-7"
          style={{ borderColor: `${chapter.color}18` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div
            className="absolute right-5 top-0 h-20 w-3.5 rounded-b-full"
            style={{ backgroundColor: chapter.color, boxShadow: `0 0 24px ${chapter.color}70` }}
          />

          <Badge variant={difficultyVariant(chapter.difficulty)}>Chapter {chapter.order}</Badge>
          <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">{chapter.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            <Badge variant={difficultyVariant(chapter.difficulty)}>{chapter.difficulty}</Badge>
            <Badge>{chapter.questions.length} questions</Badge>
            <Badge>voice interview</Badge>
          </div>

          {/* Progress */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">{completedInChapter} / {chapter.questions.length} completed</span>
              <span className="font-bold" style={{ color: chapter.color }}>{chapterProgress}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: chapter.color, boxShadow: `0 0 10px ${chapter.color}50` }}
                initial={{ width: 0 }}
                animate={{ width: `${chapterProgress}%` }}
                transition={{ duration: 0.7 }}
              />
            </div>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-3">
            <Button asChild className="h-auto justify-start p-3.5 text-[13px]">
              <Link href={`/questions/${chapter.questions[0]?.id}`}><Sparkles size={16} /> Start Reading</Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto justify-start p-3.5 text-[13px]">
              <Link href={`/interview/${chapter.slug}`}><Mic size={16} /> Mock Interview</Link>
            </Button>
            <Button asChild variant="secondary" className="h-auto justify-start p-3.5 text-[13px]">
              <Link href={`/interview/${chapter.slug}`}><GraduationCap size={16} /> Quiz Mode</Link>
            </Button>
          </div>
        </motion.section>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>

        {/* Questions */}
        <section className="mt-4 grid gap-1.5">
          {filteredQuestions.map((question, index) => {
            const isDone = completed.includes(question.id);
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: Math.min(index * 0.01, 0.1) }}
              >
                <Link href={`/questions/${question.id}`}>
                  <Card className="group p-3 transition-all duration-150 hover:border-white/12 hover:bg-white/[0.04] active:scale-[0.997] sm:p-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition"
                        style={
                          isDone
                            ? { backgroundColor: `${chapter.color}18`, color: chapter.color }
                            : { backgroundColor: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.35)" }
                        }
                      >
                        {isDone ? <Check size={14} /> : index + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="truncate text-sm font-semibold text-white">{question.prompt}</h2>
                        <div className="mt-1 flex gap-1">
                          <Badge className="text-[9px] px-1.5 py-0.5" variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
                          <Badge className="text-[9px] px-1.5 py-0.5">{question.experienceLevel}</Badge>
                        </div>
                      </div>
                      <ChevronRight className="shrink-0 text-slate-700 transition group-hover:text-slate-400" size={14} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </section>

        {filteredQuestions.length === 0 && (
          <div className="mt-10 text-center text-sm text-slate-500">No questions match &quot;{searchQuery}&quot;</div>
        )}

        {/* Bottom CTA */}
        <section className="mt-5 rounded-xl border p-4" style={{ borderColor: `${chapter.color}18`, backgroundColor: `${chapter.color}06` }}>
          <div className="flex items-center gap-3">
            <CheckCircle2 size={16} style={{ color: chapter.color }} />
            <p className="text-xs leading-5" style={{ color: `${chapter.color}cc` }}>
              Complete all questions, then run the AI Interview for follow-ups, traps, and scoring.
            </p>
          </div>
        </section>
      </div>

      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-5 right-5 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-slate-950/90 text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowLeft size={14} className="rotate-90" />
        </motion.button>
      )}
    </main>
  );
}

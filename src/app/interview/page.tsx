"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Brain, ChevronRight, Home, Mic } from "lucide-react";
import { chapters } from "@/lib/content";
import { percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";

export default function InterviewPickerPage() {
  const completed = useStudyStore((s) => s.completed);

  return (
    <main className="aurora min-h-screen px-4 py-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Nav */}
        <nav className="glass mb-5 flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CodeGurukul" width={28} height={28} className="rounded-lg" />
              <span className="text-sm font-bold text-white">CodeGurukul</span>
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-sm font-semibold text-cyan-300">AI Interview</span>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/"><ArrowLeft size={14} /> Back</Link>
          </Button>
        </nav>

        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-emerald-400 text-slate-950 shadow-[0_0_40px_rgba(103,232,249,0.25)]"
          >
            <Brain size={28} />
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            AI Mock Interview
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            Pick a chapter. The AI interviewer will ask questions, follow-ups, traps, and score your answers in real-time.
          </p>
        </div>

        {/* Chapter grid */}
        <div className="grid gap-2 sm:grid-cols-2">
          {chapters.map((chapter, index) => {
            const Icon = iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen;
            const done = completed.filter((id) => chapter.questions.some((q) => q.id === id)).length;
            const prog = percent(done, chapter.questions.length);

            return (
              <motion.div
                key={chapter.slug}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.02, 0.12) }}
              >
                <Link href={`/interview/${chapter.slug}`}>
                  <Card
                    accent={chapter.color}
                    className="group flex items-center gap-3 p-3.5 transition-all duration-150 hover:border-white/15 hover:bg-white/[0.04] active:scale-[0.99]"
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${chapter.color}10`, color: chapter.color }}
                    >
                      <Icon size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[13px] font-semibold text-white">{chapter.title}</h2>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant={difficultyVariant(chapter.difficulty)} className="text-[9px] px-1.5 py-0.5">{chapter.difficulty}</Badge>
                        <span className="text-[10px] text-slate-500">{chapter.questions.length} Qs</span>
                        {prog > 0 && <span className="text-[10px] font-semibold" style={{ color: chapter.color }}>{prog}% read</span>}
                      </div>
                    </div>
                    <Mic size={13} className="shrink-0 text-slate-600 group-hover:text-white/40" />
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

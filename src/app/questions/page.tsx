"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Filter,
  Home,
  Search,
} from "lucide-react";
import { allQuestions, chapters } from "@/lib/content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";

export default function AllQuestionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("all");

  const filteredQuestions = useMemo(() => {
    let results = allQuestions;
    if (selectedChapter !== "all") {
      results = results.filter((q) => q.chapterSlug === selectedChapter);
    }
    if (searchQuery.trim()) {
      const normalized = searchQuery.toLowerCase();
      results = results.filter(
        (q) =>
          q.prompt.toLowerCase().includes(normalized) ||
          q.tags.some((t) => t.toLowerCase().includes(normalized)),
      );
    }
    return results;
  }, [searchQuery, selectedChapter]);

  const selectedChapterData = chapters.find((c) => c.slug === selectedChapter);

  return (
    <main className="aurora min-h-screen px-4 py-4 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Nav */}
        <nav className="glass mb-5 flex items-center justify-between rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CodeGurukul" width={28} height={28} className="rounded-lg" />
              <span className="text-sm font-bold text-white">CodeGurukul</span>
            </Link>
            <ChevronRight size={12} className="text-slate-600" />
            <span className="text-sm font-semibold text-cyan-300">All Questions</span>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/"><ArrowLeft size={14} /> Back</Link>
          </Button>
        </nav>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            All Questions
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {allQuestions.length} questions across {chapters.length} chapters
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search questions, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>
          <div className="relative">
            <Filter size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-9 pr-8 text-sm text-white outline-none sm:w-auto"
            >
              <option value="all">All Chapters</option>
              {chapters.map((ch) => (
                <option key={ch.slug} value={ch.slug}>{ch.title} ({ch.questions.length})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="mb-3 flex items-center gap-2 text-[11px] text-slate-500">
          {selectedChapterData && (
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: selectedChapterData.color }} />
          )}
          {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
        </div>

        {/* Questions */}
        <div className="grid gap-1.5">
          {filteredQuestions.map((question, index) => {
            const chapter = chapters.find((c) => c.slug === question.chapterSlug);
            const Icon = chapter ? iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen : BookOpen;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15px" }}
                transition={{ delay: Math.min(index * 0.008, 0.08) }}
              >
                <Link href={`/questions/${question.id}`}>
                  <Card className="group p-3 transition-all duration-150 hover:border-white/12 hover:bg-white/[0.04] active:scale-[0.997] sm:p-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${chapter?.color ?? "#67E8F9"}0d`, color: chapter?.color ?? "#67E8F9" }}
                      >
                        <Icon size={14} />
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
        </div>

        {filteredQuestions.length === 0 && (
          <div className="mt-16 text-center">
            <Search size={28} className="mx-auto text-slate-700" />
            <p className="mt-3 text-sm text-slate-500">No questions found. Try different keywords.</p>
          </div>
        )}
      </div>
    </main>
  );
}

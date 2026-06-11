"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Filter,
  Search,
} from "lucide-react";
import { allQuestions, chapters } from "@/lib/content";
import { ink } from "@/lib/utils";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { iconMap } from "@/components/book/icon-map";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";

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
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-40 mx-auto w-full max-w-4xl px-4 pt-3 sm:px-6 lg:px-8">
        <div className="glass flex items-center justify-between rounded-xl px-4 py-2.5 shadow-card">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={28} />
              <span className="font-serif text-sm font-semibold text-foreground">CodeGurukul</span>
            </Link>
            <ChevronRight size={12} className="text-faint" />
            <span className="text-sm font-semibold text-accent">All Questions</span>
          </div>
          <div className="flex gap-1.5">
            <Button asChild variant="ghost" size="sm">
              <Link href="/"><ArrowLeft size={14} /> Back</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <div className="ambient-top">
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="animate-fade-up mb-6 pb-2">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              All <span className="text-gradient">Questions</span>
            </h1>
            <p className="mt-1 text-sm text-muted">
              {allQuestions.length} questions across {chapters.length} chapters
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Search + Filter */}
        <div className="animate-fade-up d-1 mb-5 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <input
              type="text"
              aria-label="Search questions"
              placeholder="Search questions, topics, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border py-2.5 pl-10 pr-4 text-sm text-foreground outline-none transition-shadow duration-200"
            />
          </div>
          <div className="relative">
            <Filter size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
            <select
              aria-label="Filter by chapter"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-border py-2.5 pl-9 pr-8 text-sm text-foreground outline-none sm:w-auto"
            >
              <option value="all">All Chapters</option>
              {chapters.map((ch) => (
                <option key={ch.slug} value={ch.slug}>{ch.title} ({ch.questions.length})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Count */}
        <div className="mb-3 flex items-center gap-2 text-[11px] text-muted">
          {selectedChapterData && (
            <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: selectedChapterData.color }} />
          )}
          {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""}
        </div>

        {/* Questions */}
        <div className="grid gap-2">
          {filteredQuestions.map((question, index) => {
            const chapter = chapters.find((c) => c.slug === question.chapterSlug);
            const Icon = chapter ? iconMap[chapter.icon as keyof typeof iconMap] ?? BookOpen : BookOpen;
            const color = chapter?.color ?? "var(--accent)";

            return (
              <Link key={question.id} href={`/questions/${question.id}`}>
                <Card
                  className="hover-lift animate-fade-up group cursor-pointer p-3.5 hover:border-border-strong"
                  style={{ animationDelay: `${Math.min(index * 35, 350)}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${chapter?.color ?? "#0e7c72"}1f`, color: ink(color) }}
                    >
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 className="truncate text-sm font-semibold text-foreground">{question.prompt}</h2>
                      <div className="mt-1 flex gap-1">
                        <Badge className="px-1.5 py-0.5 text-[9px]" variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
                        <Badge className="px-1.5 py-0.5 text-[9px]">{question.experienceLevel}</Badge>
                      </div>
                    </div>
                    <ChevronRight className="shrink-0 text-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" size={14} />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="animate-fade-up mt-16 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
              <Search size={24} />
            </span>
            <p className="mt-4 text-sm text-muted">No questions found. Try different keywords.</p>
          </div>
        )}
      </div>
    </main>
  );
}

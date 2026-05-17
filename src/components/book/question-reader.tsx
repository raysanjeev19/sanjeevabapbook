"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Tabs from "@radix-ui/react-tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Bookmark,
  Bot,
  Check,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Eye,
  EyeOff,
  Gauge,
  Home,
  Languages,
  Lightbulb,
  RotateCcw,
  StickyNote,
  WandSparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { allQuestions, getAnswerLabelsForQuestion, getChapterColor, requiredAnswerSections } from "@/lib/content";
import type { Question } from "@/lib/types";
import { cn, percent } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/* Tab icons for quick visual identification */
const tabIcons: Record<string, React.ReactNode> = {
  easyUnderstanding: <Lightbulb size={13} />,
  hinglishMasterExplanation: <Languages size={13} />,
  interviewMeKyaBolnaHai: <Bot size={13} />,
  interviewerKyaSochtaHai: <Eye size={13} />,
  codeWalkthrough: <StickyNote size={13} />,
};

export function QuestionReader({ question }: { question: Question }) {
  const bookmarkIds = useStudyStore((state) => state.bookmarks);
  const completed = useStudyStore((state) => state.completed);
  const confidence = useStudyStore((state) => state.confidence[question.id] ?? 50);
  const note = useStudyStore((state) => state.notes[question.id] ?? "");
  const focusMode = useStudyStore((state) => state.focusMode);
  const toggleBookmark = useStudyStore((state) => state.toggleBookmark);
  const markComplete = useStudyStore((state) => state.markComplete);
  const setConfidence = useStudyStore((state) => state.setConfidence);
  const setNote = useStudyStore((state) => state.setNote);
  const viewQuestion = useStudyStore((state) => state.viewQuestion);
  const toggleFocusMode = useStudyStore((state) => state.toggleFocusMode);

  const bookmarked = bookmarkIds.includes(question.id);
  const isDone = completed.includes(question.id);
  const questionIndex = allQuestions.findIndex((item) => item.id === question.id);
  const previousQuestion = allQuestions[questionIndex - 1];
  const nextQuestion = allQuestions[questionIndex + 1];
  const readingProgress = percent(questionIndex + 1, allQuestions.length);
  const visibleAnswerLabels = getAnswerLabelsForQuestion(question);
  const chapterColor = getChapterColor(question.chapterSlug);

  const [showFloatingNext, setShowFloatingNext] = useState(false);
  const [activeTab, setActiveTab] = useState("hinglishMasterExplanation");

  useEffect(() => {
    viewQuestion(question.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [question.id, viewQuestion]);

  /* Scroll listener for floating next button */
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setShowFloatingNext(scrolled > 0.65 && !!nextQuestion);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nextQuestion]);

  /* Keyboard shortcuts */
  const handleKeyboard = useCallback(
    (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && previousQuestion) {
        window.location.href = `/questions/${previousQuestion.id}`;
      } else if (e.key === "ArrowRight" && nextQuestion) {
        window.location.href = `/questions/${nextQuestion.id}`;
      } else if (e.key === "b" || e.key === "B") {
        toggleBookmark(question.id);
        toast.success(bookmarked ? "Bookmark removed" : "Bookmarked!");
      } else if (e.key === "c" || e.key === "C") {
        if (!isDone) {
          markComplete(question.id);
          toast.success("Marked complete!");
        }
      } else if (e.key === "f" || e.key === "F") {
        toggleFocusMode();
      }
    },
    [previousQuestion, nextQuestion, question.id, toggleBookmark, bookmarked, isDone, markComplete, toggleFocusMode],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard]);

  /* Chapter name for breadcrumb */
  const chapterName = useMemo(() => {
    const slug = question.chapterSlug;
    return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [question.chapterSlug]);

  return (
    <main
      className="aurora min-h-screen px-4 py-5 text-slate-50 sm:px-6 lg:px-8"
      style={{ "--accent": chapterColor, "--accent-glow": `${chapterColor}35` } as React.CSSProperties}
    >
      {/* Top reading progress bar */}
      <div className="fixed left-0 top-0 z-50 h-1 w-full bg-slate-950/70">
        <motion.div
          className="h-full shadow-[0_0_14px_var(--accent-glow)]"
          style={{ backgroundColor: chapterColor }}
          initial={{ width: 0 }}
          animate={{ width: `${readingProgress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb + actions */}
        <div className="glass mb-5 flex items-center justify-between gap-2 rounded-2xl px-4 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-1.5 text-sm">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="CodeGurukul" width={24} height={24} className="rounded" />
            </Link>
            <ChevronRight size={11} className="text-slate-600" />
            <Link
              href={`/chapters/${question.chapterSlug}`}
              className="max-w-[100px] truncate text-slate-400 transition hover:text-white sm:max-w-none"
            >
              {chapterName}
            </Link>
            <ChevronRight size={11} className="text-slate-600" />
            <span className="font-semibold text-white">Q{questionIndex + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Keyboard shortcuts hint */}
            <div className="mr-2 hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <span className="kbd">&larr;</span>
              <span className="kbd">&rarr;</span>
              <span className="kbd">B</span>
              <span className="kbd">F</span>
            </div>
            <Button
              aria-label="Toggle focus mode"
              variant={focusMode ? "default" : "secondary"}
              size="icon"
              onClick={toggleFocusMode}
              title="Focus mode (F)"
            >
              {focusMode ? <EyeOff size={18} /> : <Eye size={18} />}
            </Button>
            <Button
              aria-label="Bookmark question"
              variant={bookmarked ? "default" : "secondary"}
              size="icon"
              onClick={() => toggleBookmark(question.id)}
            >
              <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
            </Button>
            <Button
              aria-label="Mark complete"
              variant={isDone ? "default" : "secondary"}
              size="icon"
              onClick={() => {
                if (!isDone) {
                  markComplete(question.id);
                  toast.success("Marked complete!");
                }
              }}
            >
              <Check size={18} />
            </Button>
          </div>
        </div>

        {/* Question header */}
        <motion.header
          className="book-page relative overflow-hidden rounded-xl border p-5 sm:p-8"
          style={{
            borderColor: `${chapterColor}20`,
            boxShadow: `0 30px 120px ${chapterColor}15`,
          }}
          initial={{ rotateY: -12, opacity: 0, x: 16 }}
          animate={{ rotateY: 0, opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Ribbon */}
          <div
            className="absolute right-6 top-0 h-24 w-4 rounded-b-full"
            style={{
              backgroundColor: chapterColor,
              boxShadow: `0 0 32px ${chapterColor}85`,
            }}
          />

          <div className="flex flex-wrap gap-2">
            <Badge variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
            <Badge variant={difficultyVariant(question.experienceLevel)}>{question.experienceLevel}</Badge>
            {question.companyBadges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <h1 className="mt-5 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            {question.prompt}
          </h1>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Tracker icon={<Gauge size={17} />} label="Confidence" value={`${confidence}%`} color={chapterColor} />
            <Tracker
              icon={<RotateCcw size={17} />}
              label="Revision"
              value={isDone ? "Completed" : "Due Today"}
              color={isDone ? "#34D399" : "#FBBF24"}
            />
            <Tracker icon={<StickyNote size={17} />} label="Book Progress" value={`${readingProgress}%`} color={chapterColor} />
          </div>
        </motion.header>

        {/* Content area */}
        <div className={cn("mt-5 grid gap-5", !focusMode && "lg:grid-cols-[1fr_320px]")}>
          {/* Main content — Tabs */}
          <Card className="overflow-hidden" accent={chapterColor}>
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex gap-1.5 overflow-x-auto border-b border-white/10 p-3">
                {visibleAnswerLabels.map((item) => (
                  <Tabs.Trigger
                    key={item.key}
                    value={item.key}
                    className="flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-400 transition data-[state=active]:text-slate-950"
                    style={
                      activeTab === item.key
                        ? { backgroundColor: chapterColor, color: "#0f172a" }
                        : undefined
                    }
                  >
                    {tabIcons[item.key] ?? null}
                    {item.label}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <AnimatePresence mode="wait">
                {visibleAnswerLabels.map((item) => (
                  <Tabs.Content key={item.key} value={item.key} className="p-5" forceMount={activeTab === item.key ? true : undefined}>
                    {activeTab === item.key && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <h2 className="text-xl font-bold text-white">{item.label}</h2>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              void navigator.clipboard.writeText(String(question.answers[item.key]));
                              toast.success("Copied answer section");
                            }}
                          >
                            <Clipboard size={14} /> Copy
                          </Button>
                        </div>
                        <article
                          className={cn(
                            "whitespace-pre-wrap rounded-lg border border-white/[0.08] bg-black/30 p-5 text-[15px] leading-8 text-slate-200 sm:text-base",
                            item.key === "codeWalkthrough" && "font-mono text-sm leading-7",
                          )}
                          style={
                            item.key === "codeWalkthrough"
                              ? { color: `${chapterColor}cc` }
                              : undefined
                          }
                        >
                          {String(question.answers[item.key])}
                        </article>
                      </motion.div>
                    )}
                  </Tabs.Content>
                ))}
              </AnimatePresence>
            </Tabs.Root>
          </Card>

          {/* Sidebar */}
          <aside
            className={cn(
              "space-y-4 transition-all duration-300",
              focusMode && "hidden",
            )}
          >
            {/* Confidence tracker */}
            <Card className="p-5" accent={chapterColor}>
              <h2 className="font-semibold text-white">Confidence Tracker</h2>
              <input
                aria-label="Confidence"
                className="mt-4 w-full"
                type="range"
                min="0"
                max="100"
                value={confidence}
                onChange={(event) => setConfidence(question.id, Number(event.target.value))}
                style={{ accentColor: chapterColor }}
              />
              <div className="mt-2 text-sm text-slate-300">{confidence}% interview ready</div>
            </Card>

            {/* AI Mentor Tools */}
            <Card className="p-5">
              <h2 className="font-semibold text-white">AI Mentor Tools</h2>
              <div className="mt-4 grid gap-2">
                <AiTool icon={<Bot size={15} />} label="AI Mentor" prompt={question.answers.aiMentorPrompt} color={chapterColor} />
                <AiTool
                  icon={<WandSparkles size={15} />}
                  label="Answer Improver"
                  prompt="Improve my spoken answer into polished SAP interview language."
                  color={chapterColor}
                />
                <AiTool
                  icon={<Languages size={15} />}
                  label="Hinglish Converter"
                  prompt="Convert my answer into natural Hinglish with interview confidence."
                  color={chapterColor}
                />
                <AiTool
                  icon={<Lightbulb size={15} />}
                  label="Simplifier"
                  prompt="Explain this from zero level with a real project example."
                  color={chapterColor}
                />
              </div>
            </Card>

            {/* Notes */}
            <Card className="p-5">
              <h2 className="font-semibold text-white">Notes</h2>
              <textarea
                className="mt-3 min-h-32 w-full rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-slate-100 outline-none transition focus:border-[color:var(--accent)]"
                value={note}
                onChange={(event) => setNote(question.id, event.target.value)}
                placeholder="Add your recall hook, weak point, or project example..."
              />
            </Card>

            {/* Interview mode */}
            <Card className="p-5" accent={chapterColor}>
              <h2 className="font-semibold text-white">Interview Mode</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Speak this answer in 60 seconds: definition, project scenario, debugging, performance, S/4HANA.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href={`/interview/${question.chapterSlug}`}>Start AI Interview</Link>
              </Button>
            </Card>
          </aside>
        </div>

        {/* Code walkthrough + Follow-ups */}
        <Card className="mt-5 p-5" accent={chapterColor}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-white">Code Walkthrough Preview</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                void navigator.clipboard.writeText(question.answers.codeExamples);
                toast.success("Copied code example");
              }}
            >
              <Clipboard size={14} /> Copy
            </Button>
          </div>
          <pre
            className="mb-6 overflow-x-auto rounded-lg border border-white/[0.08] bg-black/40 p-4 font-mono text-sm leading-7"
            style={{ color: `${chapterColor}bb` }}
          >
            {question.answers.codeExamples}
          </pre>

          <h2 className="text-xl font-bold text-white">Follow-up Questions With Proper Answers</h2>
          <Accordion.Root type="single" collapsible className="mt-4 space-y-2">
            {question.answers.followupAnswerBank.map((followup, index) => (
              <Accordion.Item
                key={followup.question}
                value={followup.question}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03]"
              >
                <Accordion.Trigger className="flex w-full items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-white">
                  {followup.question}
                  <Badge>{question.followups[index]?.category ?? "Follow-up"}</Badge>
                </Accordion.Trigger>
                <Accordion.Content className="space-y-3 px-4 pb-4 text-sm leading-7 text-slate-300">
                  <MentorBlock title="Hinglish Explanation" body={followup.hinglishExplanation} color={chapterColor} />
                  <MentorBlock title="Interview Answer" body={followup.interviewAnswer} color={chapterColor} />
                  <MentorBlock title="Real-time Explanation" body={followup.realtimeExplanation} color={chapterColor} />
                  <MentorBlock title="Mistakes" body={followup.mistakes} color={chapterColor} />
                  <pre
                    className="overflow-x-auto rounded-lg border border-white/[0.08] bg-black/40 p-3 font-mono text-sm"
                    style={{ color: `${chapterColor}bb` }}
                  >
                    {followup.codeExample}
                  </pre>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Card>

        {/* Prev / Next navigation */}
        <nav className="mt-5 grid gap-3 sm:grid-cols-2">
          <Button
            asChild
            variant="secondary"
            className={cn("h-auto justify-start p-4", !previousQuestion && "pointer-events-none opacity-40")}
          >
            <Link href={previousQuestion ? `/questions/${previousQuestion.id}` : `/questions/${question.id}`}>
              <ChevronLeft size={18} />
              <span className="text-left">
                <span className="block text-xs uppercase text-slate-400">Previous</span>
                <span className="line-clamp-1">{previousQuestion?.prompt ?? "Start of book"}</span>
              </span>
            </Link>
          </Button>
          <Button
            asChild
            className={cn("h-auto justify-start p-4", !nextQuestion && "pointer-events-none opacity-40")}
          >
            <Link href={nextQuestion ? `/questions/${nextQuestion.id}` : `/questions/${question.id}`}>
              <span className="text-left">
                <span className="block text-xs uppercase text-slate-900/60">Next</span>
                <span className="line-clamp-1">{nextQuestion?.prompt ?? "Book complete"}</span>
              </span>
              <ChevronRight size={18} />
            </Link>
          </Button>
        </nav>

        <div className="mt-5 text-center text-xs text-slate-500">
          {requiredAnswerSections.length} learning sections available for this question
        </div>
      </div>

      {/* Floating "Next Question" button */}
      <AnimatePresence>
        {showFloatingNext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            <Button
              variant="secondary"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </Button>
            {nextQuestion && (
              <Button asChild>
                <Link href={`/questions/${nextQuestion.id}`}>
                  Next Question <ChevronRight size={16} />
                </Link>
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function MentorBlock({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-black/20 p-3">
      <div
        className="text-xs font-semibold uppercase tracking-[0.1em]"
        style={{ color }}
      >
        {title}
      </div>
      <p className="mt-2">{body}</p>
    </div>
  );
}

function AiTool({ icon, label, prompt, color }: { icon: React.ReactNode; label: string; prompt: string; color: string }) {
  return (
    <Button
      variant="secondary"
      className="justify-start"
      onClick={() => {
        void navigator.clipboard.writeText(prompt);
        toast.success(`${label} prompt copied`);
      }}
    >
      <span style={{ color }}>{icon}</span>
      {label}
    </Button>
  );
}

function Tracker({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-white/[0.04] p-4">
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">{label}</span>
      </div>
      <div className="mt-2 text-lg font-bold text-white">{value}</div>
    </div>
  );
}

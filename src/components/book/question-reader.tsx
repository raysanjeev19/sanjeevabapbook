"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {
  ArrowUp,
  Bookmark,
  BookOpen,
  Bot,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Clock,
  Code2,
  Eye,
  EyeOff,
  Gauge,
  HelpCircle,
  Languages,
  Lightbulb,
  Lock,
  MessageSquare,
  RotateCcw,
  StickyNote,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { allQuestions, getChapterColor } from "@/lib/content";
import type { Question } from "@/lib/types";
import { cn, percent, readingMinutes } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ReaderControls } from "@/components/book/reader-controls";
import { AnswerText } from "@/components/book/answer-text";
import { BrandLogo } from "@/components/layout/brand-logo";

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
  const fontScale = useStudyStore((state) => state.fontScale);
  const readerWidth = useStudyStore((state) => state.readerWidth);
  const readerFont = useStudyStore((state) => state.readerFont);
  const recallMode = useStudyStore((state) => state.recallMode);

  const bookmarked = bookmarkIds.includes(question.id);
  const isDone = completed.includes(question.id);
  const questionIndex = allQuestions.findIndex((item) => item.id === question.id);
  const previousQuestion = allQuestions[questionIndex - 1];
  const nextQuestion = allQuestions[questionIndex + 1];
  const readingProgress = percent(questionIndex + 1, allQuestions.length);
  const chapterColor = getChapterColor(question.chapterSlug);

  const [showFloatingNext, setShowFloatingNext] = useState(false);
  const [activeTab, setActiveTab] = useState<"easy" | "master" | "interview" | "code">("easy");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const answerHidden = recallMode && !revealed;

  /* Reset the reveal when navigating to a new question (render-time, not an effect). */
  const [lastQuestionId, setLastQuestionId] = useState(question.id);
  if (question.id !== lastQuestionId) {
    setLastQuestionId(question.id);
    setRevealed(false);
    setActiveTab("easy");
  }

  /* Estimate reading time across the answer sections + code. */
  const minutes = useMemo(() => {
    return readingMinutes(
      question.answers.easyUnderstanding ?? "",
      question.answers.hinglishMasterExplanation ?? "",
      question.answers.interviewMeKyaBolnaHai ?? "",
      question.answers.codeExamples ?? "",
    );
  }, [question]);

  /* Column width + typeface follow the reader's preferences. */
  const measureClass = readerWidth === "wide" ? "max-w-[80ch]" : "max-w-[68ch]";
  const readingStyle: React.CSSProperties = {
    fontSize: `${(1.075 * fontScale).toFixed(3)}rem`,
    ...(readerFont === "sans" ? { fontFamily: "var(--font-inter), system-ui, sans-serif" } : {}),
  };

  useEffect(() => {
    viewQuestion(question.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [question.id, viewQuestion]);

  /* Scroll listener: floating button + reading progress for the top bar */
  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = max > 0 ? window.scrollY / max : 0;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(scrolled * 100))));
      setShowFloatingNext(scrolled > 0.65 && !!nextQuestion);
    };
    handleScroll();
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
      className="min-h-screen bg-background px-4 py-5 sm:px-6 lg:px-8"
      style={{ "--accent": chapterColor, "--accent-glow": `${chapterColor}33` } as React.CSSProperties}
    >
      {/* Top reading progress bar — reflects how far through this page you've read */}
      <div className="fixed left-0 top-0 z-50 h-[3px] w-full bg-border">
        <div
          className="h-full transition-[width] duration-150"
          style={{ backgroundColor: chapterColor, width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb + actions */}
        <div className="mb-6 flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-4 py-2.5">
          <div className="flex items-center gap-1.5 text-sm">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={26} />
            </Link>
            <ChevronRight size={11} className="text-faint" />
            <Link
              href={`/chapters/${question.chapterSlug}`}
              className="max-w-[100px] truncate text-muted transition-colors hover:text-foreground sm:max-w-none"
            >
              {chapterName}
            </Link>
            <ChevronRight size={11} className="text-faint" />
            <span className="font-semibold text-foreground">Q{questionIndex + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="mr-1 hidden items-center gap-1.5 text-xs text-faint sm:flex">
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
            <ReaderControls />
            <ThemeToggle />
          </div>
        </div>

        {/* Question header */}
        <header className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 sm:p-9">
          <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: chapterColor }} />

          <div className="flex flex-wrap gap-2">
            <Badge variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
            <Badge variant={difficultyVariant(question.experienceLevel)}>{question.experienceLevel}</Badge>
            {question.companyBadges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <h1 className="mt-5 max-w-3xl font-serif text-[1.9rem] font-semibold leading-[1.18] text-foreground sm:text-4xl">
            {question.prompt}
          </h1>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Clock size={13} />
            <span>~{minutes} min read</span>
            <span className="text-faint">·</span>
            <span>Q{questionIndex + 1} of {allQuestions.length}</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Tracker icon={<Gauge size={17} />} label="Confidence" value={`${confidence}%`} color={chapterColor} />
            <Tracker
              icon={<RotateCcw size={17} />}
              label="Revision"
              value={isDone ? "Completed" : "Due Today"}
              color={isDone ? "#0e7c72" : chapterColor}
            />
            <Tracker icon={<StickyNote size={17} />} label="Book Progress" value={`${readingProgress}%`} color={chapterColor} />
          </div>
        </header>

        {/* Tab definitions — defined inside render so chapterColor is in scope */}
        {(() => {
          const TABS = [
            { key: "easy"      as const, label: "Seedha Samjho",       sublabel: "Simple words mein",          Icon: Lightbulb,     color: "#F59E0B" },
            { key: "master"    as const, label: "Deep Dive",            sublabel: "Expert-level explanation",   Icon: BookOpen,      color: chapterColor },
            { key: "interview" as const, label: "Interview Script",     sublabel: "Word-by-word bolna hai",     Icon: MessageSquare, color: "#10B981" },
            { key: "code"      as const, label: "Code Example",         sublabel: "ABAP code + comments",       Icon: Code2,         color: "#6366F1" },
          ];
          const activeTabCfg = TABS.find((t) => t.key === activeTab) ?? TABS[0];

          const activeContent =
            activeTab === "easy"      ? question.answers.easyUnderstanding :
            activeTab === "master"    ? question.answers.hinglishMasterExplanation :
            activeTab === "interview" ? question.answers.interviewMeKyaBolnaHai :
                                        question.answers.codeExamples;

          return (
        <div className={cn("mt-6 grid gap-6", !focusMode && "lg:grid-cols-[1fr_300px]")}>
          {/* Main reading column */}
          <div className="min-w-0 space-y-5">
            {answerHidden ? (
              <Card className="overflow-hidden">
                <RecallCover color={chapterColor} minutes={minutes} onReveal={() => setRevealed(true)} />
              </Card>
            ) : (
              <>
                {/* ── Tab card ── */}
                <Card className="overflow-hidden">
                  {/* Tab bar */}
                  <div className="flex overflow-x-auto border-b border-border bg-surface-2/40">
                    {TABS.map((tab) => {
                      const active = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={cn(
                            "group flex flex-1 min-w-[90px] flex-col items-center gap-1.5 px-3 py-3.5 text-center transition-all duration-150",
                            active ? "bg-surface" : "hover:bg-surface-2/70",
                          )}
                          style={active ? { boxShadow: `inset 0 -2px 0 ${tab.color}` } : undefined}
                        >
                          <tab.Icon
                            size={16}
                            style={{ color: active ? tab.color : undefined }}
                            className={cn(!active && "text-muted group-hover:text-foreground transition-colors")}
                          />
                          <span
                            className={cn("text-[11px] font-semibold leading-tight", active ? "text-foreground" : "text-muted group-hover:text-foreground")}
                            style={active ? { color: tab.color } : undefined}
                          >
                            {tab.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Section header row */}
                  <div
                    className="flex items-center gap-3 border-b px-6 py-3.5"
                    style={{ borderBottomColor: `${activeTabCfg.color}28`, backgroundColor: `${activeTabCfg.color}09` }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${activeTabCfg.color}1e`, color: activeTabCfg.color }}
                    >
                      <activeTabCfg.Icon size={15} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{activeTabCfg.label}</p>
                      <p className="text-[11px] text-muted">{activeTabCfg.sublabel}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-muted hover:text-foreground"
                      onClick={() => {
                        void navigator.clipboard.writeText(activeContent ?? "");
                        toast.success("Copied!");
                      }}
                    >
                      <Clipboard size={13} /> Copy
                    </Button>
                  </div>

                  {/* Tab content */}
                  <div className="p-6 sm:p-8">
                    {activeTab === "code" ? (
                      <pre className={cn("code-block overflow-x-auto whitespace-pre-wrap rounded-xl border border-border bg-surface-2 p-5 text-foreground", measureClass)}>
                        {question.answers.codeExamples}
                      </pre>
                    ) : activeTab === "interview" ? (
                      <div
                        className={cn("rounded-xl border-l-[3px] bg-surface-2/40 p-5", measureClass)}
                        style={{ borderLeftColor: "#10B981" }}
                      >
                        <AnswerText text={question.answers.interviewMeKyaBolnaHai} className="reading" style={readingStyle} />
                      </div>
                    ) : (
                      <AnswerText
                        text={activeTab === "easy" ? question.answers.easyUnderstanding : question.answers.hinglishMasterExplanation}
                        className={cn("reading", measureClass)}
                        style={readingStyle}
                      />
                    )}
                  </div>
                </Card>

                {/* ── Follow-up Questions card ── */}
                {question.answers.followupAnswerBank?.length > 0 && (
                  <Card className="overflow-hidden">
                    <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                        style={{ backgroundColor: `${chapterColor}18`, color: chapterColor }}
                      >
                        <HelpCircle size={15} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">Follow-up Questions</span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                            style={{ backgroundColor: `${chapterColor}18`, color: chapterColor }}
                          >
                            {question.answers.followupAnswerBank.length}
                          </span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted">Interviewer ye bhi pooch sakta hai — ready raho</p>
                      </div>
                    </div>

                    <Accordion.Root type="single" collapsible className="divide-y divide-border">
                      {question.answers.followupAnswerBank.map((followup, index) => (
                        <Accordion.Item key={followup.question} value={followup.question} className="group">
                          <Accordion.Trigger className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-2/50 data-[state=open]:bg-surface-2/50">
                            <span
                              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                              style={{ backgroundColor: `${chapterColor}18`, color: chapterColor }}
                            >
                              {index + 1}
                            </span>
                            <span className="flex-1 text-sm font-medium text-foreground leading-snug">{followup.question}</span>
                            <ChevronDown size={15} className="mt-0.5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Accordion.Trigger>
                          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
                            <div className="space-y-2.5 px-5 pb-5 pt-1">
                              <MentorBlock title="Hinglish Explanation" body={followup.hinglishExplanation} color={chapterColor} />
                              <MentorBlock title="Interview Answer"     body={followup.interviewAnswer}    color="#10B981" />
                              <MentorBlock title="Real-time Example"    body={followup.realtimeExplanation} color={chapterColor} />
                              <MentorBlock title="Avoid These Mistakes" body={followup.mistakes}           color="#EF4444" />
                              {followup.codeExample?.trim() && (
                                <pre className="code-block overflow-x-auto rounded-lg border border-border bg-surface-2 p-3 text-[0.82rem] text-foreground">
                                  {followup.codeExample}
                                </pre>
                              )}
                            </div>
                          </Accordion.Content>
                        </Accordion.Item>
                      ))}
                    </Accordion.Root>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className={cn("space-y-4", focusMode && "hidden")}>
            {/* Quick tab switcher in sidebar */}
            {!answerHidden && (
              <Card className="overflow-hidden">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">Sections</p>
                </div>
                <div className="flex flex-col divide-y divide-border">
                  {TABS.map((tab) => {
                    const active = activeTab === tab.key;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={cn(
                          "flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors",
                          active ? "bg-surface-2/70 font-semibold text-foreground" : "text-muted hover:bg-surface-2/50 hover:text-foreground",
                        )}
                      >
                        <tab.Icon size={13} style={{ color: active ? tab.color : undefined }} className={cn(!active && "text-muted")} />
                        <span style={active ? { color: tab.color } : undefined}>{tab.label}</span>
                        {active && <span className="ml-auto h-1.5 w-1.5 rounded-full" style={{ backgroundColor: tab.color }} />}
                      </button>
                    );
                  })}
                </div>
              </Card>
            )}

            <Card className="p-5">
              <h2 className="text-sm font-semibold text-foreground">Confidence Tracker</h2>
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
              <div className="mt-2 text-sm text-muted">{confidence}% interview ready</div>
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-semibold text-foreground">AI Mentor Tools</h2>
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

            <Card className="p-5">
              <h2 className="text-sm font-semibold text-foreground">Notes</h2>
              <textarea
                className="mt-3 min-h-32 w-full rounded-lg border border-border p-3 text-sm text-foreground outline-none"
                value={note}
                onChange={(event) => setNote(question.id, event.target.value)}
                placeholder="Add your recall hook, weak point, or project example..."
              />
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-semibold text-foreground">Interview Mode</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Speak this answer in 60 seconds: definition, project scenario, debugging, performance, S/4HANA.
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href={`/interview/${question.chapterSlug}`}>Start AI Interview</Link>
              </Button>
            </Card>
          </aside>
        </div>
          );
        })()}

        {/* Prev / Next navigation */}
        <nav className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            asChild
            variant="secondary"
            className={cn("h-auto justify-start p-4", !previousQuestion && "pointer-events-none opacity-40")}
          >
            <Link href={previousQuestion ? `/questions/${previousQuestion.id}` : `/questions/${question.id}`}>
              <ChevronLeft size={18} />
              <span className="text-left">
                <span className="block text-xs uppercase text-faint">Previous</span>
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
                <span className="block text-xs uppercase opacity-70">Next</span>
                <span className="line-clamp-1">{nextQuestion?.prompt ?? "Book complete"}</span>
              </span>
              <ChevronRight size={18} />
            </Link>
          </Button>
        </nav>

        <div className="mt-6 text-center text-xs text-faint">
          5 learning sections · {allQuestions.length} questions in this book
        </div>
      </div>

      {/* Floating controls */}
      {showFloatingNext && (
        <div className="animate-fade-in fixed bottom-6 right-6 z-50 flex items-center gap-2">
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
        </div>
      )}
    </main>
  );
}

function RecallCover({ color, minutes, onReveal }: { color: string; minutes: number; onReveal: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-20">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1f`, color }}
      >
        <Lock size={20} />
      </span>
      <h2 className="mt-4 font-serif text-xl font-semibold text-foreground">Answer hidden</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
        Active recall is on. Try to answer the question out loud first — then reveal to check yourself.
        <span className="mt-1 block text-xs text-faint">~{minutes} min read once revealed</span>
      </p>
      <Button className="mt-5" onClick={onReveal}>
        <Eye size={16} /> Reveal answer
      </Button>
    </div>
  );
}


function MentorBlock({ title, body, color }: { title: string; body: string; color: string }) {
  return (
    <div
      className="rounded-lg border p-3.5"
      style={{ borderColor: `${color}25`, backgroundColor: `${color}08` }}
    >
      <div
        className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
        style={{ color }}
      >
        {title}
      </div>
      <AnswerText text={body} className="text-[0.9rem] leading-relaxed" />
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
    <div className="rounded-lg border border-border bg-surface-2 p-4">
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">{label}</span>
      </div>
      <div className="mt-2 text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}

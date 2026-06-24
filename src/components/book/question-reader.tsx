"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {
  AlertTriangle,
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
  Gauge,
  HelpCircle,
  Languages,
  Lightbulb,
  Lock,
  MessageSquare,
  RotateCcw,
  StickyNote,
  Type,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { allQuestions, getChapterColor } from "@/lib/content";
import type { Question } from "@/lib/types";
import { cn, ink, percent, readingMinutes } from "@/lib/utils";
import { useStudyStore } from "@/store/use-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ReaderControls } from "@/components/book/reader-controls";
import { AnswerText } from "@/components/book/answer-text";

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
  const [activeTab, setActiveTab] = useState<
    | "easy"
    | "deepDive"
    | "interviewHi"
    | "interviewEn"
    | "code"
    | "wordByWord"
    | "mistakes"
    | "revision"
    | "followups"
  >("easy");
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

  /* ── CodeGurukul 9-section structure ── */
  const TABS = [
    { key: "easy"         as const, label: "Seedha Samjho",        sublabel: "Simple Hindi mein samjho",  Icon: Lightbulb,     color: "#F59E0B" },
    { key: "deepDive"     as const, label: "Deep Dive",             sublabel: "Technical understanding",   Icon: BookOpen,      color: chapterColor },
    { key: "interviewHi"  as const, label: "Interview (Hinglish)",  sublabel: "Speakable script",          Icon: MessageSquare, color: "#22C55E" },
    { key: "interviewEn"  as const, label: "Interview (English)",   sublabel: "Corporate script",          Icon: Languages,     color: "#4F46E5" },
    { key: "code"         as const, label: "Code Example",          sublabel: "ABAP + comments",           Icon: Code2,         color: "#6366F1" },
    { key: "wordByWord"   as const, label: "Word-by-Word",          sublabel: "Each keyword explained",    Icon: Type,          color: "#A855F7" },
    { key: "mistakes"     as const, label: "Common Mistakes",       sublabel: "Galat vs sahi",             Icon: AlertTriangle, color: "#EF4444" },
    { key: "revision"     as const, label: "Quick Revision",        sublabel: "2-min recap",               Icon: Clock,         color: "#F59E0B" },
    { key: "followups"    as const, label: "Follow-Up Questions",   sublabel: "Easy / Medium / Advanced",  Icon: HelpCircle,    color: chapterColor },
  ];
  const activeTabCfg = TABS.find((t) => t.key === activeTab) ?? TABS[0];
  const tabIndex = TABS.findIndex((t) => t.key === activeTab);
  const prevTab = tabIndex > 0 ? TABS[tabIndex - 1] : undefined;
  const nextTab = tabIndex < TABS.length - 1 ? TABS[tabIndex + 1] : undefined;

  /* Legacy field → new tab fallback while content rolls out */
  const a = question.answers;
  const interviewHinglish = a.interviewScriptHinglish ?? a.interviewMeKyaBolnaHai;
  const interviewEnglish  = a.interviewScriptEnglish  ?? a.interviewMeKyaBolnaHai;

  const activeContent =
    activeTab === "easy"         ? a.easyUnderstanding :
    activeTab === "deepDive"     ? a.hinglishMasterExplanation :
    activeTab === "interviewHi"  ? interviewHinglish :
    activeTab === "interviewEn"  ? interviewEnglish :
    activeTab === "code"         ? a.codeExamples :
    activeTab === "revision"     ? (a.quickRevisionNotes ?? "") :
    activeTab === "wordByWord"   ? (a.wordByWordSamjho ?? []).map(w => `${w.keyword}: ${w.meaning}`).join("\n") :
    activeTab === "mistakes"     ? (a.commonMistakesSection ?? []).map(m => `${m.mistake}\n  Why: ${m.whyWrong}\n  Fix: ${m.correctApproach}`).join("\n\n") :
                                   ""; /* followups copies nothing */

  /* Switch section and bring the reader back to the top of the card */
  const goToTab = (key: typeof activeTab) => {
    setActiveTab(key);
    document.getElementById("answer-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-background pb-28 sm:pb-8">
      {/* Minimal top nav — back + brand, theme + reading settings (matches the question design) */}
      <nav className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-1">
            <Link
              href={`/chapters/${question.chapterSlug}`}
              aria-label="Back to chapter"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <ChevronLeft size={20} />
            </Link>
            <Link href="/" className="truncate font-serif text-lg font-bold tracking-tight text-accent">
              CodeGurukul
            </Link>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              aria-label="Bookmark question"
              variant={bookmarked ? "default" : "secondary"}
              size="icon"
              className="hidden sm:inline-flex"
              onClick={() => toggleBookmark(question.id)}
            >
              <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
            </Button>
            <Button
              aria-label="Mark complete"
              variant={isDone ? "default" : "secondary"}
              size="icon"
              className="hidden sm:inline-flex"
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
        {/* Reading progress — thin line pinned to the bottom of the nav */}
        <div className="h-[2px] w-full">
          <div
            className="h-full transition-[width] duration-150"
            style={{ backgroundColor: chapterColor, width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      <div
        className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8"
        style={{ "--accent": ink(chapterColor), "--accent-contrast": "var(--background)", "--accent-glow": `${chapterColor}33` } as React.CSSProperties}
      >
        {/* Question header */}
        <header
          className="relative overflow-hidden rounded-2xl bg-surface p-6 shadow-card sm:p-9"
          style={{ backgroundImage: `linear-gradient(160deg, ${chapterColor}1a, transparent 45%)` }}
        >
          <div className="absolute left-0 top-0 h-full w-1.5 rounded-r" style={{ backgroundColor: chapterColor }} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(36rem 16rem at 88% -20%, ${chapterColor}20, transparent 70%)` }}
          />

          <p className="relative mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            {chapterName}
          </p>
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

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            <Tracker icon={<Gauge size={15} />} label="Confidence" value={`${confidence}%`} color={ink(chapterColor)} />
            <Tracker
              icon={<RotateCcw size={15} />}
              label="Revision"
              value={isDone ? "Completed" : "Due Today"}
              color={isDone ? "var(--success)" : ink(chapterColor)}
            />
            <Tracker icon={<StickyNote size={15} />} label="Progress" value={`${readingProgress}%`} color={ink(chapterColor)} />
          </div>
        </header>

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
                <Card id="answer-card" className="scroll-mt-16">
                  {/* Section pills — numbered 9-step reading path, sticky while reading */}
                  <div className="no-scrollbar sticky top-[66px] z-30 flex gap-1.5 overflow-x-auto rounded-t-xl border-b border-border bg-surface/95 px-3 py-2.5 backdrop-blur-md">
                    {TABS.map((tab, i) => {
                      const active = activeTab === tab.key;
                      return (
                        <button
                          key={tab.key}
                          onClick={() => goToTab(tab.key)}
                          className={cn(
                            "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-2 text-[12px] font-semibold transition-colors duration-150",
                            !active && "border-border bg-surface text-muted hover:border-border-strong hover:text-foreground",
                          )}
                          style={active ? { backgroundColor: `${tab.color}1c`, borderColor: `${tab.color}55`, color: ink(tab.color) } : undefined}
                          aria-current={active ? "true" : undefined}
                        >
                          <span
                            className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[9px] font-bold"
                            style={active ? { backgroundColor: ink(tab.color), color: "var(--background)" } : { backgroundColor: "var(--surface-2)", color: "var(--faint)" }}
                          >
                            {i + 1}
                          </span>
                          {tab.label}
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
                      style={{ backgroundColor: `${activeTabCfg.color}1e`, color: ink(activeTabCfg.color) }}
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
                  <div className="p-5 sm:p-8">
                    <TabContent
                      activeTab={activeTab}
                      tabColor={activeTabCfg.color}
                      answers={a}
                      interviewHinglish={interviewHinglish}
                      interviewEnglish={interviewEnglish}
                      chapterColor={chapterColor}
                      measureClass={measureClass}
                      readingStyle={readingStyle}
                    />
                  </div>

                  {/* Section-to-section reading flow — read all 9 like book pages */}
                  <div className="flex items-center justify-between gap-2 rounded-b-xl border-t border-border bg-surface-2/40 px-4 py-3 sm:px-6">
                    {prevTab ? (
                      <button
                        onClick={() => goToTab(prevTab.key)}
                        className="flex min-w-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-medium text-muted transition-colors hover:text-foreground"
                      >
                        <ChevronLeft size={15} className="shrink-0" />
                        <span className="truncate">{prevTab.label}</span>
                      </button>
                    ) : <span />}

                    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-widest text-faint">
                      {tabIndex + 1} / {TABS.length}
                    </span>

                    {nextTab ? (
                      <button
                        onClick={() => goToTab(nextTab.key)}
                        className="flex min-w-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-semibold transition-colors"
                        style={{ color: ink(nextTab.color) }}
                      >
                        <span className="truncate">{nextTab.label}</span>
                        <ChevronRight size={15} className="shrink-0" />
                      </button>
                    ) : nextQuestion ? (
                      <Link
                        href={`/questions/${nextQuestion.id}`}
                        className="flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-semibold text-accent transition-colors"
                      >
                        <span className="truncate">Next question</span>
                        <ChevronRight size={15} className="shrink-0" />
                      </Link>
                    ) : <span />}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className={cn("space-y-4", focusMode && "hidden")}>
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
              <div className="mt-4 grid grid-cols-1 gap-2">
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

        {/* Prev / Next navigation */}
        <nav className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
          9 learning sections · {allQuestions.length} questions in this book
        </div>
      </div>

      {/* Mobile bottom action bar — thumb-reachable controls */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 px-3 pt-2 backdrop-blur-md sm:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-1">
          <Link
            href={previousQuestion ? `/questions/${previousQuestion.id}` : "#"}
            aria-label="Previous question"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2",
              !previousQuestion && "pointer-events-none opacity-30",
            )}
          >
            <ChevronLeft size={20} />
          </Link>
          <button
            aria-label="Bookmark question"
            onClick={() => {
              toggleBookmark(question.id);
              toast.success(bookmarked ? "Bookmark removed" : "Bookmarked!");
            }}
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg transition-colors",
              bookmarked ? "text-accent" : "text-muted hover:bg-surface-2",
            )}
          >
            <Bookmark size={19} fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button
            aria-label="Mark complete"
            onClick={() => {
              if (!isDone) {
                markComplete(question.id);
                toast.success("Marked complete!");
              }
            }}
            className={cn(
              "flex h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg text-[13px] font-semibold transition-colors",
              isDone ? "bg-success-soft text-success" : "bg-gradient-accent text-white",
            )}
          >
            <Check size={16} /> {isDone ? "Completed" : "Mark complete"}
          </button>
          <Link
            href={nextQuestion ? `/questions/${nextQuestion.id}` : "#"}
            aria-label="Next question"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2",
              !nextQuestion && "pointer-events-none opacity-30",
            )}
          >
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>

      {/* Floating controls (desktop) */}
      {showFloatingNext && (
        <div className="animate-fade-in fixed bottom-6 right-6 z-50 hidden items-center gap-2 sm:flex">
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
        style={{ backgroundColor: `${color}1f`, color: ink(color) }}
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
        style={{ color: ink(color) }}
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
      <span style={{ color: ink(color) }}>{icon}</span>
      {label}
    </Button>
  );
}

function Tracker({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-2 p-2.5 sm:p-4">
      <div className="flex items-center gap-1.5 sm:gap-2" style={{ color }}>
        <span className="hidden sm:inline-flex">{icon}</span>
        <span className="truncate text-[9px] font-semibold uppercase tracking-[0.02em] sm:text-[10px] sm:tracking-[0.1em]">{label}</span>
      </div>
      <div className="mt-1.5 text-sm font-bold text-foreground sm:mt-2 sm:text-lg">{value}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   CodeGurukul 9-section tab content router
   Each tab renders a specialised view of the question's answers.
   New sections (wordByWord, mistakes, revision, tieredFollowups)
   show a clean "Coming soon" placeholder until content lands.
   ────────────────────────────────────────────────────────────── */

type TabKey =
  | "easy" | "deepDive" | "interviewHi" | "interviewEn" | "code"
  | "wordByWord" | "mistakes" | "revision" | "followups";

function TabContent({
  activeTab,
  tabColor,
  answers,
  interviewHinglish,
  interviewEnglish,
  chapterColor,
  measureClass,
  readingStyle,
}: {
  activeTab: TabKey;
  tabColor: string;
  answers: import("@/lib/types").QuestionAnswer;
  interviewHinglish: string;
  interviewEnglish: string;
  chapterColor: string;
  measureClass: string;
  readingStyle: React.CSSProperties;
}) {
  switch (activeTab) {
    case "easy":
      return <AnswerText text={answers.easyUnderstanding} className={cn("reading", measureClass)} style={readingStyle} />;

    case "deepDive":
      return <AnswerText text={answers.hinglishMasterExplanation} className={cn("reading", measureClass)} style={readingStyle} />;

    case "interviewHi":
      return (
        <div className={cn("rounded-xl bg-surface-2/40 p-5", measureClass)}>
          <AnswerText text={interviewHinglish} className="reading" style={readingStyle} />
        </div>
      );

    case "interviewEn":
      return (
        <div className={cn("rounded-xl bg-surface-2/40 p-5", measureClass)}>
          <AnswerText text={interviewEnglish} className="reading" style={readingStyle} />
        </div>
      );

    case "code":
      return (
        <pre className={cn("code-block overflow-x-auto whitespace-pre-wrap rounded-xl border border-border bg-surface-2 p-5 text-foreground", measureClass)}>
          {answers.codeExamples}
        </pre>
      );

    case "wordByWord": {
      const words = answers.wordByWordSamjho;
      if (!words?.length) return <EmptySection color={tabColor} label="Word-by-Word Samjho" hint="ABAP keyword-by-keyword breakdown — coming soon." />;
      return (
        <div className={cn("space-y-2", measureClass)}>
          {words.map((w) => (
            <div key={w.keyword} className="grid grid-cols-1 gap-1 rounded-lg border border-border bg-surface-2/40 p-3 sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-4">
              <code className="font-mono text-sm font-semibold" style={{ color: tabColor }}>{w.keyword}</code>
              <p className="text-sm leading-relaxed text-foreground">{w.meaning}</p>
            </div>
          ))}
        </div>
      );
    }

    case "mistakes": {
      const mistakes = answers.commonMistakesSection;
      if (!mistakes?.length) return <EmptySection color={tabColor} label="Common Mistakes" hint="Top mistakes + correct approach — coming soon." />;
      return (
        <ul className={cn("space-y-3", measureClass)}>
          {mistakes.map((m, i) => (
            <li key={i} className="rounded-xl border border-error-soft bg-error-soft p-4">
              <p className="flex items-start gap-2 text-sm font-semibold text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-error text-[10px] font-bold text-white">{i + 1}</span>
                {m.mistake}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted"><span className="font-semibold text-error">Why wrong:</span> {m.whyWrong}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted"><span className="font-semibold text-success">Correct approach:</span> {m.correctApproach}</p>
            </li>
          ))}
        </ul>
      );
    }

    case "revision": {
      const notes = answers.quickRevisionNotes;
      if (!notes) return <EmptySection color={tabColor} label="Quick Revision Notes" hint="2-minute keyword recap — coming soon." />;
      return (
        <div className={cn("rounded-xl bg-warning-soft p-5", measureClass)}>
          <AnswerText text={notes} className="reading" style={readingStyle} />
        </div>
      );
    }

    case "followups": {
      const flat = answers.followupAnswerBank;
      if (!flat?.length) return <EmptySection color={tabColor} label="Follow-Up Questions" hint="Tiered Easy / Medium / Advanced follow-ups — coming soon." />;
      const hasTiers = flat.some((f) => f.tier);
      if (hasTiers) return <TieredFollowupAccordion items={flat} accent={chapterColor} />;
      return <FlatFollowupAccordion items={flat} accent={chapterColor} />;
    }
  }
}

function EmptySection({ color, label, hint }: { color: string; label: string; hint: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface-2/30 px-6 py-16 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: `${color}1f`, color: ink(color) }}>
        <Lightbulb size={18} />
      </span>
      <h3 className="mt-3 font-serif text-base font-semibold text-foreground">{label}</h3>
      <p className="mt-1 max-w-sm text-sm leading-6 text-muted">{hint}</p>
      <p className="mt-2 text-[11px] uppercase tracking-widest text-faint">Section reserved · V1 content rollout</p>
    </div>
  );
}

function TieredFollowupAccordion({ items, accent }: { items: import("@/lib/types").FollowupAnswer[]; accent: string }) {
  const tiers: Array<{ key: "easy" | "medium" | "advanced"; label: string; color: string }> = [
    { key: "easy",     label: "Easy",     color: "#22C55E" },
    { key: "medium",   label: "Medium",   color: "#F59E0B" },
    { key: "advanced", label: "Advanced", color: "#EF4444" },
  ];
  const untiered = items.filter((f) => !f.tier);
  return (
    <div className="space-y-4">
      {tiers.map((t) => {
        const group = items.filter((f) => f.tier === t.key);
        if (!group.length) return null;
        return (
          <div key={t.key} className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center gap-2 border-b border-border bg-surface-2/40 px-4 py-3">
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: `${t.color}1e`, color: ink(t.color) }}>{t.label}</span>
              <span className="text-xs text-faint">{group.length} question{group.length === 1 ? "" : "s"}</span>
            </div>
            <FlatFollowupAccordion items={group} accent={accent} />
          </div>
        );
      })}
      {untiered.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center gap-2 border-b border-border bg-surface-2/40 px-4 py-3">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-muted">Untiered</span>
            <span className="text-xs text-faint">{untiered.length} question{untiered.length === 1 ? "" : "s"}</span>
          </div>
          <FlatFollowupAccordion items={untiered} accent={accent} />
        </div>
      )}
    </div>
  );
}

function FlatFollowupAccordion({ items, accent }: { items: import("@/lib/types").FollowupAnswer[]; accent: string }) {
  return (
    <Accordion.Root type="single" collapsible className="divide-y divide-border rounded-xl border border-border">
      {items.map((followup, index) => (
        <Accordion.Item key={followup.question} value={followup.question} className="group">
          <Accordion.Trigger className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-surface-2/50 data-[state=open]:bg-surface-2/50">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: `${accent}18`, color: ink(accent) }}>
              {index + 1}
            </span>
            <span className="flex-1 text-sm font-medium text-foreground leading-snug">{followup.question}</span>
            <ChevronDown size={15} className="mt-0.5 shrink-0 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </Accordion.Trigger>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up">
            <div className="space-y-2.5 px-5 pb-5 pt-1">
              <MentorBlock title="Hinglish Explanation" body={followup.hinglishExplanation} color={accent} />
              <MentorBlock title="Interview Answer"     body={followup.interviewAnswer}    color="#22C55E" />
              <MentorBlock title="Real-time Example"    body={followup.realtimeExplanation} color={accent} />
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
  );
}

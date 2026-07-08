"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Bookmark,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Cloud,
  FlaskConical,
  GripVertical,
  Lightbulb,
  ListChecks,
  Mic,
  Rocket,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import type {
  BtpAssignment,
  BtpCodingQuestion,
  BtpDragOrder,
  BtpFillBlank,
  BtpMcq,
  BtpMiniProject,
  BtpQuestion,
  BtpSection,
} from "@/lib/btp-content";
import {
  getBtpAssignments,
  getBtpCodingQuestions,
  getBtpDragOrders,
  getBtpFillBlanks,
  getBtpMcqs,
  getBtpMiniProject,
  getBtpQuestions,
  getBtpTopicNotes,
} from "@/lib/btp-content";
import { ink } from "@/lib/utils";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { btpIconMap } from "@/components/btp/icon-map";
import { MermaidDiagram } from "@/components/btp/mermaid-diagram";
import { SiteNav } from "@/components/layout/site-nav";
import { type ConfidenceLevel, useBtpStudyStore } from "@/store/use-btp-study-store";

const MODES = [
  { key: "learn", label: "Learn", Icon: BookOpen },
  { key: "practice", label: "Practice", Icon: ListChecks },
  { key: "interview", label: "Interview", Icon: Mic },
] as const;

type ModeKey = (typeof MODES)[number]["key"];

function topicAnchor(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Groups questions by topic, preserving the section's own topic order. */
function groupByTopic(topics: string[], questions: BtpQuestion[]) {
  return topics.map((topic) => ({ topic, questions: questions.filter((q) => q.topic === topic) }));
}

export function BtpSectionView({ section }: { section: BtpSection }) {
  const [mode, setMode] = useState<ModeKey>("learn");
  const Icon = btpIconMap[section.icon as keyof typeof btpIconMap] ?? Cloud;
  const questions = getBtpQuestions(section.slug);
  const mcqs = getBtpMcqs(section.slug);
  const notes = getBtpTopicNotes(section.slug);
  const codingQuestions = getBtpCodingQuestions(section.slug);
  const assignments = getBtpAssignments(section.slug);
  const miniProject = getBtpMiniProject(section.slug);
  const fillBlanks = getBtpFillBlanks(section.slug);
  const dragOrders = getBtpDragOrders(section.slug);
  const topicGroups = groupByTopic(section.topics, questions);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb={section.title} maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-6 pb-2">
            <Link href="/btp" className="text-xs font-medium text-muted hover:text-foreground">
              &larr; All BTP Sections
            </Link>
            <div className="mt-3 flex items-center gap-3">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${section.color}1f`, color: ink(section.color) }}
              >
                <Icon size={20} />
              </span>
              <div>
                <h1 className="font-serif text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {section.title}
                </h1>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant={difficultyVariant(section.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                    {section.difficulty}
                  </Badge>
                  <span className="text-[11px] text-muted">
                    {section.topics.length} topics &middot; {questions.length}/{section.targetQuestionCount} questions ready
                  </span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{section.description}</p>
          </div>

          {/* Mode switcher */}
          <div className="animate-fade-up mb-6 flex gap-1 border-b border-border">
            {MODES.map(({ key, label, Icon: ModeIcon }) => (
              <button key={key} onClick={() => setMode(key)} className={cnMode(mode === key)}>
                <ModeIcon size={14} />
                {label}
                {key === "interview" && questions.length > 0 && (
                  <span className="ml-0.5 rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] text-accent">
                    {questions.length}
                  </span>
                )}
                {key === "practice" && mcqs.length > 0 && (
                  <span className="ml-0.5 rounded-full bg-accent-soft px-1.5 py-0.5 text-[9px] text-accent">
                    {mcqs.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        {mode === "learn" && (
          <div className="space-y-3">
            {/* Jump-to-topic chips */}
            <div className="flex flex-wrap gap-1.5">
              {section.topics.map((topic) => (
                <a
                  key={topic}
                  href={`#${topicAnchor(topic)}`}
                  className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted hover:border-border-strong hover:text-foreground"
                >
                  {topic}
                </a>
              ))}
            </div>

            {topicGroups.map(({ topic, questions: topicQuestions }, i) => (
              <Card key={topic} id={topicAnchor(topic)} className="scroll-mt-20 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-accent-soft text-[11px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <h2 className="text-sm font-semibold text-foreground">{topic}</h2>
                </div>
                {notes[topic] ? (
                  <p className="text-[13px] leading-6 whitespace-pre-line text-foreground">{notes[topic]}</p>
                ) : (
                  <p className="text-xs italic text-muted">Detailed reading notes for this topic are coming soon.</p>
                )}

                {topicQuestions.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-border pt-3">
                    <h3 className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
                      <Mic size={11} /> {topicQuestions.length} interview question{topicQuestions.length > 1 ? "s" : ""} on this topic
                    </h3>
                    {topicQuestions.map((q, qi) => (
                      <QuestionCard key={q.id} index={qi + 1} question={q} />
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {mode === "practice" && (
          <div className="space-y-4">
            {mcqs.length > 0 ? <McqQuiz mcqs={mcqs} /> : <ComingSoon icon={ListChecks} title="MCQs" blocks={["multiple-choice questions"]} />}

            {fillBlanks.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="flex items-center gap-1.5 font-serif text-base font-semibold text-foreground">
                  <Target size={15} className="text-accent" /> Fill in the Blank
                </h2>
                <FillBlankQuiz items={fillBlanks} />
              </div>
            )}

            {dragOrders.length > 0 && (
              <div className="space-y-2.5">
                <h2 className="flex items-center gap-1.5 font-serif text-base font-semibold text-foreground">
                  <GripVertical size={15} className="text-accent" /> Arrange in Order
                </h2>
                {dragOrders.map((d) => (
                  <DragOrderChallenge key={d.id} item={d} />
                ))}
              </div>
            )}

            {codingQuestions.length > 0 ? (
              <div className="space-y-2.5">
                <h2 className="flex items-center gap-1.5 font-serif text-base font-semibold text-foreground">
                  <FlaskConical size={15} className="text-accent" /> Coding Questions
                </h2>
                {codingQuestions.map((cq) => (
                  <CodingQuestionCard key={cq.id} question={cq} />
                ))}
              </div>
            ) : (
              <ComingSoon icon={FlaskConical} title="Coding questions" blocks={["CF CLI, Bash, SQL, Node.js"]} />
            )}

            {assignments.length > 0 ? (
              <div className="space-y-2.5">
                <h2 className="flex items-center gap-1.5 font-serif text-base font-semibold text-foreground">
                  <ListChecks size={15} className="text-accent" /> Assignments
                </h2>
                {assignments.map((a) => (
                  <AssignmentCard key={a.id} assignment={a} />
                ))}
              </div>
            ) : (
              <ComingSoon icon={ListChecks} title="Assignments" blocks={["hands-on tasks"]} />
            )}

            {miniProject ? (
              <MiniProjectCard project={miniProject} />
            ) : (
              <ComingSoon icon={Rocket} title="Mini project" blocks={["a capstone project for this section"]} />
            )}
          </div>
        )}

        {mode === "interview" && (
          questions.length > 0 ? (
            <div className="space-y-5">
              {/* Jump-to-topic chips */}
              <div className="flex flex-wrap gap-1.5">
                {topicGroups.filter((g) => g.questions.length > 0).map(({ topic, questions: tq }) => (
                  <a
                    key={topic}
                    href={`#interview-${topicAnchor(topic)}`}
                    className="rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[10px] font-medium text-muted hover:border-border-strong hover:text-foreground"
                  >
                    {topic} <span className="text-faint">({tq.length})</span>
                  </a>
                ))}
              </div>

              {topicGroups.filter((g) => g.questions.length > 0).map(({ topic, questions: tq }) => (
                <div key={topic} id={`interview-${topicAnchor(topic)}`} className="scroll-mt-20">
                  <div className="mb-2 flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-foreground">{topic}</h2>
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                      {tq.length}
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {tq.map((q, qi) => (
                      <QuestionCard key={q.id} index={qi + 1} question={q} defaultOpen />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ComingSoon
              icon={Mic}
              title="Interview questions"
              blocks={[`${section.targetQuestionCount} interview questions (Hindi + English answers)`]}
            />
          )
        )}
      </div>
    </main>
  );
}

function QuestionCard({
  index,
  question,
  defaultOpen = false,
}: {
  index: number;
  question: BtpQuestion;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [revealed, setRevealed] = useState(false);

  const isBookmarked = useBtpStudyStore((s) => s.bookmarks.includes(question.id));
  const isCompleted = useBtpStudyStore((s) => question.id in s.completed);
  const myConfidence = useBtpStudyStore((s) => s.confidence[question.id]);
  const toggleBookmark = useBtpStudyStore((s) => s.toggleBookmark);
  const markComplete = useBtpStudyStore((s) => s.markComplete);
  const setConfidence = useBtpStudyStore((s) => s.setConfidence);

  function rate(level: ConfidenceLevel) {
    setConfidence(question.id, level);
    markComplete(question.id);
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex w-full items-start gap-3 p-3.5 text-left">
        <button onClick={() => setOpen((o) => !o)} className="flex min-w-0 flex-1 items-start gap-3 text-left">
          <span className="mt-0.5 shrink-0 text-xs font-semibold text-faint">{index}.</span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-foreground">{question.prompt}</p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant={difficultyVariant(question.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                {question.difficulty}
              </Badge>
              <span className="text-[10px] text-muted">{question.experienceLevel}</span>
              <span className="flex items-center gap-0.5 text-[10px] text-muted">
                <Clock size={10} /> {question.estimatedMinutes} min
              </span>
              {isCompleted && (
                <span className="flex items-center gap-0.5 text-[10px] font-semibold text-success">
                  <CheckCircle2 size={11} /> Done
                </span>
              )}
            </div>
          </div>
        </button>
        <button
          onClick={() => toggleBookmark(question.id)}
          aria-label="Bookmark"
          className="shrink-0 p-0.5 text-faint hover:text-accent"
        >
          <Bookmark size={15} className={isBookmarked ? "fill-accent text-accent" : ""} />
        </button>
        <ChevronDown
          onClick={() => setOpen((o) => !o)}
          size={16}
          className={`mt-0.5 shrink-0 cursor-pointer text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {open && (
        <div className="animate-fade-up space-y-3 border-t border-border p-4 pt-3.5">
          {!revealed ? (
            <button
              onClick={() => setRevealed(true)}
              className="hover-lift w-full rounded-lg border border-dashed border-border bg-surface-2 py-3 text-center text-xs font-semibold text-accent"
            >
              Reveal Answer (Practice Mode)
            </button>
          ) : (
            <>
              <Field label="Expected Answer" text={question.expectedAnswer} />
              <Field label="Detailed Answer (English)" text={question.detailedAnswer} />
              <Field label="Hinglish Explanation" text={question.hindiExplanation} />
              <Field label="How To Say It In The Interview" text={question.interviewExplanation} />
              <div>
                <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">Diagram</h3>
                {question.diagramMermaid ? (
                  <MermaidDiagram definition={question.diagramMermaid} className="mb-1.5" />
                ) : null}
                <p className={`text-xs leading-5 ${question.diagramMermaid ? "italic text-muted" : "text-foreground"}`}>
                  {question.diagramNote}
                </p>
              </div>
              <Field label="Real Project Example" text={question.realProjectExample} />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <ListField icon={Check} label="Important Points" items={question.importantPoints} tone="success" />
                <ListField icon={XCircle} label="Common Mistakes" items={question.commonMistakes} tone="error" />
              </div>

              <ListField icon={Lightbulb} label="Follow-up Questions" items={question.followupQuestions} tone="accent" />

              <div className="flex items-start gap-2 rounded-lg border border-accent/25 bg-accent-soft p-2.5">
                <Sparkles size={14} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-xs leading-5 text-foreground">
                  <span className="font-semibold">Interview Tip: </span>
                  {question.interviewTip}
                </p>
              </div>

              <p className="border-t border-border pt-2.5 text-[11px] font-medium text-muted">
                <span className="font-semibold text-foreground">Revision: </span>
                {question.revisionNotes}
              </p>

              <div className="flex items-center gap-2 border-t border-border pt-3">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
                  How well did you know this?
                </span>
                <div className="flex gap-1.5">
                  {(["low", "medium", "high"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => rate(level)}
                      className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold capitalize transition-colors duration-150 ${
                        myConfidence === level
                          ? "border-accent/40 bg-accent-soft text-accent"
                          : "border-border text-muted hover:border-border-strong"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

function Field({ label, text, muted }: { label: string; text: string; muted?: boolean }) {
  return (
    <div>
      <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">{label}</h3>
      <p className={`text-xs leading-5 ${muted ? "italic text-muted" : "text-foreground"}`}>{text}</p>
    </div>
  );
}

function ListField({
  icon: Icon,
  label,
  items,
  tone,
}: {
  icon: typeof Check;
  label: string;
  items: string[];
  tone: "success" | "error" | "accent";
}) {
  const toneClass = tone === "success" ? "text-success" : tone === "error" ? "text-error" : "text-accent";
  return (
    <div>
      <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">{label}</h3>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-1.5 text-xs leading-5 text-foreground">
            <Icon size={12} className={`mt-0.5 shrink-0 ${toneClass}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FillBlankQuiz({ items }: { items: BtpFillBlank[] }) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const item = items[index];

  const accepted = [item.answer, ...(item.acceptableAnswers ?? [])].map((a) => a.trim().toLowerCase());
  const isCorrect = accepted.includes(value.trim().toLowerCase());

  function check() {
    if (checked) return;
    setChecked(true);
    if (isCorrect) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= items.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setValue("");
    setChecked(false);
  }

  function restart() {
    setIndex(0);
    setValue("");
    setChecked(false);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <Card className="animate-fade-up p-5 text-center">
        <Sparkles size={22} className="mx-auto mb-2 text-accent" />
        <h2 className="text-sm font-semibold text-foreground">
          Done — {score}/{items.length}
        </h2>
        <button onClick={restart} className="hover-lift mt-3 rounded-lg border border-border bg-surface-2 px-4 py-2 text-xs font-semibold text-foreground">
          Retry
        </button>
      </Card>
    );
  }

  const [before, after] = item.sentence.split("___");

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
        <span>{index + 1} / {items.length}</span>
        <span>Score: {score}</span>
      </div>
      <p className="mb-3 text-[13px] leading-6 text-foreground">
        {before}
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={checked}
          placeholder="___"
          className={`mx-1 w-32 rounded-md border px-2 py-0.5 text-center text-[13px] font-semibold outline-none ${
            checked
              ? isCorrect
                ? "border-success/40 bg-success-soft text-success"
                : "border-error/40 bg-error-soft text-error"
              : "border-border bg-surface-2 text-foreground"
          }`}
        />
        {after}
      </p>

      {!checked ? (
        <button
          onClick={check}
          disabled={!value.trim()}
          className="hover-lift w-full rounded-lg bg-gradient-accent py-2 text-xs font-semibold text-white disabled:opacity-40"
        >
          Check
        </button>
      ) : (
        <div className="animate-fade-up space-y-2">
          {!isCorrect && (
            <p className="text-xs text-foreground">
              Correct answer: <span className="font-semibold text-success">{item.answer}</span>
            </p>
          )}
          <p className="text-xs leading-5 text-muted">{item.explanation}</p>
          <button onClick={next} className="hover-lift w-full rounded-lg border border-border bg-surface-2 py-2 text-xs font-semibold text-foreground">
            {index + 1 >= items.length ? "Finish" : "Next"}
          </button>
        </div>
      )}
    </Card>
  );
}

function DragOrderChallenge({ item }: { item: BtpDragOrder }) {
  // Start in the original (unshuffled) order so server and client render identically,
  // then shuffle once on the client after mount to avoid a hydration mismatch.
  const [order, setOrder] = useState<string[]>(item.items);
  const [checked, setChecked] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    // One-time client-side shuffle after mount — SSR renders the original
    // order so hydration matches, then this randomizes for the real session.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrder(shuffle(item.items));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isCorrectOrder = checked && order.every((v, i) => v === item.items[i]);

  function onDrop(targetIndex: number) {
    if (dragIndex === null || dragIndex === targetIndex) return;
    setOrder((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
  }

  function reset() {
    setOrder(shuffle(item.items));
    setChecked(false);
  }

  return (
    <Card className="p-4">
      <p className="mb-3 text-[13px] font-semibold text-foreground">{item.prompt}</p>
      <div className="space-y-1.5">
        {order.map((step, i) => {
          const correctHere = checked && step === item.items[i];
          return (
            <div
              key={step}
              draggable={!checked}
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium text-foreground ${
                checked ? (correctHere ? "border-success/40 bg-success-soft" : "border-error/40 bg-error-soft") : "cursor-grab border-border bg-surface-2 active:cursor-grabbing"
              }`}
            >
              <GripVertical size={13} className="shrink-0 text-faint" />
              <span className="shrink-0 text-faint">{i + 1}.</span>
              {step}
              {checked && (correctHere ? <CheckCircle2 size={13} className="ml-auto shrink-0 text-success" /> : <AlertTriangle size={13} className="ml-auto shrink-0 text-error" />)}
            </div>
          );
        })}
      </div>

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          className="hover-lift mt-3 w-full rounded-lg bg-gradient-accent py-2 text-xs font-semibold text-white"
        >
          Check Order
        </button>
      ) : (
        <div className="animate-fade-up mt-3 space-y-2">
          <p className={`text-xs font-semibold ${isCorrectOrder ? "text-success" : "text-error"}`}>
            {isCorrectOrder ? "Correct order!" : "Not quite — here's the right order highlighted above."}
          </p>
          <p className="text-xs leading-5 text-muted">{item.explanation}</p>
          <button onClick={reset} className="hover-lift w-full rounded-lg border border-border bg-surface-2 py-2 text-xs font-semibold text-foreground">
            Shuffle & Retry
          </button>
        </div>
      )}
    </Card>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function CodingQuestionCard({ question }: { question: BtpCodingQuestion }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Card className="p-4">
      <div className="mb-2 flex items-center gap-1.5">
        <Badge variant="accent" className="px-1.5 py-0.5 text-[9px]">{question.language}</Badge>
        <Badge variant={difficultyVariant(question.difficulty)} className="px-1.5 py-0.5 text-[9px]">
          {question.difficulty}
        </Badge>
      </div>
      <p className="mb-2 text-[13px] font-semibold text-foreground">{question.prompt}</p>
      {question.starterCode && (
        <pre className="mb-2 overflow-x-auto rounded-lg bg-surface-2 p-2.5 font-mono text-[11px] text-muted">
          {question.starterCode}
        </pre>
      )}
      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="hover-lift w-full rounded-lg border border-dashed border-border bg-surface-2 py-2 text-center text-[11px] font-semibold text-accent"
        >
          Show Solution
        </button>
      ) : (
        <>
          <pre className="mb-2 overflow-x-auto rounded-lg bg-surface-2 p-2.5 font-mono text-[11px] text-foreground">
            {question.solution}
          </pre>
          <p className="text-xs leading-5 text-muted">{question.explanation}</p>
        </>
      )}
    </Card>
  );
}

function AssignmentCard({ assignment }: { assignment: BtpAssignment }) {
  return (
    <Card className="p-4">
      <h3 className="mb-1 text-[13px] font-semibold text-foreground">{assignment.title}</h3>
      <p className="mb-2 text-xs leading-5 text-muted">{assignment.description}</p>
      <ul className="space-y-1.5">
        {assignment.tasks.map((task, i) => (
          <li key={task} className="flex items-start gap-2 text-xs leading-5 text-foreground">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border text-[9px] font-semibold text-faint">
              {i + 1}
            </span>
            {task}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function MiniProjectCard({ project }: { project: BtpMiniProject }) {
  return (
    <Card className="p-4">
      <h2 className="mb-1 flex items-center gap-1.5 font-serif text-base font-semibold text-foreground">
        <Rocket size={15} className="text-accent" /> Mini Project: {project.title}
      </h2>
      <p className="mb-2.5 text-xs leading-5 text-muted">{project.objective}</p>
      <ListField icon={Target} label="Requirements" items={project.requirements} tone="accent" />
      {project.bonusChallenges.length > 0 && (
        <div className="mt-2.5">
          <ListField icon={Sparkles} label="Bonus Challenges" items={project.bonusChallenges} tone="success" />
        </div>
      )}
    </Card>
  );
}

function McqQuiz({ mcqs }: { mcqs: BtpMcq[] }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const recordMcqResult = useBtpStudyStore((s) => s.recordMcqResult);
  const mcq = mcqs[index];

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === mcq.correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    recordMcqResult(mcq.id, isCorrect);
  }

  function next() {
    if (index + 1 >= mcqs.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
  }

  if (done) {
    return (
      <Card className="animate-fade-up p-5 text-center">
        <Sparkles size={22} className="mx-auto mb-2 text-accent" />
        <h2 className="text-sm font-semibold text-foreground">
          Quiz complete — {score}/{mcqs.length}
        </h2>
        <button onClick={restart} className="hover-lift mt-3 rounded-lg border border-border bg-surface-2 px-4 py-2 text-xs font-semibold text-foreground">
          Retake Quiz
        </button>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
        <span>MCQ {index + 1} / {mcqs.length}</span>
        <span>Score: {score}</span>
      </div>
      <p className="mb-3 text-[13px] font-semibold text-foreground">{mcq.prompt}</p>
      <div className="space-y-1.5">
        {mcq.options.map((opt, i) => {
          const isCorrect = i === mcq.correctIndex;
          const isSelected = i === selected;
          let stateClass = "border-border hover:border-border-strong";
          if (selected !== null) {
            if (isCorrect) stateClass = "border-success/40 bg-success-soft";
            else if (isSelected) stateClass = "border-error/40 bg-error-soft";
          }
          return (
            <button
              key={opt}
              onClick={() => choose(i)}
              disabled={selected !== null}
              className={`flex w-full items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium text-foreground transition-colors duration-150 ${stateClass}`}
            >
              {opt}
              {selected !== null && isCorrect && <CheckCircle2 size={14} className="shrink-0 text-success" />}
              {selected !== null && isSelected && !isCorrect && <AlertTriangle size={14} className="shrink-0 text-error" />}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="animate-fade-up mt-3 space-y-2.5">
          <p className="text-xs leading-5 text-muted">{mcq.explanation}</p>
          <button onClick={next} className="hover-lift w-full rounded-lg bg-gradient-accent py-2 text-xs font-semibold text-white">
            {index + 1 >= mcqs.length ? "Finish" : "Next Question"}
          </button>
        </div>
      )}
    </Card>
  );
}

function cnMode(active: boolean) {
  return [
    "flex items-center gap-1.5 rounded-t-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
    active ? "border-b-2 border-accent text-foreground" : "border-b-2 border-transparent text-muted hover:text-foreground",
  ].join(" ");
}

function ComingSoon({ icon: Icon, title, blocks }: { icon: typeof Sparkles; title: string; blocks: string[] }) {
  return (
    <Card className="animate-fade-up p-5 text-center">
      <Icon size={22} className="mx-auto mb-2 text-accent" />
      <h2 className="text-sm font-semibold text-foreground">{title} coming soon</h2>
      <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-muted">This section will include: {blocks.join(", ")}.</p>
    </Card>
  );
}

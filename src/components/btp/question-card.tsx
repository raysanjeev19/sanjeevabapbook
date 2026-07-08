"use client";

import { useState } from "react";
import {
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Lightbulb,
  Sparkles,
  StickyNote,
  XCircle,
} from "lucide-react";
import type { BtpQuestion } from "@/lib/btp-content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MermaidDiagram } from "@/components/btp/mermaid-diagram";
import { type ConfidenceLevel, useBtpStudyStore } from "@/store/use-btp-study-store";

/** Shared full interview-question card — the answer reveal, diagram, mistakes, notes, and confidence rating. Reused across the section reader, Random Question Generator, and Flashcards. */
export function QuestionCard({
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
  const note = useBtpStudyStore((s) => s.notes[question.id] ?? "");
  const toggleBookmark = useBtpStudyStore((s) => s.toggleBookmark);
  const markComplete = useBtpStudyStore((s) => s.markComplete);
  const setConfidence = useBtpStudyStore((s) => s.setConfidence);
  const setNote = useBtpStudyStore((s) => s.setNote);

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

              <div className="border-t border-border pt-3">
                <h3 className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
                  <StickyNote size={11} /> Your Notes
                </h3>
                <textarea
                  value={note}
                  onChange={(e) => setNote(question.id, e.target.value)}
                  placeholder="Jot down anything you want to remember about this question..."
                  className="min-h-16 w-full resize-y rounded-lg border border-border bg-surface-2 p-2.5 text-xs leading-5 text-foreground outline-none placeholder:text-faint"
                />
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
}

export function Field({ label, text, muted }: { label: string; text: string; muted?: boolean }) {
  return (
    <div>
      <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">{label}</h3>
      <p className={`text-xs leading-5 ${muted ? "italic text-muted" : "text-foreground"}`}>{text}</p>
    </div>
  );
}

export function ListField({
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

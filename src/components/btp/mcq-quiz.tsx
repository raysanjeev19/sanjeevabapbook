"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Sparkles } from "lucide-react";
import type { BtpMcq } from "@/lib/btp-content";
import { Card } from "@/components/ui/card";
import { useBtpStudyStore } from "@/store/use-btp-study-store";

/** Shared MCQ runner. Reused by the section reader's Practice tab and the cross-section Daily Quiz. */
export function McqQuiz({ mcqs, onFinish }: { mcqs: BtpMcq[]; onFinish?: (score: number, total: number) => void }) {
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
      onFinish?.(score, mcqs.length);
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

  if (mcqs.length === 0) return null;

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

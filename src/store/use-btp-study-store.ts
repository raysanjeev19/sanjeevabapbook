"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ConfidenceLevel = "low" | "medium" | "high";

type BtpStudyState = {
  /** Question id -> ISO date (YYYY-MM-DD) it was marked read/done, so daily-goal progress is derivable. */
  completed: Record<string, string>;
  /** Question ids bookmarked for later. */
  bookmarks: string[];
  /** Free-text notes per question id. */
  notes: Record<string, string>;
  /** Self-rated confidence per question id — drives weak-area + revision detection. */
  confidence: Record<string, ConfidenceLevel>;
  /** MCQ attempt tallies per MCQ id. */
  mcqResults: Record<string, { attempts: number; correct: number }>;
  /** ISO date (YYYY-MM-DD) strings on which the learner completed at least one question. */
  activityDates: string[];
  dailyGoal: number;
  weeklyGoal: number;

  markComplete: (questionId: string, estimatedMinutes?: number) => void;
  unmarkComplete: (questionId: string) => void;
  toggleBookmark: (questionId: string) => void;
  setNote: (questionId: string, body: string) => void;
  setConfidence: (questionId: string, level: ConfidenceLevel) => void;
  recordMcqResult: (mcqId: string, correct: boolean) => void;
  setDailyGoal: (n: number) => void;
  setWeeklyGoal: (n: number) => void;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export const useBtpStudyStore = create<BtpStudyState>()(
  persist(
    (set) => ({
      completed: {},
      bookmarks: [],
      notes: {},
      confidence: {},
      mcqResults: {},
      activityDates: [],
      dailyGoal: 5,
      weeklyGoal: 25,

      markComplete: (questionId) =>
        set((state) => {
          if (questionId in state.completed) return state;
          const today = todayIso();
          return {
            completed: { ...state.completed, [questionId]: today },
            activityDates: state.activityDates.includes(today)
              ? state.activityDates
              : [...state.activityDates, today],
          };
        }),

      unmarkComplete: (questionId) =>
        set((state) => {
          const next = { ...state.completed };
          delete next[questionId];
          return { completed: next };
        }),

      toggleBookmark: (questionId) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(questionId)
            ? state.bookmarks.filter((id) => id !== questionId)
            : [questionId, ...state.bookmarks],
        })),

      setNote: (questionId, body) =>
        set((state) => ({ notes: { ...state.notes, [questionId]: body } })),

      setConfidence: (questionId, level) =>
        set((state) => ({ confidence: { ...state.confidence, [questionId]: level } })),

      recordMcqResult: (mcqId, correct) =>
        set((state) => {
          const prev = state.mcqResults[mcqId] ?? { attempts: 0, correct: 0 };
          const today = todayIso();
          return {
            mcqResults: {
              ...state.mcqResults,
              [mcqId]: { attempts: prev.attempts + 1, correct: prev.correct + (correct ? 1 : 0) },
            },
            activityDates: state.activityDates.includes(today)
              ? state.activityDates
              : [...state.activityDates, today],
          };
        }),

      setDailyGoal: (n) => set({ dailyGoal: Math.max(1, n) }),
      setWeeklyGoal: (n) => set({ weeklyGoal: Math.max(1, n) }),
    }),
    { name: "btp-study-state" },
  ),
);

/** Consecutive-day streak ending today or yesterday (so it doesn't reset the instant midnight passes). */
export function computeStreak(activityDates: string[]): number {
  if (activityDates.length === 0) return 0;
  const dates = new Set(activityDates);
  const cursor = new Date();
  const todayStr = cursor.toISOString().slice(0, 10);
  if (!dates.has(todayStr)) {
    cursor.setDate(cursor.getDate() - 1);
    if (!dates.has(cursor.toISOString().slice(0, 10))) return 0;
  }
  let streak = 0;
  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Activity in the last 7 days (for a weekly-goal progress bar). */
export function countThisWeek(activityDates: string[]): number {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 6);
  cutoff.setHours(0, 0, 0, 0);
  return activityDates.filter((d) => new Date(d) >= cutoff).length;
}

/** How many questions were completed today (for a daily-goal progress bar). */
export function countCompletedToday(completed: Record<string, string>): number {
  const today = todayIso();
  return Object.values(completed).filter((d) => d === today).length;
}

/** How many questions were completed in the last 7 days (for a weekly-goal progress bar). */
export function countCompletedThisWeek(completed: Record<string, string>): number {
  return countThisWeek(Object.values(completed));
}

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ReaderWidth = "cozy" | "wide";
export type ReaderFont = "serif" | "sans";

export const FONT_SCALE_MIN = 0.9;
export const FONT_SCALE_MAX = 1.4;
export const FONT_SCALE_STEP = 0.1;

type StudyState = {
  completed: string[];
  bookmarks: string[];
  recent: string[];
  confidence: Record<string, number>;
  notes: Record<string, string>;
  streak: number;
  focusMode: boolean;
  // Reading preferences
  fontScale: number;
  readerWidth: ReaderWidth;
  readerFont: ReaderFont;
  recallMode: boolean;
  toggleBookmark: (id: string) => void;
  markComplete: (id: string) => void;
  viewQuestion: (id: string) => void;
  setConfidence: (id: string, value: number) => void;
  setNote: (id: string, body: string) => void;
  toggleFocusMode: () => void;
  adjustFontScale: (delta: number) => void;
  setReaderWidth: (width: ReaderWidth) => void;
  setReaderFont: (font: ReaderFont) => void;
  toggleRecallMode: () => void;
};

const clampFontScale = (value: number) =>
  Math.min(FONT_SCALE_MAX, Math.max(FONT_SCALE_MIN, Math.round(value * 100) / 100));

export const useStudyStore = create<StudyState>()(
  persist(
    (set) => ({
      completed: [],
      bookmarks: [],
      recent: [],
      confidence: {},
      notes: {},
      streak: 7,
      focusMode: false,
      fontScale: 1,
      readerWidth: "cozy",
      readerFont: "serif",
      recallMode: false,
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(id)
            ? state.bookmarks.filter((item) => item !== id)
            : [id, ...state.bookmarks],
        })),
      markComplete: (id) =>
        set((state) => ({
          completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
          streak: state.streak + 1,
        })),
      viewQuestion: (id) =>
        set((state) => ({
          recent: [id, ...state.recent.filter((item) => item !== id)].slice(0, 12),
        })),
      setConfidence: (id, value) =>
        set((state) => ({
          confidence: { ...state.confidence, [id]: value },
        })),
      setNote: (id, body) =>
        set((state) => ({
          notes: { ...state.notes, [id]: body },
        })),
      toggleFocusMode: () =>
        set((state) => ({
          focusMode: !state.focusMode,
        })),
      adjustFontScale: (delta) =>
        set((state) => ({ fontScale: clampFontScale(state.fontScale + delta) })),
      setReaderWidth: (width) => set({ readerWidth: width }),
      setReaderFont: (font) => set({ readerFont: font }),
      toggleRecallMode: () => set((state) => ({ recallMode: !state.recallMode })),
    }),
    { name: "sap-abap-study-state" },
  ),
);

/* Derived helpers */
export function getLevel(completedCount: number) {
  if (completedCount >= 200) return { level: 10, title: "SAP Architect", xp: completedCount * 10 };
  if (completedCount >= 150) return { level: 9, title: "S/4HANA Expert", xp: completedCount * 10 };
  if (completedCount >= 120) return { level: 8, title: "Senior Developer", xp: completedCount * 10 };
  if (completedCount >= 90) return { level: 7, title: "Team Lead", xp: completedCount * 10 };
  if (completedCount >= 65) return { level: 6, title: "ABAP Professional", xp: completedCount * 10 };
  if (completedCount >= 45) return { level: 5, title: "Module Expert", xp: completedCount * 10 };
  if (completedCount >= 30) return { level: 4, title: "Project Developer", xp: completedCount * 10 };
  if (completedCount >= 18) return { level: 3, title: "Junior Developer", xp: completedCount * 10 };
  if (completedCount >= 8) return { level: 2, title: "ABAP Learner", xp: completedCount * 10 };
  return { level: 1, title: "Fresher", xp: completedCount * 10 };
}

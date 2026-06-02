import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function percent(done: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((done / total) * 100));
}

/** Estimate reading time in whole minutes (min 1) at ~200 words/min. */
export function readingMinutes(...texts: string[]) {
  const words = texts.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

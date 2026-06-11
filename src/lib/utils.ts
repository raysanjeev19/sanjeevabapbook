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

/**
 * Theme-adaptive readable tint of a chapter color: mixes toward the
 * foreground so pastel hues darken in light mode and stay bright in dark.
 * Use for TEXT/ICONS only — hex-alpha concatenation (`${color}1f`) needs raw hex.
 */
export function ink(color: string, strength = 64) {
  return `color-mix(in srgb, ${color} ${strength}%, var(--foreground) ${100 - strength}%)`;
}

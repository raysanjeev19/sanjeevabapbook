"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Plus, Settings2, Type } from "lucide-react";
import {
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  FONT_SCALE_STEP,
  useStudyStore,
} from "@/store/use-study-store";

/** Lightweight popover (no extra dep) for reading preferences. */
export function ReaderControls() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fontScale = useStudyStore((s) => s.fontScale);
  const readerWidth = useStudyStore((s) => s.readerWidth);
  const readerFont = useStudyStore((s) => s.readerFont);
  const recallMode = useStudyStore((s) => s.recallMode);
  const adjustFontScale = useStudyStore((s) => s.adjustFontScale);
  const setReaderWidth = useStudyStore((s) => s.setReaderWidth);
  const setReaderFont = useStudyStore((s) => s.setReaderFont);
  const toggleRecallMode = useStudyStore((s) => s.toggleRecallMode);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Reading settings"
        aria-expanded={open}
        title="Reading settings"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        <Settings2 size={18} />
      </button>

      {open && (
        <div className="animate-fade-in absolute right-0 z-50 mt-2 w-64 rounded-xl border border-border bg-surface p-4 shadow-lg shadow-black/5">
          {/* Text size */}
          <Row label="Text size">
            <div className="flex items-center gap-1">
              <Stepper
                aria-label="Decrease text size"
                disabled={fontScale <= FONT_SCALE_MIN}
                onClick={() => adjustFontScale(-FONT_SCALE_STEP)}
              >
                <Minus size={14} />
              </Stepper>
              <span className="w-9 text-center text-xs font-semibold text-foreground">
                {Math.round(fontScale * 100)}%
              </span>
              <Stepper
                aria-label="Increase text size"
                disabled={fontScale >= FONT_SCALE_MAX}
                onClick={() => adjustFontScale(FONT_SCALE_STEP)}
              >
                <Plus size={14} />
              </Stepper>
            </div>
          </Row>

          {/* Width */}
          <Row label="Width">
            <Segmented
              value={readerWidth}
              options={[
                { value: "cozy", label: "Cozy" },
                { value: "wide", label: "Wide" },
              ]}
              onChange={(v) => setReaderWidth(v as "cozy" | "wide")}
            />
          </Row>

          {/* Typeface */}
          <Row label="Typeface">
            <Segmented
              value={readerFont}
              options={[
                { value: "serif", label: "Serif" },
                { value: "sans", label: "Sans" },
              ]}
              onChange={(v) => setReaderFont(v as "serif" | "sans")}
            />
          </Row>

          <div className="my-3 h-px bg-border" />

          {/* Active recall */}
          <button
            type="button"
            onClick={toggleRecallMode}
            className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1 text-left"
          >
            <span className="flex items-center gap-2">
              <Type size={14} className="text-accent" />
              <span className="text-xs font-medium text-foreground">Active recall</span>
            </span>
            <span
              className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${recallMode ? "bg-accent" : "bg-surface-2 border border-border"}`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-background transition-transform ${recallMode ? "translate-x-4" : "translate-x-1"}`}
              />
            </span>
          </button>
          <p className="mt-1.5 px-1 text-[11px] leading-4 text-faint">
            Hide answers behind a reveal so you self-test first.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </div>
  );
}

function Stepper({
  children,
  disabled,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground disabled:opacity-40 disabled:hover:text-muted"
      {...rest}
    >
      {children}
    </button>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="inline-flex rounded-md border border-border p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
            value === opt.value ? "bg-accent text-accent-contrast" : "text-muted hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

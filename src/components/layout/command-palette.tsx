"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BookOpen, CornerDownLeft, FileText, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { allQuestions, chapters } from "@/lib/content";

type Item = {
  id: string;
  label: string;
  sub: string;
  href: string;
  kind: "chapter" | "question";
  color?: string;
};

const chapterItems: Item[] = chapters.map((c) => ({
  id: `chapter-${c.slug}`,
  label: c.title,
  sub: `Chapter · ${c.questions.length} questions`,
  href: `/chapters/${c.slug}`,
  kind: "chapter",
  color: c.color,
}));

const questionItems: Item[] = allQuestions.map((q) => {
  const chapter = chapters.find((c) => c.slug === q.chapterSlug);
  return {
    id: `question-${q.id}`,
    label: q.prompt,
    sub: chapter?.title ?? "Question",
    href: `/questions/${q.id}`,
    kind: "question",
    color: chapter?.color,
  };
});

const haystacks = new Map<string, string>();
allQuestions.forEach((q) => {
  haystacks.set(`question-${q.id}`, `${q.prompt} ${q.tags.join(" ")}`.toLowerCase());
});
chapters.forEach((c) => haystacks.set(`chapter-${c.slug}`, `${c.title} ${c.description}`.toLowerCase()));

export function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  function openChange(next: boolean) {
    setOpen(next);
    if (next) {
      setQuery("");
      setActive(0);
    }
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          const next = !o;
          if (next) {
            setQuery("");
            setActive(0);
          }
          return next;
        });
      }
    };
    const onOpen = () => openChange(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapterItems;
    const matchedChapters = chapterItems.filter((i) => haystacks.get(i.id)?.includes(q));
    const matchedQuestions = questionItems.filter((i) => haystacks.get(i.id)?.includes(q));
    return [...matchedChapters, ...matchedQuestions].slice(0, 40);
  }, [query]);

  function go(item: Item | undefined) {
    if (!item) return;
    setOpen(false);
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <Dialog.Root open={open} onOpenChange={openChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-[12vh] z-[61] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/20 focus:outline-none"
          aria-label="Search"
          aria-describedby={undefined}
        >
          <Dialog.Title className="sr-only">Search questions and chapters</Dialog.Title>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search size={17} className="shrink-0 text-faint" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Search questions, chapters, topics..."
              className="w-full border-0 bg-transparent py-3.5 text-sm text-foreground outline-none placeholder:text-faint"
            />
            <span className="kbd shrink-0">esc</span>
          </div>

          <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
            {results.length === 0 && (
              <div className="px-3 py-8 text-center text-sm text-muted">
                No matches for &quot;{query}&quot;
              </div>
            )}
            {results.map((item, idx) => (
              <button
                key={item.id}
                data-idx={idx}
                onMouseEnter={() => setActive(idx)}
                onClick={() => go(item)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  idx === active ? "bg-surface-2" : ""
                }`}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${item.color ?? "#0e7c72"}1f`, color: item.color ?? "var(--accent)" }}
                >
                  {item.kind === "chapter" ? <BookOpen size={15} /> : <FileText size={15} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-foreground">{item.label}</span>
                  <span className="block truncate text-[11px] text-muted">{item.sub}</span>
                </span>
                {idx === active && <CornerDownLeft size={14} className="shrink-0 text-faint" />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[11px] text-faint">
            <span className="flex items-center gap-1"><span className="kbd">↑</span><span className="kbd">↓</span> navigate</span>
            <span className="flex items-center gap-1"><span className="kbd">↵</span> open</span>
            <span className="ml-auto">{results.length} results</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/** Small trigger button to open the palette from a nav. */
export function CommandPaletteButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Search (Cmd+K)"
      onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
      className={`inline-flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-muted transition-colors hover:border-border-strong hover:text-foreground ${className ?? ""}`}
    >
      <Search size={15} />
      <span className="hidden text-xs sm:inline">Search</span>
      <span className="kbd hidden sm:inline">⌘K</span>
    </button>
  );
}

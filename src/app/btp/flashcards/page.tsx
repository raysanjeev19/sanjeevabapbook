"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, RotateCcw, Sparkles, XCircle } from "lucide-react";
import { btpSections, getAllBtpQuestions, type BtpQuestion } from "@/lib/btp-content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/layout/site-nav";
import { useBtpStudyStore } from "@/store/use-btp-study-store";

type Deck = (BtpQuestion & { sectionSlug: string; sectionTitle: string })[];
type SectionFilter = "all" | (typeof btpSections)[number]["slug"];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function BtpFlashcardsPage() {
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [deck, setDeck] = useState<Deck>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knowCount, setKnowCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const setConfidence = useBtpStudyStore((s) => s.setConfidence);
  const markComplete = useBtpStudyStore((s) => s.markComplete);

  function buildDeck(filter: SectionFilter) {
    const all = getAllBtpQuestions();
    const filtered = filter === "all" ? all : all.filter((q) => q.sectionSlug === filter);
    return shuffle(filtered);
  }

  // Client-only shuffle after mount to avoid an SSR/CSR hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeck(buildDeck(sectionFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function changeFilter(filter: SectionFilter) {
    setSectionFilter(filter);
    setDeck(buildDeck(filter));
    setIndex(0);
    setFlipped(false);
    setKnowCount(0);
    setReviewCount(0);
  }

  function restart() {
    setDeck(shuffle(deck.length ? deck : buildDeck(sectionFilter)));
    setIndex(0);
    setFlipped(false);
    setKnowCount(0);
    setReviewCount(0);
  }

  function mark(level: "low" | "high") {
    const card = deck[index];
    if (!card) return;
    setConfidence(card.id, level);
    markComplete(card.id);
    if (level === "high") setKnowCount((n) => n + 1);
    else setReviewCount((n) => n + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  }

  const card = deck[index];
  const done = deck.length > 0 && index >= deck.length;

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Flashcards" maxWidth="max-w-2xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-2xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <Sparkles size={26} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              <span className="text-gradient">Flashcards</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              Rapid-fire review. Flip the card, then rate yourself honestly — it feeds your revision list.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 pb-16 sm:px-6 lg:px-8">
        <Card className="mb-4 flex items-center gap-2 p-3.5">
          <select
            value={sectionFilter}
            onChange={(e) => changeFilter(e.target.value as SectionFilter)}
            className="rounded-lg border border-border bg-surface-2 px-2.5 py-2 text-xs font-medium text-foreground outline-none"
          >
            <option value="all">All sections</option>
            {btpSections.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
          <span className="ml-auto text-[11px] text-muted">
            {Math.min(index + (done ? 0 : 1), deck.length)}/{deck.length}
          </span>
        </Card>

        {deck.length === 0 ? (
          <Card className="p-5 text-center text-xs text-muted">Loading deck...</Card>
        ) : done ? (
          <Card className="animate-fade-up p-6 text-center">
            <Sparkles size={24} className="mx-auto mb-2 text-accent" />
            <h2 className="font-serif text-lg font-semibold text-foreground">Deck complete</h2>
            <p className="mt-1 text-xs text-muted">
              <span className="font-semibold text-success">{knowCount} knew it</span> &middot;{" "}
              <span className="font-semibold text-error">{reviewCount} need review</span>
            </p>
            <button
              onClick={restart}
              className="hover-lift mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-accent px-4 py-2 text-xs font-semibold text-white"
            >
              <RotateCcw size={13} /> Reshuffle & Restart
            </button>
          </Card>
        ) : (
          card && (
            <div>
              <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                <div
                  className="bg-gradient-accent h-full rounded-full transition-all duration-300"
                  style={{ width: `${(index / deck.length) * 100}%` }}
                />
              </div>

              <button onClick={() => setFlipped((f) => !f)} className="w-full text-left">
                <Card className="hover-lift animate-fade-up flex min-h-64 flex-col justify-center p-6 text-center">
                  <div className="mb-3 flex items-center justify-center gap-1.5">
                    <Badge variant={difficultyVariant(card.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                      {card.difficulty}
                    </Badge>
                    <span className="text-[10px] text-muted">{card.sectionTitle} &middot; {card.topic}</span>
                  </div>

                  {!flipped ? (
                    <>
                      <p className="text-base font-semibold leading-6 text-foreground">{card.prompt}</p>
                      <p className="mt-4 text-[11px] font-medium text-faint">Tap to reveal answer</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm leading-6 text-foreground">{card.expectedAnswer}</p>
                      <p className="mt-3 border-t border-border pt-3 text-[11px] leading-5 text-muted">{card.revisionNotes}</p>
                    </>
                  )}
                </Card>
              </button>

              {flipped ? (
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => mark("low")}
                    className="hover-lift flex items-center justify-center gap-1.5 rounded-lg border border-error/30 bg-error-soft py-2.5 text-xs font-semibold text-error"
                  >
                    <XCircle size={14} /> Review Again
                  </button>
                  <button
                    onClick={() => mark("high")}
                    className="hover-lift flex items-center justify-center gap-1.5 rounded-lg border border-success/30 bg-success-soft py-2.5 text-xs font-semibold text-success"
                  >
                    <CheckCircle2 size={14} /> Know It
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-center text-[11px] text-faint">Rate yourself honestly after revealing — it drives your revision list.</p>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
}

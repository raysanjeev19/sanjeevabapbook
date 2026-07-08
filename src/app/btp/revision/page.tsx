"use client";

import Link from "next/link";
import { Bookmark, ChevronRight, Clock, RotateCcw } from "lucide-react";
import { getAllBtpQuestions } from "@/lib/btp-content";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/layout/site-nav";
import { useBtpStudyStore } from "@/store/use-btp-study-store";

function topicAnchor(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BtpRevisionPage() {
  const bookmarks = useBtpStudyStore((s) => s.bookmarks);
  const confidence = useBtpStudyStore((s) => s.confidence);

  const allQuestions = getAllBtpQuestions();
  const byId = new Map(allQuestions.map((q) => [q.id, q]));

  const bookmarked = bookmarks.map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => Boolean(q));
  const needsRevision = allQuestions.filter((q) => confidence[q.id] === "low");

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Revision" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              BTP <span className="text-gradient">Revision List</span>
            </h1>
            <p className="mt-1 text-sm text-muted">
              {bookmarked.length} bookmarked &middot; {needsRevision.length} marked &ldquo;low confidence&rdquo;
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <Section
          icon={<RotateCcw size={14} />}
          title="Needs Revision"
          subtitle="Questions you rated 'low' confidence — revisit these first."
          questions={needsRevision}
          emptyText="Nothing here yet — rate your confidence after revealing an answer to build this list."
        />

        <Section
          icon={<Bookmark size={14} />}
          title="Bookmarked"
          subtitle="Questions you saved for later."
          questions={bookmarked}
          emptyText="Bookmark a question (the flag icon) and it'll show up here."
        />
      </div>
    </main>
  );
}

function Section({
  icon,
  title,
  subtitle,
  questions,
  emptyText,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  questions: ReturnType<typeof getAllBtpQuestions>;
  emptyText: string;
}) {
  return (
    <section className="animate-fade-up mb-10">
      <div className="mb-1 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-soft text-accent">{icon}</span>
        <h2 className="font-serif text-lg font-semibold text-foreground">{title}</h2>
      </div>
      <p className="mb-3 text-xs text-muted">{subtitle}</p>

      {questions.length === 0 ? (
        <Card className="p-5 text-center text-xs text-muted">{emptyText}</Card>
      ) : (
        <div className="space-y-2">
          {questions.map((q) => (
            <Link key={q.id} href={`/btp/${q.sectionSlug}#interview-${topicAnchor(q.topic)}`}>
              <Card className="hover-lift flex items-center gap-3 p-3 hover:border-border-strong">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-semibold text-foreground">{q.prompt}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <Badge variant={difficultyVariant(q.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                      {q.difficulty}
                    </Badge>
                    <span className="text-[10px] text-muted">{q.sectionTitle} &middot; {q.topic}</span>
                    <span className="flex items-center gap-0.5 text-[10px] text-muted">
                      <Clock size={10} /> {q.estimatedMinutes}m
                    </span>
                  </div>
                </div>
                <ChevronRight size={15} className="shrink-0 text-faint" />
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

"use client";

import Link from "next/link";
import { BrainCircuit, FlaskConical, LayoutGrid, Mic, RotateCcw, Shuffle, Sparkles } from "lucide-react";
import { btpSections, getBtpQuestions } from "@/lib/btp-content";
import { ink, percent } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { btpIconMap } from "@/components/btp/icon-map";
import { BtpDashboard } from "@/components/btp/dashboard";
import { SiteNav } from "@/components/layout/site-nav";
import { useBtpStudyStore } from "@/store/use-btp-study-store";

const QUICK_ACTIONS = [
  { href: "/btp/interview", label: "AI Mock Interview", desc: "Timed Q&A with scoring", Icon: Mic },
  { href: "/btp/quiz", label: "Daily Quiz", desc: "Fresh mixed-topic MCQ set", Icon: BrainCircuit },
  { href: "/btp/flashcards", label: "Flashcards", desc: "Flip-card rapid review", Icon: Sparkles },
  { href: "/btp/random", label: "Random Question", desc: "Jump into any question", Icon: Shuffle },
  { href: "/btp/labs", label: "Hands-on Labs", desc: "Step-by-step commands", Icon: FlaskConical },
  { href: "/btp/revision", label: "Revision List", desc: "Bookmarks + weak spots", Icon: RotateCcw },
];

export default function BtpDashboardPage() {
  const completed = useBtpStudyStore((s) => s.completed);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Dashboard" maxWidth="max-w-4xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-4xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Your <span className="text-gradient">BTP Dashboard</span>
            </h1>
            <p className="mt-1 text-sm text-muted">Progress, streaks, and quick jumps into every practice mode.</p>
          </div>

          <BtpDashboard showFullLink={false} />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Quick actions */}
        <div className="mb-10">
          <h2 className="mb-3 font-serif text-lg font-semibold tracking-tight text-foreground">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {QUICK_ACTIONS.map(({ href, label, desc, Icon }) => (
              <Link key={href} href={href}>
                <Card className="hover-lift flex items-center gap-3 p-3.5 hover:border-border-strong">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[13px] font-semibold text-foreground">{label}</h3>
                    <p className="text-[11px] text-muted">{desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Per-chapter breakdown */}
        <div>
          <h2 className="mb-3 flex items-center gap-1.5 font-serif text-lg font-semibold tracking-tight text-foreground">
            <LayoutGrid size={16} className="text-accent" /> Chapter-by-Chapter Progress
          </h2>
          <div className="space-y-1.5">
            {btpSections.map((section) => {
              const Icon = btpIconMap[section.icon as keyof typeof btpIconMap];
              const questions = getBtpQuestions(section.slug);
              const done = questions.filter((q) => q.id in completed).length;
              const pct = percent(done, Math.max(questions.length, 1));
              return (
                <Link key={section.slug} href={`/btp/${section.slug}`}>
                  <Card className="hover-lift flex items-center gap-3 p-3 hover:border-border-strong">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${section.color}1f`, color: ink(section.color) }}
                    >
                      <Icon size={15} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="truncate text-[13px] font-semibold text-foreground">{section.title}</h3>
                        <span className="shrink-0 text-[11px] font-semibold text-muted">
                          {done}/{questions.length}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: `${pct}%`, backgroundColor: section.color }}
                        />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

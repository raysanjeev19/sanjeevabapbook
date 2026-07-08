"use client";

import Link from "next/link";
import { ArrowDown, BrainCircuit, Cloud, FlaskConical, Layers3, ListChecks, Lock, Mic, Shuffle, Sparkles, Target } from "lucide-react";
import { btpSections, btpStageOrder, btpTotalQuestions, getAllBtpQuestions, getAllBtpLabs } from "@/lib/btp-content";
import { ink, percent } from "@/lib/utils";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { btpIconMap } from "@/components/btp/icon-map";
import { BtpDashboard } from "@/components/btp/dashboard";
import { SiteNav } from "@/components/layout/site-nav";
import { useBtpStudyStore } from "@/store/use-btp-study-store";

/** % of a stage's authored questions that must be completed before the next stage is shown as "unlocked". Soft gate only — every node stays clickable, this just signals recommended order. */
const UNLOCK_THRESHOLD = 40;

const stats = [
  { label: "Sections", value: btpSections.length, Icon: Layers3 },
  { label: "Topics", value: btpSections.reduce((n, s) => n + s.topics.length, 0), Icon: ListChecks },
  { label: "Target Questions", value: btpTotalQuestions(), Icon: Target },
];

const QUICK_ACTIONS = [
  { href: "/btp/interview", label: "Mock Interview", Icon: Mic },
  { href: "/btp/quiz", label: "Daily Quiz", Icon: BrainCircuit },
  { href: "/btp/flashcards", label: "Flashcards", Icon: Sparkles },
  { href: "/btp/random", label: "Random Question", Icon: Shuffle },
];

export default function BtpLandingPage() {
  const completed = useBtpStudyStore((s) => s.completed);
  const allQuestions = getAllBtpQuestions();

  const stageProgress = btpStageOrder.map((stage) => {
    const stageQuestions = allQuestions.filter((q) => q.difficulty === stage);
    const done = stageQuestions.filter((q) => q.id in completed).length;
    return { stage, pct: stageQuestions.length ? percent(done, stageQuestions.length) : 0 };
  });

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="BTP" maxWidth="max-w-5xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <Cloud size={28} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              SAP BTP <span className="text-gradient">Interview Bible</span>
            </h1>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted">
              Master SAP BTP. Crack every interview. {btpSections.length} sections, beginner to expert —
              everything lives here.
            </p>
            <Link
              href="/btp/labs"
              className="hover-lift mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-border-strong"
            >
              <FlaskConical size={13} className="text-accent" /> {getAllBtpLabs().length} Hands-on Labs
            </Link>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
              {QUICK_ACTIONS.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="hover-lift flex items-center gap-1.5 rounded-full bg-gradient-accent px-3 py-1.5 text-xs font-semibold text-white"
                >
                  <Icon size={13} /> {label}
                </Link>
              ))}
            </div>
          </div>

          <BtpDashboard />

          {/* Curriculum stat row */}
          <div className="animate-fade-up mb-10 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map(({ label, value, Icon }) => (
              <Card key={label} className="flex flex-col items-center gap-1 p-3 text-center sm:p-4">
                <Icon size={16} className="text-accent" />
                <span className="text-lg font-semibold text-foreground sm:text-xl">{value}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">{label}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Roadmap */}
        <div className="mb-10">
          <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight text-foreground">Roadmap</h2>
          <div className="flex flex-col items-stretch gap-2">
            {btpStageOrder.map((stage, i) => {
              const sections = btpSections.filter((s) => s.difficulty === stage);
              const prevPct = i === 0 ? 100 : stageProgress[i - 1].pct;
              const unlocked = i === 0 || prevPct >= UNLOCK_THRESHOLD;
              return (
                <div key={stage}>
                  <Card className={`p-4 ${unlocked ? "" : "opacity-70"}`}>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant={difficultyVariant(stage)}>{stage}</Badge>
                      <span className="text-xs text-muted">{sections.length} sections</span>
                      {!unlocked && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-faint">
                          <Lock size={11} /> Finish {UNLOCK_THRESHOLD}% of {btpStageOrder[i - 1]} to unlock
                          ({prevPct}%)
                        </span>
                      )}
                      {unlocked && stageProgress[i].pct > 0 && (
                        <span className="ml-auto text-[10px] font-semibold text-accent">{stageProgress[i].pct}% done</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((section) => {
                        const Icon = btpIconMap[section.icon as keyof typeof btpIconMap] ?? Cloud;
                        return (
                          <Link
                            key={section.slug}
                            href={`/btp/${section.slug}`}
                            className={`hover-lift group flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 hover:border-border-strong ${
                              unlocked ? "bg-surface-2 text-foreground" : "bg-surface-2/60 text-muted"
                            }`}
                          >
                            {unlocked ? <Icon size={13} style={{ color: ink(section.color) }} /> : <Lock size={12} className="text-faint" />}
                            {section.title}
                          </Link>
                        );
                      })}
                    </div>
                  </Card>
                  {i < btpStageOrder.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown size={16} className="text-faint" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* All sections */}
        <div>
          <h2 className="mb-4 font-serif text-xl font-semibold tracking-tight text-foreground">All Sections</h2>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {btpSections.map((section, i) => {
              const Icon = btpIconMap[section.icon as keyof typeof btpIconMap] ?? Cloud;
              return (
                <Link key={section.slug} href={`/btp/${section.slug}`}>
                  <Card
                    accent={section.color}
                    className="hover-lift animate-fade-up group flex h-full flex-col gap-2.5 p-4 hover:border-border-strong"
                    style={{ animationDelay: `${Math.min(i * 35, 360)}ms` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                        style={{ backgroundColor: `${section.color}1f`, color: ink(section.color) }}
                      >
                        <Icon size={17} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[13px] font-semibold text-foreground">
                          {section.order}. {section.title}
                        </h3>
                        <div className="mt-1 flex items-center gap-2">
                          <Badge variant={difficultyVariant(section.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                            {section.difficulty}
                          </Badge>
                          <span className="text-[10px] text-muted">{section.targetQuestionCount} Qs</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-muted">{section.description}</p>
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

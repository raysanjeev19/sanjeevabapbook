"use client";

import Link from "next/link";
import { Brain, Cloud, Mic } from "lucide-react";
import { btpSections, getBtpQuestions } from "@/lib/btp-content";
import { ink, percent } from "@/lib/utils";
import { useBtpStudyStore } from "@/store/use-btp-study-store";
import { Badge, difficultyVariant } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { btpIconMap } from "@/components/btp/icon-map";
import { SiteNav } from "@/components/layout/site-nav";

export default function BtpInterviewPickerPage() {
  const completed = useBtpStudyStore((s) => s.completed);

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="BTP AI Interview" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <Brain size={28} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              AI <span className="text-gradient">Mock Interview</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              Pick a section. The AI interviewer asks questions, follow-ups, traps, and scenarios — scores your answers live,
              voice or typed.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {btpSections.map((section, i) => {
            const Icon = btpIconMap[section.icon as keyof typeof btpIconMap] ?? Cloud;
            const questions = getBtpQuestions(section.slug);
            const done = questions.filter((q) => q.id in completed).length;
            const prog = questions.length ? percent(done, questions.length) : 0;

            return (
              <Link key={section.slug} href={questions.length > 0 ? `/btp/interview/${section.slug}` : "#"}>
                <Card
                  accent={section.color}
                  className={`hover-lift animate-fade-up group flex items-center gap-3 p-3.5 hover:border-border-strong ${
                    questions.length === 0 ? "pointer-events-none opacity-50" : "cursor-pointer"
                  }`}
                  style={{ animationDelay: `${Math.min(i * 45, 360)}ms` }}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: `${section.color}1f`, color: ink(section.color) }}
                  >
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[13px] font-semibold text-foreground">{section.title}</h2>
                    <div className="mt-1 flex items-center gap-2">
                      <Badge variant={difficultyVariant(section.difficulty)} className="px-1.5 py-0.5 text-[9px]">
                        {section.difficulty}
                      </Badge>
                      <span className="text-[10px] text-muted">{questions.length} Qs</span>
                      {prog > 0 && <span className="text-[10px] font-semibold text-accent">{prog}% read</span>}
                    </div>
                  </div>
                  <Mic size={13} className="shrink-0 text-faint transition-colors duration-200 group-hover:text-accent" />
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

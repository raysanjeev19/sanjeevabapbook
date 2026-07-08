"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ChevronDown, FlaskConical, Terminal } from "lucide-react";
import { getAllBtpLabs, getBtpSection } from "@/lib/btp-content";
import type { BtpLab } from "@/lib/btp-content";
import { Card } from "@/components/ui/card";
import { SiteNav } from "@/components/layout/site-nav";

export default function BtpLabsPage() {
  const labs = getAllBtpLabs();

  return (
    <main className="min-h-screen bg-background">
      <SiteNav breadcrumb="Hands-on Labs" maxWidth="max-w-3xl" />

      <div className="ambient-top">
        <div className="mx-auto max-w-3xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="animate-fade-up mb-8 pb-2 text-center">
            <div className="bg-gradient-accent mx-auto mb-4 flex h-16 w-16 animate-scale-in items-center justify-center rounded-2xl text-white shadow-pop">
              <FlaskConical size={28} />
            </div>
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Hands-on <span className="text-gradient">Labs</span>
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted">
              {labs.length} lab{labs.length === 1 ? "" : "s"} ready — step-by-step, with real commands and common errors.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        {labs.length === 0 ? (
          <Card className="p-5 text-center">
            <p className="text-xs text-muted">Labs are being authored section by section — check back soon.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {labs.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function LabCard({ lab }: { lab: BtpLab }) {
  const [open, setOpen] = useState(false);
  const section = getBtpSection(lab.sectionSlug);

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="flex w-full items-start gap-3 p-4 text-left">
        <FlaskConical size={16} className="mt-0.5 shrink-0 text-accent" />
        <div className="min-w-0 flex-1">
          <h2 className="text-[13px] font-semibold text-foreground">{lab.title}</h2>
          {section && (
            <Link
              href={`/btp/${section.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-1 inline-block text-[10px] font-medium text-muted hover:text-accent"
            >
              {section.title}
            </Link>
          )}
        </div>
        <ChevronDown size={16} className={`mt-0.5 shrink-0 text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="animate-fade-up space-y-3 border-t border-border p-4 pt-3.5">
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">Objective</h3>
            <p className="text-xs leading-5 text-foreground">{lab.objective}</p>
          </div>
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">Architecture</h3>
            <p className="text-xs leading-5 text-muted">{lab.architectureNote}</p>
          </div>
          <div>
            <h3 className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">Steps</h3>
            <ol className="space-y-2">
              {lab.steps.map((step, i) => (
                <li key={i} className="text-xs leading-5 text-foreground">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border text-[9px] font-semibold text-faint">
                      {i + 1}
                    </span>
                    <span className="flex-1">{step.instruction}</span>
                  </div>
                  {step.command && (
                    <pre className="mt-1.5 ml-6 overflow-x-auto rounded-lg bg-surface-2 p-2 font-mono text-[11px] text-accent">
                      <span className="mr-1 text-faint">$</span>
                      {step.command}
                    </pre>
                  )}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-lg border border-success/25 bg-success-soft p-2.5">
            <h3 className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-success">
              <Terminal size={11} /> Expected Output
            </h3>
            <p className="text-xs leading-5 text-foreground">{lab.expectedOutput}</p>
          </div>
          {lab.commonErrors.length > 0 && (
            <div>
              <h3 className="mb-1.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-faint">
                <AlertTriangle size={11} /> Common Errors
              </h3>
              <div className="space-y-2">
                {lab.commonErrors.map((ce) => (
                  <div key={ce.error} className="rounded-lg border border-error/25 bg-error-soft p-2.5">
                    <p className="text-xs font-semibold text-error">{ce.error}</p>
                    <p className="mt-1 text-xs leading-5 text-foreground">{ce.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

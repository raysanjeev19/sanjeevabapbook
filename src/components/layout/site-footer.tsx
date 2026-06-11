import Link from "next/link";
import { chapters, platformStats } from "@/lib/content";
import { BrandLogo } from "@/components/layout/brand-logo";

const PRACTICE_LINKS = [
  { label: "All Questions", href: "/questions" },
  { label: "AI Mock Interview", href: "/interview" },
  { label: "Your Library", href: "/library" },
  { label: "Browse Chapters", href: "/#chapters" },
];

export function SiteFooter() {
  const topChapters = chapters.slice(0, 4);

  return (
    <footer className="mt-16 bg-surface/60">
      <div className="bg-gradient-accent h-[2px] w-full opacity-60" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <BrandLogo size={30} />
              <div>
                <div className="font-serif text-base font-semibold tracking-tight text-foreground">CodeGurukul</div>
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                  Learn · Practice · Prepare · Get Hired
                </div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
              The SAP ABAP interview-prep platform — {platformStats.questions}+ curated questions with
              Hinglish + English interview scripts, real code walkthroughs, and AI mock interviews.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold text-accent">
                {platformStats.questions}+ questions
              </span>
              <span className="rounded-full bg-accent-2-soft px-3 py-1 text-[11px] font-semibold text-accent-2">
                {chapters.length} chapters
              </span>
              <span className="rounded-full bg-accent-3-soft px-3 py-1 text-[11px] font-semibold text-accent-3">
                Hinglish + English
              </span>
            </div>
          </div>

          {/* Practice */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Practice
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRACTICE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular chapters */}
          <div>
            <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-3" /> Popular Chapters
            </h3>
            <ul className="mt-4 space-y-2.5">
              {topChapters.map((ch) => (
                <li key={ch.slug}>
                  <Link href={`/chapters/${ch.slug}`} className="text-sm text-muted transition-colors hover:text-accent">
                    {ch.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-[11px] text-faint">
            © {new Date().getFullYear()} CodeGurukul · Made for ABAP folks
          </p>
          <p className="text-[11px] text-faint">
            Crack the interview — padho, bolo, practice karo.
          </p>
        </div>
      </div>
    </footer>
  );
}

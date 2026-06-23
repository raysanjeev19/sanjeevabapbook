"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, ChevronRight, Compass, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";
import { CommandPaletteButton } from "@/components/layout/command-palette";

const LINKS = [
  { href: "/questions", label: "Explore", Icon: Compass },
  { href: "/library", label: "Saved", Icon: BookMarked },
  { href: "/interview", label: "Interview", Icon: Mic },
];

export function SiteNav({
  breadcrumb,
  maxWidth = "max-w-6xl",
  tagline = false,
}: {
  /** Current page name shown after the brand (e.g. a chapter title) */
  breadcrumb?: string;
  maxWidth?: string;
  /** Show the brand tagline under the logo (home page) */
  tagline?: boolean;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("sticky top-0 z-40 mx-auto w-full px-3 pt-3 sm:px-6 lg:px-8", maxWidth)}>
      <div className="glass ring-gradient flex items-center justify-between gap-2 rounded-2xl px-3 py-2 shadow-card-hover sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5 rounded-xl">
            <BrandLogo size={32} />
            <div className="flex min-w-0 flex-col">
              <span
                className={cn(
                  "font-serif font-bold leading-none tracking-tight text-foreground",
                  tagline ? "text-[1.05rem]" : "hidden text-[0.95rem] sm:inline",
                )}
              >
                CodeGurukul
              </span>
              {tagline && (
                <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-faint">
                  Learn · Practice · Get Hired
                </span>
              )}
            </div>
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight size={12} className="shrink-0 text-faint" />
              <span className="max-w-[42vw] truncate text-sm font-semibold text-accent sm:max-w-[220px]">
                {breadcrumb}
              </span>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <CommandPaletteButton className="hidden sm:inline-flex" />

          {/* Primary links — desktop only; mobile uses the bottom tab bar */}
          <div className="hidden items-center gap-1 sm:flex">
            {LINKS.map(({ href, label, Icon }) => {
              const active = pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex h-9 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold transition-colors duration-200",
                    active
                      ? "bg-gradient-accent text-white shadow-[0_4px_14px_var(--accent-glow)]"
                      : "text-muted hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <Icon size={15} />
                  <span className="hidden md:inline">{label}</span>
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

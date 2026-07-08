"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, ChevronRight, Cloud, Compass, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { BrandLogo } from "@/components/layout/brand-logo";
import { CommandPaletteButton } from "@/components/layout/command-palette";

const LINKS = [
  { href: "/questions", label: "Explore", Icon: Compass },
  { href: "/library", label: "Saved", Icon: BookMarked },
  { href: "/interview", label: "Interview", Icon: Mic },
  { href: "/btp", label: "BTP", Icon: Cloud },
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150">
      <div
        className={cn(
          "mx-auto flex h-16 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-8",
          maxWidth,
        )}
      >
        {/* === Brand === */}
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <BrandLogo size={34} className="transition-transform duration-200 group-hover:scale-105" />
            <span className="flex min-w-0 flex-col justify-center leading-none">
              <span className="font-serif text-[1.05rem] font-bold tracking-tight text-foreground">
                CodeGurukul
              </span>
              {tagline && (
                <span className="mt-1 hidden text-[9.5px] font-semibold uppercase tracking-[0.18em] text-faint sm:block">
                  Learn · Practice · Get Hired
                </span>
              )}
            </span>
          </Link>

          {breadcrumb && (
            <>
              <ChevronRight size={14} className="shrink-0 text-faint" />
              <span className="max-w-[42vw] truncate text-sm font-semibold text-accent sm:max-w-[260px]">
                {breadcrumb}
              </span>
            </>
          )}
        </div>

        {/* === Actions === */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Primary links — desktop only; mobile uses the bottom tab bar */}
          <nav className="mr-1 hidden items-center gap-1 sm:flex">
            {LINKS.map(({ href, label }) => {
              const active = pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors duration-200",
                    active ? "text-foreground" : "text-muted hover:text-foreground",
                  )}
                >
                  {label}
                  {active && (
                    <span className="bg-gradient-accent absolute inset-x-3 bottom-1 h-[2px] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <CommandPaletteButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

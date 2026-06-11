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
    <nav className={cn("sticky top-0 z-40 mx-auto w-full px-4 pt-3 sm:px-6 lg:px-8", maxWidth)}>
      <div className="glass flex items-center justify-between rounded-xl px-4 py-2.5 shadow-card">
        <div className="flex min-w-0 items-center gap-1.5">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <BrandLogo size={28} />
            <div className="flex flex-col">
              <span className={cn("font-serif font-semibold tracking-tight text-foreground", tagline ? "text-base" : "hidden text-sm sm:inline")}>
                CodeGurukul
              </span>
              {tagline && (
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-faint">
                  Learn · Practice · Prepare
                </span>
              )}
            </div>
          </Link>
          {breadcrumb && (
            <>
              <ChevronRight size={11} className="shrink-0 text-faint" />
              <span className="max-w-[180px] truncate text-sm font-semibold text-accent">{breadcrumb}</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          <CommandPaletteButton className="hidden sm:inline-flex" />
          {LINKS.map(({ href, label, Icon }) => {
            const active = pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm font-semibold transition-colors duration-200 sm:px-3",
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
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

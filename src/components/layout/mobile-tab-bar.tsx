"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BookMarked, Compass, Home, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "Home", Icon: Home, match: (p: string) => p === "/" },
  { href: "/questions", label: "Explore", Icon: Compass, match: (p: string) => p === "/questions" },
  { href: "/library", label: "Saved", Icon: BookMarked, match: (p: string) => p.startsWith("/library") },
  { href: "/interview", label: "Interview", Icon: Mic, match: (p: string) => p.startsWith("/interview") },
];

/**
 * App-style bottom navigation, mobile only. Rendered globally, but hidden on
 * the question reader (which has its own thumb bar) to avoid stacked bars.
 */
export function MobileTabBar() {
  const pathname = usePathname() ?? "/";

  // Optimistic highlight: light up the tapped tab instantly, before the route
  // commits, so taps never feel "late". Reset (render-time) once the URL lands.
  const [pending, setPending] = useState<string | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPending(null);
  }

  // Hide on immersive sessions that own their full screen (reader, mock interview).
  const isImmersive =
    (pathname.startsWith("/questions/") && pathname !== "/questions") ||
    (pathname.startsWith("/interview/") && pathname !== "/interview");
  if (isImmersive) return null;

  return (
    <>
      {/* Flow spacer so fixed bar never covers page content on mobile */}
      <div aria-hidden className="h-[4.75rem] sm:hidden" />

      <nav
        aria-label="Primary"
        className="pb-safe glass fixed inset-x-0 bottom-0 z-40 touch-manipulation border-t border-border sm:hidden"
      >
        <div className="mx-auto flex max-w-md items-stretch justify-around px-2 pt-1.5">
          {TABS.map(({ href, label, Icon, match }) => {
            const active = pending ? pending === href : match(pathname);
            return (
              <Link
                key={href}
                href={href}
                prefetch
                onClick={() => setPending(href)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-1 touch-manipulation flex-col items-center gap-1 rounded-lg py-1.5 text-[10px] font-semibold transition-transform duration-100 select-none active:scale-90",
                  active ? "text-accent" : "text-faint hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-12 items-center justify-center rounded-full transition-colors duration-150",
                    active && "bg-accent-soft",
                  )}
                >
                  <Icon size={19} strokeWidth={active ? 2.4 : 2} />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

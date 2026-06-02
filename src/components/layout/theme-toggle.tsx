"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/** Subscribe to <html> class changes so the toggle reflects the live theme. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // Server render assumes light; useSyncExternalStore swaps to the real
  // theme right after hydration without a mismatch warning.
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light" as Theme);
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    const root = document.documentElement.classList;
    root.remove("light", "dark");
    root.add(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable — keep in-memory only */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-muted transition-colors hover:text-foreground hover:border-border-strong ${className ?? ""}`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}

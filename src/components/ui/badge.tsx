import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "beginner" | "intermediate" | "advanced" | "expert" | "accent";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-surface-2 text-muted",
  beginner:
    "border-emerald-600/25 bg-emerald-600/10 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300",
  intermediate:
    "border-indigo-600/25 bg-indigo-600/10 text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-300",
  advanced:
    "border-purple-600/25 bg-purple-600/10 text-purple-700 dark:border-purple-400/20 dark:bg-purple-400/10 dark:text-purple-300",
  expert:
    "border-red-600/25 bg-red-600/10 text-red-700 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-300",
  accent: "border-accent/25 bg-accent-soft text-accent",
};

export function difficultyVariant(difficulty: string): BadgeVariant {
  const normalized = difficulty.toLowerCase();
  if (normalized === "beginner" || normalized === "foundation") return "beginner";
  if (normalized === "intermediate" || normalized === "project") return "intermediate";
  if (normalized === "advanced" || normalized === "support" || normalized === "implementation") return "advanced";
  if (normalized === "expert") return "expert";
  return "default";
}

export function Badge({
  className,
  variant = "default",
  children,
}: {
  className?: string;
  variant?: BadgeVariant;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

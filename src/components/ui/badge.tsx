import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "beginner" | "intermediate" | "advanced" | "expert" | "accent";

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "border-white/10 bg-white/[0.07] text-cyan-100",
  beginner:
    "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
  intermediate:
    "border-blue-400/20 bg-blue-400/10 text-blue-300",
  advanced:
    "border-purple-400/20 bg-purple-400/10 text-purple-300",
  expert:
    "border-red-400/20 bg-red-400/10 text-red-300",
  accent:
    "border-[color:var(--accent)]/20 bg-[color:var(--accent)]/10 text-[color:var(--accent)]",
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
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

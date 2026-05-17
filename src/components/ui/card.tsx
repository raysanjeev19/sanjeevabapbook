import { cn } from "@/lib/utils";

export function Card({
  className,
  accent,
  children,
}: {
  className?: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-slate-950/70 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-200",
        accent && "border-l-[3px]",
        className,
      )}
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      {children}
    </div>
  );
}

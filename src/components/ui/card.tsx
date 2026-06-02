import { cn } from "@/lib/utils";

export function Card({
  className,
  accent,
  id,
  children,
}: {
  className?: string;
  accent?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-lg border border-border bg-surface transition-colors duration-150",
        accent && "border-l-[3px]",
        className,
      )}
      style={accent ? { borderLeftColor: accent } : undefined}
    >
      {children}
    </div>
  );
}

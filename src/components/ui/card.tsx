import { cn } from "@/lib/utils";

export function Card({
  className,
  accent,
  id,
  style,
  children,
}: {
  className?: string;
  accent?: string;
  id?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-xl border border-border bg-surface shadow-card transition-[box-shadow,border-color,background-color,transform] duration-200",
        accent && "border-l-[3px]",
        className,
      )}
      style={{ ...(accent ? { borderLeftColor: accent } : undefined), ...style }}
    >
      {children}
    </div>
  );
}

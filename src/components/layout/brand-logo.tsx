import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Theme-aware brand mark. Uses accent tokens so it recolors when the
 * light/dark toggle flips — deep-teal tile + white glyph in light,
 * soft-teal tile + dark glyph in dark.
 */
export function BrandLogo({ size = 28, className }: { size?: number; className?: string }) {
  const inner = Math.round(size * 0.58);
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center justify-center rounded-lg bg-accent text-accent-contrast transition-colors",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <BookOpen size={inner} strokeWidth={2.25} />
    </span>
  );
}

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-[color,background-color,border-color,box-shadow,filter,transform] duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-accent text-accent-contrast shadow-card hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_8px_24px_var(--accent-glow)]",
        secondary:
          "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-2 hover:shadow-card",
        ghost: "text-muted hover:bg-surface-2 hover:text-foreground",
        danger: "bg-[#c0392b] text-white hover:opacity-90 dark:bg-[#e06b5e] dark:text-[#14110e]",
        glow: "border border-accent/40 bg-accent-soft text-accent hover:bg-accent/15 hover:shadow-[0_6px_20px_var(--accent-glow)]",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 px-3 text-xs",
        icon: "h-10 w-10 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

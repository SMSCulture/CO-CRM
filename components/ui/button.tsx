import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--co-btn-radius)] text-[length:var(--co-btn-font-size)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // ── Frontend ────────────────────────────────────────────────────────
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        primary:
          "inline-flex items-center gap-2 bg-co-blue hover:bg-co-blue-hover text-white rounded-[var(--co-btn-radius)] px-4 py-2 tracking-widest uppercase shadow-sm transition-colors dark:ring-1 dark:ring-white/20",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // ── Dashboard ───────────────────────────────────────────────────────
        create:
          "h-[var(--co-btn-height-md)] px-4 rounded-[var(--co-btn-radius-lg)] bg-co-blue text-white text-[length:var(--co-btn-font-dash)] font-semibold gap-1.5 hover:bg-co-blue-hover [&_svg]:size-3.5",
        asset:
          "h-[var(--co-btn-height-sm)] w-full px-4 rounded-[var(--co-btn-radius-lg)] bg-co-blue text-white text-[length:var(--co-btn-font-dash)] font-semibold hover:bg-co-blue-hover",
        filterInactive:
          "h-[var(--co-btn-height-sm)] px-3.5 rounded-[var(--co-btn-radius-lg)] bg-background text-foreground border border-black/15 dark:border-white/20 text-[length:var(--co-btn-font-dash)] font-medium hover:bg-co-blue hover:text-white hover:border-co-blue transition-colors",
        filterActive:
          "h-[var(--co-btn-height-sm)] px-3.5 rounded-[var(--co-btn-radius-lg)] bg-co-blue text-white text-[length:var(--co-btn-font-dash)] font-semibold shadow-sm hover:bg-co-blue-hover",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      },

      size: {
        default: "h-[var(--co-btn-height-md)] px-4 py-2",
        sm: "h-[var(--co-btn-height-sm)] rounded-[var(--co-btn-radius)] px-3 text-xs",
        lg: "h-[var(--co-btn-height-lg)] rounded-[var(--co-btn-radius)] px-8",
        icon: "h-auto w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

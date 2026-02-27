import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium cursor-pointer select-none ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]";

    const variants = {
      default:
        "bg-green-600/90 text-white backdrop-blur-sm border border-green-500/30 shadow-[0_4px_20px_rgba(74,222,128,0.25)] hover:bg-green-500/95 hover:shadow-[0_6px_30px_rgba(74,222,128,0.35)] hover:-translate-y-0.5",
      secondary:
        "bg-white/40 text-green-800 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:bg-white/60 hover:border-white/60 hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
      outline:
        "border-2 border-green-500/30 bg-white/20 backdrop-blur-sm text-green-700 hover:bg-green-500/10 hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] hover:-translate-y-0.5",
      ghost:
        "text-green-700 hover:bg-white/40 hover:backdrop-blur-sm hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)]",
      link: "text-green-600 underline-offset-4 hover:underline hover:text-green-700",
    };

    const sizes = {
      default: "h-10 px-5 py-2",
      sm: "h-9 rounded-lg px-4 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };

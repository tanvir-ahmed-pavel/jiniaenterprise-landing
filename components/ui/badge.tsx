"use client";

import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "destructive";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-green-600/80 text-white border-green-500/30 backdrop-blur-sm shadow-[0_0_12px_rgba(74,222,128,0.15)]",
    secondary: "bg-white/30 text-green-800 border-white/30 backdrop-blur-md",
    outline:
      "border border-white/40 bg-white/15 text-foreground backdrop-blur-sm",
    success:
      "bg-green-500/80 text-white border-green-400/30 backdrop-blur-sm shadow-[0_0_12px_rgba(74,222,128,0.2)]",
    destructive: "bg-red-500/80 text-white border-red-400/30 backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border transition-all duration-300",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

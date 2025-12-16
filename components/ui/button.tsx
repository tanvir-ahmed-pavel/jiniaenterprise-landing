import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    // Base styles with cursor-pointer and smooth transitions
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium cursor-pointer select-none ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

    // Variant styles with hover effects
    const variants = {
      default:
        "bg-green-600 text-white shadow-sm hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5",
      secondary:
        "bg-green-100 text-green-700 shadow-sm hover:bg-green-200 hover:shadow-md hover:-translate-y-0.5",
      outline:
        "border-2 border-green-600 bg-transparent text-green-600 hover:bg-green-600 hover:text-white hover:shadow-md hover:-translate-y-0.5",
      ghost: "text-green-600 hover:bg-green-100 hover:text-green-700",
      link: "text-green-600 underline-offset-4 hover:underline hover:text-green-700",
    };

    // Size styles
    const sizes = {
      default: "h-10 px-5 py-2",
      sm: "h-9 rounded-md px-4 text-xs",
      lg: "h-12 rounded-md px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

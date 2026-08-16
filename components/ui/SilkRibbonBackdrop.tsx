import React from "react";
import { cn } from "@/lib/utils";

interface SilkRibbonBackdropProps {
  className?: string;
  flip?: boolean;
}

export function SilkRibbonBackdrop({
  className,
  flip = false,
}: SilkRibbonBackdropProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none -z-1 opacity-70",
        flip ? "-scale-x-100" : "",
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 1. Emerald to 24k Gold Luxury Satin Gradient */}
          <linearGradient id="silk-grad-emerald-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#022c1e" stopOpacity="0.07" />
            <stop offset="28%" stopColor="#047857" stopOpacity="0.08" />
            <stop offset="55%" stopColor="#d97706" stopOpacity="0.06" />
            <stop offset="78%" stopColor="#fbbf24" stopOpacity="0.09" />
            <stop offset="92%" stopColor="#fef08a" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.03" />
          </linearGradient>

          {/* 2. Soft Champagne & Jade Silk Sheen */}
          <linearGradient id="silk-grad-champagne" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.07" />
            <stop offset="35%" stopColor="#059669" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#022419" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.04" />
          </linearGradient>

          {/* 3. Gold Specular Rim Line Gradient */}
          <linearGradient id="silk-specular-gold" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="40%" stopColor="#fef08a" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
          </linearGradient>

          {/* 4. Emerald Specular Rim Line Gradient */}
          <linearGradient id="silk-specular-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#047857" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Sweeping Diagonal Ribbon 1 (Upper Wave) ── */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240 L 1540 440 C 820 220, 360 480, -100 320 Z"
          fill="url(#silk-grad-emerald-gold)"
        />
        {/* Specular Fold Edge 1 */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240"
          stroke="url(#silk-specular-gold)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* ── Sweeping Diagonal Ribbon 2 (Main Lower Ribbon) ── */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620 L 1540 820 C 920 560, 420 860, -100 660 Z"
          fill="url(#silk-grad-champagne)"
        />
        {/* Specular Fold Edge 2 */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620"
          stroke="url(#silk-specular-emerald)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}

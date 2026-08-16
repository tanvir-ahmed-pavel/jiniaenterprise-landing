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
        "absolute inset-0 overflow-hidden pointer-events-none select-none -z-1 opacity-85",
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
            <stop offset="0%" stopColor="#022c1e" stopOpacity="0.08" />
            <stop offset="28%" stopColor="#047857" stopOpacity="0.09" />
            <stop offset="55%" stopColor="#d97706" stopOpacity="0.07" />
            <stop offset="78%" stopColor="#fbbf24" stopOpacity="0.10" />
            <stop offset="92%" stopColor="#fef08a" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#065f46" stopOpacity="0.03" />
          </linearGradient>

          {/* 2. Soft Champagne & Jade Silk Sheen */}
          <linearGradient id="silk-grad-champagne" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.09" />
            <stop offset="35%" stopColor="#059669" stopOpacity="0.07" />
            <stop offset="70%" stopColor="#022419" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#fef08a" stopOpacity="0.05" />
          </linearGradient>

          {/* 3. Intense Shiny Gold Specular Rim Line Gradient (Upper Wave) */}
          <linearGradient id="silk-specular-gold-1" x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.3" />
            <stop offset="22%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="48%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
          </linearGradient>

          {/* 4. Intense Shiny Gold Specular Rim Line Gradient (Lower Wave) */}
          <linearGradient id="silk-specular-gold-2" x1="100%" y1="0%" x2="0%" y2="80%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#fef08a" stopOpacity="1" />
            <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.3" />
          </linearGradient>

          {/* 5. Soft Golden Bloom Gradient */}
          <linearGradient id="silk-glow-gold" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Sweeping Diagonal Ribbon 1 (Upper Wave) ── */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240 L 1540 440 C 820 220, 360 480, -100 320 Z"
          fill="url(#silk-grad-emerald-gold)"
        />
        {/* Shiny Golden Ambient Glow Underlay 1 */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240"
          stroke="url(#silk-glow-gold)"
          strokeWidth="4"
          fill="none"
        />
        {/* Shiny Golden Crisp Core Rim 1 */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240"
          stroke="url(#silk-specular-gold-1)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* ── Sweeping Diagonal Ribbon 2 (Main Lower Ribbon) ── */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620 L 1540 820 C 920 560, 420 860, -100 660 Z"
          fill="url(#silk-grad-champagne)"
        />
        {/* Shiny Golden Ambient Glow Underlay 2 */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620"
          stroke="url(#silk-glow-gold)"
          strokeWidth="4"
          fill="none"
        />
        {/* Shiny Golden Crisp Core Rim 2 */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620"
          stroke="url(#silk-specular-gold-2)"
          strokeWidth="2.2"
          fill="none"
        />
      </svg>
    </div>
  );
}

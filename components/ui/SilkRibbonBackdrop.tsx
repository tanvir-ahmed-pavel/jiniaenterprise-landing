import React from "react";
import { cn } from "@/lib/utils";

interface SilkRibbonBackdropProps {
  className?: string;
  variant?: "light" | "dark";
  flip?: boolean;
}

export function SilkRibbonBackdrop({
  className,
  variant = "light",
  flip = false,
}: SilkRibbonBackdropProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none select-none z-0",
        isDark ? "opacity-45" : "opacity-40",
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
          {/* 1. Emerald to 24k Gold Luxury Satin Gradient — Whisper Soft */}
          <linearGradient id={isDark ? "silk-grad-emerald-gold-dark" : "silk-grad-emerald-gold"} x1="0%" y1="0%" x2="100%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#047857" stopOpacity="0.08" />
                <stop offset="28%" stopColor="#10b981" stopOpacity="0.10" />
                <stop offset="55%" stopColor="#d97706" stopOpacity="0.07" />
                <stop offset="78%" stopColor="#fbbf24" stopOpacity="0.10" />
                <stop offset="92%" stopColor="#fef08a" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.03" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#022c1e" stopOpacity="0.04" />
                <stop offset="28%" stopColor="#047857" stopOpacity="0.05" />
                <stop offset="55%" stopColor="#d97706" stopOpacity="0.04" />
                <stop offset="78%" stopColor="#fbbf24" stopOpacity="0.05" />
                <stop offset="92%" stopColor="#fef08a" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#065f46" stopOpacity="0.02" />
              </>
            )}
          </linearGradient>

          {/* 2. Soft Champagne & Jade Silk Sheen */}
          <linearGradient id={isDark ? "silk-grad-champagne-dark" : "silk-grad-champagne"} x1="100%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.09" />
                <stop offset="35%" stopColor="#34d399" stopOpacity="0.07" />
                <stop offset="70%" stopColor="#047857" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0.04" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.05" />
                <stop offset="35%" stopColor="#059669" stopOpacity="0.04" />
                <stop offset="70%" stopColor="#022419" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#fef08a" stopOpacity="0.02" />
              </>
            )}
          </linearGradient>

          {/* 3. Delicate Smooth Gold Specular Line (Upper Wave) */}
          <linearGradient id={isDark ? "silk-specular-gold-1-dark" : "silk-specular-gold-1"} x1="0%" y1="0%" x2="100%" y2="60%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity={isDark ? "0.45" : "0.35"} />
            <stop offset="50%" stopColor="#fef08a" stopOpacity={isDark ? "0.6" : "0.45"} />
            <stop offset="75%" stopColor="#fbbf24" stopOpacity={isDark ? "0.45" : "0.35"} />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
          </linearGradient>

          {/* 4. Delicate Smooth Gold Specular Line (Lower Wave) */}
          <linearGradient id={isDark ? "silk-specular-gold-2-dark" : "silk-specular-gold-2"} x1="100%" y1="0%" x2="0%" y2="80%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.1" />
            <stop offset="30%" stopColor="#fbbf24" stopOpacity={isDark ? "0.45" : "0.35"} />
            <stop offset="55%" stopColor="#fef08a" stopOpacity={isDark ? "0.6" : "0.45"} />
            <stop offset="80%" stopColor="#f59e0b" stopOpacity={isDark ? "0.45" : "0.35"} />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* ── Sweeping Diagonal Ribbon 1 (Upper Wave) ── */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240 L 1540 440 C 820 220, 360 480, -100 320 Z"
          fill={`url(#${isDark ? "silk-grad-emerald-gold-dark" : "silk-grad-emerald-gold"})`}
        />
        {/* Delicate Golden Edge 1 */}
        <path
          d="M-100 120 C 320 280, 780 40, 1540 240"
          stroke={`url(#${isDark ? "silk-specular-gold-1-dark" : "silk-specular-gold-1"})`}
          strokeWidth="1.2"
          fill="none"
        />

        {/* ── Sweeping Diagonal Ribbon 2 (Main Lower Ribbon) ── */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620 L 1540 820 C 920 560, 420 860, -100 660 Z"
          fill={`url(#${isDark ? "silk-grad-champagne-dark" : "silk-grad-champagne"})`}
        />
        {/* Delicate Golden Edge 2 */}
        <path
          d="M-100 480 C 440 680, 960 380, 1540 620"
          stroke={`url(#${isDark ? "silk-specular-gold-2-dark" : "silk-specular-gold-2"})`}
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
}

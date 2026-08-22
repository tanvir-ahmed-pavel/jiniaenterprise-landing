"use client";

import React from "react";
import { cn } from "@/lib/utils";

function cardPose(i: number, active: number) {
  if (i <= active) {
    const depth = active - i;
    return {
      transform: `translate3d(0, ${depth * 18}px, ${-depth * 80}px) scale(${Math.max(0.9, 1 - depth * 0.06)})`,
      zIndex: 30 - depth,
    };
  }

  const ahead = i - active;
  return {
    transform: `translate3d(0, ${22 + (ahead - 1) * 14}px, ${48 - (ahead - 1) * 16}px) scale(0.97)`,
    zIndex: 40 + i,
  };
}

/**
 * Discrete iPhone-notification pile. Cards always stay opaque.
 * The front card tucks back (Y + Z + scale); the next card slides onto the pile.
 */
export function NotificationZStack({
  activeIndex,
  children,
  className,
}: {
  count?: number;
  activeIndex: number;
  children: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={cn("relative w-full h-full", className)}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 8%" }}
    >
      {items.map((child, i) => {
        const pose = cardPose(i, activeIndex);
        return (
          <div
            key={i}
            className="absolute inset-0 origin-top [backface-visibility:hidden] [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-[650ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={pose}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

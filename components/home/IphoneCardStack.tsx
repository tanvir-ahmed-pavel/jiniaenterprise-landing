"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * iPhone-notification Z-pile: front card on top, older cards tucked behind
 * on the Z axis. They never fly off the top.
 */
export function IphoneCardStack({
  count,
  activeIndex,
  children,
  className,
}: {
  count: number;
  activeIndex: number;
  children: React.ReactNode;
  className?: string;
}) {
  const items = React.Children.toArray(children);

  return (
    <div
      className={cn("relative h-full w-full", className)}
      style={{ perspective: "1400px", perspectiveOrigin: "50% 12%" }}
    >
      {items.map((child, i) => {
        const depth = (i - activeIndex + count) % count;
        const transform = `translate3d(0, ${depth * 14}px, ${-depth * 64}px) scale(${Math.max(0.88, 1 - depth * 0.05)})`;
        const zIndex = 40 - depth;

        return (
          <div
            key={i}
            className="absolute inset-0 origin-top [backface-visibility:hidden] [transform-style:preserve-3d] [transition:transform_0.7s_cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform, zIndex }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}

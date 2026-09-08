"use client";

import { useEffect, useRef } from "react";

export function SilkBackground() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const section = field?.parentElement;
    if (!field || !section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const foldA = field.querySelector<SVGGElement>(".jinia-silk-fold-a");
    const foldB = field.querySelector<SVGGElement>(".jinia-silk-fold-b");
    const foldC = field.querySelector<SVGGElement>(".jinia-silk-fold-c");
    const highlight = field.querySelector<SVGGElement>(".jinia-silk-highlight");
    if (!foldA || !foldB || !foldC || !highlight) return;

    let frame = 0;
    let active = false;
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerCurrentX = 0;
    let pointerCurrentY = 0;

    const syncScrollTarget = () => {
      if (!active) return;
      const rect = section.getBoundingClientRect();
      const travel = window.innerHeight + rect.height;
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / travel));
      scrollTarget = (progress - 0.5) * 440;
    };

    const render = () => {
      frame = 0;
      scrollCurrent += (scrollTarget - scrollCurrent) * 0.085;
      pointerCurrentX += (pointerTargetX - pointerCurrentX) * 0.13;
      pointerCurrentY += (pointerTargetY - pointerCurrentY) * 0.13;

      foldA.style.transform = `translate3d(${(-18 + scrollCurrent * 0.18 + pointerCurrentX * 18).toFixed(2)}px, ${(scrollCurrent * 0.35 + pointerCurrentY * 10).toFixed(2)}px, 0) scale(1.035)`;
      foldB.style.transform = `translate3d(${(20 - scrollCurrent * 0.27 - pointerCurrentX * 28).toFixed(2)}px, ${(-scrollCurrent * 0.58 - pointerCurrentY * 16).toFixed(2)}px, 0) scale(1.045)`;
      foldC.style.transform = `translate3d(${(-10 + scrollCurrent * 0.12 + pointerCurrentX * 40).toFixed(2)}px, ${(scrollCurrent * 0.83 + pointerCurrentY * 22).toFixed(2)}px, 0) scale(1.035)`;
      highlight.style.transform = `translate3d(${(36 + scrollCurrent * 0.32 + pointerCurrentX * 54).toFixed(2)}px, ${(-scrollCurrent * 1.05 + pointerCurrentY * 30).toFixed(2)}px, 0)`;

      const stillSettling = Math.abs(scrollTarget - scrollCurrent) > 0.1
        || Math.abs(pointerTargetX - pointerCurrentX) > 0.1
        || Math.abs(pointerTargetY - pointerCurrentY) > 0.1;
      if (stillSettling) frame = window.requestAnimationFrame(render);
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handleScroll = () => {
      syncScrollTarget();
      requestRender();
    };

    const handlePointerMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const isInside = event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!isInside) {
        handlePointerLeave();
        return;
      }
      pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      requestRender();
    };

    const handlePointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
      requestRender();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) handleScroll();
      },
      { rootMargin: "35% 0px" },
    );

    observer.observe(section);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mousemove", handlePointerMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={fieldRef} aria-hidden className="jinia-silk-field pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="silkBase" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fffdf7" />
            <stop offset=".48" stopColor="#f7fbf5" />
            <stop offset="1" stopColor="#fff7e7" />
          </linearGradient>
          <linearGradient id="silkEmerald" x1="0" y1="0" x2="1" y2=".15">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".96" />
            <stop offset=".22" stopColor="#dceee1" stopOpacity=".86" />
            <stop offset=".46" stopColor="#72bd91" stopOpacity=".52" />
            <stop offset=".57" stopColor="#ffffff" stopOpacity=".98" />
            <stop offset=".76" stopColor="#cde5d4" stopOpacity=".78" />
            <stop offset="1" stopColor="#fffdf7" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="silkGold" x1="0" y1=".1" x2="1" y2=".8">
            <stop offset="0" stopColor="#fffdf7" stopOpacity=".92" />
            <stop offset=".26" stopColor="#f5dfae" stopOpacity=".72" />
            <stop offset=".48" stopColor="#ffffff" stopOpacity=".98" />
            <stop offset=".67" stopColor="#dfb653" stopOpacity=".48" />
            <stop offset="1" stopColor="#fff8e9" stopOpacity=".9" />
          </linearGradient>
          <linearGradient id="silkPearl" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity=".98" />
            <stop offset=".35" stopColor="#f8f3e8" stopOpacity=".84" />
            <stop offset=".7" stopColor="#e8efe7" stopOpacity=".72" />
            <stop offset="1" stopColor="#ffffff" stopOpacity=".96" />
          </linearGradient>
          <filter id="silkSoft" x="-15%" y="-25%" width="130%" height="150%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
          <filter id="silkGlow" x="-25%" y="-60%" width="150%" height="220%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <rect width="1600" height="900" fill="url(#silkBase)" />

        <g className="jinia-silk-fold jinia-silk-fold-a">
          <path
            d="M-180 146 C180 -84 438 -8 716 190 C968 370 1206 348 1780 -56 L1780 180 C1264 490 1000 522 684 310 C414 128 180 88 -180 324 Z"
            fill="url(#silkPearl)"
          />
          <path
            d="M-180 286 C188 72 422 118 690 298 C1000 506 1250 458 1780 142 L1780 252 C1270 566 980 612 652 392 C406 226 178 188 -180 402 Z"
            fill="url(#silkEmerald)"
            opacity=".76"
          />
          <path
            d="M-180 284 C188 70 422 116 690 296 C1000 504 1250 456 1780 140"
            fill="none"
            stroke="#fff"
            strokeOpacity=".82"
            strokeWidth="15"
            strokeLinecap="round"
            filter="url(#silkGlow)"
          />
        </g>

        <g className="jinia-silk-fold jinia-silk-fold-b">
          <path
            d="M-220 466 C116 294 386 378 670 548 C936 708 1210 660 1810 326 L1810 510 C1240 790 920 842 626 662 C348 492 92 426 -220 600 Z"
            fill="url(#silkGold)"
            opacity=".82"
          />
          <path
            d="M-220 482 C118 310 384 394 666 562 C938 724 1208 676 1810 342"
            fill="none"
            stroke="#fffef9"
            strokeOpacity=".92"
            strokeWidth="18"
            strokeLinecap="round"
            filter="url(#silkGlow)"
          />
          <path
            d="M-220 550 C110 400 370 470 640 632 C930 806 1208 754 1810 430"
            fill="none"
            stroke="#d7af4f"
            strokeOpacity=".25"
            strokeWidth="54"
            strokeLinecap="round"
            filter="url(#silkSoft)"
          />
        </g>

        <g className="jinia-silk-fold jinia-silk-fold-c">
          <path
            d="M-180 700 C146 504 402 560 664 714 C948 882 1228 820 1780 504 L1780 788 C1240 1010 916 1038 614 870 C352 724 112 678 -180 846 Z"
            fill="url(#silkEmerald)"
            opacity=".66"
          />
          <path
            d="M-180 698 C146 502 402 558 664 712 C948 880 1228 818 1780 502"
            fill="none"
            stroke="#ffffff"
            strokeOpacity=".88"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#silkGlow)"
          />
        </g>

        <g className="jinia-silk-highlight">
          <path
            d="M-120 410 C250 208 468 260 734 426 C1018 602 1248 566 1720 294"
            fill="none"
            stroke="#ffffff"
            strokeOpacity=".56"
            strokeWidth="46"
            strokeLinecap="round"
            filter="url(#silkSoft)"
          />
        </g>
      </svg>
      <div className="absolute inset-0 bg-white/[0.06]" />
    </div>
  );
}

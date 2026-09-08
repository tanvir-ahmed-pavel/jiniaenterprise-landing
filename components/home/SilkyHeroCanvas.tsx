"use client";

import React, { useEffect, useRef } from "react";

interface DiagonalSilkRibbon {
  offsetYPercent: number;
  slope: number;
  amplitude: number;
  frequency: number;
  speed: number;
  thickness: number;
  phase: number;
  opacity: number;
  blendMode: GlobalCompositeOperation;
  gradientStops: [number, string][];
  specularColor: string;
  hasSpecularRim: boolean;
}

interface DustMote {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  vx: number;
  vy: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface SilkyHeroCanvasProps {
  className?: string;
  isCompact?: boolean;
}

export function SilkyHeroCanvas({ className, isCompact = false }: SilkyHeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = window.innerWidth;
    let height = Math.max(window.innerHeight, 900);

    const mouse = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
      vx: 0,
      vy: 0,
      radius: 260,
      isHovering: false,
      intensity: 0.3,
      targetIntensity: 0.5,
    };

    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 3 Expansive, Diagonal Silk Waves ──
    const ribbons: DiagonalSilkRibbon[] = [
      {
        offsetYPercent: 0.28,
        slope: -0.26,
        amplitude: 36,
        frequency: 0.0012,
        speed: 0.006,
        thickness: 240,
        phase: 0,
        opacity: 0.6,
        blendMode: "screen",
        hasSpecularRim: true,
        specularColor: "rgba(254, 240, 138, 0.45)",
        gradientStops: [
          [0, "rgba(2, 44, 30, 0.85)"],
          [0.3, "rgba(5, 150, 105, 0.65)"],
          [0.6, "rgba(217, 119, 6, 0.6)"],
          [0.85, "rgba(251, 191, 36, 0.75)"],
          [1, "rgba(254, 240, 138, 0.5)"],
        ],
      },
      {
        offsetYPercent: 0.48,
        slope: -0.28,
        amplitude: 46,
        frequency: 0.0014,
        speed: 0.0075,
        thickness: 320,
        phase: Math.PI * 0.45,
        opacity: 0.7,
        blendMode: "source-over",
        hasSpecularRim: true,
        specularColor: "rgba(254, 240, 138, 0.75)",
        gradientStops: [
          [0, "rgba(2, 36, 25, 0.95)"],
          [0.25, "rgba(4, 120, 87, 0.85)"],
          [0.52, "rgba(217, 119, 6, 0.8)"],
          [0.76, "rgba(251, 191, 36, 0.92)"],
          [0.92, "rgba(254, 240, 138, 0.85)"],
          [1, "rgba(16, 185, 129, 0.4)"],
        ],
      },
      {
        offsetYPercent: 0.70,
        slope: -0.24,
        amplitude: 40,
        frequency: 0.0011,
        speed: 0.0055,
        thickness: 260,
        phase: Math.PI * 0.95,
        opacity: 0.55,
        blendMode: "screen",
        hasSpecularRim: false,
        specularColor: "rgba(251, 191, 36, 0.35)",
        gradientStops: [
          [0, "rgba(1, 24, 16, 0.9)"],
          [0.4, "rgba(6, 78, 59, 0.7)"],
          [0.7, "rgba(180, 83, 9, 0.6)"],
          [0.9, "rgba(245, 158, 11, 0.7)"],
          [1, "rgba(4, 120, 87, 0.3)"],
        ],
      },
    ];

    const dustMotes: DustMote[] = Array.from({ length: 12 }, () => {
      const isGold = Math.random() > 0.3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.15,
        alpha: 0,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.25 - 0.1,
        color: isGold ? "rgba(254, 240, 138," : "rgba(110, 231, 183,",
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = Math.max(window.innerHeight, 900);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Efficient Intersection Observer: pauses rendering when off-screen to save GPU
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { rootMargin: "250px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
      mouse.targetIntensity = 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isVisible) return;
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovering = true;
        mouse.targetIntensity = 1;
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetIntensity = 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // ── Optimized Render Loop ──
    const render = () => {
      if (isVisible) {
        time += prefersReducedMotion ? 0.002 : 0.01;

        const prevX = mouse.x;
        const prevY = mouse.y;
        mouse.x += (mouse.targetX - mouse.x) * 0.06;
        mouse.y += (mouse.targetY - mouse.y) * 0.06;
        mouse.vx = mouse.x - prevX;
        mouse.vy = mouse.y - prevY;
        mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.04;

        ctx.clearRect(0, 0, width, height);

        // 1. Deep Emerald Backdrop
        const bgGrad = ctx.createRadialGradient(
          width * 0.55 + Math.sin(time * 0.4) * 60,
          height * 0.42 + Math.cos(time * 0.35) * 40,
          15,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.85
        );
        bgGrad.addColorStop(0, "rgba(3, 44, 30, 0.98)");
        bgGrad.addColorStop(0.45, "rgba(2, 28, 19, 0.99)");
        bgGrad.addColorStop(1, "rgba(1, 16, 11, 1)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. Smooth Minimal Golden Light Reflection
        if (mouse.intensity > 0.01) {
          const lightGlow = ctx.createRadialGradient(
            mouse.x,
            mouse.y,
            0,
            mouse.x,
            mouse.y,
            mouse.radius * (0.8 + mouse.intensity * 0.35)
          );
          lightGlow.addColorStop(0, `rgba(254, 240, 138, ${0.22 * mouse.intensity})`);
          lightGlow.addColorStop(0.3, `rgba(251, 191, 36, ${0.12 * mouse.intensity})`);
          lightGlow.addColorStop(0.65, `rgba(16, 185, 129, ${0.05 * mouse.intensity})`);
          lightGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.save();
          ctx.globalCompositeOperation = "screen";
          ctx.fillStyle = lightGlow;
          ctx.fillRect(0, 0, width, height);
          ctx.restore();
        }

        // 3. Expansive Diagonal Silk Ribbons
        ribbons.forEach((ribbon) => {
          const baseCenterY = height * ribbon.offsetYPercent;
          const segmentCount = 32;
          const stepX = (width + 200) / segmentCount;
          const startX = -100;

          const topPoints: { x: number; y: number }[] = [];
          const bottomPoints: { x: number; y: number }[] = [];

          for (let i = 0; i <= segmentCount; i++) {
            const x = startX + i * stepX;
            const diagonalY = baseCenterY + (x - width * 0.5) * ribbon.slope;
            const wave1 = Math.sin(time * ribbon.speed * 60 + x * ribbon.frequency + ribbon.phase);
            const wave2 = Math.cos(time * ribbon.speed * 36 - x * ribbon.frequency * 0.7 + ribbon.phase * 1.3);
            let yOffset = (wave1 * 0.7 + wave2 * 0.3) * ribbon.amplitude;

            const dx = x - mouse.x;
            const dy = (diagonalY + yOffset) - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < mouse.radius) {
              const influence = 1 - dist / mouse.radius;
              const ease = influence * influence * (3 - 2 * influence);
              const liftY = (mouse.y - (diagonalY + yOffset)) * 0.035 * ease;
              const microGlide = Math.sin(dist * 0.02 - time * 2.0) * 1.5 * ease;
              yOffset += (liftY + microGlide) * mouse.intensity;
            }

            const currentY = diagonalY + yOffset;
            const dynamicThickness = ribbon.thickness * (0.88 + Math.sin(time * 0.6 + x * 0.0018) * 0.18);
            const halfThick = dynamicThickness / 2;

            topPoints.push({ x, y: currentY - halfThick });
            bottomPoints.push({ x, y: currentY + halfThick });
          }

          ctx.save();
          ctx.globalCompositeOperation = ribbon.blendMode;
          ctx.globalAlpha = ribbon.opacity;

          const ribbonGrad = ctx.createLinearGradient(
            0,
            baseCenterY - (width * 0.5) * Math.abs(ribbon.slope) - ribbon.amplitude,
            width,
            baseCenterY + (width * 0.5) * Math.abs(ribbon.slope) + ribbon.amplitude
          );
          ribbon.gradientStops.forEach(([pos, color]) => {
            ribbonGrad.addColorStop(pos, color);
          });

          ctx.fillStyle = ribbonGrad;
          ctx.beginPath();
          ctx.moveTo(topPoints[0].x, topPoints[0].y);

          for (let i = 0; i < topPoints.length - 1; i++) {
            const xc = (topPoints[i].x + topPoints[i + 1].x) / 2;
            const yc = (topPoints[i].y + topPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(topPoints[i].x, topPoints[i].y, xc, yc);
          }
          ctx.lineTo(topPoints[topPoints.length - 1].x, topPoints[topPoints.length - 1].y);

          ctx.lineTo(bottomPoints[bottomPoints.length - 1].x, bottomPoints[bottomPoints.length - 1].y);
          for (let i = bottomPoints.length - 1; i > 0; i--) {
            const xc = (bottomPoints[i].x + bottomPoints[i - 1].x) / 2;
            const yc = (bottomPoints[i].y + bottomPoints[i - 1].y) / 2;
            ctx.quadraticCurveTo(bottomPoints[i].x, bottomPoints[i].y, xc, yc);
          }
          ctx.lineTo(bottomPoints[0].x, bottomPoints[0].y);
          ctx.closePath();
          ctx.fill();

          if (ribbon.hasSpecularRim) {
            ctx.strokeStyle = ribbon.specularColor;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(topPoints[0].x, topPoints[0].y);
            for (let i = 0; i < topPoints.length - 1; i++) {
              const xc = (topPoints[i].x + topPoints[i + 1].x) / 2;
              const yc = (topPoints[i].y + topPoints[i + 1].y) / 2;
              ctx.quadraticCurveTo(topPoints[i].x, topPoints[i].y, xc, yc);
            }
            ctx.stroke();
          }

          ctx.restore();
        });

        // 4. Minimal Ambient Dust Motes
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        dustMotes.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          const pDx = p.x - mouse.x;
          const pDy = p.y - mouse.y;
          const pDist = Math.hypot(pDx, pDy);
          if (pDist < 120) {
            const force = (1 - pDist / 120) * 0.5;
            p.x += (pDx / pDist) * force;
            p.y += (pDy / pDist) * force;
          }

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          p.twinklePhase += p.twinkleSpeed;
          const twinkle = Math.sin(p.twinklePhase) * 0.35 + 0.65;
          p.alpha = p.baseAlpha * twinkle;

          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();

        // 5. Depth Vignette
        const vignette = ctx.createLinearGradient(0, 0, 0, height);
        vignette.addColorStop(0, "rgba(2, 28, 19, 0.35)");
        vignette.addColorStop(0.7, "rgba(0, 0, 0, 0)");
        vignette.addColorStop(1, "rgba(2, 24, 16, 0.85)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center ${className || ""}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100vw",
          minWidth: "100vw",
          height: "100%",
          minHeight: "100%",
        }}
        className="block pointer-events-none"
      />
    </div>
  );
}

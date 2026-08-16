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
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Whisper-soft, ultra-minimal mouse physics
    const mouse = {
      x: width * 0.5,
      y: height * 0.45,
      targetX: width * 0.5,
      targetY: height * 0.45,
      vx: 0,
      vy: 0,
      radius: 280,
      isHovering: false,
      intensity: 0.35,
      targetIntensity: 0.6,
    };

    let time = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── 3 Expansive, Diagonal Silk Waves (Clean, Minimal, Haute Couture) ──
    const ribbons: DiagonalSilkRibbon[] = [
      // 1. Upper Silk Drape — Champagne Gold & Emerald Sheen
      {
        offsetYPercent: 0.28,
        slope: -0.26,
        amplitude: 38,
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
      // 2. Main Center Silk Fold — Deep Imperial Emerald to Liquid 24k Gold
      {
        offsetYPercent: 0.48,
        slope: -0.28,
        amplitude: 48,
        frequency: 0.0014,
        speed: 0.0075,
        thickness: 340,
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
      // 3. Lower Silk Drape — Deep Obsidian Emerald with Warm Amber Glow
      {
        offsetYPercent: 0.70,
        slope: -0.24,
        amplitude: 42,
        frequency: 0.0011,
        speed: 0.0055,
        thickness: 280,
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

    // Minimal floating ambient golden dust motes (only 16 subtle specks)
    const dustMotes: DustMote[] = Array.from({ length: 16 }, () => {
      const isGold = Math.random() > 0.3;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -Math.random() * 0.3 - 0.1,
        color: isGold ? "rgba(254, 240, 138," : "rgba(110, 231, 183,",
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
      mouse.targetIntensity = 1;
    };

    const handleTouchMove = (e: TouchEvent) => {
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
      mouse.targetIntensity = 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // ── Render Loop ──
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += prefersReducedMotion ? 0.002 : 0.01;

      // Ultra-smooth spring damping for cursor (silky fluid inertia)
      const prevX = mouse.x;
      const prevY = mouse.y;
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;
      mouse.vx = mouse.x - prevX;
      mouse.vy = mouse.y - prevY;
      mouse.intensity += (mouse.targetIntensity - mouse.intensity) * 0.04;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // ── 1. Deep Emerald-Obsidian Luxury Backdrop ──
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

      // ── 2. Smooth Minimal Golden Light Reflection under Cursor ──
      if (mouse.intensity > 0.01) {
        const lightGlow = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * (0.8 + mouse.intensity * 0.35)
        );
        // Soft golden specular light reflecting off emerald satin
        lightGlow.addColorStop(0, `rgba(254, 240, 138, ${0.24 * mouse.intensity})`);
        lightGlow.addColorStop(0.3, `rgba(251, 191, 36, ${0.14 * mouse.intensity})`);
        lightGlow.addColorStop(0.65, `rgba(16, 185, 129, ${0.06 * mouse.intensity})`);
        lightGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = lightGlow;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // ── 3. Expansive Diagonal Silk Ribbons ──
      ribbons.forEach((ribbon) => {
        const baseCenterY = height * ribbon.offsetYPercent;
        const segmentCount = 38;
        const stepX = (width + 200) / segmentCount;
        const startX = -100;

        const topPoints: { x: number; y: number }[] = [];
        const bottomPoints: { x: number; y: number }[] = [];

        for (let i = 0; i <= segmentCount; i++) {
          const x = startX + i * stepX;

          // Diagonal Baseline
          const diagonalY = baseCenterY + (x - width * 0.5) * ribbon.slope;

          // Slow, organic harmonic wave folding
          const wave1 = Math.sin(time * ribbon.speed * 60 + x * ribbon.frequency + ribbon.phase);
          const wave2 = Math.cos(time * ribbon.speed * 36 - x * ribbon.frequency * 0.7 + ribbon.phase * 1.3);
          let yOffset = (wave1 * 0.7 + wave2 * 0.3) * ribbon.amplitude;

          // ── Whisper-Soft, Minimal Cursor Silk Interaction ──
          const dx = x - mouse.x;
          const dy = (diagonalY + yOffset) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const influence = 1 - dist / mouse.radius;
            const ease = influence * influence * (3 - 2 * influence);

            // Very gentle organic drape (minimal, barely 4-8px deflection)
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

        // Draw flowing diagonal satin ribbon
        ctx.save();
        ctx.globalCompositeOperation = ribbon.blendMode;
        ctx.globalAlpha = ribbon.opacity;

        // Diagonal gradient matching the satin flow
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

        // Smooth top bezier curve
        for (let i = 0; i < topPoints.length - 1; i++) {
          const xc = (topPoints[i].x + topPoints[i + 1].x) / 2;
          const yc = (topPoints[i].y + topPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(topPoints[i].x, topPoints[i].y, xc, yc);
        }
        ctx.lineTo(topPoints[topPoints.length - 1].x, topPoints[topPoints.length - 1].y);

        // Smooth bottom bezier curve (reverse)
        ctx.lineTo(bottomPoints[bottomPoints.length - 1].x, bottomPoints[bottomPoints.length - 1].y);
        for (let i = bottomPoints.length - 1; i > 0; i--) {
          const xc = (bottomPoints[i].x + bottomPoints[i - 1].x) / 2;
          const yc = (bottomPoints[i].y + bottomPoints[i - 1].y) / 2;
          ctx.quadraticCurveTo(bottomPoints[i].x, bottomPoints[i].y, xc, yc);
        }
        ctx.lineTo(bottomPoints[0].x, bottomPoints[0].y);
        ctx.closePath();
        ctx.fill();

        // ── Specular Golden Rim Light (Lustrous Fold Edge) ──
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

      // ── 4. Minimal Ambient Golden Dust Motes ──
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      dustMotes.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Subtle cursor deflection
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

      // ── 5. Soft Atmospheric Depth Vignette ──
      const vignette = ctx.createLinearGradient(0, 0, 0, height);
      vignette.addColorStop(0, "rgba(2, 28, 19, 0.35)");
      vignette.addColorStop(0.7, "rgba(0, 0, 0, 0)");
      vignette.addColorStop(1, "rgba(2, 24, 16, 0.85)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    let lastFrameTime = 0;
    const targetInterval = 1000 / 60; // 60fps cap for cool, battery-friendly rendering

    const throttledRender = (timestamp: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(throttledRender);
        return;
      }

      const elapsed = timestamp - lastFrameTime;
      if (elapsed >= targetInterval) {
        lastFrameTime = timestamp - (elapsed % targetInterval);
        render();
      } else {
        animationFrameId = requestAnimationFrame(throttledRender);
      }
    };

    animationFrameId = requestAnimationFrame(throttledRender);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 contain-strict ${className || ""}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block transform-gpu"
      />
    </div>
  );
}


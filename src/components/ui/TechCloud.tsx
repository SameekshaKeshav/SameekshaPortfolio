"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

/**
 * The rotating "tech cloud" sphere — ported from the previous portfolio's
 * TechStack.tsx (Fibonacci-sphere tag distribution + rAF rotation, nudged by
 * pointer/touch position). Kept by explicit user request ("keep the cool
 * parts... like the turning cloud for skills").
 *
 * Pure CSS 3D-transform math + requestAnimationFrame — no WebGL/three.js.
 * Falls back to a static wrapped tag list when the visitor prefers reduced
 * motion, since the spinning interaction is purely decorative.
 */

function fibonacciSphere(n: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    points.push([Math.cos(phi) * r, y, Math.sin(phi) * r]);
  }
  return points;
}

interface TechCloudProps {
  labels: string[];
  onSelect?: (label: string) => void;
}

export default function TechCloud({ labels, onSelect }: TechCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<(HTMLButtonElement | null)[]>([]);
  // Starts false on both server and first client render (avoids hydration
  // mismatch); flipped to true post-mount if the visitor prefers reduced
  // motion, which swaps the layout to a static flex-wrap via CSS class only.
  const [isStatic, setIsStatic] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsStatic(true);
      return;
    }

    const base = fibonacciSphere(labels.length);
    const getRadius = () =>
      Math.max(90, Math.min(window.innerWidth * 0.24, 230));
    let radius = getRadius();
    const onResize = () => {
      radius = getRadius();
    };
    window.addEventListener("resize", onResize);

    let rotX = -0.3;
    let rotY = 0;
    let velX = 0.0005;
    let velY = 0.0013;
    let targetVelX = velX;
    let targetVelY = velY;

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetVelY = dx * 0.018;
      targetVelX = -dy * 0.018;
    };
    const onLeave = () => {
      targetVelX = 0.0005;
      targetVelY = 0.0013;
    };
    const onTouchMove = (e: TouchEvent) => {
      const el = containerRef.current;
      if (!el || !e.touches[0]) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.touches[0].clientX - cx) / rect.width;
      const dy = (e.touches[0].clientY - cy) / rect.height;
      targetVelY = dx * 0.018;
      targetVelX = -dy * 0.018;
    };

    const el = containerRef.current;
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    el?.addEventListener("touchmove", onTouchMove, { passive: true });
    el?.addEventListener("touchend", onLeave);

    let raf = 0;
    const render = () => {
      velX += (targetVelX - velX) * 0.05;
      velY += (targetVelY - velY) * 0.05;
      rotX += velX;
      rotY += velY;

      const sinX = Math.sin(rotX);
      const cosX = Math.cos(rotX);
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);

      for (let i = 0; i < base.length; i++) {
        const [bx, by, bz] = base[i];
        const x1 = bx * cosY - bz * sinY;
        const z1 = bx * sinY + bz * cosY;
        const y2 = by * cosX - z1 * sinX;
        const z2 = by * sinX + z1 * cosX;

        const px = x1 * radius;
        const py = y2 * radius;
        const depth = (z2 + 1) / 2;
        const scale = 0.55 + depth * 0.6;
        const opacity = 0.3 + depth * 0.7;

        const tag = tagsRef.current[i];
        if (tag) {
          tag.style.transform = `translate(-50%, -50%) translate3d(${px}px, ${py}px, 0) scale(${scale})`;
          tag.style.opacity = `${opacity}`;
          tag.style.zIndex = `${Math.round(depth * 100)}`;
          tag.style.filter = depth < 0.4 ? "blur(1px)" : "none";
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
      el?.removeEventListener("touchmove", onTouchMove);
      el?.removeEventListener("touchend", onLeave);
    };
  }, [labels]);

  return (
    <div
      className={`tech-sphere ${isStatic ? "is-static" : ""}`}
      ref={containerRef}
    >
      {labels.map((label, i) => (
        <button
          type="button"
          key={label}
          ref={(el) => {
            tagsRef.current[i] = el;
          }}
          className="tech-tag"
          onClick={() => onSelect?.(label)}
        >
          {label}
        </button>
      ))}

      <style jsx>{`
        .tech-sphere {
          position: relative;
          width: 100%;
          height: clamp(280px, 38vw, 460px);
        }

        .tech-tag {
          position: absolute;
          top: 50%;
          left: 50%;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          white-space: nowrap;
          padding: 7px 13px;
          border-radius: 999px;
          background: var(--card);
          box-shadow: inset 0 0 0 1px var(--line);
          will-change: transform, opacity;
        }

        .tech-tag:hover,
        .tech-tag:focus-visible {
          box-shadow: inset 0 0 0 1px var(--ink);
        }

        /* Reduced-motion fallback: same markup, flowed layout instead of the
           absolutely-positioned, rAF-driven sphere. */
        .tech-sphere.is-static {
          height: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          max-width: 560px;
        }

        .tech-sphere.is-static .tech-tag {
          position: static;
          transform: none !important;
          opacity: 1 !important;
          filter: none !important;
        }
      `}</style>
    </div>
  );
}

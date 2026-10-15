"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * True while `ref` is intersecting the viewport (by `threshold`).
 * Pass `once` to stop observing after the first time it becomes true —
 * used for one-shot entrance animations.
 */
export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  options?: IntersectionObserverInit & { once?: boolean }
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once) observer.disconnect();
        } else if (!options?.once) {
          setInView(false);
        }
      },
      { threshold: 0.2, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return inView;
}

/**
 * 0→1 progress of how far the viewport has scrolled through `ref`'s element,
 * measured from the moment its top enters the viewport bottom, to the moment
 * its bottom leaves the viewport top. Driven by rAF + scroll/resize listeners
 * (not GSAP) so it stays in sync with Lenis's virtual scroll.
 */
export function useScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = rect.height + vh;
      const traveled = vh - rect.top;
      const p = Math.min(1, Math.max(0, traveled / total));
      setProgress(p);
      rafRef.current = requestAnimationFrame(compute);
    };

    rafRef.current = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ref]);

  return progress;
}

/**
 * Progress (0→1) of scrolling through a tall "pin" container whose height
 * is several viewports tall. 0 while the container's top hasn't reached the
 * viewport top yet; 1 once its bottom reaches the viewport bottom. Used to
 * drive a sticky inner track's horizontal translateX — the CSS/rAF
 * equivalent of a GSAP ScrollTrigger pin, without the dependency.
 */
export function usePinnedScrollProgress<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const scrollableDistance = Math.max(1, rect.height - vh);
      const traveled = Math.min(scrollableDistance, Math.max(0, -rect.top));
      setProgress(traveled / scrollableDistance);
      rafRef.current = requestAnimationFrame(compute);
    };

    rafRef.current = requestAnimationFrame(compute);
    return () => cancelAnimationFrame(rafRef.current);
  }, [ref]);

  return progress;
}

/**
 * Counts up from 0 to `target` over `durationMs`, easeOutQuart, starting the
 * first time `trigger` becomes true. Returns the live, rounded-to-`decimals` value.
 */
export function useCountUp(
  target: number,
  trigger: boolean,
  durationMs = 1400,
  decimals = 0
) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!trigger || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    const start = performance.now();
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = easeOutQuart(t);
      setValue(Number((target * eased).toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, durationMs, decimals]);

  return value;
}

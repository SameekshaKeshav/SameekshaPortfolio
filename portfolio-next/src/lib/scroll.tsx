"use client";

import Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type PropsWithChildren,
} from "react";
import { prefersReducedMotion } from "./hooks";

interface ScrollContextValue {
  lenis: Lenis | null;
  scrollToTarget: (target: string | HTMLElement, offset?: number) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollToTarget: () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

/**
 * Mounts Lenis smooth scrolling for the whole page. Disabled automatically
 * when the visitor prefers reduced motion — native scroll takes over.
 */
export function ScrollProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.documentElement.classList.add("lenis-active");

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToTarget = (target: string | HTMLElement, offset = -76) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.1 });
      return;
    }
    // Reduced-motion / fallback path: plain native scroll.
    const el =
      typeof target === "string" ? document.querySelector(target) : target;
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  return (
    <ScrollContext.Provider value={{ lenis: lenisRef.current, scrollToTarget }}>
      {children}
    </ScrollContext.Provider>
  );
}

/** Scroll-progress bar fraction (0–1), updated via rAF against Lenis or native scroll. */
export function getPageScrollProgress(): number {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - doc.clientHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

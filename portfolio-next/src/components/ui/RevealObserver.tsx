"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/hooks";

/**
 * Mounted once near the root. Watches every `.rv` / `.rv-mask` element in the
 * document, adds `.is-in` the first time it scrolls into view (fade + rise,
 * or mask-line-slide via CSS — see globals.css), then stops observing it.
 * A MutationObserver picks up elements added later (accordion panels, etc).
 */
export default function RevealObserver() {
  useEffect(() => {
    if (prefersReducedMotion()) {
      document
        .querySelectorAll<HTMLElement>(".rv, .rv-mask")
        .forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>(".rv, .rv-mask").forEach((el) => {
        if (!el.classList.contains("is-in")) io.observe(el);
      });
    };

    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScrollContext, getPageScrollProgress } from "@/lib/scroll";
import { prefersReducedMotion } from "@/lib/hooks";

export default function Navigation() {
  const { scrollToTarget } = useScrollContext();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(NAV[0].href);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });

  const listRef = useRef<HTMLUListElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  // Scroll state: frosted pill + progress bar.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setProgress(getPageScrollProgress());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking.
  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      (el): el is Element => !!el
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Indicator pill position, follows `active`.
  useEffect(() => {
    const update = () => {
      const el = linkRefs.current[active];
      const list = listRef.current;
      if (!el || !list) return;
      const listRect = list.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setIndicator({
        left: elRect.left - listRect.left,
        width: elRect.width,
        ready: true,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  // Mobile menu: lock scroll + Esc to close.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setActive(href);
    setMenuOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <header className={`nav-root ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner">
          <a
            href="#"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget(document.body, 0);
              setActive(NAV[0].href);
            }}
            aria-label={`${PROFILE.name} — back to top`}
          >
            <span className={`mark ${scrolled ? "mark-solid" : ""}`}>
              {PROFILE.initials}
            </span>
            <span className={`full-name ${scrolled ? "name-hidden" : ""}`}>
              {PROFILE.name}
            </span>
          </a>

          <nav className={`nav-pill ${scrolled ? "pill-glass" : ""}`} aria-label="Primary">
            <ul ref={listRef}>
              {indicator.ready && (
                <li
                  className="indicator"
                  style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width,
                  }}
                  aria-hidden="true"
                />
              )}
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    ref={(el) => {
                      linkRefs.current[item.href] = el;
                    }}
                    href={item.href}
                    className={active === item.href ? "is-active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`mobile-overlay ${menuOpen ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <ol>
          {NAV.map((item, i) => (
            <li
              key={item.href}
              style={{
                transitionDelay:
                  menuOpen && !prefersReducedMotion() ? `${i * 60}ms` : "0ms",
              }}
            >
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{`
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--ink);
          transform-origin: left;
          z-index: 70;
          transition: transform 0.1s linear;
        }

        .nav-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 60;
          padding: 18px var(--gutter) 0;
          box-sizing: border-box;
        }

        .nav-inner {
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .mark {
          flex: none;
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1.5px solid var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: background-color 0.4s var(--ease), color 0.4s var(--ease),
            transform 0.6s var(--ease);
        }

        .brand:hover .mark {
          transform: rotate(360deg);
        }

        .mark-solid {
          background: var(--ink);
          color: var(--paper);
        }

        .full-name {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          white-space: nowrap;
          opacity: 1;
          max-width: 200px;
          overflow: hidden;
          transition: opacity 0.4s var(--ease), max-width 0.4s var(--ease);
        }

        .name-hidden {
          opacity: 0;
          max-width: 0;
        }

        .nav-pill {
          display: none;
          border-radius: 999px;
          padding: 6px;
          transition: background-color 0.4s var(--ease), box-shadow 0.4s var(--ease),
            backdrop-filter 0.4s var(--ease);
        }

        @media (min-width: 860px) {
          .nav-pill {
            display: block;
          }
        }

        .pill-glass {
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 0 0 1px var(--line), 0 10px 30px -14px rgba(13, 13, 13, 0.25);
        }

        .nav-pill ul {
          position: relative;
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-pill a {
          position: relative;
          z-index: 2;
          display: inline-flex;
          padding: 9px 18px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--ink-2);
          border-radius: 999px;
          transition: color 0.3s var(--ease);
          white-space: nowrap;
        }

        .nav-pill a.is-active {
          color: var(--paper);
        }

        .indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--ink);
          border-radius: 999px;
          z-index: 1;
          transition: transform 0.45s var(--ease), width 0.45s var(--ease);
        }

        .menu-toggle {
          display: inline-flex;
          padding: 10px 18px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: var(--card);
          font-size: 13px;
          font-weight: 600;
        }

        @media (min-width: 860px) {
          .menu-toggle {
            display: none;
          }
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 80;
          background: var(--paper);
          padding: calc(var(--nav-h) + 16px) var(--gutter) 40px;
          box-sizing: border-box;
          clip-path: circle(0% at calc(100% - 44px) 40px);
          transition: clip-path 0.6s var(--ease);
          pointer-events: none;
        }

        .mobile-overlay.is-open {
          clip-path: circle(150% at calc(100% - 44px) 40px);
          pointer-events: auto;
        }

        .mobile-overlay ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-overlay li {
          display: flex;
          align-items: baseline;
          gap: 16px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s var(--ease), transform 0.5s var(--ease);
          border-bottom: 1px solid var(--line);
          padding: 18px 0;
        }

        .mobile-overlay.is-open li {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-overlay .num {
          font-family: var(--font-mono), monospace;
          font-size: 13px;
          color: var(--faint);
        }

        .mobile-overlay a {
          font-size: clamp(28px, 8vw, 40px);
          font-weight: 700;
          letter-spacing: -0.03em;
        }

        @media (min-width: 860px) {
          .mobile-overlay {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

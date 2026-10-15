"use client";

import Image from "next/image";
import { PROFILE } from "@/lib/data";
import { useScrollContext } from "@/lib/scroll";

export default function Hero() {
  const { scrollToTarget } = useScrollContext();

  return (
    <section className="hero" aria-label="Introduction">
      <span className="ghost-name" aria-hidden="true">
        {PROFILE.firstName}
      </span>

      <div className="hero-inner section-shell">
        <div className="hero-copy">
          <p className="eyebrow rv" style={{ ["--i" as string]: 0 }}>
            {PROFILE.location} · Open to full-time software & data roles
          </p>

          <h1 className="hero-title">
            <span className="rv-mask" style={{ ["--i" as string]: 1 }}>
              <span>{PROFILE.name}</span>
            </span>
          </h1>

          <p className="hero-role rv" style={{ ["--i" as string]: 2 }}>
            {PROFILE.roleLine} <span className="accent-italic">in training.</span>
          </p>

          <p className="hero-summary rv" style={{ ["--i" as string]: 3 }}>
            {PROFILE.resumeSummaryExtra}
          </p>

          <div className="hero-actions rv" style={{ ["--i" as string]: 4 }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => scrollToTarget("#work")}
            >
              View selected work
            </button>
            <a href={PROFILE.resume} className="btn btn-ghost" download>
              Download résumé
            </a>
          </div>
        </div>

        <div className="hero-portrait rv" style={{ ["--i" as string]: 2 }}>
          <div className="portrait-frame">
            <Image
              src={PROFILE.heroImage}
              alt={`Illustrated portrait of ${PROFILE.name}`}
              width={768}
              height={960}
              priority
              sizes="(max-width: 860px) 70vw, 360px"
            />
          </div>
        </div>
      </div>

      <button
        type="button"
        className="scroll-cue"
        onClick={() => scrollToTarget("#about")}
        aria-label="Scroll to About section"
      >
        <span className="cue-line" aria-hidden="true" />
        Scroll
      </button>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: var(--nav-h);
          overflow: hidden;
        }

        .ghost-name {
          position: absolute;
          left: 50%;
          top: 52%;
          transform: translate(-50%, -50%);
          font-size: clamp(90px, 22vw, 320px);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 1;
          white-space: nowrap;
          color: transparent;
          -webkit-text-stroke: 1px var(--line);
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }

        @media (min-width: 860px) {
          .hero-inner {
            grid-template-columns: 1.15fr 0.85fr;
            gap: 32px;
          }
        }

        .eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mute);
          margin: 0 0 20px;
        }

        .hero-title {
          font-size: clamp(38px, 7vw, 76px);
          margin: 0 0 18px;
        }

        .hero-role {
          font-size: clamp(18px, 2.2vw, 24px);
          color: var(--ink-2);
          margin: 0 0 16px;
          max-width: 46ch;
        }

        .hero-summary {
          font-size: 15px;
          color: var(--mute);
          max-width: 48ch;
          margin: 0 0 32px;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .hero-portrait {
          display: flex;
          justify-content: center;
        }

        .portrait-frame {
          width: min(320px, 64vw);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: inset 0 0 0 1px var(--line), 0 40px 80px -30px rgba(13, 13, 13, 0.25);
          background: var(--card);
        }

        .portrait-frame :global(img) {
          width: 100%;
          height: auto;
        }

        .scroll-cue {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--mute);
          z-index: 1;
        }

        .cue-line {
          width: 1px;
          height: 36px;
          background: linear-gradient(var(--mute), transparent);
          animation: cue-fall 1.8s var(--ease) infinite;
        }

        @keyframes cue-fall {
          0% {
            transform: scaleY(0.2);
            transform-origin: top;
            opacity: 0.4;
          }
          50% {
            transform: scaleY(1);
            transform-origin: top;
            opacity: 1;
          }
          51% {
            transform-origin: bottom;
          }
          100% {
            transform: scaleY(0.2);
            transform-origin: bottom;
            opacity: 0.4;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cue-line {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ID_CARD, PROFILE, QUICK_FACTS, QUOTE, SECTION_TAGS } from "@/lib/data";

export default function About() {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleFlip = () => setFlipped((v) => !v);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  return (
    <section id="about" className="about section-pad" aria-labelledby="about-heading">
      <div className="section-shell about-grid">
        <div className="about-copy">
          <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
            {SECTION_TAGS.about}
          </p>
          <h2 id="about-heading" className="heading-xl rv-mask" style={{ ["--i" as string]: 1 }}>
            <span>
              Engineer by trade, <span className="accent-italic">researcher</span> by habit.
            </span>
          </h2>

          <p className="about-summary rv" style={{ ["--i" as string]: 2 }}>
            {PROFILE.resumeSummary}
          </p>

          <blockquote className="about-quote rv" style={{ ["--i" as string]: 3 }}>
            “{QUOTE}”
          </blockquote>

          <dl className="quick-facts rv" style={{ ["--i" as string]: 4 }}>
            {QUICK_FACTS.map((fact) => (
              <div key={fact.label} className="fact-row">
                <dt>{fact.label}</dt>
                <dd>
                  {"href" in fact && fact.href ? (
                    <a href={fact.href}>{fact.value}</a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lanyard rv" style={{ ["--i" as string]: 3 }}>
          <div className="strap" aria-hidden="true">
            <div className="clip" />
          </div>

          <div
            ref={cardRef}
            className={`id-card ${flipped ? "is-flipped" : ""}`}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
            aria-label={
              flipped
                ? "Showing back of ID card. Press to flip to front."
                : "Showing front of ID card. Press to flip for more."
            }
            onClick={toggleFlip}
            onKeyDown={onKeyDown}
          >
            <div className="card-face card-front">
              <div className="card-hole" aria-hidden="true" />
              <div className="card-photo">
                <Image
                  src={PROFILE.portraitBust}
                  alt=""
                  width={480}
                  height={600}
                  sizes="220px"
                />
              </div>
              <div className="card-body">
                <p className="card-name">{PROFILE.name}</p>
                <p className="card-role">{PROFILE.role}</p>
                <p className="card-dept">{ID_CARD.department}</p>
                <div className="card-meta">
                  <span>ID {ID_CARD.idNumber}</span>
                  <span>Valid thru {ID_CARD.validThru}</span>
                </div>
              </div>
              <span className="flip-hint">Tap to flip ↻</span>
            </div>

            <div className="card-face card-back">
              <div className="card-hole" aria-hidden="true" />
              <p className="back-title">What I am</p>
              <ul className="back-list">
                {ID_CARD.whatIAm.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <p className="back-sign">{ID_CARD.signOff}</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 72px;
          align-items: start;
        }

        @media (min-width: 960px) {
          .about-grid {
            grid-template-columns: 1.3fr 0.7fr;
            gap: 48px;
          }
        }

        .about-summary {
          font-size: 17px;
          line-height: 1.7;
          color: var(--ink-2);
          max-width: 62ch;
          margin: 0 0 28px;
        }

        .about-quote {
          font-family: var(--font-serif), serif;
          font-style: italic;
          font-size: clamp(19px, 2.2vw, 24px);
          color: var(--mute);
          border-left: 2px solid var(--line);
          padding-left: 20px;
          margin: 0 0 36px;
          max-width: 56ch;
        }

        .quick-facts {
          display: grid;
          gap: 14px;
          margin: 0;
          max-width: 56ch;
        }

        .fact-row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 16px;
          padding: 14px 0;
          border-top: 1px solid var(--line);
          font-size: 14px;
        }

        .fact-row dt {
          color: var(--mute);
        }

        .fact-row dd {
          margin: 0;
          font-weight: 500;
        }

        .lanyard {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 8px;
        }

        .strap {
          width: 26px;
          height: 56px;
          background: repeating-linear-gradient(
            135deg,
            var(--ink) 0 6px,
            var(--ink-2) 6px 12px
          );
          border-radius: 4px;
          position: relative;
        }

        .clip {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 12px;
          background: var(--faint);
          border-radius: 3px;
        }

        .id-card {
          --sway: 0deg;
          width: min(260px, 72vw);
          aspect-ratio: 5 / 7.2;
          margin-top: -2px;
          perspective: 1400px;
          transform-style: preserve-3d;
          cursor: pointer;
          animation: pendulum 6.5s ease-in-out infinite;
          transform-origin: top center;
        }

        .id-card:hover,
        .id-card:focus-visible {
          animation-play-state: paused;
        }

        @keyframes pendulum {
          0%,
          100% {
            transform: rotate(-2.2deg);
          }
          50% {
            transform: rotate(2.2deg);
          }
        }

        .card-face {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: var(--card);
          box-shadow: inset 0 0 0 1px var(--line), 0 24px 50px -20px rgba(13, 13, 13, 0.3);
          backface-visibility: hidden;
          transform-style: preserve-3d;
          transform: rotateY(0deg);
          transition: transform 0.7s var(--ease);
          padding: 28px 20px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .card-back {
          transform: rotateY(180deg);
          align-items: flex-start;
          text-align: left;
          justify-content: center;
          gap: 12px;
        }

        .id-card.is-flipped .card-front {
          transform: rotateY(180deg);
        }

        .id-card.is-flipped .card-back {
          transform: rotateY(360deg);
        }

        .card-hole {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 34px;
          height: 8px;
          border-radius: 999px;
          background: var(--paper);
          box-shadow: inset 0 0 0 1px var(--line);
        }

        .card-photo {
          width: 86px;
          height: 108px;
          border-radius: 10px;
          overflow: hidden;
          margin: 20px 0 14px;
          box-shadow: inset 0 0 0 1px var(--line);
        }

        .card-photo :global(img) {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-name {
          font-weight: 700;
          font-size: 15px;
          letter-spacing: -0.02em;
          margin: 0 0 2px;
        }

        .card-role {
          font-size: 12px;
          color: var(--mute);
          margin: 0 0 10px;
        }

        .card-dept {
          font-size: 11px;
          font-family: var(--font-mono), monospace;
          color: var(--faint);
          margin: 0 0 16px;
        }

        .card-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 10px;
          font-family: var(--font-mono), monospace;
          color: var(--mute);
          border-top: 1px dashed var(--line);
          padding-top: 10px;
          width: 100%;
        }

        .flip-hint {
          margin-top: auto;
          font-size: 10px;
          color: var(--faint);
          font-family: var(--font-mono), monospace;
        }

        .back-title {
          font-size: 11px;
          font-family: var(--font-mono), monospace;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--faint);
          margin: 18px 0 2px;
        }

        .back-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 8px;
          font-size: 11.5px;
          color: var(--ink-2);
          line-height: 1.4;
        }

        .back-list li {
          padding-left: 14px;
          position: relative;
        }

        .back-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: var(--mute);
        }

        .back-sign {
          font-size: 10px;
          color: var(--faint);
          font-family: var(--font-mono), monospace;
          margin: 16px 0 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .id-card {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

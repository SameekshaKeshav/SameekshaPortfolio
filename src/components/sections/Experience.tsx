"use client";

import { useRef } from "react";
import { SECTION_TAGS, TIMELINE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

export default function Experience() {
  const spineRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(spineRef);

  return (
    <section
      id="experience"
      className="experience section-pad"
      aria-labelledby="experience-heading"
    >
      <div className="section-shell">
        <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
          {SECTION_TAGS.experience}
        </p>
        <h2
          id="experience-heading"
          className="heading-xl rv-mask"
          style={{ ["--i" as string]: 1 }}
        >
          <span>
            Six jobs, two degrees, <span className="accent-italic">one path.</span>
          </span>
        </h2>

        <div className="timeline" ref={spineRef}>
          <div className="spine">
            <div
              className="spine-fill"
              style={{ transform: `scaleY(${progress})` }}
              aria-hidden="true"
            />
          </div>

          <ol>
            {TIMELINE.map((stop, i) => (
              <li className="stop rv" style={{ ["--i" as string]: i % 4 }} key={`${stop.title}-${stop.year}`}>
                <span className={`dot ${stop.kind}`} aria-hidden="true" />
                <div className="stop-head">
                  <span className="stop-year">{stop.year}</span>
                  <span className={`stop-kind ${stop.kind}`}>
                    {stop.kind === "education" ? "Education" : "Experience"}
                  </span>
                </div>
                <h3 className="stop-title">{stop.title}</h3>
                <p className="stop-place">{stop.place}</p>
                <p className="stop-detail">{stop.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style jsx>{`
        .timeline {
          position: relative;
          margin-top: 48px;
          padding-left: 32px;
        }

        @media (min-width: 640px) {
          .timeline {
            padding-left: 44px;
          }
        }

        .spine {
          position: absolute;
          top: 6px;
          bottom: 6px;
          left: 6px;
          width: 1px;
          background: var(--line);
        }

        .spine-fill {
          width: 100%;
          height: 100%;
          background: var(--ink);
          transform-origin: top;
          transform: scaleY(0);
        }

        ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 48px;
        }

        .stop {
          position: relative;
        }

        .dot {
          position: absolute;
          left: -32px;
          top: 4px;
          width: 11px;
          height: 11px;
          border-radius: 999px;
          background: var(--paper);
          box-shadow: inset 0 0 0 1.5px var(--ink);
        }

        @media (min-width: 640px) {
          .dot {
            left: -44px;
          }
        }

        .dot.education {
          background: var(--ink);
        }

        .stop-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .stop-year {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--faint);
        }

        .stop-kind {
          font-family: var(--font-mono), monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 3px 9px;
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px var(--line);
          color: var(--mute);
        }

        .stop-kind.education {
          color: var(--ink);
          box-shadow: inset 0 0 0 1px var(--ink);
        }

        .stop-title {
          font-size: clamp(18px, 2.2vw, 22px);
          margin: 0 0 4px;
        }

        .stop-place {
          font-size: 14px;
          color: var(--ink-2);
          margin: 0 0 8px;
        }

        .stop-detail {
          font-size: 13.5px;
          color: var(--mute);
          max-width: 60ch;
          margin: 0;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}

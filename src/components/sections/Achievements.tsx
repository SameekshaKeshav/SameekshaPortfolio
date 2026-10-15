"use client";

import { useEffect, useRef, useState } from "react";
import { ACHIEVEMENTS, SECTION_TAGS, type Achievement } from "@/lib/data";
import TechLogo from "@/components/ui/TechLogo";
import { useCountUp, useInView, usePinnedScrollProgress } from "@/lib/hooks";

function AchievementCard({ item, active }: { item: Achievement; active: boolean }) {
  const value = useCountUp(item.value, active, 1200, item.decimals ?? 0);

  return (
    <article className="card achievement-card">
      <div className="card-icon">
        {item.logo ? (
          <TechLogo logoSlug={item.logo} size={36} />
        ) : (
          <TechLogo glyph={item.glyph} size={32} />
        )}
      </div>
      <p className="card-index">{item.index}</p>
      <p className="card-value">
        {item.prefix}
        {value}
        {item.suffix}
      </p>
      <h3 className="card-label">{item.label}</h3>
      <p className="card-caption">{item.caption}</p>
      <p className="card-detail">{item.detail}</p>

      <style jsx>{`
        .achievement-card {
          flex: none;
          width: min(300px, 78vw);
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px var(--line);
          margin-bottom: 18px;
          color: var(--ink-2);
        }

        .card-index {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          color: var(--faint);
          margin: 0 0 10px;
        }

        .card-value {
          font-size: clamp(34px, 5vw, 46px);
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0 0 10px;
        }

        .card-label {
          font-size: 16px;
          margin: 0 0 4px;
        }

        .card-caption {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          color: var(--mute);
          margin: 0 0 12px;
        }

        .card-detail {
          font-size: 13px;
          color: var(--ink-2);
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </article>
  );
}

export default function Achievements() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);

  const progress = usePinnedScrollProgress(outerRef);
  const inView = useInView(outerRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setMaxShift(Math.max(0, track.scrollWidth - window.innerWidth + 1));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const extraScrollPx = maxShift + 320;

  return (
    <section
      id="achievements"
      className="achievements"
      aria-labelledby="achievements-heading"
      ref={outerRef}
      style={{ height: `calc(100vh + ${extraScrollPx}px)` }}
    >
      <div className="pin-sticky">
        <div className="pin-head section-shell">
          <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
            {SECTION_TAGS.achievements}
          </p>
          <h2
            id="achievements-heading"
            className="heading-lg rv-mask"
            style={{ ["--i" as string]: 1 }}
          >
            <span>
              Six numbers worth <span className="accent-italic">mentioning.</span>
            </span>
          </h2>
        </div>

        <div
          className="track"
          ref={trackRef}
          style={{ transform: `translateX(-${progress * maxShift}px)` }}
        >
          <span className="track-spacer" aria-hidden="true" />
          {ACHIEVEMENTS.map((item) => (
            <AchievementCard item={item} active={inView} key={item.label} />
          ))}
          <span className="track-spacer" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .achievements {
          position: relative;
        }

        .pin-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 40px;
          overflow: hidden;
        }

        .pin-head {
          flex: none;
        }

        .track {
          display: flex;
          align-items: stretch;
          gap: 20px;
          width: max-content;
          will-change: transform;
          padding-left: var(--gutter);
        }

        .track-spacer {
          flex: none;
          width: 1px;
        }
      `}</style>
    </section>
  );
}

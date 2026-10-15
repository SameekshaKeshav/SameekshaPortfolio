"use client";

import { useState } from "react";
import { PROJECTS, SECTION_TAGS } from "@/lib/data";
import MiniUI from "@/components/ui/MiniUI";

export default function Work() {
  const [openId, setOpenId] = useState<string>(PROJECTS[0].id);

  return (
    <section id="work" className="work section-pad" aria-labelledby="work-heading">
      <div className="section-shell">
        <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
          {SECTION_TAGS.work}
        </p>
        <h2 id="work-heading" className="heading-xl rv-mask" style={{ ["--i" as string]: 1 }}>
          <span>
            Eight projects, <span className="accent-italic">zero fluff.</span>
          </span>
        </h2>

        <div className="accordion rv" style={{ ["--i" as string]: 2 }}>
          {PROJECTS.map((project) => {
            const isOpen = openId === project.id;
            return (
              <div className={`row ${isOpen ? "is-open" : ""}`} key={project.id}>
                <button
                  type="button"
                  className="row-head"
                  aria-expanded={isOpen}
                  aria-controls={`panel-${project.id}`}
                  onClick={() => setOpenId(isOpen ? "" : project.id)}
                >
                  <span className="row-index">{project.index}</span>
                  <span className="row-title">{project.title}</span>
                  <span className="row-kicker">{project.kicker}</span>
                  <span className="row-chevron" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </button>

                <div
                  id={`panel-${project.id}`}
                  className="row-panel"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="panel-inner">
                    <div className="panel-text">
                      <p className="panel-description">{project.description}</p>
                      <ul className="panel-features">
                        {project.features.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                      <div className="panel-tech">
                        {project.tech.map((t) => (
                          <span className="tech-pill" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost panel-link"
                        >
                          {project.linkLabel ?? "View project ↗"}
                        </a>
                      )}
                    </div>
                    <div className="panel-illustration card">
                      <MiniUI kind={project.illustration} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .accordion {
          border-top: 1px solid var(--line);
        }

        .row {
          border-bottom: 1px solid var(--line);
        }

        .row-head {
          width: 100%;
          display: grid;
          grid-template-columns: 36px 1fr auto 24px;
          align-items: center;
          gap: 16px;
          padding: 22px 4px;
          text-align: left;
        }

        @media (max-width: 640px) {
          .row-head {
            grid-template-columns: 28px 1fr 24px;
          }
          .row-kicker {
            display: none;
          }
        }

        .row-index {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--faint);
        }

        .row-title {
          font-size: clamp(17px, 2vw, 20px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .row-kicker {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          color: var(--mute);
          white-space: nowrap;
        }

        .row-chevron {
          font-size: 20px;
          color: var(--mute);
          text-align: center;
          transition: transform 0.3s var(--ease);
        }

        .row.is-open .row-chevron {
          transform: rotate(180deg);
        }

        .row-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.55s var(--ease);
        }

        .row.is-open .row-panel {
          grid-template-rows: 1fr;
        }

        .panel-inner {
          overflow: hidden;
        }

        .row-panel > .panel-inner {
          min-height: 0;
        }

        .panel-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          padding: 4px 4px 32px;
        }

        @media (min-width: 760px) {
          .panel-inner {
            grid-template-columns: 1.3fr 1fr;
            gap: 36px;
          }
        }

        .panel-description {
          font-size: 15px;
          color: var(--ink-2);
          line-height: 1.6;
          margin: 0 0 16px;
          max-width: 56ch;
        }

        .panel-features {
          margin: 0 0 20px;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
        }

        .panel-features li {
          font-size: 13.5px;
          color: var(--ink-2);
          padding-left: 16px;
          position: relative;
        }

        .panel-features li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 8px;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: var(--mute);
        }

        .panel-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tech-pill {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          padding: 6px 12px;
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px var(--line);
          color: var(--mute);
        }

        .panel-illustration {
          min-height: 140px;
          height: 100%;
        }
      `}</style>
    </section>
  );
}

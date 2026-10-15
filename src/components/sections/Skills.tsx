"use client";

import { useMemo, useRef, useState } from "react";
import { SECTION_TAGS, SKILL_FAMILIES, SKILL_GROUPS, type Skill } from "@/lib/data";
import TechLogo, { CONCEPT_GLYPH_BY_SKILL, isBrand } from "@/components/ui/TechLogo";
import TechCloud from "@/components/ui/TechCloud";
import { useInView } from "@/lib/hooks";

type FamilyFilter = "All" | Skill["family"];

export default function Skills() {
  const [family, setFamily] = useState<FamilyFilter>("All");
  const [selected, setSelected] = useState<Skill>(SKILL_GROUPS[0]);
  const [view, setView] = useState<"table" | "cloud">("table");

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, threshold: 0.05 });

  const filtered = useMemo(
    () => (family === "All" ? SKILL_GROUPS : SKILL_GROUPS.filter((s) => s.family === family)),
    [family]
  );

  const cols = 6; // approximate column count used only for the diagonal stagger

  const selectSkill = (skill: Skill) => setSelected(skill);
  const selectByName = (name: string) => {
    const skill = SKILL_GROUPS.find((s) => s.name === name);
    if (skill) setSelected(skill);
  };

  return (
    <section id="skills" className="skills section-pad" aria-labelledby="skills-heading">
      <div className="section-shell">
        <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
          {SECTION_TAGS.skills}
        </p>
        <h2 id="skills-heading" className="heading-xl rv-mask" style={{ ["--i" as string]: 1 }}>
          <span>
            Thirty-six tools, <span className="accent-italic">one stack.</span>
          </span>
        </h2>

        <div className="skills-controls rv" style={{ ["--i" as string]: 2 }}>
          <div className="chips" role="group" aria-label="Filter skills by family">
            <button
              type="button"
              className={family === "All" ? "chip is-active" : "chip"}
              onClick={() => setFamily("All")}
            >
              All
            </button>
            {SKILL_FAMILIES.map((f) => (
              <button
                key={f}
                type="button"
                className={family === f ? "chip is-active" : "chip"}
                onClick={() => setFamily(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="view-toggle" role="group" aria-label="Switch skills view">
            <button
              type="button"
              className={view === "table" ? "seg is-active" : "seg"}
              onClick={() => setView("table")}
              aria-pressed={view === "table"}
            >
              Table
            </button>
            <button
              type="button"
              className={view === "cloud" ? "seg is-active" : "seg"}
              onClick={() => setView("cloud")}
              aria-pressed={view === "cloud"}
            >
              Cloud
            </button>
          </div>
        </div>

        <div className="skills-layout">
          {view === "table" ? (
            <div className="grid-wrap" ref={gridRef}>
              <div className="periodic-grid">
                {filtered.map((skill, i) => {
                  const row = Math.floor(i / cols);
                  const col = i % cols;
                  const delay = (row + col) * 35;
                  return (
                    <button
                      type="button"
                      key={skill.name}
                      className={`tile ${selected.name === skill.name ? "is-selected" : ""}`}
                      style={{
                        transitionDelay: gridInView ? `${delay}ms` : "0ms",
                        opacity: gridInView ? 1 : 0,
                        transform: gridInView ? "translateY(0)" : "translateY(14px)",
                      }}
                      onClick={() => selectSkill(skill)}
                      aria-pressed={selected.name === skill.name}
                    >
                      <span className="tile-number">{String(skill.number).padStart(2, "0")}</span>
                      <span className="tile-symbol">{skill.symbol}</span>
                      <span className="tile-name">{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="cloud-wrap">
              <TechCloud
                labels={SKILL_GROUPS.map((s) => s.name)}
                onSelect={selectByName}
              />
            </div>
          )}

          <aside className="inspector" aria-live="polite">
            <div className="inspector-inner card card-active">
              <div className="inspector-icon">
                <TechLogo
                  logoSlug={selected.logo}
                  glyph={CONCEPT_GLYPH_BY_SKILL[selected.name]}
                  size={40}
                />
              </div>
              <p className="inspector-family">{selected.family}</p>
              <h3 className="inspector-name">{selected.name}</h3>
              {selected.detail && <p className="inspector-detail">{selected.detail}</p>}
              {!isBrand(selected.logo) && (
                <p className="inspector-note">Core concept, no single brand mark.</p>
              )}

              <p className="inspector-label">Used in</p>
              <ul className="inspector-used">
                {selected.usedIn.map((u) => (
                  <li key={u}>{u}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .skills-controls {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 16px;
          margin: 36px 0 40px;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          font-size: 12.5px;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px var(--line);
          color: var(--ink-2);
          transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
          white-space: nowrap;
        }

        .chip.is-active {
          background: var(--ink);
          color: var(--paper);
        }

        .view-toggle {
          display: inline-flex;
          padding: 4px;
          border-radius: 999px;
          box-shadow: inset 0 0 0 1px var(--line);
          height: fit-content;
        }

        .seg {
          font-size: 12.5px;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 999px;
          color: var(--mute);
        }

        .seg.is-active {
          background: var(--ink);
          color: var(--paper);
        }

        .skills-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (min-width: 960px) {
          .skills-layout {
            grid-template-columns: 1fr 300px;
            gap: 32px;
          }
        }

        .grid-wrap,
        .cloud-wrap {
          min-height: 300px;
        }

        .periodic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        @media (min-width: 540px) {
          .periodic-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        @media (min-width: 860px) {
          .periodic-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        .tile {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          padding: 10px;
          border-radius: 12px;
          background: var(--card);
          box-shadow: inset 0 0 0 1px var(--line);
          text-align: left;
          transition: opacity 0.6s var(--ease), transform 0.6s var(--ease),
            box-shadow 0.3s var(--ease), background-color 0.3s var(--ease);
        }

        .tile:hover,
        .tile:focus-visible {
          box-shadow: inset 0 0 0 1.5px var(--ink);
        }

        .tile.is-selected {
          background: var(--ink);
          color: var(--paper);
          box-shadow: inset 0 0 0 1px var(--ink);
        }

        .tile-number {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--faint);
        }

        .tile.is-selected .tile-number {
          color: rgba(244, 242, 238, 0.6);
        }

        .tile-symbol {
          font-size: clamp(16px, 2.6vw, 20px);
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .tile-name {
          font-size: 9.5px;
          line-height: 1.2;
          color: var(--mute);
        }

        .tile.is-selected .tile-name {
          color: rgba(244, 242, 238, 0.75);
        }

        .inspector-inner {
          position: sticky;
          top: calc(var(--nav-h) + 16px);
          padding: 26px 24px;
        }

        .inspector-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px var(--line);
          color: var(--ink-2);
          margin-bottom: 16px;
        }

        .inspector-family {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--faint);
          margin: 0 0 6px;
        }

        .inspector-name {
          font-size: 22px;
          margin: 0 0 8px;
        }

        .inspector-detail {
          font-size: 13px;
          color: var(--ink-2);
          margin: 0 0 12px;
        }

        .inspector-note {
          font-size: 12px;
          color: var(--faint);
          font-style: italic;
          margin: 0 0 12px;
        }

        .inspector-label {
          font-family: var(--font-mono), monospace;
          font-size: 10.5px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--faint);
          margin: 18px 0 8px;
          border-top: 1px solid var(--line);
          padding-top: 16px;
        }

        .inspector-used {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          gap: 7px;
          font-size: 12.5px;
          color: var(--ink-2);
        }

        .inspector-used li {
          padding-left: 14px;
          position: relative;
        }

        .inspector-used li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: var(--mute);
        }
      `}</style>
    </section>
  );
}

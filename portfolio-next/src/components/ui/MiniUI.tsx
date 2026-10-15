import type { Project } from "@/lib/data";

/**
 * Small, abstract, grayscale "mini-UI" mockups for each project card.
 * Built entirely from CSS shapes — not real screenshots, not invented
 * product UI — just a decorative, illustrative stand-in keyed to the
 * project's domain (database rows, a bar chart, a waveform, etc).
 */
export default function MiniUI({ kind }: { kind: Project["illustration"] }) {
  return (
    <div className="mini-ui" aria-hidden="true">
      {kind === "database" && (
        <div className="rows">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="row" key={i}>
              <span style={{ width: "22%" }} />
              <span style={{ width: `${40 + (i % 3) * 12}%` }} />
              <span style={{ width: "16%" }} />
            </div>
          ))}
        </div>
      )}

      {kind === "dashboard" && (
        <div className="dash">
          <div className="dash-cards">
            <div className="dash-card" />
            <div className="dash-card" />
            <div className="dash-card" />
          </div>
          <div className="bars">
            {[40, 70, 55, 85, 60, 30, 95].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}

      {kind === "audio" && (
        <div className="wave">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              style={{ height: `${20 + Math.abs(Math.sin(i * 0.7)) * 70}%` }}
            />
          ))}
        </div>
      )}

      {kind === "analytics" && (
        <svg viewBox="0 0 200 100" className="line-chart" preserveAspectRatio="none">
          <polyline
            points="0,80 25,60 50,65 75,30 100,45 125,20 150,35 175,15 200,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <polyline
            points="0,90 25,85 50,88 75,70 100,75 125,60 150,65 175,55 200,58"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      )}

      {kind === "spreadsheet" && (
        <div className="sheet">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className={i % 7 === 0 ? "is-filled" : ""} />
          ))}
        </div>
      )}

      {kind === "calendar" && (
        <div className="cal">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} className={[3, 9, 14, 20, 23].includes(i) ? "is-marked" : ""} />
          ))}
        </div>
      )}

      {kind === "bi" && (
        <div className="bi">
          <div className="donut" />
          <div className="bi-bars">
            {[60, 90, 40, 75].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}

      {kind === "agents" && (
        <div className="agents">
          {Array.from({ length: 4 }).map((_, i) => (
            <div className="agent-node" key={i}>
              <span className="dot" />
              <span className="line" style={{ width: `${50 + i * 10}%` }} />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .mini-ui {
          width: 100%;
          height: 100%;
          padding: 18px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          color: var(--mute);
        }

        .rows {
          width: 100%;
          display: grid;
          gap: 8px;
        }

        .row {
          display: flex;
          gap: 8px;
        }

        .row span {
          height: 9px;
          border-radius: 3px;
          background: var(--soft);
        }

        .dash {
          width: 100%;
          display: grid;
          gap: 14px;
        }

        .dash-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .dash-card {
          height: 28px;
          border-radius: 8px;
          background: var(--soft);
        }

        .bars {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 60px;
        }

        .bars span {
          flex: 1;
          background: var(--faint);
          border-radius: 3px 3px 0 0;
        }

        .wave {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 3px;
          height: 70px;
        }

        .wave span {
          flex: 1;
          background: var(--faint);
          border-radius: 2px;
        }

        .line-chart {
          width: 100%;
          height: 90px;
          color: var(--mute);
        }

        .sheet {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 4px;
        }

        .sheet span {
          aspect-ratio: 1.3;
          background: var(--soft);
          border-radius: 2px;
        }

        .sheet span.is-filled {
          background: var(--faint);
        }

        .cal {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .cal span {
          aspect-ratio: 1;
          background: var(--soft);
          border-radius: 3px;
        }

        .cal span.is-marked {
          background: var(--ink-2);
        }

        .bi {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .donut {
          flex: none;
          width: 70px;
          height: 70px;
          border-radius: 999px;
          background: conic-gradient(
            var(--ink-2) 0deg 140deg,
            var(--faint) 140deg 230deg,
            var(--soft) 230deg 360deg
          );
          -webkit-mask: radial-gradient(farthest-side, transparent 58%, #000 60%);
          mask: radial-gradient(farthest-side, transparent 58%, #000 60%);
        }

        .bi-bars {
          flex: 1;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          height: 60px;
        }

        .bi-bars span {
          flex: 1;
          background: var(--faint);
          border-radius: 3px 3px 0 0;
        }

        .agents {
          width: 100%;
          display: grid;
          gap: 12px;
        }

        .agent-node {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dot {
          flex: none;
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: var(--ink-2);
        }

        .line {
          height: 6px;
          border-radius: 3px;
          background: var(--soft);
        }
      `}</style>
    </div>
  );
}

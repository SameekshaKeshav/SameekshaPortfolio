import { CERTIFICATIONS, SECTION_TAGS } from "@/lib/data";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="certifications section-pad"
      aria-labelledby="certifications-heading"
    >
      <div className="section-shell">
        <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
          {SECTION_TAGS.certifications}
        </p>
        <h2
          id="certifications-heading"
          className="heading-lg rv-mask"
          style={{ ["--i" as string]: 1 }}
        >
          <span>
            Credentials, <span className="accent-italic">kept current.</span>
          </span>
        </h2>

        <ul className="cert-list rv" style={{ ["--i" as string]: 2 }}>
          {CERTIFICATIONS.map((cert, i) => (
            <li className="cert-row" key={cert.title}>
              <span className="cert-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="cert-text">
                <span className="cert-title">{cert.title}</span>
                <span className="cert-issuer">{cert.issuer}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .cert-list {
          margin: 44px 0 0;
          padding: 0;
          list-style: none;
          border-top: 1px solid var(--line);
        }

        .cert-row {
          position: relative;
          display: flex;
          align-items: baseline;
          gap: 20px;
          padding: 22px 16px;
          border-bottom: 1px solid var(--line);
          overflow: hidden;
          cursor: default;
        }

        .cert-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s var(--ease);
          z-index: 0;
        }

        .cert-row:hover::before,
        .cert-row:focus-within::before {
          transform: scaleX(1);
        }

        .cert-index {
          position: relative;
          z-index: 1;
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--faint);
          transition: color 0.4s var(--ease);
        }

        .cert-text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 10px;
          transition: color 0.4s var(--ease);
        }

        .cert-title {
          font-size: clamp(16px, 2vw, 19px);
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .cert-issuer {
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          color: var(--mute);
          transition: color 0.4s var(--ease);
        }

        .cert-row:hover .cert-index,
        .cert-row:hover .cert-text,
        .cert-row:hover .cert-issuer,
        .cert-row:focus-within .cert-index,
        .cert-row:focus-within .cert-text,
        .cert-row:focus-within .cert-issuer {
          color: var(--paper);
        }
      `}</style>
    </section>
  );
}

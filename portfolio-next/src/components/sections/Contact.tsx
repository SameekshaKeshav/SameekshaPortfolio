"use client";

import { useState } from "react";
import { PROFILE, SECTION_TAGS } from "@/lib/data";

const HEADING = "Let's talk";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the email is still a visible, selectable mailto link.
    }
  };

  return (
    <section id="contact" className="contact section-pad" aria-labelledby="contact-heading">
      <div className="section-shell">
        <p className="section-tag rv" style={{ ["--i" as string]: 0 }}>
          {SECTION_TAGS.contact}
        </p>

        <h2 id="contact-heading" className="hop-heading">
          {HEADING.split("").map((char, i) => (
            <span
              className="hop-letter"
              style={{ ["--i" as string]: i }}
              key={i}
              aria-hidden="true"
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
          <span className="sr-only">{HEADING}</span>
        </h2>

        <div className="contact-grid">
          <div className="contact-main rv" style={{ ["--i" as string]: 1 }}>
            <p className="contact-lede">
              Open to full-time software and data engineering roles.
            </p>

            <button type="button" className="email-copy" onClick={copyEmail}>
              <span>{PROFILE.email}</span>
              <span className="copy-tag">{copied ? "Copied ✓" : "Copy"}</span>
            </button>

            <a className="phone-link" href={PROFILE.phoneHref}>
              {PROFILE.phone}
            </a>
          </div>

          <div className="contact-links rv" style={{ ["--i" as string]: 2 }}>
            <a href={`mailto:${PROFILE.email}`} className="btn btn-primary">
              Email me
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              LinkedIn ↗
            </a>
            <a href={PROFILE.resume} className="btn btn-ghost" download>
              Résumé ↓
            </a>
          </div>
        </div>

        <footer className="site-footer">
          <span>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
          <span>{PROFILE.location}</span>
        </footer>
      </div>

      <style jsx>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .hop-heading {
          font-size: clamp(42px, 9vw, 104px);
          margin: 0 0 56px;
          display: flex;
          flex-wrap: wrap;
        }

        .hop-letter {
          display: inline-block;
          transition: transform 0.35s var(--ease);
          transition-delay: calc(var(--i, 0) * 18ms);
        }

        .hop-heading:hover .hop-letter {
          transform: translateY(-0.12em);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          padding-bottom: 64px;
          border-bottom: 1px solid var(--line);
        }

        @media (min-width: 860px) {
          .contact-grid {
            grid-template-columns: 1.3fr 1fr;
          }
        }

        .contact-lede {
          font-size: clamp(17px, 2vw, 20px);
          color: var(--ink-2);
          max-width: 46ch;
          margin: 0 0 32px;
        }

        .email-copy {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          width: 100%;
          max-width: 420px;
          padding: 16px 20px;
          border-radius: 16px;
          box-shadow: inset 0 0 0 1px var(--line);
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 14px;
          transition: box-shadow 0.3s var(--ease);
        }

        .email-copy:hover,
        .email-copy:focus-visible {
          box-shadow: inset 0 0 0 1.5px var(--ink);
        }

        .copy-tag {
          font-family: var(--font-mono), monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--mute);
          flex: none;
        }

        .phone-link {
          display: inline-block;
          font-size: 14px;
          color: var(--mute);
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-start;
        }

        .contact-links :global(.btn) {
          width: 100%;
          justify-content: center;
        }

        @media (min-width: 640px) {
          .contact-links {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .contact-links :global(.btn) {
            width: auto;
          }
        }

        .site-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 8px;
          padding-top: 28px;
          font-family: var(--font-mono), monospace;
          font-size: 11.5px;
          color: var(--faint);
        }
      `}</style>
    </section>
  );
}

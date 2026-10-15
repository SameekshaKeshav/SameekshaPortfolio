import { BRAND_LOGOS } from "@/lib/logos.generated";

export { BRAND_LOGOS };

/** Maps a résumé skill name to a thin-line concept glyph when it has no real brand logo. */
export const CONCEPT_GLYPH_BY_SKILL: Record<string, ConceptGlyph> = {
  SQL: "database",
  KQL: "query",
  "ETL/ELT Pipeline Development": "pipeline",
  "Data Modeling": "database",
  "Data Quality & Reconciliation": "check",
  "Workflow Automation": "loop",
  "Telemetry & Observability": "pulse",
  "Distributed Systems": "nodes",
  Parquet: "layers",
  NLP: "brain",
  SBERT: "brain",
  "t-SNE": "scatter",
  "Prompt Engineering": "chat",
  "Agentic AI": "nodes",
  "Statistical Modeling": "bars",
  "Model Evaluation": "check",
  "CI/CD": "loop",
  Excel: "grid",
  "Power BI": "bars",
};

export type ConceptGlyph =
  | "database"
  | "query"
  | "pipeline"
  | "check"
  | "loop"
  | "pulse"
  | "nodes"
  | "layers"
  | "brain"
  | "scatter"
  | "chat"
  | "bars"
  | "grid"
  | "medal"
  | "certificate"
  | "chart";

const GLYPH_PATHS: Record<ConceptGlyph, string> = {
  database:
    "M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6",
  query:
    "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm7 15-3.2-3.2M8 11h6M11 8v6",
  pipeline: "M3 5h18M3 5l5 7v7l4-2v-5l5-7M3 5v0",
  check:
    "M12 3 4 6.5v5c0 5 3.4 8.6 8 9.5 4.6-.9 8-4.5 8-9.5v-5L12 3Zm-3 9 2.2 2.2L15.5 10",
  loop: "M4 10a8 8 0 0 1 14-5.3M20 14a8 8 0 0 1-14 5.3M4.7 4.7V9H9M19.3 19.3V15H15",
  pulse: "M3 12h4l2 7 4-14 2 7h6",
  nodes:
    "M6 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 8.3 10.5 12m3-0 3-3.7M10.5 12l-3 5.3m6.9-5.3 3 5.3",
  layers:
    "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
  brain:
    "M9 4a3 3 0 0 0-3 3v1a3 3 0 0 0-1 5.8A3 3 0 0 0 8 18h1V4H9Zm6 0a3 3 0 0 1 3 3v1a3 3 0 0 1 1 5.8A3 3 0 0 1 16 18h-1V4h1Z",
  scatter:
    "M4 20V4M4 20h16M7 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm4-5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-2 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  chat: "M4 5h16v10H9l-5 4V5Z",
  bars: "M5 21V10M11 21V4M17 21v-7M3 21h18",
  grid: "M4 4h16v16H4V4Zm0 5.3h16M4 14.7h16M9.3 4v16M14.7 4v16",
  medal:
    "M12 3 4.5 7v5L12 16l7.5-4V7L12 3Zm0 13v5m-3-2 3 2 3-2",
  certificate:
    "M4 4h16v12H4V4Zm3 3h10M7 9.5h10M7 12h6M9 19l1.5-3h3L15 19M9 16h6v3H9v-3Z",
  chart: "M5 21V10M11 21V4M17 21v-7M3 21h18",
};

export function isBrand(logoSlug?: string): boolean {
  return !!logoSlug && logoSlug in BRAND_LOGOS;
}

interface TechLogoProps {
  /** Brand logo slug (resolved against BRAND_LOGOS), if this is a branded skill. */
  logoSlug?: string;
  /** Concept glyph, used when there's no brand logo. */
  glyph?: ConceptGlyph;
  size?: number;
  className?: string;
}

export default function TechLogo({ logoSlug, glyph, size = 28, className }: TechLogoProps) {
  const brand = logoSlug ? BRAND_LOGOS[logoSlug] : undefined;

  if (brand) {
    if (brand.kind === "markup" && brand.inner) {
      return (
        <svg
          width={size}
          height={size}
          viewBox={brand.viewBox}
          className={className}
          role="img"
          aria-label={brand.title}
          dangerouslySetInnerHTML={{ __html: brand.inner }}
        />
      );
    }
    return (
      <svg
        width={size}
        height={size}
        viewBox={brand.viewBox}
        className={className}
        role="img"
        aria-label={brand.title}
      >
        <path d={brand.d} fill={brand.hex ?? "currentColor"} />
      </svg>
    );
  }

  const path = glyph ? GLYPH_PATHS[glyph] : GLYPH_PATHS.nodes;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

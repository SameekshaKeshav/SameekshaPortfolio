/**
 * Single source of truth for all site content.
 *
 * Every string, date, number and link in this file is traceable to
 * Sameeksha_Keshav_Master_Resume_updated.docx (provided by the user).
 * Nothing here is invented — if a fact isn't in the résumé, it isn't here.
 *
 * Components only ever *read* from this file. Do not hardcode copy in JSX.
 */

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

export const PROFILE = {
  name: "Sameeksha Keshav",
  firstName: "Sameeksha",
  initials: "SK",
  /** Exact job title held most recently in full-time employment (résumé: Microsoft). */
  role: "Software Engineer",
  roleLine: "Software Engineer & Data Scientist",
  email: "sameeksha.keshav@gmail.com",
  phone: "+1 (984) 382-1285",
  phoneHref: "tel:+19843821285",
  location: "Raleigh, NC",
  /** Verbatim from the résumé SUMMARY section. */
  resumeSummary:
    "Master's student in Computer Science (Data Science track) at NC State University (graduating May 2027) with 2+ years of technology experience spanning software engineering, data engineering, applied AI/ML, and distributed systems. As a Software Engineer at Microsoft's Azure DevDiv organization, worked on the observability team building logs and metrics pipelines for Kubernetes-based distributed systems, supporting enterprise monitoring customers including Datadog, Dynatrace, New Relic, and Elastic, while also engineering large-scale ETL data migration pipelines. Recognized with a Best Paper Award (IEEE CSITSS 2023) for AI-driven music recommendation research. Strong in Python, C#, SQL, and Azure, with additional experience in NLP, SBERT, TensorFlow, and LLM-based systems.",
  /** One additional short line, drawn from the résumé (current enrollment + GPA). */
  resumeSummaryExtra:
    "Currently a 4.00/4.00 GPA graduate student, and a 2023 Silver Medallist (2nd rank) from RV College of Engineering.",
  github: "https://github.com/SameekshaKeshav",
  linkedin: "https://www.linkedin.com/in/sameeksha-keshav-aba397207/",
  resume: "/Sameeksha_Keshav_Resume.pdf",
  portraitBust: "/portrait-bust.webp",
  heroImage: "/hero/portrait.webp",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const NAV = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
] as const;

/** Mono section index tags, in on-page order. */
export const SECTION_TAGS = {
  about: "01 — About",
  skills: "02 — Skills",
  work: "03 — Selected work",
  certifications: "04 — Certifications",
  experience: "05 — Experience",
  achievements: "06 — Achievements",
  contact: "07 — Contact",
} as const;

// ---------------------------------------------------------------------------
// Quick facts (About, right column)
// ---------------------------------------------------------------------------

export const QUICK_FACTS = [
  { label: "Location", value: "Raleigh, North Carolina" },
  {
    label: "Education",
    value: "MS Computer Science (Data Science), NC State · 4.00 GPA",
  },
  {
    label: "Current role",
    value: "Project Manager, Projects Committee — ACM at NC State",
  },
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
] as const;

/** Paraphrase of the résumé's own summary wording — not an invented claim. */
export const QUOTE =
  "Two years across software engineering, data engineering and applied AI/ML — from observability pipelines at enterprise scale to AI-driven recommendation research.";

// ---------------------------------------------------------------------------
// ID card (About section)
// ---------------------------------------------------------------------------

export const ID_CARD = {
  department: "Data Science · NC State",
  /** Graduation year from the résumé (MS Computer Science, May 2027). */
  validThru: "2027",
  idNumber: "DEV-2027",
  /** 4–5 lines, back of the card. Résumé-only facts. */
  whatIAm: [
    "Software engineer, most recently at Microsoft's Azure DevDiv",
    "MS Computer Science (Data Science track), NC State — 4.00 GPA",
    "B.Tech Information Science, RVCE — 9.70/10, Silver Medallist (Rank 2)",
    "Best Paper Award, IEEE CSITSS 2023",
    "Built Pack Referrals, TimeTable Automation, Bat-Eye Bioacoustics",
  ],
  signOff: "If found, say hello · sameeksha.keshav@gmail.com",
} as const;

// ---------------------------------------------------------------------------
// Skills — "the periodic table of my stack"
// ---------------------------------------------------------------------------

export type SkillFamily =
  | "Languages"
  | "Data Engineering"
  | "AI / ML"
  | "Cloud & Infrastructure"
  | "Tools";

export interface Skill {
  number: number;
  symbol: string;
  name: string;
  family: SkillFamily;
  /** Logo slug — resolved against BRAND_LOGOS in TechLogo.tsx, or undefined for concept skills. */
  logo?: string;
  /** Extra resume-sourced detail shown in the inspector (e.g. specific services). */
  detail?: string;
  /** Résumé-sourced work/projects that used this skill. */
  usedIn: string[];
}

export const SKILL_GROUPS: Skill[] = [
  // Languages
  {
    number: 1,
    symbol: "Py",
    name: "Python",
    family: "Languages",
    logo: "python",
    usedIn: [
      "Microsoft (Azure ML pipeline)",
      "Samsung Research",
      "NividApps",
      "Student Performance Modeling",
      "Bat-Eye Bioacoustics",
      "Enchantler",
      "Poker AI Arena",
    ],
  },
  {
    number: 2,
    symbol: "C#",
    name: "C#",
    family: "Languages",
    logo: "csharp",
    usedIn: ["Microsoft (Azure DevDiv ETL migration)"],
  },
  {
    number: 3,
    symbol: "Sq",
    name: "SQL",
    family: "Languages",
    usedIn: ["Inventory Management System", "TimeTable Automation System"],
  },
  {
    number: 4,
    symbol: "Kq",
    name: "KQL",
    family: "Languages",
    detail: "Kusto Query Language",
    usedIn: ["Microsoft (Azure DevDiv ETL migration)"],
  },
  {
    number: 5,
    symbol: "Js",
    name: "JavaScript",
    family: "Languages",
    logo: "javascript",
    usedIn: ["Pack Referrals (React/Tailwind frontend)"],
  },
  {
    number: 6,
    symbol: "Hc",
    name: "HTML/CSS",
    family: "Languages",
    logo: "html5",
    usedIn: ["Enchantler"],
  },

  // Data Engineering
  {
    number: 7,
    symbol: "Ep",
    name: "ETL/ELT Pipeline Development",
    family: "Data Engineering",
    usedIn: ["Microsoft (Azure DevDiv)", "NividApps"],
  },
  {
    number: 8,
    symbol: "Dm",
    name: "Data Modeling",
    family: "Data Engineering",
    usedIn: ["Inventory Management System"],
  },
  {
    number: 9,
    symbol: "Dq",
    name: "Data Quality & Reconciliation",
    family: "Data Engineering",
    usedIn: ["Microsoft (Azure DevDiv ETL migration)"],
  },
  {
    number: 10,
    symbol: "Wa",
    name: "Workflow Automation",
    family: "Data Engineering",
    usedIn: ["Microsoft (Azure DevDiv)", "TimeTable Automation System"],
  },
  {
    number: 11,
    symbol: "To",
    name: "Telemetry & Observability",
    family: "Data Engineering",
    usedIn: ["Microsoft (Azure DevDiv)"],
  },
  {
    number: 12,
    symbol: "Ds",
    name: "Distributed Systems",
    family: "Data Engineering",
    usedIn: ["Microsoft (Azure DevDiv)"],
  },
  {
    number: 13,
    symbol: "Sa",
    name: "Serverless Analytics Pipelines",
    family: "Data Engineering",
    usedIn: ["NividApps (AWS Athena + S3)"],
  },
  {
    number: 14,
    symbol: "Pq",
    name: "Parquet",
    family: "Data Engineering",
    usedIn: ["NividApps (AWS Athena + S3)"],
  },

  // AI / ML
  {
    number: 15,
    symbol: "Tf",
    name: "TensorFlow",
    family: "AI / ML",
    logo: "tensorflow",
    usedIn: ["Bat-Eye Bioacoustics"],
  },
  {
    number: 16,
    symbol: "Nl",
    name: "NLP",
    family: "AI / ML",
    usedIn: ["Samsung Research"],
  },
  {
    number: 17,
    symbol: "Sb",
    name: "SBERT",
    family: "AI / ML",
    usedIn: ["Samsung Research", "Popularity Estimation paper (arXiv)"],
  },
  {
    number: 18,
    symbol: "Ts",
    name: "t-SNE",
    family: "AI / ML",
    usedIn: ["Samsung Research"],
  },
  {
    number: 19,
    symbol: "Pe",
    name: "Prompt Engineering",
    family: "AI / ML",
    usedIn: ["Tavant (Agentic AI travel chatbot)"],
  },
  {
    number: 20,
    symbol: "Ol",
    name: "Ollama (LLMs)",
    family: "AI / ML",
    logo: "ollama",
    usedIn: ["Tavant (Agentic AI travel chatbot)"],
  },
  {
    number: 21,
    symbol: "Ag",
    name: "Agentic AI",
    family: "AI / ML",
    usedIn: ["Tavant (Agentic AI travel chatbot)"],
  },
  {
    number: 22,
    symbol: "Sm",
    name: "Statistical Modeling",
    family: "AI / ML",
    usedIn: ["State Employee Credit Card Analytics"],
  },
  {
    number: 23,
    symbol: "Me",
    name: "Model Evaluation",
    family: "AI / ML",
    usedIn: ["Student Performance Modeling", "Bat-Eye Bioacoustics"],
  },

  // Cloud & Infrastructure
  {
    number: 24,
    symbol: "Az",
    name: "Azure",
    family: "Cloud & Infrastructure",
    logo: "azure",
    detail: "Data Factory · Cosmos DB · Data Explorer · ML · DevDiv",
    usedIn: ["Microsoft (Azure DevDiv)", "Software Engineer Intern, Microsoft"],
  },
  {
    number: 25,
    symbol: "Aw",
    name: "AWS",
    family: "Cloud & Infrastructure",
    logo: "aws",
    detail: "EC2 · S3 · IAM · RDS · Lambda · Glue · Athena · EMR",
    usedIn: ["NividApps"],
  },
  {
    number: 26,
    symbol: "Kb",
    name: "Kubernetes",
    family: "Cloud & Infrastructure",
    logo: "kubernetes",
    usedIn: ["Microsoft (Azure DevDiv)"],
  },
  {
    number: 27,
    symbol: "Gt",
    name: "Git",
    family: "Cloud & Infrastructure",
    logo: "git",
    usedIn: ["Pack Referrals", "State Employee Credit Card Analytics (PBIP)"],
  },
  {
    number: 28,
    symbol: "Ci",
    name: "CI/CD",
    family: "Cloud & Infrastructure",
    usedIn: ["Pack Referrals (GitHub Actions, Railway)"],
  },
  {
    number: 29,
    symbol: "Nf",
    name: ".NET Framework",
    family: "Cloud & Infrastructure",
    logo: "dotnet",
    usedIn: ["Microsoft (Azure DevDiv ETL migration)"],
  },
  {
    number: 30,
    symbol: "Dj",
    name: "Django",
    family: "Cloud & Infrastructure",
    logo: "django",
    usedIn: [
      "Student Performance Modeling",
      "TimeTable Automation System",
      "Pack Referrals (REST Framework)",
    ],
  },

  // Tools
  {
    number: 31,
    symbol: "Pd",
    name: "Pandas",
    family: "Tools",
    logo: "pandas",
    usedIn: ["Enchantler", "Samsung Research"],
  },
  {
    number: 32,
    symbol: "Np",
    name: "NumPy",
    family: "Tools",
    logo: "numpy",
    usedIn: ["Enchantler"],
  },
  {
    number: 33,
    symbol: "My",
    name: "MySQL",
    family: "Tools",
    logo: "mysql",
    usedIn: ["Inventory Management System"],
  },
  {
    number: 34,
    symbol: "Xl",
    name: "Excel",
    family: "Tools",
    detail: "XLOOKUP · LAMBDA · Pivot Tables · Dashboards",
    usedIn: ["Excel Skills Portfolio"],
  },
  {
    number: 35,
    symbol: "Bi",
    name: "Power BI",
    family: "Tools",
    usedIn: ["State Employee Credit Card Analytics (PBIP)"],
  },
  {
    number: 36,
    symbol: "Jn",
    name: "Jupyter Notebooks",
    family: "Tools",
    logo: "jupyter",
    usedIn: ["Student Performance Modeling", "Bat-Eye Bioacoustics"],
  },
];

export const SKILL_FAMILIES: SkillFamily[] = [
  "Languages",
  "Data Engineering",
  "AI / ML",
  "Cloud & Infrastructure",
  "Tools",
];

// ---------------------------------------------------------------------------
// Work — selected projects
// ---------------------------------------------------------------------------

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  link?: string;
  linkLabel?: string;
  /** Which illustrative mini-UI variant to render (grayscale, labelled). */
  illustration:
    | "database"
    | "dashboard"
    | "audio"
    | "analytics"
    | "spreadsheet"
    | "calendar"
    | "bi"
    | "agents";
}

export const PROJECTS: Project[] = [
  {
    id: "inventory",
    index: "01",
    title: "Inventory Management System",
    kicker: "CSC540 — NC State · MySQL / Python",
    description:
      "A full relational database application for a frozen-meals manufacturer, modeling multi-entity supply chain workflows across a normalized schema (BCNF/3NF).",
    features: [
      "Stored procedures for transactional batch creation (FEFO lot selection)",
      "Atomic inventory decrement and cost computation",
      "Triggers for lot-number computation and expired-lot prevention",
      "Compound ingredient cycle detection",
      "Do-not-combine conflict validation",
      "Role-based access for Manufacturer, Supplier and Viewer roles",
    ],
    tech: ["MySQL", "Python", "Stored Procedures", "Triggers", "BCNF/3NF"],
    link: "https://github.com/skeshav2_ncstate/DBMS-InventoryManagement",
    linkLabel: "View on GitHub ↗",
    illustration: "database",
  },
  {
    id: "student-performance",
    index: "02",
    title: "Student Performance Predictive Modeling",
    kicker: "ALDA — NC State · Python / Django",
    description:
      "A supervised ML system on a 6,607×20 student performance dataset spanning academic, socio-economic, and behavioral factors. Led the regression component, predicting continuous exam scores.",
    features: [
      "Regression on study hours, attendance, sleep, parental involvement",
      "Extracurricular-participation classification",
      "Binary classification of score-improvement potential",
      "Django web app with form-triggered model inference",
    ],
    tech: ["Python", "Django", "Regression", "Classification"],
    link: "https://drive.google.com/file/d/1-TS89f5E0O7_gpJYbYydcez6a9KsOVJB/view?usp=sharing",
    linkLabel: "View project ↗",
    illustration: "dashboard",
  },
  {
    id: "bat-eye",
    index: "03",
    title: "Bat-Eye Bioacoustics Project",
    kicker: "NVIDIA-sponsored · TensorFlow",
    description:
      "Deep learning pipelines for 9-class bat species classification from a 4GB ultrasonic recording dataset, with Bat Conservation India Trust and NVIDIA.",
    features: [
      "89.5% overall classification accuracy",
      "Misclassification isolated to 2 acoustically similar species",
      "Strong generalization across the remaining 7 species",
      "Signal processing to extract features from raw ultrasonic audio",
    ],
    tech: ["TensorFlow", "Signal Processing", "Python", "Jupyter"],
    link: "https://github.com/SameekshaKeshav/Bat_Annotation_Tool",
    linkLabel: "View on GitHub ↗",
    illustration: "audio",
  },
  {
    id: "enchantler",
    index: "04",
    title: "Data Analytics Dashboard — Enchantler",
    kicker: "Microsoft Engage 2023 · Pandas / PHP",
    description:
      "A solo end-to-end analytics application across three datasets: EV registrations (~9K), automobile sales (~15K), and make/model data (~8K).",
    features: [
      "Tesla dominated EV market share",
      "California led all states in EV adoption",
      "Regression model for competitive market pricing",
      "Secured selection for Microsoft Engage Internship 2023",
    ],
    tech: ["Pandas", "Python", "PHP", "XAMPP"],
    link: "https://github.com/SameekshaKeshav/Enchantler",
    linkLabel: "View on GitHub ↗",
    illustration: "analytics",
  },
  {
    id: "excel-portfolio",
    index: "05",
    title: "Excel Skills Portfolio",
    kicker: "Self-directed · 10 workbooks",
    description:
      "A 10-workbook Excel portfolio: advanced formulas, conditional formatting, chart-backed dashboards, and a full customer-segment analysis capstone on a 1,026-row bike buyers dataset.",
    features: [
      "XLOOKUP (7 variants), LAMBDA, LET, dynamic arrays, DATEDIF, PMT",
      "Formula-based conditional formatting",
      "COUNTIFS/AVERAGEIFS segment conversion analysis",
      "Data cleaning with PROPER, TRIM, SUBSTITUTE",
    ],
    tech: ["Excel", "XLOOKUP", "LAMBDA", "Pivot Tables"],
    link: "https://drive.google.com/drive/folders/1dkSrQHlddnK3jXlo0U1bSIErvfKI87Lr?usp=sharing",
    linkLabel: "View project ↗",
    illustration: "spreadsheet",
  },
  {
    id: "timetable",
    index: "06",
    title: "TimeTable Automation System",
    kicker: "RV College of Engineering · SQL / Django",
    description:
      "A production SQL-backed, Django-based timetable generation system in active use across 9 departments (~300–360 faculty) at RV College of Engineering.",
    features: [
      "Constraint-solving across courses, faculty, and rooms",
      "Conflict resolution and swap suggestions",
      "Admin workload cut 60% — 10 days down to 4",
      "Accessible within the college's local network",
    ],
    tech: ["SQL", "Django", "Constraint Solving"],
    link: "https://drive.google.com/file/d/1I5pVukbnFYeqn-rhMAAVPR9z1KbIHz-2/view?usp=drivesdk",
    linkLabel: "View project ↗",
    illustration: "calendar",
  },
  {
    id: "state-pcard",
    index: "07",
    title: "State Employee Credit Card Analytics",
    kicker: "Power BI (PBIP) · Delaware P-Card data",
    description:
      "A full Power BI Project (PBIP/TMDL, Git-trackable) analyzing 196,806 Delaware state P-Card transactions (~26MB).",
    features: [
      "Per-category Z-score anomaly detection (3σ threshold)",
      "2,789 anomalous transactions flagged (~1.4%)",
      "Star schema: fact table, 291-row customer dimension, date table",
      "8 DAX measures across 2 report pages",
    ],
    tech: ["Power BI", "DAX", "Power Query M", "Git"],
    link: "https://github.com/SameekshaKeshav/PowerBI-sync",
    linkLabel: "View on GitHub ↗",
    illustration: "bi",
  },
  {
    id: "poker-ai",
    index: "08",
    title: "Poker AI Arena",
    kicker: "Multi-agent decision theory · Python / Flask",
    description:
      "A Texas Hold'em simulation with 7 AI agents, each implementing a distinct decision-theoretic algorithm, plus a live reasoning dashboard.",
    features: [
      "Monte Carlo Tree Search (UCB1-guided), Markov Decision Process",
      "Q-learning, Bayesian inference, Minimax with alpha-beta pruning",
      "Constraint satisfaction (AC-3 arc consistency)",
      "Flask dashboard streaming each agent's reasoning in real time",
    ],
    tech: ["Python", "Flask", "Game Theory"],
    link: "https://github.com/skeshav2_ncstate/AI-FinalProject_PokerAgent",
    linkLabel: "View on GitHub ↗",
    illustration: "agents",
  },
];

// ---------------------------------------------------------------------------
// Certifications — ink-flood index
// ---------------------------------------------------------------------------

export interface Certification {
  title: string;
  issuer: string;
}

export const CERTIFICATIONS: Certification[] = [
  { title: "Azure Data Fundamentals (DP-900)", issuer: "Microsoft" },
  { title: "Azure Fundamentals (AZ-900)", issuer: "Microsoft" },
  { title: "AWS Cloud Practitioner Essentials", issuer: "AWS Training & Certification" },
  { title: "Amazon EMR — Getting Started", issuer: "AWS Training & Certification" },
  { title: "Introduction to Amazon Athena", issuer: "AWS Training & Certification" },
];

// ---------------------------------------------------------------------------
// Education + Experience — one chronological path
// ---------------------------------------------------------------------------

export interface TimelineStop {
  year: string;
  title: string;
  place: string;
  detail: string;
  kind: "education" | "experience";
}

export const EDUCATION: TimelineStop[] = [
  {
    year: "2020 – 2024",
    title: "B.Tech, Information Science",
    place: "RV College of Engineering",
    detail: "GPA 9.70/10.0 · Silver Medallist, 2nd Rank",
    kind: "education",
  },
  {
    year: "2025 – May 2027",
    title: "MS Computer Science (Data Science Track)",
    place: "North Carolina State University",
    detail: "GPA 4.00/4.00",
    kind: "education",
  },
];

export const EXPERIENCE: TimelineStop[] = [
  {
    year: "Jan 2023 – Aug 2023",
    title: "Research Intern",
    place: "Samsung Research Institute, Bangalore",
    detail:
      "Big-data analytics on game metadata using Python, t-SNE, and SBERT to power bundle recommendations.",
    kind: "experience",
  },
  {
    year: "May 2023 – Jun 2023",
    title: "Software Engineer Intern",
    place: "Microsoft India (R&D), Hyderabad",
    detail:
      "Built an Azure Data Explorer dashboard for service reliability; deployed an Azure ML pipeline to predict delivery dates.",
    kind: "experience",
  },
  {
    year: "Feb 2024 – Jun 2024",
    title: "AIML Intern",
    place: "NividApps Technology Solutions, Bangalore",
    detail:
      "Vendor recommendation system for MSME procurement; serverless AWS Athena/S3 pipeline cut query cost ~90%.",
    kind: "experience",
  },
  {
    year: "Jul 2024 – Jul 2025",
    title: "Software Engineer",
    place: "Microsoft India (R&D), Hyderabad — Azure DevDiv",
    detail:
      "Logs and metrics pipelines for Kubernetes-based distributed systems; Cosmos DB ETL migration (MongoDB API → Core API).",
    kind: "experience",
  },
  {
    year: "Jun 2026 – Jul 2026",
    title: "Agentic AI Intern",
    place: "Tavant Technologies",
    detail:
      "Agentic AI travel-planning chatbot (Python, Ollama) reasoning over Booking.com backend data; deployed via Azure ML.",
    kind: "experience",
  },
  {
    year: "Sep 2026 – Present",
    title: "Project Manager, Projects Committee",
    place: "ACM at North Carolina State University",
    detail:
      "Leading a 6-member team building Pack Referrals — a verified NC State co-op/internship referral network.",
    kind: "experience",
  },
];

/** Education + experience, merged and sorted chronologically by start. */
export const TIMELINE: TimelineStop[] = [
  EDUCATION[0],
  EXPERIENCE[0],
  EXPERIENCE[1],
  EXPERIENCE[2],
  EXPERIENCE[3],
  EDUCATION[1],
  EXPERIENCE[4],
  EXPERIENCE[5],
];

// ---------------------------------------------------------------------------
// Achievements — pinned horizontal gallery
// ---------------------------------------------------------------------------

export interface Achievement {
  index: string;
  label: string;
  caption: string;
  detail: string;
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  /** Logo slug if a real, résumé-referenced brand applies (NVIDIA, IEEE, arXiv). Otherwise a generic glyph. */
  logo?: string;
  glyph?: "medal" | "certificate" | "chart";
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    index: "01 / 06",
    label: "Best Paper Award",
    caption: "IEEE CSITSS 2023",
    detail: "Emotion Based Carnatic Music Recommendation System",
    value: 1,
    logo: "ieee",
  },
  {
    index: "02 / 06",
    label: "Publications",
    caption: "arXiv + 2 IEEE conferences",
    detail: "Popularity Estimation · Carnatic Music Rec · Ubuntu Automation",
    value: 3,
    logo: "arxiv",
  },
  {
    index: "03 / 06",
    label: "Bat-Eye Accuracy",
    caption: "NVIDIA-sponsored",
    detail: "9-class bat species classification, TensorFlow",
    value: 89.5,
    suffix: "%",
    decimals: 1,
    logo: "nvidia",
  },
  {
    index: "04 / 06",
    label: "Silver Medallist",
    caption: "RV College of Engineering, 2023",
    detail: "2nd Rank, B.Tech Information Science",
    value: 2,
    prefix: "Rank ",
    glyph: "medal",
  },
  {
    index: "05 / 06",
    label: "Certifications",
    caption: "Microsoft Azure + AWS",
    detail: "DP-900, AZ-900, and 3 AWS completions (Jul 2026)",
    value: 5,
    glyph: "certificate",
  },
  {
    index: "06 / 06",
    label: "Admin Time Saved",
    caption: "TimeTable Automation System",
    detail: "Scheduling workload: 10 days down to 4",
    value: 60,
    suffix: "%",
    glyph: "chart",
  },
];

// ---------------------------------------------------------------------------
// Publications (cited from résumé; surfaced in Achievements + Certifications context)
// ---------------------------------------------------------------------------

export interface Publication {
  authors: string;
  title: string;
  venue: string;
  link?: string;
  award?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    authors: "Nayak, A., Prajwal NJ, Sameeksha Keshav, et al. (2024)",
    title:
      "Popularity Estimation and New Bundle Generation using Content and Context based Embeddings",
    venue: "arXiv:2412.17310 [cs.IR]",
    link: "https://arxiv.org/abs/2412.17310",
  },
  {
    authors: "N J, Prajwal et al. (2023)",
    title: "Emotion Based Carnatic Music Recommendation System",
    venue: "IEEE CSITSS 2023 · doi:10.1109/CSITSS60515.2023.10334239",
    award: "Best Paper Award",
  },
  {
    authors: "N J, Prajwal, Sameeksha Keshav, et al. (2024)",
    title:
      "Automating Registration of Executables as Commands on the Ubuntu-Linux Platform",
    venue: "IEEE INCET 2024 · doi:10.1109/INCET61516.2024.10593197",
  },
];

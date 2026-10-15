# Sameeksha Keshav — Portfolio

A clean, light, premium, single-page portfolio. Next.js 15 (App Router) + React 19 +
TypeScript + Tailwind CSS 4. Every word on the page is sourced from
`Sameeksha_Keshav_Master_Resume_updated.docx` — see `src/lib/data.ts`, the single
source of truth for all content.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build       # production build + type-check + lint
npm run start        # serve the production build
npm run lint          # eslint only
```

Requires Node 18.18+ (Next.js 15 / React 19 baseline).

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15, App Router, React 19, TypeScript |
| Styling | Tailwind CSS 4 (`@theme`/`@layer` tokens in `globals.css`) + per-component `<style jsx>` (styled-jsx, bundled with Next) |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) — the only animation dependency |
| Motion | CSS transitions/keyframes, `IntersectionObserver`, small `requestAnimationFrame` loops. No GSAP, no three.js/WebGL |
| Fonts | Self-hosted via `next/font/local` — Inter Tight (variable), Instrument Serif, JetBrains Mono (variable) — `src/fonts/` |
| Icons/logos | Real brand marks only, generated at build time into `public/logos/` + `src/lib/logos.generated.ts` (see below) |

## Sections

One continuous scroll, no loader/splash, no page-transition curtains.

| # | Section | File | Notes |
| --- | --- | --- | --- |
| — | Hero | `src/components/hero/Hero.tsx` | Static illustrated portrait (no video — see below), ghost-outline name, CTAs |
| 01 | About | `src/components/sections/About.tsx` | Hanging lanyard ID card: CSS pendulum sway + 3D flip (click/tap/Enter/Space) |
| 02 | Skills | `src/components/sections/Skills.tsx` | Periodic-table grid + sticky inspector, **plus** a "Cloud" view toggle reusing the old portfolio's rotating Fibonacci-sphere tag cloud (`src/components/ui/TechCloud.tsx`) |
| 03 | Work | `src/components/sections/Work.tsx` | Expanding accordion, one project open at a time, abstract grayscale mini-UI per project (`src/components/ui/MiniUI.tsx`) |
| 04 | Certifications | `src/components/sections/Certifications.tsx` | "Ink-flood" hover list (no nav link — reached by scrolling) |
| 05 | Experience | `src/components/sections/Experience.tsx` | Merged education + work timeline, scroll-progress-filled spine |
| 06 | Achievements | `src/components/sections/Achievements.tsx` | Pinned horizontal scroll gallery, count-up numbers |
| 07 | Contact | `src/components/sections/Contact.tsx` | Letter-hop heading, copy-to-clipboard email, footer |

Shared plumbing: `src/components/Navigation.tsx` (scroll-spy pill nav, progress bar,
mobile overlay), `src/components/ui/RevealObserver.tsx` (adds `.is-in` to `.rv`/`.rv-mask`
elements once, see `globals.css`), `src/lib/hooks.ts` (`useInView`, `useScrollProgress`,
`usePinnedScrollProgress`, `useCountUp`, `prefersReducedMotion`), `src/lib/scroll.tsx`
(Lenis provider + `scrollToTarget`).

Below-the-fold sections (`Skills` → `Contact`) are loaded via `next/dynamic` with
`ssr: true` — still fully server-rendered for SEO/no-JS parity, just code-split into
separate chunks so the reported **First Load JS stays ≈129 kB** (hero + nav + about
only) against the ~130 kB budget.

## Deviations from the original brief (user-approved)

1. **Hero asset**: the brief originally specified a looping intro video. The user then
   supplied a single static illustrated portrait image instead and asked to use that —
   so the hero and the ID-card photo are both built from that one image, processed by
   `scripts/build-hero-assets.py` (see below) rather than the spec's ffmpeg/video pipeline.
2. **Kept the old portfolio's rotating tech-stack sphere**, per explicit request ("keep
   the cool parts... like the turning cloud for skills") — ported verbatim (Fibonacci
   sphere distribution, pointer/touch-nudged rotation) into `TechCloud.tsx`, wired up as
   an alternate view inside the Skills section.
3. Page copy (`src/lib/data.ts`) is sourced from `Sameeksha_Keshav_Master_Resume_updated.docx`.
   The downloadable `/Sameeksha_Keshav_Resume.pdf` (Hero + Contact buttons) is a separate,
   shorter "general" résumé supplied directly as a PDF — it's served as-is, not generated
   from the docx, so its wording/project list may be more condensed than the page content.

## Rebuilding the hero image assets

The brief's asset pipeline assumed a source video (ffmpeg). Since a single still image
was supplied instead, `scripts/build-hero-assets.py` is a Pillow-based equivalent:
whitens the background, finds the subject's bounding box, and produces the three
required crops.

```bash
# Needs Pillow. If the system /usr/bin/python3 lacks it, use a venv/Homebrew Python that has it.
python3 -m pip install Pillow
python3 scripts/build-hero-assets.py scripts/source/source-portrait.jpg --out-dir public
```

Outputs:
- `public/hero/portrait.webp` + `portrait.jpg` — 768×960 hero crop
- `public/portrait-bust.webp` — 480×600 ID-card crop
- `public/og.jpg` — 1200×630 social preview, composited on a pure-white canvas

The original source image is kept at `scripts/source/source-portrait.jpg` (outside
`public/`, so it never ships) purely so these assets are reproducible.

## Logos

Every brand mark in Skills/Achievements is a real, official logo — never invented —
generated once via:

```bash
npm run generate-logos
```

This script (`scripts/generate-logos.mjs`) sources:
- **[simple-icons](https://github.com/simple-icons/simple-icons)** (CC0) for Python,
  JavaScript, HTML5, TensorFlow, Ollama, Kubernetes, Git, .NET, Django, Pandas, NumPy,
  MySQL, Jupyter, NVIDIA, IEEE, arXiv.
- **[devicon](https://github.com/devicons/devicon)** (MIT) for Azure, AWS, and C# —
  simple-icons removed these over trademark concerns a few releases ago. The three
  needed SVGs are cached in `scripts/devicon-cache/` (committed, so this script never
  needs network access) rather than depending on the full 130 MB+ `devicon` package.

Output: `public/logos/*.svg` (for direct linking/download) + `src/lib/logos.generated.ts`
(inlined path/markup data consumed by `src/components/ui/TechLogo.tsx`) +
`public/logos/LICENSE-simple-icons.md` / `LICENSE-devicon.txt`.

Skills with no real brand mark (SQL, KQL, NLP, Prompt Engineering, Excel, Power BI, …)
get a small custom thin-line concept glyph instead (`TechLogo.tsx`'s `GLYPH_PATHS`) —
never a fabricated or misattributed logo.

## Accessibility & motion

- Semantic sections, correct heading order (one `<h2>` per section, `<h3>` within).
- Visible focus rings (`:focus-visible`) throughout; ID card and accordion rows are
  fully keyboard-operable (`Enter`/`Space`).
- `prefers-reduced-motion: reduce` disables Lenis smooth scroll, the ID-card pendulum
  sway, the tech-cloud's rAF rotation (swaps to a static flex-wrap list, same DOM), the
  scroll-cue animation, and collapses all CSS transition/animation durations globally.
- Every decorative visual (mini-UI illustrations, the tech cloud, achievement icons)
  has a text equivalent alongside it in the DOM.

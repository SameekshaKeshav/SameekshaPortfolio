# Sameeksha Keshav — Portfolio

My personal portfolio: a dark, animated single-page site built with **React + Vite +
TypeScript**, GSAP (smooth scroll, split-text animations, pinned horizontal scrolling),
a custom cursor, and an interactive 3D "tech stack" ball pit (Three.js + Rapier physics).

## Sections

Landing · About · What I Do · Career & Experience · Work · Tech Stack · Publications & Honors · Contact

## Run locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Editing content

Everything is plain data/props — no CMS.

| What | Where |
| --- | --- |
| Name & hero tagline | `src/components/Landing.tsx` |
| About blurb | `src/components/About.tsx` |
| Skill cards | `src/components/WhatIDo.tsx` |
| Career timeline | `src/components/Career.tsx` (`careers` array) |
| Projects | `src/components/Work.tsx` (`projects` array) |
| Publications & honors | `src/components/Publications.tsx` |
| Tech-stack balls | `src/components/TechStack.tsx` (`techs` array) |
| Links (email, phone, socials, resume) | `src/data/site.ts` |

### Assets to add

- **Photo** → `public/images/profile.jpg` (portrait, ~3:4). A placeholder shows until then.
- **Resume** → `public/Sameeksha_Keshav_Resume.pdf` (what the "Resume" button links to).

## Push to GitHub

```bash
cd /Users/skeshav/Documents/portfolio
git init
git add .
git commit -m "Initial commit: portfolio"
git branch -M main
git remote add origin https://github.com/SameekshaKeshav/<repo-name>.git
git push -u origin main
```

`node_modules/` and `dist/` are git-ignored — hosts install and build for you.

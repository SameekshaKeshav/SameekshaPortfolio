"use client";

import dynamic from "next/dynamic";
import { ScrollProvider } from "@/lib/scroll";
import Navigation from "@/components/Navigation";
import RevealObserver from "@/components/ui/RevealObserver";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";

// Below-the-fold sections are code-split out of the initial bundle (still
// server-rendered via ssr:true, so content/SEO/no-JS parity is unaffected —
// this only splits the *JS* into separate, on-demand chunks to keep the
// hero's first-load JS near the ~130kB budget).
const Skills = dynamic(() => import("@/components/sections/Skills"), { ssr: true });
const Work = dynamic(() => import("@/components/sections/Work"), { ssr: true });
const Certifications = dynamic(() => import("@/components/sections/Certifications"), {
  ssr: true,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), { ssr: true });
const Achievements = dynamic(() => import("@/components/sections/Achievements"), {
  ssr: true,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: true });

export default function App() {
  return (
    <ScrollProvider>
      <RevealObserver />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Certifications />
        <Experience />
        <Achievements />
        <Contact />
      </main>
    </ScrollProvider>
  );
}

import localFont from "next/font/local";

export const interTight = localFont({
  src: [
    { path: "../fonts/InterTight-Variable.woff2", style: "normal" },
    { path: "../fonts/InterTight-Variable-Italic.woff2", style: "italic" },
  ],
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

export const instrumentSerif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const jetBrainsMono = localFont({
  src: [{ path: "../fonts/JetBrainsMono-Variable.woff2", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  weight: "100 800",
});

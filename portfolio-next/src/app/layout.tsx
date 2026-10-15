import type { Metadata } from "next";
import { interTight, instrumentSerif, jetBrainsMono } from "@/lib/fonts";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const title = `${PROFILE.name} — ${PROFILE.roleLine}`;
const description = PROFILE.resumeSummary;

export const metadata: Metadata = {
  metadataBase: new URL("https://sameekshakeshav.dev"),
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/og.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetBrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

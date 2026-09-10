import type { Metadata } from "next";
import { Fraunces, Archivo, Anton } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/** Poster face — huge stacked words, solid or outlined. */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL("https://happinesscentre.in"),
  title: {
    default: "Happiness Centre — Zirakpur",
    template: "%s · Happiness Centre",
  },
  description:
    "A wellness club, a dietitian practice and a community in Zirakpur. Meals, movement, morning ritual and our own products — one complete day, built around you. The first day is free.",
  icons: { icon: "/brand/icon-32.png", apple: "/brand/icon-180.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${archivo.variable} ${anton.variable}`}>
      <head>
        {/* lets ?still=1 freeze marquees for screenshots and visual diffing */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(location.search.includes('still'))document.documentElement.setAttribute('data-still','');",
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

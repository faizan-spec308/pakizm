import type { Metadata } from "next";
import { Archivo, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/announcement-bar";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pakizm — Orthopedic Surgical Instruments",
    template: "%s — Pakizm",
  },
  description:
    "Manufacturer of precision orthopedic, dental and general surgery instruments. Surgical stainless steel, OEM and custom manufacturing, worldwide export since 2005.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

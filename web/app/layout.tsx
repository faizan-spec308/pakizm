import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart-context";
import AnnouncementBar from "@/components/announcement-bar";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CookieBanner from "@/components/cookie-banner";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pakizm — Orthopedic Surgical Instruments",
    template: "%s — Pakizm",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Pakizm — Orthopedic Surgical Instruments",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pakizm — Orthopedic Surgical Instruments",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CookieBanner />
        </CartProvider>
      </body>
    </html>
  );
}

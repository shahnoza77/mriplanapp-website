import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import "@/styles/components.css";
import "@/styles/sections.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { PageTransition } from "@/components/motion/PageTransition";
import { site } from "@/data/content";

const sfPro = localFont({
  src: "../public/fonts/SFNS.ttf",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MRI Plan | Interactive MRI Slice-Planning Simulator",
    template: "%s | MRI Plan",
  },
  description: site.shortDescription,
  applicationName: site.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "MRI Plan | Interactive MRI Slice-Planning Simulator",
    description: site.shortDescription,
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "MRI Plan" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MRI Plan | Interactive MRI Slice-Planning Simulator",
    description: site.shortDescription,
    images: ["/images/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5ef",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sfPro.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

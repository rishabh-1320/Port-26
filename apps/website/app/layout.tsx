import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { StatusBar } from "@/components/status-bar";
import { PageTransition } from "@/components/page-transition";
import { homeContent } from "@/lib/site-content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://port-26.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Rishabh Choudhary — B2B Product Designer",
    template: "%s | Rishabh Choudhary"
  },
  description: "B2B enterprise product designer. Systems thinker. Uses AI to ship designs in production code.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Rishabh Choudhary — B2B Product Designer",
    description: "B2B enterprise product designer. Systems thinker. Uses AI to ship designs in production code.",
    type: "website",
    images: ["https://framerusercontent.com/images/AqaOpcEcFqtiggHTbjvnqNgu68.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Choudhary — B2B Product Designer",
    description: "B2B enterprise product designer. Systems thinker. Uses AI to ship designs in production code.",
    images: ["https://framerusercontent.com/images/AqaOpcEcFqtiggHTbjvnqNgu68.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://framerusercontent.com/assets/suQ36PpzxORmpGk06KApyPNrO0.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to main content</a>
        <PageTransition>
          <StatusBar text={homeContent.statusBarText} />
          <SiteHeader content={homeContent} />
          <main id="main">{children}</main>
        </PageTransition>
      </body>
    </html>
  );
}

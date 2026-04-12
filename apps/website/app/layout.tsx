import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { homeContent } from "@/lib/site-content";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://port-26.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Design Port",
    template: "%s | Design Port"
  },
  description: "Portfolio of Rishabh Choudhary - Product and UI/UX Designer for complex B2B systems.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Design Port",
    description: "Portfolio of Rishabh Choudhary.",
    type: "website",
    images: ["https://framerusercontent.com/images/AqaOpcEcFqtiggHTbjvnqNgu68.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Port",
    description: "Portfolio of Rishabh Choudhary.",
    images: ["https://framerusercontent.com/images/AqaOpcEcFqtiggHTbjvnqNgu68.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader content={homeContent} />
        <main>{children}</main>
        <SiteFooter content={homeContent} />
      </body>
    </html>
  );
}

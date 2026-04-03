import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteConfig } from "@/lib/api-client";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ravish Studio",
    template: "%s | Ravish Studio"
  },
  description: "Portfolio website migrated from Framer to production code.",
  metadataBase: new URL("https://example.vercel.app")
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig();

  return (
    <html lang="en">
      <body>
        <SiteHeader config={config} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

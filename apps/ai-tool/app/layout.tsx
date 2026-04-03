import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Tool",
  description: "Optional AI tool with a server-side proxy and request guardrails."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

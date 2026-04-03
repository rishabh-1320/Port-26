import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web App Shell",
  description: "Secondary static-first web app shell."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

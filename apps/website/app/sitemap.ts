import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://port-26.vercel.app";

  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/casestudy/dashboard`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/casestudy/onboarding`, changeFrequency: "monthly", priority: 0.9 }
  ];
}

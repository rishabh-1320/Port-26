import { fallbackPages, fallbackSiteConfig } from "./fallback-content";
import type { PagePayload, SiteConfig } from "./types";

const apiBase = process.env.WEBSITE_API_BASE_URL;

async function safeFetch<T>(path: string): Promise<T | null> {
  if (!apiBase) {
    return null;
  }

  try {
    const response = await fetch(`${apiBase}${path}`, {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const remote = await safeFetch<SiteConfig>("/api/site-config");
  return remote ?? fallbackSiteConfig;
}

export async function getPage(slug: string): Promise<PagePayload | null> {
  const remote = await safeFetch<PagePayload>(`/api/pages/${slug}`);
  if (remote) {
    return remote;
  }

  return fallbackPages[slug] ?? null;
}

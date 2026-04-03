import type { PagePayload, SiteConfig } from "./types";

export const fallbackSiteConfig: SiteConfig = {
  siteName: "Ravish Studio",
  tagline: "Building calm, useful digital products.",
  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  highlights: ["Framer-to-code migration ready", "Fast on mobile", "Deploy-first workflow"]
};

export const fallbackPages: Record<string, PagePayload> = {
  work: {
    slug: "work",
    title: "Selected Work",
    description: "A sample work page. Replace this with real Framer content.",
    sections: [
      {
        heading: "Case study highlights",
        body: "Show your best projects with outcomes, role, and timeline."
      }
    ]
  },
  about: {
    slug: "about",
    title: "About",
    description: "Your story, your approach, and your services.",
    sections: [
      {
        heading: "How you work",
        body: "Describe your process, values, and collaboration style."
      }
    ]
  },
  contact: {
    slug: "contact",
    title: "Contact",
    description: "How people can reach you.",
    sections: [
      {
        heading: "Let us build together",
        body: "Add your email, social links, and response expectation."
      }
    ]
  }
};

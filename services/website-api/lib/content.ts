export const siteConfig = {
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

export const pages: Record<
  string,
  {
    slug: string;
    title: string;
    description: string;
    sections: Array<{ heading: string; body: string }>;
  }
> = {
  work: {
    slug: "work",
    title: "Selected Work",
    description: "A sample work page served by your standalone website backend.",
    sections: [
      {
        heading: "Project snapshots",
        body: "Replace this with real portfolio case studies from your Framer pages."
      }
    ]
  },
  about: {
    slug: "about",
    title: "About",
    description: "Tell visitors who you are and what you build.",
    sections: [
      {
        heading: "Approach",
        body: "Show your process and collaboration style in plain language."
      }
    ]
  },
  contact: {
    slug: "contact",
    title: "Contact",
    description: "Share your preferred contact channels.",
    sections: [
      {
        heading: "Get in touch",
        body: "Add your email, social handles, and working hours."
      }
    ]
  }
};

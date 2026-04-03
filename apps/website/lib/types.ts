export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  siteName: string;
  tagline: string;
  nav: NavItem[];
  highlights: string[];
};

export type PageSection = {
  heading: string;
  body: string;
};

export type PagePayload = {
  slug: string;
  title: string;
  description: string;
  sections: PageSection[];
};

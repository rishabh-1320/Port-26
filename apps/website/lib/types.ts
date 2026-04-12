export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  lead: string;
  highlight: string;
  support: string;
  intro: string;
  image: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
};

export type WorkCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  active: boolean;
  href?: string;
  tags: string[];
};

export type AIExplorationCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaLabel: string;
  active: boolean;
  href?: string;
  tags: string[];
};

export type GalleryItem = {
  src: string;
  alt: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  periodStart: string;
  periodEnd: string;
  logoSrc: string;
  description: string;
  link: string;
};

export type HomeContent = {
  siteName: string;
  byline: string;
  logo: string;
  resumeUrl: string;
  nav: NavItem[];
  hero: HeroContent;
  processIntro: string;
  processSteps: ProcessStep[];
  workIntro: string;
  works: WorkCard[];
  aiExplorations: AIExplorationCard[];
  galleryTitle: string;
  galleryIntro: string;
  gallery: GalleryItem[];
  coursesTitle: string;
  coursesIntro: string;
  courseHighlights: string[];
  aboutSummary: string;
  experiences: ExperienceItem[];
  funStuffSummary: string;
  contactHeading: string;
  contactSubheading: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  footerNote: string;
  footerPhoto: string;
};

export type CaseStudyStep = {
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type CaseStudyContent = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  duration: string;
  overview: string;
  steps: CaseStudyStep[];
  thanksNote: string;
};

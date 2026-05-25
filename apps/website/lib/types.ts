export type NavItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  h1: string;
  subLine: string;
  metrics: string[];
  image: string;
};

export type IdeologyPrinciple = {
  id: string;
  title: string;
  description: string;
  variant: "light" | "brand" | "blue" | "dark";
};

export type WorkCard = {
  id: string;
  title: string;
  description: string;
  image: string;
  role: string;
  year: string;
  company: string;
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
  status: "Live" | "Prototype" | "Archived";
  builtWith: string[];
  year: number;
  ctaLabel: string;
  active: boolean;
  href?: string;
  tags: string[];
};

export type LogoItem = {
  name: string;
  src?: string;
};

export type AiWorkflowTool = {
  name: string;
  description: string;
};

export type ExperienceProject = {
  name: string;
  period: string;
  description: string;
};

export type ExperienceEntry = {
  company: string;
  period: string;
  description?: string;
  projects?: ExperienceProject[];
};

export type SkillGroup = {
  category: string;
  items: string;
};

export type HomeContent = {
  statusBarText: string;
  siteName: string;
  logo: string;
  resumeUrl: string;
  nav: NavItem[];
  hero: HeroContent;
  logoStrip: {
    heading: string;
    logos: LogoItem[];
  };
  ideologyHeading: string;
  ideologyPrinciples: IdeologyPrinciple[];
  worksHeading: string;
  works: WorkCard[];
  aiWorkflow: {
    heading: string;
    intro: string;
    tools: AiWorkflowTool[];
    closingLine: string;
  };
  aiExplorationsHeading: string;
  aiExplorationsIntro: string;
  aiExplorations: AIExplorationCard[];
  about: {
    heading: string;
    bio: string[];
    currentlyLine: string;
    photoSrc?: string;
    experiences: ExperienceEntry[];
    skills: SkillGroup[];
  };
  footer: {
    closingLine: string;
    email: string;
    linkedinUrl: string;
    location: string;
  };
  footerNote: string;
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
  toc?: Array<{ id: string; label: string }>;
};

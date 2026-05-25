import type { CaseStudyContent, HomeContent } from "./types";

export const homeContent: HomeContent = {
  statusBarText: "Open to work · Bangalore, IST (UTC +5:30)",
  siteName: "Rishabh",
  logo: "https://framerusercontent.com/images/HNFmJC5lh17qrHUlZgrQXYCzo.png?width=1969&height=1969",
  resumeUrl: "https://drive.google.com/file/d/1yuRPDLlRh_Q7rkXvQfxWwoOZYhgisN42/view?usp=sharing",
  nav: [
    { label: "Work", href: "/#features" },
    { label: "AI Explorations", href: "/#ai-exploration" },
    { label: "About", href: "/#about" }
  ],

  hero: {
    h1: "I design complex B2B enterprise software. Then I use AI to ship it in production code.",
    subLine: "Systems thinker. The niche, regulated, multi-role kind of B2B SaaS that nothing off-the-shelf works for.",
    metrics: ["5 SaaS products", "5 domains", "1 design system", "AI in production workflow"],
    image: "https://framerusercontent.com/images/evb8WhW5MaVa23RUApiaX1mK1ic.png?width=2290&height=1474"
  },

  logoStrip: {
    heading: "Products I have designed.",
    logos: [
      { name: "Chestnut" },
      { name: "Cricmac" },
      { name: "Omny" },
      { name: "Signal" },
      { name: "Timelabs" }
    ]
  },

  ideologyHeading: "Design Ideology",
  ideologyPrinciples: [
    {
      id: "01",
      title: "Function before friendliness.",
      description: "In B2B, the user is a professional. Power beats polish.",
      variant: "light"
    },
    {
      id: "02",
      title: "Design systems, not screens.",
      description: "One thoughtful pattern beats a hundred clever ones.",
      variant: "brand"
    },
    {
      id: "03",
      title: "AI accelerates. Designers decide.",
      description: "AI is for velocity. Judgment is still the work.",
      variant: "blue"
    },
    {
      id: "04",
      title: "Design isn't done at handoff. It's done at production.",
      description: "The Figma file is intent. The code is the truth.",
      variant: "dark"
    }
  ],

  worksHeading: "Selected Works",
  works: [
    {
      id: "work-placeholder",
      title: "Hero AI/Data Case Study",
      description: "Coming soon — content to be added.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80",
      role: "UX Designer",
      year: "2026",
      company: "—",
      ctaLabel: "Coming soon",
      active: false,
      tags: ["AI", "Data", "Enterprise"]
    },
    {
      id: "work-chestnut",
      title: "Standardizing Chestnut, a producer performance platform for insurance",
      description: "Standardized fragmented patterns, owned the design system, and shipped new features. Cut UX inconsistencies by 30–40% and design-to-dev rework by 20–25%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80",
      role: "UX Designer",
      year: "2025–2026",
      company: "Tcules",
      href: "/casestudy/chestnut",
      ctaLabel: "View case study",
      active: true,
      tags: ["Product", "B2B", "Design System"]
    },
    {
      id: "work-hrms",
      title: "An HR analytics dashboard for an HRMS industry leader",
      description: "Translated vast workforce datasets into a clear, real-time dashboard. Picked the KPIs with stakeholders. Picked the visualizations with the data engineers.",
      image: "https://framerusercontent.com/images/I2PMf0jpPlxc3AxBOc0zh4LP00.png?scale-down-to=1024&width=2028&height=1511",
      role: "UX Designer",
      year: "2023–2024",
      company: "Timelabs",
      ctaLabel: "View case study",
      active: true,
      href: "/casestudy/dashboard",
      tags: ["Dashboard", "Analytics", "Enterprise"]
    },
    {
      id: "work-onboarding",
      title: "Rebuilding digital candidate onboarding for HRMS, from old to new",
      description: "Rebuilt a broken onboarding flow from the ground up. Added new features along the way.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=900&fit=crop&q=80",
      role: "UX Designer",
      year: "2024–2025",
      company: "Timelabs",
      ctaLabel: "View case study",
      active: true,
      href: "/casestudy/onboarding",
      tags: ["Onboarding", "HRMS", "Flow"]
    },
    {
      id: "work-design-system",
      title: "A whitelabel design system, built from scratch",
      description: "Built as a side project. Single token architecture, themable for any brand. My take on how systems should scale.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop&q=80",
      role: "Personal project",
      year: "",
      company: "",
      ctaLabel: "View case study",
      active: true,
      href: "/casestudy/design-system",
      tags: ["Design System", "Tokens", "Whitelabel"]
    }
  ],

  aiWorkflow: {
    heading: "AI in my workflow",
    intro: "AI doesn't make the work. It helps me move faster, sharper, and closer to what ships.",
    tools: [
      { name: "Claude", description: "Thinking out loud. Most design decisions get pressure-tested here first." },
      { name: "ChatGPT", description: "Brainstorming and a second opinion on ideas." },
      { name: "Figma Make", description: "Figma to working prototype, without leaving the canvas." },
      { name: "v0", description: "Fast React and Tailwind front-ends from prompts." },
      { name: "Lovable", description: "Full-stack prototypes when something needs to actually run." }
    ],
    closingLine: "In practice: Think in Claude or ChatGPT. Design in Figma. Prototype with Figma Make or v0. Ship with Lovable when it has to actually run."
  },

  aiExplorationsHeading: "AI Explorations",
  aiExplorationsIntro: "Side projects where I push the AI tools further than my day job needs.",
  aiExplorations: [
    {
      id: "ai-audit-tool",
      title: "AI Audit Tool",
      description: "A working internal tool that surfaces anomalies in dense compliance datasets. Audit reviewers see flagged items in under 2 seconds.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=900&fit=crop&q=80",
      status: "Live",
      builtWith: ["Claude", "v0"],
      year: 2026,
      ctaLabel: "Try it live",
      active: false,
      tags: ["AI", "Enterprise", "Built with AI"]
    },
    {
      id: "ai-shopping",
      title: "AI Shopping Assistant",
      description: "A speech-to-speech assistant that turns vague shopping intent into a clean checkout. Built end-to-end as a weekend experiment.",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&h=900&fit=crop&q=80",
      status: "Prototype",
      builtWith: ["Claude", "Lovable"],
      year: 2025,
      ctaLabel: "View details",
      active: false,
      tags: ["AI", "Voice", "Prototype"]
    },
    {
      id: "whitelabel-starter",
      title: "Whitelabel Component Starter",
      description: "A starter kit of 40+ themable components. Built to test how far token-based theming can scale across brands.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop&q=80",
      status: "Live",
      builtWith: ["Figma", "Tokens Studio"],
      year: 2025,
      ctaLabel: "View kit",
      active: false,
      tags: ["Design System", "UI Kit"]
    },
    {
      id: "spec-diff",
      title: "Spec Diff Tool",
      description: "A small browser tool to compare two Figma versions side by side. Useful when reviewing handoffs.",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=900&fit=crop&q=80",
      status: "Archived",
      builtWith: ["v0"],
      year: 2024,
      ctaLabel: "GitHub",
      active: false,
      tags: ["Tool", "Personal"]
    }
  ],

  about: {
    heading: "About",
    bio: [
      "Hi, I'm Rishabh. I design complex B2B software for industries like insurance, HRMS, sports management, performance marketing, and SEO. These products are dense and full of rules. So I build the design patterns they need from scratch.",
      "I think in systems. I use AI to brainstorm, prototype, and sometimes ship code. The goal isn't to use AI everywhere. The goal is to keep what I design close to what gets built."
    ],
    currentlyLine: "Currently at Tcules. Designing Omny and Signal at Premelis, and Cricmac at Quixera.",
    experiences: [
      {
        company: "Tcules",
        period: "2025 – present",
        projects: [
          { name: "Premelis", period: "2026 – present", description: "Designing Omny (performance marketing) and Signal (SEO tools)." },
          { name: "Quixera", period: "2026 – present", description: "Designing Cricmac, a sports academy management platform." },
          { name: "Chestnut", period: "2025 – 2026", description: "Designed the legacy modernization of a producer performance management platform for insurance agents." }
        ]
      },
      {
        company: "Timelabs",
        period: "2023 – 2025",
        description: "Designed Travel Management, HR Analytics, and Candidate Onboarding. Built a whitelabel design system across the HRMS product."
      },
      {
        company: "Sports For All",
        period: "2022",
        description: "Designed the National Games Gujarat 2022 website. Reached 100,000+ daily users."
      }
    ],
    skills: [
      { category: "Design", items: "Information architecture, interaction design, UX writing, accessibility" },
      { category: "Systems", items: "Design systems from scratch, token architecture, multi-brand theming, design-to-code parity" },
      { category: "B2B specialties", items: "Data-dense interfaces, multi-role workflows, multi-tenant systems" },
      { category: "AI workflow", items: "Claude · ChatGPT · Figma Make · v0 · Lovable" },
      { category: "Tools", items: "Figma · Webflow · Notion · Jira" }
    ]
  },

  footer: {
    closingLine: "Got something complex to design? Let's talk.",
    email: "rishabh1320@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/rishabh-choudhary-43a81b158/",
    location: "Bangalore, IST (UTC +5:30)"
  },
  footerNote: "© 2026 Rishabh Choudhary · All rights reserved."
};

export const hrmsCaseStudy: CaseStudyContent = {
  slug: "casestudy/dashboard",
  title: "Attendance Dashboard",
  subtitle:
    "Designed a workforce attendance dashboard to help business leaders analyze trends and make data-driven decisions.",
  role: "Product Designer",
  duration: "1 month · Solo project",
  overview:
    "This project reworked a noisy attendance experience into a focused analytics dashboard with clear KPI hierarchy, stronger visual storytelling, and quicker decision paths for leadership teams.",
  toc: [
    { id: "overview", label: "Overview" },
    { id: "audit", label: "Audit & Research" },
    { id: "design-process", label: "Design Process" },
    { id: "final-design", label: "Final Design" }
  ],
  steps: [
    {
      title: "Auditing the existing dashboard",
      description:
        "I audited the existing attendance dashboard, identified major friction points, and mapped where users were losing context across the reporting flow.",
      image: "https://framerusercontent.com/images/ZLdRrcIW22rCiBPHTvsVussRWE0.png?scale-down-to=1024&width=1632&height=1744",
      alt: "Existing attendance dashboard"
    },
    {
      title: "Competitive Research & Inspiration",
      description:
        "I collected references for layout systems, KPI density, and data narrative patterns to define the visual direction before wireframing.",
      image: "https://framerusercontent.com/images/lA5ZkFjGwNYAERa4giPM4ygQxw.png?scale-down-to=1024&width=2028&height=2401",
      alt: "Moodboard and inspirations"
    },
    {
      title: "Identifying KPIs",
      description:
        "I worked with stakeholders to identify the KPI set that mattered most for real-time monitoring and management reporting.",
      image: "https://framerusercontent.com/images/9YL8gZc19XGwr8shgFK6syCg4M.png?scale-down-to=1024&width=1920&height=2473",
      alt: "KPI identification and layout notes"
    },
    {
      title: "Finding the right place for each KPI",
      description:
        "A wireframe pass helped place each KPI in a structure that supports fast scanning, clear grouping, and logical visual hierarchy.",
      image: "https://framerusercontent.com/images/fX5ImhTCmKhFsAi5J2RHIweQoj0.png?scale-down-to=1024&width=1209&height=1508",
      alt: "Wireframe for KPI placement"
    },
    {
      title: "Deciding the right visualization",
      description:
        "Each metric was paired with the right chart type so patterns are obvious at a glance, without overwhelming the user.",
      image: "https://framerusercontent.com/images/WxuftkY9ZaRdpccGiXjVr22r0.png?scale-down-to=1024&width=1209&height=1172",
      alt: "Visualization selection"
    },
    {
      title: "Final Designs",
      description:
        "The final dashboard design combines KPI clarity, consistent interaction patterns, and a cleaner visual language for day-to-day decisions.",
      image: "https://framerusercontent.com/images/ZRH5p44QkJXF0boHKZpZZv18.png?scale-down-to=1024&width=1920&height=1755",
      alt: "Final dashboard design"
    }
  ],
  thanksNote: "Thank you for reading. This project pushed me to balance data density with clarity — if I were to revisit it, I'd invest more time in testing with actual HR managers earlier in the process."
};

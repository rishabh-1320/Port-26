import type { CaseStudyContent, HomeContent } from "./types";

export const homeContent: HomeContent = {
  siteName: "Design Port",
  byline: "By Rishabh Choudhary",
  logo: "https://framerusercontent.com/images/HNFmJC5lh17qrHUlZgrQXYCzo.png?width=1969&height=1969",
  resumeUrl: "https://drive.google.com/file/d/1yuRPDLlRh_Q7rkXvQfxWwoOZYhgisN42/view?usp=sharing",
  nav: [
    { label: "Works", href: "/#features" },
    { label: "AI Exploration", href: "/#ai-exploration" },
    { label: "About", href: "/#about" }
  ],
  hero: {
    lead: "Designing The",
    highlight: "Complex B2B enterprise tools",
    support: "PRD's into functioning prototypes",
    intro:
      "I'm a Product Designer specializing in B2B enterprise tools that turn fragmented workflows into seamless digital experiences.",
    image: "https://framerusercontent.com/images/evb8WhW5MaVa23RUApiaX1mK1ic.png?width=2290&height=1474"
  },
  processIntro: "Turning chaos into clarity, one product at a time. A bold approach to building seamless user experiences.",
  processSteps: [
    {
      id: "01",
      title: "Cut Through the Noise",
      description: "I dig past assumptions and half-baked ideas to find the real problem.",
      bgColor: "#E8E8E8",
      textColor: "#181818"
    },
    {
      id: "02",
      title: "Lay the Groundwork",
      description: "I map out flows and structure so the team knows exactly where we are heading.",
      bgColor: "#BBF451",
      textColor: "#181818"
    },
    {
      id: "03",
      title: "Build Fast, Break Fast",
      description: "I prototype, test, and refine until the experience feels seamless and strong.",
      bgColor: "#4FA1FF",
      textColor: "#ffffff"
    },
    {
      id: "04",
      title: "Ship and Evolve",
      description: "I launch, learn from real use, and keep continuously improving without ego.",
      bgColor: "#181818",
      textColor: "#ffffff"
    }
  ],
  workIntro: "Most of what I do falls under NDA's but feel free to checkout the live versions.",
  works: [
    {
      id: "work-chestnut",
      title: "Chestnut PPM",
      description:
        "End-to-end UX overhaul and brand evolution for Chestnut, a Producer Performance Management platform.",
      image: "https://framerusercontent.com/images/evb8WhW5MaVa23RUApiaX1mK1ic.png?scale-down-to=1024&width=2290&height=1474",
      ctaLabel: "Case study unavailable",
      active: false,
      tags: ["Product", "B2B", "Design"]
    },
    {
      id: "work-hrms",
      title: "HRMS case study",
      description:
        "Designed a workforce attendance dashboard to help business leaders analyze trends and make data-driven decisions.",
      image: "https://framerusercontent.com/images/I2PMf0jpPlxc3AxBOc0zh4LP00.png?scale-down-to=1024&width=2028&height=1511",
      ctaLabel: "View case study",
      active: true,
      href: "/casestudy/dashboard",
      tags: ["Dashboard", "Analytics", "Enterprise"]
    },
    {
      id: "work-onboarding-replica",
      title: "Lokalise Onboarding Case Study",
      description:
        "End-to-end onboarding redesign case study replicated with full structure, metrics, and visual walkthrough in native portfolio styling.",
      image: "/case-study/onboarding/dummy-cover.svg",
      ctaLabel: "View case study",
      active: true,
      href: "/casestudy/onboarding",
      tags: ["Onboarding", "Growth", "Case Study"]
    },
    {
      id: "work-design-system",
      title: "Design System",
      description:
        "Built a scalable component library and design system to ensure consistency across multiple enterprise products.",
      image: "https://framerusercontent.com/images/da1nfgfKizLj4NKfDH7CM7Abso.png",
      ctaLabel: "Open Case study",
      active: false,
      tags: ["Design System", "Component Library", "Design to Code"]
    }
  ],
  aiExplorations: [
    {
      id: "ai-component-lib",
      title: "Making Component Library",
      description: "Building a comprehensive, scalable component library with design tokens and coded components.",
      image: "https://framerusercontent.com/images/r186HwEvDAVtFgHPbRq9eyYWYKs.png",
      ctaLabel: "Open Case study",
      active: false,
      tags: ["Design System", "Component Library", "Design to Code"]
    },
    {
      id: "ai-shopping",
      title: "AI Shopping Assistant",
      description: "Pet project exploring AI-driven shopping flows and conversational product discovery.",
      image: "https://framerusercontent.com/images/o7bz5cm2oknsYdEVH8GOfm2kqU.png?scale-down-to=1024&width=1440&height=1440",
      ctaLabel: "Open project",
      active: false,
      tags: ["Vibe Code", "Pet Project", "AI"]
    }
  ],
  galleryTitle: "Fun Stuff",
  galleryIntro: "At the end, I am human. A glimpse of my life outside messed up components.",
  gallery: [
    {
      src: "https://framerusercontent.com/images/1FVXzrqRTB3web2vXvKKQzULE.jpg?scale-down-to=512&width=3072&height=4096",
      alt: "Portrait"
    },
    {
      src: "https://framerusercontent.com/images/KWJUJzBwVcEEKZ74VHquALVc.jpg?scale-down-to=1024&width=4096&height=3072",
      alt: "Outdoor landscape"
    },
    {
      src: "https://framerusercontent.com/images/eythvV0HuFjteA8stjVij8yvY4o.jpg?scale-down-to=512",
      alt: "Sunset view"
    },
    {
      src: "https://framerusercontent.com/images/N8i8iK41U4o5EQ2OEnKJQtDVarA.jpg?scale-down-to=1024&width=4096&height=3072",
      alt: "Travel moment"
    },
    {
      src: "https://framerusercontent.com/images/H3Cww4bBlaXFvCnJsm8Brvu0sKk.jpg?scale-down-to=512",
      alt: "Nature"
    },
    {
      src: "https://framerusercontent.com/images/imxE4r4agsHHmyjueVzh5BA9uJ8.jpg?scale-down-to=512",
      alt: "Adventure"
    },
    {
      src: "https://framerusercontent.com/images/Yq4VsFCHO0l2WPoXCesHyK1z0.jpg?scale-down-to=1024&width=4096&height=3072",
      alt: "Life outside work"
    },
    {
      src: "https://framerusercontent.com/images/GLttGdLcskLKnWRcvpxU5k9i2Bc.jpg?scale-down-to=1024&width=2704&height=2238",
      alt: "Creative inspiration"
    }
  ],
  coursesTitle: "Fun Stuff",
  coursesIntro: "Product and UI/UX Designer focused on design-to-code quality for enterprise products.",
  courseHighlights: ["UX designer", "Design to Code", "Making Component library"],
  aboutSummary:
    "A product designer who loves working on complex systems and enhancing features to improve product functionality and user experience.",
  experiences: [
    {
      company: "Tcules UX design studio",
      role: "UX Designer",
      periodStart: "Jul 2025",
      periodEnd: "Present",
      logoSrc: "https://framerusercontent.com/images/da1nfgfKizLj4NKfDH7CM7Abso.png?width=200&height=200",
      description:
        "Designed end-to-end UX overhaul and brand evolution for Chestnut, a Producer Performance Management platform. By applying design thinking and rigorous UX research, I transformed a legacy interface into a modern, high-efficiency tool for carriers. I implemented a scalable design system and new performance-tracking features that streamlined producer management and improved operational transparency.",
      link: "https://www.tcules.com/"
    },
    {
      company: "Timelabs",
      role: "UX Designer",
      periodStart: "Sep 2023",
      periodEnd: "Jun 2025",
      logoSrc: "https://framerusercontent.com/images/UwrKVEbhCxiCTotj7J9sCqmdoY.jpeg?width=200&height=200",
      description:
        "I led the end-to-end design of an enterprise travel management module and an HR analytics dashboard. I architected a scalable, white-label design system using tokens to ensure consistency across the product suite. My work focused on transforming complex business policies into intuitive, high-density workflows that empower organizations to make faster, data-driven decisions.",
      link: "https://www.timelabs.in/"
    }
  ],
  funStuffSummary: "Ready to work with me?",
  contactHeading: "Then pick your phone and call me or not..",
  contactSubheading: "Let's build the future of your product together and better.",
  email: "rishabh1320@gmail.com",
  phone: "+91 9916519867",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com/pixsellz" },
    { label: "YouTube", href: "https://youtube.com" }
  ],
  footerNote: "© 2025 Rishabh port . All rights reserved.",
  footerPhoto: "https://framerusercontent.com/images/awA4YVq4Ji6HYF9bDmvnjrhD8K0.jpg?width=3415&height=3488"
};

export const hrmsCaseStudy: CaseStudyContent = {
  slug: "casestudy/dashboard",
  title: "Attendance Dashboard",
  subtitle:
    "Designed a workforce attendance dashboard to help business leaders analyze trends and make data-driven decisions.",
  role: "Product Designer",
  duration: "1 month",
  overview:
    "This project reworked a noisy attendance experience into a focused analytics dashboard with clear KPI hierarchy, stronger visual storytelling, and quicker decision paths for leadership teams.",
  steps: [
    {
      title: "Where I started",
      description:
        "I audited the existing attendance dashboard, identified major friction points, and mapped where users were losing context across the reporting flow.",
      image: "https://framerusercontent.com/images/ZLdRrcIW22rCiBPHTvsVussRWE0.png?scale-down-to=1024&width=1632&height=1744",
      alt: "Existing attendance dashboard"
    },
    {
      title: "Gathering inspirations before starting to design",
      description:
        "I collected references for layout systems, KPI density, and data narrative patterns to define the visual direction before wireframing.",
      image: "https://framerusercontent.com/images/lA5ZkFjGwNYAERa4giPM4ygQxw.png?scale-down-to=1024&width=2028&height=2401",
      alt: "Moodboard and inspirations"
    },
    {
      title: "Indentiying KPI's",
      description:
        "I worked with stakeholders to identify the KPI set that mattered most for real-time monitoring and management reporting.",
      image: "https://framerusercontent.com/images/9YL8gZc19XGwr8shgFK6syCg4M.png?scale-down-to=1024&width=1920&height=2473",
      alt: "KPI identification and layout notes"
    },
    {
      title: "Finding The right place for each KPI",
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
  thanksNote: "Thank you for viewing"
};
